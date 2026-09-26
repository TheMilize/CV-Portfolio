const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const ts = require("typescript");
const { createPinia, setActivePinia } = require("pinia");

function loadTypeScript(relativePath, globals = {}, overrides = {}) {
  const filename = path.resolve(__dirname, "../src", relativePath);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const localRequire = createRequire(filename);
  const module = { exports: {} };
  vm.runInNewContext(
    source,
    {
      module,
      exports: module.exports,
      require: (id) => overrides[id] || localRequire(id),
      ...globals,
    },
    { filename },
  );
  return module.exports;
}

function createPreferences({ unavailableStorage = false } = {}) {
  let onChange;
  let dark = false;
  const storage = new Map();
  const document = {
    documentElement: {
      lang: "",
      classList: {
        toggle: (_name, enabled) => {
          dark = enabled;
        },
      },
    },
  };
  const localStorage = {
    getItem: (key) => {
      if (unavailableStorage) throw new Error("Storage blocked");
      return storage.get(key) ?? null;
    },
    setItem: (key, value) => {
      if (unavailableStorage) throw new Error("Storage blocked");
      storage.set(key, value);
    },
  };
  const window = {
    matchMedia: () => ({
      matches: false,
      addEventListener: (_type, handler) => {
        onChange = handler;
      },
      removeEventListener: () => {},
    }),
  };
  setActivePinia(createPinia());
  const { useMainStore } = loadTypeScript("stores/index.ts", {
    document,
    window,
    localStorage,
    navigator: { language: "ru-RU" },
  });
  return {
    store: useMainStore(),
    document,
    storage,
    dark: () => dark,
    changeSystem: (value) => onChange({ matches: value }),
  };
}

test("System theme follows OS changes; an explicit choice stays fixed", () => {
  const env = createPreferences();
  env.store.initTheme();
  assert.equal(env.dark(), false);
  env.changeSystem(true);
  assert.equal(env.store.isDark, true);
  assert.equal(env.dark(), true);
  env.store.setTheme("light");
  env.changeSystem(true);
  assert.equal(env.dark(), false);
  assert.equal(env.storage.get("theme"), "light");
  env.store.setTheme("system");
  assert.equal(env.dark(), true);
});

test("Unavailable storage does not prevent theme or language initialization", () => {
  const env = createPreferences({ unavailableStorage: true });
  assert.doesNotThrow(() => {
    env.store.initTheme();
    env.store.initLanguage();
  });
  assert.equal(env.document.documentElement.lang, "ru");
  env.store.setLanguage("en");
  env.store.setTheme("dark");
  assert.equal(env.document.documentElement.lang, "en");
  assert.equal(env.dark(), true);
});

test("Saved language is applied to the document", () => {
  const env = createPreferences();
  env.storage.set("lang", "en");
  env.store.initLanguage();
  assert.equal(env.store.currentLanguage, "en");
  assert.equal(env.document.documentElement.lang, "en");
});

test("Both resume languages fit two pages and keep text inside page margins", async () => {
  const font = fs.readFileSync(
    path.resolve(__dirname, "../public/fonts/Roboto-Regular.ttf"),
  );
  const { createResumePDF } = loadTypeScript(
    "utils/resumeGenerator.ts",
    {
      fetch: async () => ({ ok: true, blob: async () => font }),
      FileReader: class {
        readAsDataURL(bytes) {
          this.result = "data:font/ttf;base64," + bytes.toString("base64");
          this.onload();
        }
      },
    },
    { "@/stores": {} },
  );
  for (const lang of ["en", "ru"]) {
    const doc = await createResumePDF(lang);
    assert.equal(doc.getNumberOfPages(), 2, lang);
    const pdf = doc.output();
    assert.ok(pdf.startsWith("%PDF-"));
    for (const page of doc.internal.pages.slice(1)) {
      const positions = [
        ...page.join("\n").matchAll(/(-?[\d.]+) (-?[\d.]+) Td/g),
      ];
      assert.ok(positions.length > 15, "Page must contain text");
      for (const [, x, y] of positions) {
        assert.ok(
          Number(x) >= 50 && Number(x) <= 545,
          `${lang}: text outside horizontal margins`,
        );
        assert.ok(
          Number(y) >= 20 && Number(y) <= 800,
          `${lang}: text outside vertical margins`,
        );
      }
    }
  }
});
