<script setup lang="ts">
import CodedBackground from './CodedBackground.vue';
import { ref } from "vue";
import { Mail, Smartphone, MapPin, Github, Linkedin, Send } from "lucide-vue-next";
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
  <section id="contact" class="py-24 px-8 bg-s0 max-md:py-16 max-sm:py-12 max-sm:px-4 relative overflow-hidden">
    <CodedBackground />
    <div class="site-container relative z-10">
      <h2 class="section-heading scale-in">Contact Me</h2>
      <p class="section-sub fade-in">Get in touch for inquiries</p>

      <div class="grid grid-cols-1 gap-8 items-start md:grid-cols-[1fr_1.5fr] md:gap-16">

        <!-- Contact Info -->
        <div class="flex flex-col gap-8 fade-in-left">
          <div class="flex flex-col items-center text-center gap-2 md:flex-row md:items-start md:text-left md:gap-4">
            <Mail :size="24" class="text-brand shrink-0 md:mt-1" />
            <div>
              <h3 class="text-lg text-ink font-semibold mb-2">Email</h3>
              <a href="mailto:pasionharold252002@gmail.com" class="text-ink-2 underline hover:text-brand transition-colors duration-300">
                pasionharold252002@gmail.com
              </a>
            </div>
          </div>

          <div class="flex flex-col items-center text-center gap-2 md:flex-row md:items-start md:text-left md:gap-4">
            <Smartphone :size="24" class="text-brand shrink-0 md:mt-1" />
            <div>
              <h3 class="text-lg text-ink font-semibold mb-2">Phone</h3>
              <div class="flex flex-col gap-1 text-ink-2">
              <a href="tel:+639924658229" class="text-ink-2 underline hover:text-brand transition-colors duration-300">
                +63 992 465 8229 (Primary)
              </a>
              <a href="tel:+639494781634" class="text-ink-2 underline hover:text-brand transition-colors duration-300">
                +63 949 478 1634 (Secondary)
              </a>
            </div>
            </div>
          </div>

          <div class="flex flex-col items-center text-center gap-2 md:flex-row md:items-start md:text-left md:gap-4">
            <MapPin :size="24" class="text-brand shrink-0 md:mt-1" />
            <div>
              <h3 class="text-lg text-ink font-semibold mb-2">Location</h3>
              <p class="text-ink-2 m-0">Bacoor, Cavite, Philippines</p>
            </div>
          </div>

          <div class="flex gap-4 mt-4 flex-wrap justify-center md:justify-start">
            <a
              href="mailto:pasionharold252002@gmail.com"
              class="w-12 h-12 flex items-center justify-center rounded-full bg-s2 text-ink-2 border border-edge hover:bg-brand hover:text-white hover:-translate-y-0.5 hover:border-brand transition-all duration-300"
            >
              <Mail :size="28" />
            </a>
            <a
              href="https://www.linkedin.com/in/harold-pasion-017a131b8/"
              target="_blank"
              aria-label="LinkedIn"
              class="w-12 h-12 flex items-center justify-center rounded-full bg-s2 text-ink-2 border border-edge hover:bg-brand hover:text-white hover:-translate-y-0.5 hover:border-brand transition-all duration-300"
            >
              <Linkedin :size="28" />
            </a>
            <a
              href="https://github.com/arownz"
              target="_blank"
              aria-label="GitHub"
              class="w-12 h-12 flex items-center justify-center rounded-full bg-s2 text-ink-2 border border-edge hover:bg-brand hover:text-white hover:-translate-y-0.5 hover:border-brand transition-all duration-300"
            >
              <Github :size="28" />
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <form
          class="contact-form-wrapper bg-s1 p-10 rounded-[1.25rem] border-2 border-edge relative overflow-hidden fade-in-right sm:p-6"
          @submit.prevent="handleSubmit"
        >
          <div class="mb-6">
            <label for="name" class="block text-ink font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="formData.name"
              required
              placeholder="Your Name"
              :disabled="isSubmitting"
              class="w-full px-4 py-3.5 bg-s0 border-2 border-edge rounded-[0.625rem] text-ink text-base
                     transition-all duration-300 focus:outline-none focus:border-brand
                     focus:shadow-[0_0_0_4px_rgba(158,29,76,0.15)] focus:-translate-y-0.5 focus:bg-s1
                     disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div class="mb-6">
            <label for="email" class="block text-ink font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              v-model="formData.email"
              required
              placeholder="your.email@example.com"
              :disabled="isSubmitting"
              class="w-full px-4 py-3.5 bg-s0 border-2 border-edge rounded-[0.625rem] text-ink text-base
                     transition-all duration-300 focus:outline-none focus:border-brand
                     focus:shadow-[0_0_0_4px_rgba(158,29,76,0.15)] focus:-translate-y-0.5 focus:bg-s1
                     disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          <div class="mb-6">
            <label for="message" class="block text-ink font-semibold mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              v-model="formData.message"
              required
              placeholder="Your message..."
              :disabled="isSubmitting"
              class="w-full px-4 py-3.5 bg-s0 border-2 border-edge rounded-[0.625rem] text- ink text-base
                     transition-all duration-300 focus:outline-none focus:border-brand
                     focus:shadow-[0_0_0_4px_rgba(158,29,76,0.15)] focus:-translate-y-0.5 focus:bg-s1
                     disabled:opacity-60 disabled:cursor-not-allowed resize-y min-h-30"
            ></textarea>
          </div>

          <div
            v-if="statusMessage"
            :class="[
              'p-4 rounded-lg mb-4 text-center font-medium animate-[slideIn_0.3s_ease]',
              submitStatus === 'success'
                ? 'bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-[#22c55e]'
                : 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-[#ef4444]',
            ]"
          >
            {{ statusMessage }}
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
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
