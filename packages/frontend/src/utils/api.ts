import axios from "axios";

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Увеличил до 30 секунд для SMTP
  headers: {
    "Content-Type": "application/json",
  },
});

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Send contact form via backend API
export const sendContactForm = async (
  formData: ContactFormData,
): Promise<boolean> => {
  try {
    const response = await api.post("/contact", formData);
    return response.status === 200;
  } catch (error) {
    console.error("Contact form error:", error);
    return false;
  }
};

// Health check
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get("/health");
    return response.status === 200;
  } catch (error) {
    console.error("Health check error:", error);
    return false;
  }
};
