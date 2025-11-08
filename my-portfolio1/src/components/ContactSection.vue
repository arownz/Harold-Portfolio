<script setup lang="ts">
import { ref } from "vue";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-vue-next";
import emailjs from "@emailjs/browser";

const formData = ref({
  name: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);
const submitStatus = ref<"idle" | "success" | "error">("idle");
const statusMessage = ref("");

// Function to hash email for Gravatar
const hashEmail = async (email: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  submitStatus.value = "idle";

  try {
    // EmailJS configuration
    // Replace these with your actual EmailJS credentials
    const serviceId = "service_hootxr7"; // Get from emailjs.com
    const templateId = "template_lemm6u7"; // Get from emailjs.com
    const publicKey = "UCFzr7LWiiuQHaXcj"; // Get from emailjs.com

    // Generate Gravatar URL
    const email = formData.value.email.toLowerCase().trim();
    const gravatarUrl = `https://www.gravatar.com/avatar/${await hashEmail(
      email
    )}?s=60&d=mp`;

    const templateParams = {
      from_name: formData.value.name,
      from_email: formData.value.email,
      message: formData.value.message,
      to_name: "Harold",
      gravatar_url: gravatarUrl,
      time: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      year: new Date().getFullYear(),
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);

    submitStatus.value = "success";
    statusMessage.value =
      "Message sent successfully! I'll get back to you soon.";

    // Reset form
    formData.value = {
      name: "",
      email: "",
      message: "",
    };
  } catch (error) {
    console.error("EmailJS Error:", error);
    submitStatus.value = "error";
    statusMessage.value =
      "Failed to send message. Please try emailing me directly.";
  } finally {
    isSubmitting.value = false;

    // Clear status message after 5 seconds
    setTimeout(() => {
      submitStatus.value = "idle";
      statusMessage.value = "";
    }, 5000);
  }
};
</script>

<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-title scale-in">Get In Touch</h2>
      <p class="section-subtitle fade-in">Contact me for inquiries</p>

      <div class="contact-content">
        <div class="contact-info fade-in-left">
          <div class="contact-item">
            <Mail :size="24" class="contact-icon" />
            <div>
              <h3>Email</h3>
              <a href="mailto:pasionharold252002@gmail.com"
                >pasionharold252002@gmail.com</a
              >
            </div>
          </div>

          <div class="contact-item">
            <Phone :size="24" class="contact-icon" />
            <div>
              <h3>Phone</h3>
              <a href="tel:+639494781634">+63 949 478 1634</a>
            </div>
          </div>

          <div class="contact-item">
            <MapPin :size="24" class="contact-icon" />
            <div>
              <h3>Location</h3>
              <p>Bacoor, Cavite, Philippines</p>
            </div>
          </div>

          <div class="contact-social">
            <a href="mailto:pasionharold252002@gmail.com">
              <Mail :size="28" />
            </a>
            <a
              href="https://www.linkedin.com/in/harold-pasion-017a131b8/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin :size="28" />
            </a>
            <a
              href="https://github.com/arownz"
              target="_blank"
              aria-label="GitHub"
            >
              <Github :size="28" />
            </a>
          </div>
        </div>

        <form class="contact-form fade-in-right" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="formData.name"
              required
              placeholder="Your Name"
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="formData.email"
              required
              placeholder="your.email@example.com"
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              v-model="formData.message"
              required
              placeholder="Your message..."
              :disabled="isSubmitting"
            ></textarea>
          </div>

          <div v-if="statusMessage" :class="['status-message', submitStatus]">
            {{ statusMessage }}
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            <Send :size="20" />
            {{ isSubmitting ? "Sending..." : "Send Message" }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: 6rem 2rem;
  background: var(--bg-darker);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 1rem;
  color: var(--primary);
  font-weight: 700;
}

.section-subtitle {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 4rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: start;
}

.contact-icon {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.contact-item h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.contact-item a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: var(--primary);
}

.contact-item p {
  color: var(--text-secondary);
  margin: 0;
}

.contact-social {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.contact-social a {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-light);
  color: var(--text-secondary);
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.contact-social a:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
  border-color: var(--primary);
}

.social-icon {
  width: 28px;
  height: 28px;
}

.contact-form {
  background: var(--bg-dark);
  padding: 2.5rem;
  border-radius: 1.25rem;
  border: 2px solid var(--border);
  position: relative;
  overflow: hidden;
}

.contact-form::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--primary),
    var(--secondary),
    var(--accent)
  );
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--bg-darker);
  border: 2px solid var(--border);
  border-radius: 0.625rem;
  color: var(--text-primary);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
  background: var(--bg-dark);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px var(--shadow-lg);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.status-message {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
  animation: slideIn 0.3s ease;
}

.status-message.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group input:disabled,
.form-group textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 4rem 1.5rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .contact-social {
    flex-wrap: wrap;
    justify-content: center;
  }

  .contact-social a {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 480px) {
  .contact {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 3rem;
  }

  .contact-content {
    gap: 2rem;
  }

  .contact-info {
    gap: 1.5rem;
  }

  .contact-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }

  .contact-social {
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .contact-social a {
    width: 48px;
    height: 48px;
  }

  .social-icon {
    width: 24px;
    height: 24px;
  }

  .contact-form {
    padding: 1.25rem;
  }

  .form-group {
    margin-bottom: 1.25rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.75rem;
    font-size: 0.95rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
}
</style>
