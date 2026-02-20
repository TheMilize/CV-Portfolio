<template>
  <div class="min-h-screen">
    <AppHeader />

    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="section-title text-center">{{ t("contact.title") }}</h1>
        <p class="section-subtitle text-center">
          {{ t("contact.subtitle") }}
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Контактная информация -->
          <div class="card">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {{ t("contact.info.title") }}
            </h3>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    {{ t("contact.info.email") }}
                  </h4>
                  <a
                    href="mailto:shemakin.vladlen@gmail.com"
                    class="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    shemakin.vladlen@gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    {{ t("contact.info.location") }}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ t("common.location") }}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div
                  class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m-5 0h6m-6 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2M9 14l2 2 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    {{ t("contact.info.social") }}
                  </h4>
                  <div class="flex gap-4">
                    <a
                      href="https://github.com/TheMilize"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary-600 dark:text-primary-400 hover:underline"
                      >GitHub</a
                    >
                    <a
                      href="https://www.linkedin.com/in/vladlen-milize-25b22339b/"
                      class="text-primary-600 dark:text-primary-400 hover:underline"
                      >LinkedIn</a
                    >
                    <a
                      href="https://x.com/shadow90414328?s=21"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-primary-600 dark:text-primary-400 hover:underline"
                      >X</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Контактная форма -->
          <div class="card">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {{ t("contact.title") }}
            </h3>

            <form class="space-y-6" @submit.prevent="submitForm">
              <div>
                <label :for="'name'" class="label">{{
                  t("contact.form.name")
                }}</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="input-field"
                  :placeholder="t('contact.form.name')"
                />
              </div>

              <div>
                <label :for="'email'" class="label">{{
                  t("contact.form.email")
                }}</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input-field"
                  :placeholder="t('contact.form.email')"
                />
              </div>

              <div>
                <label :for="'subject'" class="label">{{
                  t("contact.form.subject")
                }}</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="input-field"
                  :placeholder="t('contact.form.subject')"
                />
              </div>

              <div>
                <label :for="'message'" class="label">{{
                  t("contact.form.message")
                }}</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="textarea-field"
                  :placeholder="t('contact.form.message')"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn-primary w-full"
              >
                <span v-if="isSubmitting">{{ t("contact.form.sending") }}</span>
                <span v-else>{{ t("contact.form.send") }}</span>
              </button>

              <div
                v-if="submitStatus"
                class="mt-4 p-4 rounded-lg"
                :class="
                  submitStatus.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                "
              >
                {{ submitStatus.message }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useTranslations } from "@/locales";
import { sendContactForm, type ContactFormData } from "@/utils/api";

const { t } = useTranslations();

// Remove EmailJS initialization - using backend API now

const form = ref<ContactFormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const submitStatus = ref<{ type: "success" | "error"; message: string } | null>(
  null,
);

const submitForm = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    submitStatus.value = {
      type: "error",
      message: t("contact.form.error"),
    };
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    const success = await sendContactForm(form.value);

    if (success) {
      submitStatus.value = {
        type: "success",
        message: t("contact.form.success"),
      };
      // Reset form
      form.value = { name: "", email: "", subject: "", message: "" };
    } else {
      submitStatus.value = {
        type: "error",
        message: t("contact.form.error"),
      };
    }
  } catch (error) {
    console.error("Form submission error:", error);
    submitStatus.value = {
      type: "error",
      message: t("contact.form.error"),
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>
