import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactForm = async (
  formData: ContactFormData,
): Promise<boolean> => {
  try {
    const response = await api.post<{ success: boolean; error?: string }>(
      "/contact",
      formData,
    );
    if (response.data?.success) return true;
    throw new Error(response.data?.error ?? "Не удалось отправить сообщение");
  } catch (err: unknown) {
    if (err && typeof err === "object" && "response" in err) {
      const ax = err as { response?: { data?: { error?: string } } };
      const msg = ax.response?.data?.error ?? "Не удалось отправить сообщение";
      throw new Error(msg);
    }
    throw err;
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get("/health");
    return response.status === 200;
  } catch (error) {
    // console.error("Health check error:", error);
    return false;
  }
};
