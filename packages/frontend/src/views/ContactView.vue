<template>
  <div class="shell page-section contact-page">
    <header class="page-heading">
      <p class="eyebrow">{{ t("design.contactLabel") }}</p>
      <h1>{{ t("design.contactHeading") }}</h1>
      <p>{{ t("design.contactIntro") }}</p>
    </header>
    <div class="contact-layout">
      <aside class="contact-info">
        <div class="contact-illustration" aria-hidden="true">
          <div class="envelope">
            <div class="envelope-letter">
              <span>hello<span class="heading-dot">.</span></span
              ><i></i><i></i>
            </div>
            <div class="envelope-front"></div>
          </div>
          <span class="contact-star">✳</span
          ><span class="contact-illustration-label"
            >A LITTLE HELLO GOES A LONG WAY.</span
          >
        </div>
        <p class="eyebrow">{{ t("design.contactNote") }}</p>
        <a class="contact-email" href="mailto:shemakin.vladlen@gmail.com"
          >shemakin.vladlen@gmail.com<UiIcon name="external" :size="20"
        /></a>
        <div class="contact-location">
          <UiIcon name="pin" :size="17" />{{ t("common.location") }}
        </div>
        <div class="contact-social">
          <a
            v-for="social in socials"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ social.name }}<UiIcon name="external" :size="15"
          /></a>
        </div>
      </aside>
      <section class="contact-form-panel">
        <h2>{{ t("design.formTitle") }}</h2>
        <form @submit.prevent="submitForm">
          <div class="form-pair">
            <div>
              <label for="name" class="label">{{
                t("contact.form.name")
              }}</label
              ><input
                id="name"
                v-model="form.name"
                name="name"
                autocomplete="name"
                required
                maxlength="100"
                class="input-field"
                :placeholder="t('design.namePlaceholder')"
              />
            </div>
            <div>
              <label for="email" class="label">{{
                t("contact.form.email")
              }}</label
              ><input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                maxlength="254"
                class="input-field"
                :placeholder="t('design.emailPlaceholder')"
              />
            </div>
          </div>
          <div>
            <label for="subject" class="label">{{
              t("contact.form.subject")
            }}</label
            ><input
              id="subject"
              v-model="form.subject"
              name="subject"
              required
              maxlength="200"
              class="input-field"
              :placeholder="t('design.subjectPlaceholder')"
            />
          </div>
          <div>
            <label for="message" class="label">{{
              t("contact.form.message")
            }}</label
            ><textarea
              id="message"
              v-model="form.message"
              name="message"
              required
              minlength="10"
              maxlength="5000"
              rows="6"
              class="textarea-field"
              :placeholder="t('design.messagePlaceholder')"
            ></textarea>
          </div>
          <button
            type="submit"
            class="btn-primary"
            :disabled="isSubmitting"
            :aria-busy="isSubmitting"
          >
            {{ t(isSubmitting ? "contact.form.sending" : "contact.form.send")
            }}<UiIcon v-if="!isSubmitting" name="external" :size="18" />
          </button>
          <p class="form-note">{{ t("design.formNote") }}</p>
          <div
            v-if="submitStatus"
            class="form-feedback"
            :class="submitStatus"
            role="status"
            aria-live="polite"
          >
            {{ t("contact.form." + submitStatus) }}
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import UiIcon from "@/components/UiIcon.vue";
import { useTranslations } from "@/locales";
import { sendContactForm, type ContactFormData } from "@/utils/api";
const { t } = useTranslations();
const form = ref<ContactFormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});
const isSubmitting = ref(false);
const submitStatus = ref<"success" | "error" | null>(null);
const socials = [
  { name: "GitHub", url: "https://github.com/TheMilize" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vladlen-milize-25b22339b/",
  },
  { name: "X", url: "https://x.com/shadow90414328" },
];
async function submitForm() {
  if (isSubmitting.value) return;
  const payload = {
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    subject: form.value.subject.trim(),
    message: form.value.message.trim(),
  };
  if (
    !payload.name ||
    !payload.email ||
    !payload.subject ||
    payload.message.length < 10
  ) {
    submitStatus.value = "error";
    return;
  }
  isSubmitting.value = true;
  submitStatus.value = null;
  try {
    const success = await sendContactForm(payload);
    submitStatus.value = success ? "success" : "error";
    if (success) form.value = { name: "", email: "", subject: "", message: "" };
  } catch {
    submitStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
}
</script>
<style scoped>
.contact-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 8%;
  align-items: start;
}
.contact-illustration {
  position: relative;
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: 9px;
  height: 230px;
  margin-bottom: 32px;
  overflow: hidden;
}
.envelope {
  position: absolute;
  left: calc(50% - 88px);
  top: 82px;
  width: 170px;
  height: 106px;
  background: #a6b49c;
  border: 1px solid #879c7c;
  border-radius: 5px;
  transform: rotate(-10deg);
}
.envelope-letter {
  position: absolute;
  top: -41px;
  left: 18px;
  right: 18px;
  height: 117px;
  padding: 17px;
  border: 1px solid #d8d6c7;
  border-radius: 3px;
  background: #fffcf3;
  color: #354331;
}
.envelope-letter > span {
  font:
    italic 32px "Lora",
    Georgia,
    serif;
}
.envelope-letter i {
  display: block;
  width: 80%;
  height: 3px;
  background: #d8ddce;
  margin-top: 7px;
}
.envelope-letter i:last-child {
  width: 50%;
}
.envelope-front {
  position: absolute;
  inset: 0;
  background: #bfccb5;
  clip-path: polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%);
  border-radius: 4px;
}
.contact-star {
  position: absolute;
  font-size: 94px;
  top: 22px;
  right: 33px;
  line-height: 1;
  color: var(--accent);
  transform: rotate(15deg);
}
.contact-illustration-label {
  position: absolute;
  bottom: 15px;
  left: 20px;
  font:
    7px "JetBrains Mono",
    monospace;
  color: var(--muted);
  letter-spacing: 1px;
}
.contact-info > .eyebrow {
  font-size: 9px;
  letter-spacing: 0.7px;
  margin-bottom: 12px;
}
.contact-email {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  font-size: clamp(13px, 1.6vw, 19px);
  font-weight: 600;
  letter-spacing: -0.4px;
  overflow-wrap: anywhere;
}
.contact-email:hover {
  color: var(--accent);
}
.contact-location {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  margin-top: 18px;
}
.contact-social {
  display: flex;
  gap: 23px;
  margin-top: 26px;
  padding-top: 23px;
  border-top: 1px solid var(--line);
}
.contact-social a {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
}
.contact-social a:hover {
  color: var(--accent);
}
.contact-form-panel {
  padding: 34px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 9px;
}
.contact-form-panel h2 {
  font-size: 23px;
  font-weight: 550;
  letter-spacing: -0.7px;
  margin-bottom: 27px;
}
.contact-form-panel form {
  display: grid;
  gap: 21px;
}
.form-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-pair > div {
  min-width: 0;
}
.form-note {
  color: var(--muted);
  font-size: 10px;
  text-align: center;
  line-height: 1.7;
  margin-top: -7px;
}
@media (max-width: 850px) {
  .contact-layout {
    gap: 28px;
    grid-template-columns: 0.8fr 1.2fr;
  }
  .contact-form-panel {
    padding: 25px;
  }
  .form-pair {
    grid-template-columns: 1fr;
    gap: 21px;
  }
  .contact-email {
    font-size: 12px;
  }
  .contact-email svg {
    width: 15px;
  }
}
@media (max-width: 650px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 35px;
  }
  .contact-illustration {
    height: 210px;
  }
  .contact-email {
    font-size: 17px;
  }
  .contact-form-panel {
    padding: 25px 22px;
  }
  .contact-form-panel h2 {
    font-size: 22px;
  }
}
</style>
