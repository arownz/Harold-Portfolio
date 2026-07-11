<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, watch } from "vue";
import { X, Send, User } from "lucide-vue-next";

// ─── State ───────────────────────────────────────────────────────
const isOpen = ref(false);
const userInput = ref("");
const isTyping = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const hasBeenOpened = ref(false);
const isVisible = ref(false);

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  displayedContent?: string;
  isTyping?: boolean;
}

const messages = ref<ChatMessage[]>([]);
let messageId = 0;

// ─── Offline Knowledge Base ──────────────────────────────────────
// Smart keyword-matched responses — no API calls needed, works offline

interface KnowledgeEntry {
  keywords: string[];
  response: string | string[];
  priority?: number;
}

const pickRandom = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

const knowledgeBase: KnowledgeEntry[] = [
  // ── Greetings ──
  {
    keywords: ["hello", "hi", "hey", "sup", "greetings", "good morning", "good afternoon", "good evening", "howdy", "yo"],
    response: [
      "Hey there! 👋 I'm Harold's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
      "Hi! Welcome to Harold's portfolio! 😊 I can tell you about his projects, tech stack, education, work experience, and more. What would you like to know?",
      "Hello! 👋 Great to see you here. I'm here to help you learn about Harold — his skills, his work, his projects. What catches your interest?",
    ],
    priority: 1,
  },

  // ── Who is Harold / About ──
  {
    keywords: ["who is harold", "about harold", "introduce", "tell me about harold", "harold", "himself", "bio", "biography", "background", "overview", "who are you", "describe harold"],
    response: "Harold F. Pasion is a Full-Stack Developer from Bacoor, Cavite, Philippines 🇵🇭. He's a BSIT graduate (2026) from National University, specializing in Mobile & Web Applications. He's curious by nature and driven by purpose — building thoughtful, scalable software with a focus on proper architecture, real-world impact, and continuous growth. He's also an AI enthusiast who loves exploring new technologies! ✨",
    priority: 2,
  },

  // ── Skills / Tech Stack ──
  {
    keywords: ["skill", "skills", "tech", "technology", "technologies", "stack", "tools", "languages", "frameworks", "what can he do", "proficient", "expertise", "capable"],
    response: "Harold has an impressive and diverse tech stack! 💻\n\n🎨 Frontend: HTML5, CSS3, JavaScript, TypeScript, React, Vue.js, Bootstrap, Tailwind CSS\n⚙️ Backend: Node.js, PHP, Laravel, Python\n📱 Mobile: Flutter, React Native, Kotlin, Java\n🗄️ Database: Firebase, Supabase/PostgreSQL, MySQL, MariaDB\n☁️ Cloud & DevOps: Google Cloud, AWS, Netlify, Vercel, Docker\n🛠️ Dev Tools: VS Code, Android Studio, Cursor, Windsurf, Git, Postman, Figma\n🎮 Game Dev: Unity, Godot\n🤖 AI/ML: MCP, ChatGPT, Claude, Gemini, Hugging Face\n\nHe's truly a full-stack developer in every sense!",
    priority: 3,
  },

  // ── Frontend specific ──
  {
    keywords: ["frontend", "front-end", "front end", "html", "css", "react", "vue", "tailwind", "bootstrap", "ui", "ux", "design", "interface"],
    response: "On the frontend side, Harold works with HTML5, CSS3, JavaScript, TypeScript, React, Vue.js, Bootstrap, and Tailwind CSS 🎨. He has a strong eye for UI/UX design and builds responsive, modern interfaces. This very portfolio was built with Vue 3 + TypeScript + Vite + Tailwind CSS v4!",
    priority: 2,
  },

  // ── Backend specific ──
  {
    keywords: ["backend", "back-end", "back end", "server", "node", "nodejs", "php", "laravel", "python", "api"],
    response: "For backend development, Harold works with Node.js, PHP, Laravel, and Python ⚙️. He has experience building REST APIs, server-side logic, and full-stack applications that connect to various databases and cloud services.",
    priority: 2,
  },

  // ── Mobile ──
  {
    keywords: ["mobile", "app", "android", "ios", "flutter", "react native", "kotlin", "smartphone"],
    response: "Harold specializes in mobile development! 📱 He works with Flutter, React Native, Kotlin, and Java. His BSIT degree at National University has a major in Mobile & Web Applications, so mobile dev is a core strength of his.",
    priority: 2,
  },

  // ── Projects ──
  {
    keywords: ["project", "projects", "work", "portfolio", "built", "created", "developed", "made"],
    response: "Harold has built some amazing projects! 🚀\n\n1️⃣ Endsofttech Web Solutions — Modern company website (endsofttech.com)\n2️⃣ Vet Assist App — Veterinary management system\n3️⃣ Vet Assist Web — Product landing page (staging.vetassist.app)\n4️⃣ Lexia — Gamified dyslexia learning platform using Godot (lexiadyslexia.web.app) 🎮\n5️⃣ Super Admin Lexia — Admin dashboard with React + Firebase\n6️⃣ Resumay Tailor Swift — AI-powered resume builder\n7️⃣ Cashier POS System — Java-based point of sale\n8️⃣ CodeLens — AI code analysis tool\n9️⃣ StudyRoom — Collaborative study workspace\n\nWant to know more about any specific project?",
    priority: 3,
  },

  // ── Lexia / Capstone ──
  {
    keywords: ["lexia", "capstone", "dyslexia", "godot", "game", "learning platform", "thesis"],
    response: "Lexia is Harold's capstone project — a gamified learning platform designed for children with dyslexia! 🎮✨ It's built with Godot Engine using GDScript and integrates Text-to-Speech, Speech-to-Text, and OCR technologies via Google Cloud. It creates an engaging and supportive learning environment for kids. You can check it out at lexiadyslexia.web.app or the code at github.com/arownz/godotcaps!",
    priority: 4,
  },

  // ── Vet Assist ──
  {
    keywords: ["vet", "veterinary", "vetassist", "vet assist", "endsofttech"],
    response: "Harold worked on the Vet Assist App during his internship at Endsofttech Web Solutions! 🐾 It's a veterinary management system where he contributed to production web app enhancements, debugging, UI/UX design, and quality assurance. He also built the Vet Assist landing website (staging.vetassist.app) and the Endsofttech company website (endsofttech.com).",
    priority: 4,
  },

  // ── Resume Tailor ──
  {
    keywords: ["resume", "tailor", "resumay", "ai resume", "resume builder"],
    response: "Resumay Tailor Swift is Harold's AI-powered resume builder prototype! 📄✨ It helps users modify their resumes quickly using customizable templates and real-time suggestions. Built with React, JavaScript, Tailwind CSS, and Hugging Face AI. Check it out at github.com/arownz/resume_tailor_ai!",
    priority: 4,
  },

  // ── Education ──
  {
    keywords: ["education", "school", "university", "college", "degree", "study", "student", "graduate", "graduated", "bsit", "course", "major"],
    response: "Harold's education journey 🎓:\n\n📚 Junior to Senior High School (2017–2022)\nUniversity of Perpetual Help System Dalta – Molino\nSpecialized in Information and Communication Technology (ICT)\n\n🎓 Bachelor of Science in Information Technology (2022–2026)\nNational University – Dasmariñas, Cavite\nMajor: Mobile and Web Applications\nFocus: Full-stack development, software engineering, and real-world projects",
    priority: 3,
  },

  // ── Work Experience ──
  {
    keywords: ["experience", "work", "job", "internship", "intern", "career", "employment", "professional", "company"],
    response: "Harold has valuable professional experience! 💼\n\n1️⃣ Office / Student Assistant (Aug 2024 – Feb 2025)\n📍 MSQ Business Services, Inc. · Bacoor, Cavite\n— Data encoding, digital record management, IT troubleshooting, compliance workflows\n\n2️⃣ Full-Stack Developer & QA Intern (Nov 2025 – Apr 2026)\n📍 Endsofttech Web Solutions · Las Piñas, NCR\n— Enhanced veterinary management systems, production debugging, web design, QA testing\n— Key project: Vet Assist App",
    priority: 3,
  },

  // ── Certifications ──
  {
    keywords: ["certification", "certifications", "certified", "certificate", "certiport", "tesda", "credential", "credentials", "badge"],
    response: "Harold holds several certifications! 🏆\n\n📜 Certiport (Pearson VUE):\n• IT Specialist – HTML & CSS (700 Passing Points)\n• PMI – Project Management Ready®\n\n📜 TESDA:\n• Install and Configure Computer Systems\n• Maintain Computer Systems and Networks\n• Set-up Computer Networks\n• Set-up Computer Servers\n• Introduction to Cascading Style Sheets",
    priority: 3,
  },

  // ── Contact ──
  {
    keywords: ["contact", "reach", "email", "phone", "message", "hire", "connect", "get in touch", "talk", "call"],
    response: "You can reach Harold through several channels! 📬\n\n📧 Email: pasionharold252002@gmail.com\n📱 Phone: +63 992 465 8229 (Primary) | +63 949 478 1634 (Secondary)\n🔗 LinkedIn: linkedin.com/in/harold-pasion-017a131b8\n💻 GitHub: github.com/arownz\n\nOr just scroll down to the Contact section on this page and send him a message directly! 😊",
    priority: 3,
  },

  // ── Location ──
  {
    keywords: ["location", "where", "based", "live", "city", "country", "address", "from"],
    response: "Harold is based in Bacoor, Cavite, Philippines 🇵🇭. He studied at National University in Dasmariñas, Cavite, and has worked at companies in Bacoor and Las Piñas.",
    priority: 2,
  },

  // ── GitHub ──
  {
    keywords: ["github", "repository", "repo", "repos", "code", "open source", "source code"],
    response: "You can find Harold's code on GitHub at github.com/arownz 💻. Some notable repos include:\n\n• godotcaps — Lexia dyslexia learning platform\n• admin_panel — Super Admin Lexia dashboard\n• resume_tailor_ai — AI resume builder\n• Cashier-POS-java — Java POS system\n\nFeel free to check them out and ⭐ any projects you like!",
    priority: 3,
  },

  // ── This website / Portfolio ──
  {
    keywords: ["website", "portfolio", "site", "this page", "this site", "how was this built", "what is this built with"],
    response: "This portfolio website was built by Harold using Vue 3 + TypeScript + Vite + Tailwind CSS v4 🌐. It's deployed on Netlify and features smooth animations, dark/light theme support, and responsive design. Pretty sleek, right? ✨",
    priority: 3,
  },

  // ── AI / ML ──
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "chatgpt", "claude", "gemini", "deepseek", "hugging face", "mcp"],
    response: "Harold is an AI enthusiast! 🤖 He works with various AI tools and platforms including MCP (Model Context Protocol), ChatGPT, Claude, Gemini, DeepSeek, and Hugging Face. He's built AI-powered projects like Resumay Tailor Swift (AI resume builder) and CodeLens (AI code analysis tool). The Lexia capstone also integrates Google Cloud AI services for TTS, STT, and OCR!",
    priority: 3,
  },

  // ── Cloud / DevOps ──
  {
    keywords: ["cloud", "devops", "deploy", "deployment", "hosting", "docker", "aws", "google cloud", "netlify", "vercel"],
    response: "Harold has experience with major cloud platforms! ☁️ He works with Google Cloud, AWS, Netlify, Vercel, and Docker for deployment and DevOps. His projects have been deployed across platforms like Netlify (this portfolio), Firebase (Lexia), and Vercel (StudyRoom).",
    priority: 2,
  },

  // ── Database ──
  {
    keywords: ["database", "db", "firebase", "supabase", "postgresql", "mysql", "mariadb", "nosql", "sql", "data"],
    response: "For databases, Harold works with both SQL and NoSQL solutions! 🗄️\n\n• Firebase / NoSQL — Real-time data, used in Lexia\n• Supabase / PostgreSQL — Open-source alternative to Firebase\n• MySQL / MySQL Workbench — Traditional relational databases\n• XAMPP / MariaDB — Local development stack",
    priority: 2,
  },

  // ── Availability / Hire ──
  {
    keywords: ["available", "hire", "hiring", "freelance", "open to work", "looking for", "opportunity", "opportunities", "job offer", "collaborate"],
    response: "Harold is a fresh BSIT graduate (2026) and is open to exciting opportunities! 🚀 Whether it's full-time roles, internships, or collaborative projects, feel free to reach out at pasionharold252002@gmail.com or connect with him on LinkedIn. He'd love to hear from you! 😊",
    priority: 3,
  },

  // ── Thank you / Bye ──
  {
    keywords: ["thank", "thanks", "bye", "goodbye", "see you", "later", "appreciate", "helpful"],
    response: [
      "You're welcome! 😊 Feel free to come back anytime. Don't forget to check out Harold's projects and reach out if you'd like to connect!",
      "Glad I could help! ✨ If you have more questions later, I'll be right here. Have a great day!",
      "Thanks for visiting Harold's portfolio! 🙌 Don't hesitate to reach out to him directly if you'd like to collaborate or chat. Take care!",
    ],
    priority: 1,
  },

  // ── POS / Java ──
  {
    keywords: ["pos", "point of sale", "cashier", "java"],
    response: "The Cashier POS System is one of Harold's earlier projects — a standalone Point of Sale system built with Java GUI in NetBeans ☕. It manages menu sales transactions for cashiers. You can check the code at github.com/arownz/Cashier-POS-java!",
    priority: 4,
  },

  // ── StudyRoom ──
  {
    keywords: ["studyroom", "study room", "collaborative", "study workspace"],
    response: "StudyRoom is a collaborative study workspace prototype! 📖 It lets students create virtual study rooms, share resources, and communicate in real-time. Built with React, TypeScript, Node.js, PostgreSQL, and Socket.io. Check it out at github.com/arownz/study-room!",
    priority: 4,
  },

  // ── CodeLens ──
  {
    keywords: ["codelens", "code lens", "code analysis", "code review"],
    response: "CodeLens is Harold's AI-powered code analysis tool! 🔍 It provides suggestions for code improvements, simplifying the code review process. Built with Base44, Tailwind CSS, and JavaScript. You can try the demo at stimulating-code-lens-flow.base44.app!",
    priority: 4,
  },

  // ── Networking ──
  {
    keywords: ["network", "networking", "cisco", "packet tracer", "wireshark"],
    response: "Harold has networking skills too! 🌐 He's proficient with Cisco Packet Tracer for network simulation and Wireshark for protocol analysis. He also holds TESDA certifications in Setting Up Computer Networks and Servers.",
    priority: 2,
  },

  // ── Game Development ──
  {
    keywords: ["game", "gamedev", "game development", "unity", "godot"],
    response: "Harold has game development experience! 🎮 He works with both Unity (C#) and Godot (GDScript). His capstone project Lexia was built entirely in Godot Engine — a gamified learning platform for dyslexic children with Google Cloud AI integrations!",
    priority: 3,
  },
];

// ─── Smart Matching Engine ───────────────────────────────────────
const normalize = (text: string): string => text.toLowerCase().replace(/[^\w\s]/g, "").trim();

// Common filler words to ignore in matching
const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "i", "me", "my", "mine", "we", "our", "ours", "you", "your", "yours",
  "he", "him", "his", "she", "her", "hers", "it", "its", "they", "them",
  "their", "theirs", "what", "which", "who", "whom", "this", "that",
  "these", "those", "am", "in", "on", "at", "to", "for", "of", "with",
  "and", "but", "or", "not", "no", "so", "if", "then", "than", "too",
  "very", "just", "about", "above", "after", "again", "all", "also",
  "any", "because", "before", "between", "both", "by", "each", "few",
  "from", "get", "got", "how", "into", "more", "most", "much", "must",
  "new", "now", "only", "other", "out", "over", "own", "same", "some",
  "still", "such", "tell", "me", "know", "please", "want", "like",
  "let", "show", "give", "see", "say", "go", "going", "make",
]);

const getContentWords = (text: string): string[] => {
  return normalize(text)
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
};

const findBestResponse = (input: string): string => {
  const normalizedInput = normalize(input);
  const inputWords = getContentWords(input);

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;

    for (const keyword of entry.keywords) {
      const normalizedKeyword = normalize(keyword);

      // Exact multi-word phrase match (highest weight)
      if (normalizedKeyword.includes(" ") && normalizedInput.includes(normalizedKeyword)) {
        score += 20 + normalizedKeyword.split(/\s+/).length * 5;
      }
      // Exact single-word keyword match
      else if (!normalizedKeyword.includes(" ") && inputWords.includes(normalizedKeyword)) {
        score += 12;
      }
      // Partial word match (e.g., "skills" matches "skill")
      else if (normalizedKeyword.length >= 4) {
        for (const w of inputWords) {
          if (w.length >= 3 && (w.startsWith(normalizedKeyword.slice(0, -1)) || normalizedKeyword.startsWith(w.slice(0, -1)))) {
            score += 6;
          }
        }
      }
    }

    // Apply priority boost
    if (score > 0 && entry.priority) {
      score += entry.priority;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Minimum threshold to avoid random matches
  if (bestMatch && bestScore >= 6) {
    const response = bestMatch.response;
    return Array.isArray(response) ? pickRandom(response) : response;
  }

  // Fallback response
  const fallbacks = [
    "Hmm, I'm not sure about that one! 🤔 I can tell you about Harold's skills, projects, education, work experience, certifications, or how to contact him. What would you like to know?",
    "That's a great question, but it's a bit outside my expertise! 😅 Try asking me about Harold's tech stack, projects, education, or work experience instead!",
    "I don't have specific info on that, but I know a lot about Harold! 💡 Ask me about his projects, skills, certifications, or how to get in touch with him.",
  ];
  return pickRandom(fallbacks);
};

// ─── Send Message ────────────────────────────────────────────────
const sendMessage = async (text?: string) => {
  const content = text || userInput.value.trim();
  if (!content || isTyping.value) return;

  // Add user message
  messages.value.push({
    id: ++messageId,
    role: "user",
    content,
  });
  userInput.value = "";
  isTyping.value = true;

  await nextTick();
  scrollToBottom();

  // Simulate thinking delay (300–800ms for realism)
  const thinkingDelay = 300 + Math.random() * 500;
  await new Promise((resolve) => setTimeout(resolve, thinkingDelay));

  // Get response from knowledge base
  const botText = findBestResponse(content);

  // Add bot message with typing animation
  const botMsg: ChatMessage = {
    id: ++messageId,
    role: "assistant",
    content: botText,
    displayedContent: "",
    isTyping: true,
  };
  messages.value.push(botMsg);

  await nextTick();
  scrollToBottom();

  // Animate typing
  await typeMessage(botMsg);
  isTyping.value = false;
};

// ─── Typing animation ───────────────────────────────────────────
let typingTimer: ReturnType<typeof setTimeout> | null = null;

const typeMessage = (msg: ChatMessage): Promise<void> => {
  return new Promise((resolve) => {
    let i = 0;
    const text = msg.content;
    const tick = () => {
      if (i < text.length) {
        // Type in chunks for speed (3 chars at a time)
        const chunk = Math.min(3, text.length - i);
        msg.displayedContent = text.substring(0, i + chunk);
        i += chunk;
        scrollToBottom();
        typingTimer = setTimeout(tick, 16);
      } else {
        msg.isTyping = false;
        msg.displayedContent = msg.content;
        scrollToBottom();
        resolve();
      }
    };
    tick();
  });
};

// ─── Helpers ─────────────────────────────────────────────────────
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    hasBeenOpened.value = true;
    nextTick(() => {
      inputRef.value?.focus();
      scrollToBottom();
    });
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

const suggestedChips = [
  "What are Harold's skills?",
  "Tell me about his projects",
  "How to contact Harold?",
  "What's his work experience?",
];

// Show FAB after a brief delay for entrance animation
const checkScroll = () => {
  isVisible.value = true;
};

onMounted(() => {
  // Show immediately but with animation
  setTimeout(() => {
    isVisible.value = true;
  }, 1000);
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
  window.removeEventListener("scroll", checkScroll);
});

// Auto-focus input when chat opens
watch(isOpen, (val) => {
  if (val) {
    nextTick(() => inputRef.value?.focus());
  }
});
</script>

<template>
  <Teleport to="body">
    <!-- Floating Action Button -->
    <button
      v-show="isVisible"
      @click="toggleChat"
      :class="[
        'chatbot-fab',
        { 'chatbot-fab--open': isOpen },
      ]"
      :aria-label="isOpen ? 'Close chat' : 'Open AI assistant'"
      id="chatbot-fab"
    >
      <Transition name="fab-icon" mode="out-in">
        <img src="/src/assets/Copilot_20251021_112431.webp" class=" object-contain rounded-full w-11" v-if="!isOpen" key="open">
        <X v-else :size="26" key="close" />
      </Transition>

      <!-- Notification dot when never opened -->
      <span v-if="!hasBeenOpened && !isOpen" class="chatbot-fab__dot" />
    </button>

    <!-- Chat Panel -->
    <Transition name="chat-panel">
      <div v-if="isOpen" class="chatbot-panel" id="chatbot-panel">
        <!-- Header -->
        <div class="chatbot-panel__header">
          <div class="chatbot-panel__header-info">
            <div class="chatbot-panel__avatar">
              <img class="w-auto h-[34px] object-contain rounded-full" src="/src/assets/Copilot_20251021_112431.webp" alt="" />
            </div>
            <div>
              <h3 class="chatbot-panel__title">Harold's Bot</h3>
              <p class="chatbot-panel__subtitle">
                Portfolio Assistant
              </p>
            </div>
          </div>
          <button
            @click="toggleChat"
            class="chatbot-panel__close"
            aria-label="Close chat"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-panel__messages" ref="messagesContainer">
          <!-- Welcome message -->
          <div v-if="messages.length === 0" class="chatbot-panel__welcome">
            <div class="chatbot-panel__welcome-icon">
              <img class="w-[53px] h-[53px] object-contain rounded-full" src="/src/assets/Copilot_20251021_112431.webp" alt="" />
            </div>
            <p>
              I'm Harold's chat assistant. Ask me anything about his skills,
              projects, experience, or how to get in touch!
            </p>

            <!-- Suggested chips -->
            <div class="chatbot-panel__chips">
              <button
                v-for="chip in suggestedChips"
                :key="chip"
                @click="sendMessage(chip)"
                class="chatbot-panel__chip"
              >
                {{ chip }}
              </button>
            </div>
          </div>

          <!-- Message bubbles -->
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="[
              'chatbot-msg',
              msg.role === 'user' ? 'chatbot-msg--user' : 'chatbot-msg--bot',
            ]"
          >
            <div
              v-if="msg.role === 'assistant'"
              class="chatbot-msg__avatar"
            >
              <img class="w-[30px] h-[30px] object-contain rounded-full" src="/src/assets/Copilot_20251021_112431.webp" alt="" />
            </div>
            <div class="chatbot-msg__bubble">
              <template v-if="msg.role === 'assistant'">
                {{ msg.displayedContent || msg.content
                }}<span
                  v-if="msg.isTyping"
                  class="chatbot-msg__cursor"
                  >|</span
                >
              </template>
              <template v-else>
                {{ msg.content }}
              </template>
            </div>
            <div v-if="msg.role === 'user'" class="chatbot-msg__avatar chatbot-msg__avatar--user">
              <User :size="16" />
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping && !messages.some((m) => m.isTyping)" class="chatbot-msg chatbot-msg--bot">
            <div class="chatbot-msg__avatar">
              <img class="w-[23px] h-[23px] object-contain rounded-full" src="/src/assets/Copilot_20251021_112431.webp" alt="" />
            </div>
            <div class="chatbot-msg__bubble chatbot-msg__bubble--typing">
              <span class="typing-dot" />
              <span class="typing-dot" />
              <span class="typing-dot" />
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="chatbot-panel__input-bar">
          <input
            ref="inputRef"
            v-model="userInput"
            @keydown="handleKeydown"
            type="text"
            placeholder="Ask about Harold..."
            :disabled="isTyping"
            class="chatbot-panel__input"
            id="chatbot-input"
            autocomplete="off"
          />
          <button
            @click="sendMessage()"
            :disabled="!userInput.trim() || isTyping"
            class="chatbot-panel__send"
            aria-label="Send message"
          >
            <Send :size="18" />
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ═══════════════════════════════════════
   FLOATING ACTION BUTTON
   ═══════════════════════════════════════ */
.chatbot-fab {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 9998;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  box-shadow:
    0 8px 24px rgba(158, 29, 76, 0.45),
    0 0 0 0 rgba(158, 29, 76, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: chatbot-fab-entrance 0.5s ease backwards,
    chatbot-pulse 3s ease-in-out 2s infinite;
}

.chatbot-fab:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 12px 32px rgba(158, 29, 76, 0.55);
}

.chatbot-fab:active {
  transform: translateY(-2px) scale(1.02);
}

.chatbot-fab--open {
  animation: none;
  background: var(--bg-light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.chatbot-fab--open:hover {
  background: var(--bg-lighter);
}

.chatbot-fab__dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: var(--success);
  border-radius: 50%;
  border: 2.5px solid var(--bg-darker);
  animation: chatbot-dot-pulse 2s ease-in-out infinite;
}

@keyframes chatbot-fab-entrance {
  from {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes chatbot-pulse {
  0%,
  100% {
    box-shadow:
      0 8px 24px rgba(158, 29, 76, 0.45),
      0 0 0 0 rgba(158, 29, 76, 0.4);
  }
  50% {
    box-shadow:
      0 8px 24px rgba(158, 29, 76, 0.45),
      0 0 0 12px rgba(158, 29, 76, 0);
  }
}

@keyframes chatbot-dot-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

/* FAB icon transition */
.fab-icon-enter-active,
.fab-icon-leave-active {
  transition: all 0.2s ease;
}
.fab-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}
.fab-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

/* ═══════════════════════════════════════
   CHAT PANEL
   ═══════════════════════════════════════ */
.chatbot-panel {
  position: fixed;
  bottom: 6rem;
  left: 2rem;
  z-index: 9999;
  width: 400px;
  max-height: 560px;
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  overflow: hidden;
  background: rgba(28, 16, 24, 0.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(158, 29, 76, 0.25);
  box-shadow:
    0 32px 64px -12px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(158, 29, 76, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .chatbot-panel {
  background: rgba(255, 250, 251, 0.92);
  border: 1px solid rgba(158, 29, 76, 0.15);
  box-shadow:
    0 32px 64px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(158, 29, 76, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Panel transition */
.chat-panel-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.chat-panel-leave-active {
  transition: all 0.2s ease-in;
}
.chat-panel-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.92);
}
.chat-panel-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}

/* ─── Header ─── */
.chatbot-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, rgba(158, 29, 76, 0.15), rgba(184, 77, 122, 0.08));
  border-bottom: 1px solid rgba(158, 29, 76, 0.15);
  position: relative;
}

.chatbot-panel__header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
}

.chatbot-panel__header-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chatbot-panel__avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.chatbot-panel__title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.chatbot-panel__subtitle {
  margin: 0;
  font-size: 0.72rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.15rem;
}

.chatbot-panel__close {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.chatbot-panel__close:hover {
  background: rgba(158, 29, 76, 0.2);
  color: var(--primary);
}

/* ─── Messages Area ─── */
.chatbot-panel__messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.25rem;
  min-height: 280px;
  max-height: 360px;
  scroll-behavior: smooth;
}

.chatbot-panel__messages::-webkit-scrollbar {
  width: 5px;
}
.chatbot-panel__messages::-webkit-scrollbar-track {
  background: transparent;
}
.chatbot-panel__messages::-webkit-scrollbar-thumb {
  background: var(--bg-lighter);
  border-radius: 3px;
}

/* ─── Welcome ─── */
.chatbot-panel__welcome {
  text-align: center;
  padding: 1.5rem 0.5rem;
}

.chatbot-panel__welcome-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(158, 29, 76, 0.15), rgba(184, 77, 122, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  animation: chatbot-welcome-bounce 1s ease 0.3s;
}

@keyframes chatbot-welcome-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-12px);
  }
  60% {
    transform: translateY(-4px);
  }
}

.chatbot-panel__welcome h4 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.chatbot-panel__welcome p {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

/* ─── Suggested Chips ─── */
.chatbot-panel__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.chatbot-panel__chip {
  padding: 0.45rem 0.85rem;
  border-radius: 2rem;
  border: 1px solid rgba(158, 29, 76, 0.3);
  background: rgba(158, 29, 76, 0.08);
  color: var(--primary-light);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.chatbot-panel__chip:hover {
  background: rgba(158, 29, 76, 0.2);
  border-color: var(--primary);
  transform: translateY(-1px);
}

/* ─── Message Bubbles ─── */
.chatbot-msg {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
  animation: chatbot-msg-in 0.3s ease backwards;
}

@keyframes chatbot-msg-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chatbot-msg--user {
  justify-content: flex-end;
}

.chatbot-msg--bot {
  justify-content: flex-start;
}

.chatbot-msg__avatar {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.chatbot-msg__avatar--user {
  background: var(--bg-lighter);
  color: var(--text-secondary);
}

.chatbot-msg__bubble {
  max-width: 78%;
  padding: 0.7rem 1rem;
  border-radius: 1.1rem;
  font-size: 0.85rem;
  line-height: 1.55;
  word-break: break-word;
  white-space: pre-wrap;
}

.chatbot-msg--user .chatbot-msg__bubble {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-bottom-right-radius: 0.35rem;
}

.chatbot-msg--bot .chatbot-msg__bubble {
  background: var(--bg-light);
  color: var(--text-primary);
  border-bottom-left-radius: 0.35rem;
  border: 1px solid rgba(158, 29, 76, 0.1);
}

[data-theme="light"] .chatbot-msg--bot .chatbot-msg__bubble {
  background: var(--bg-light);
  border: 1px solid var(--border-light);
}

.chatbot-msg__cursor {
  display: inline-block;
  color: var(--primary);
  font-weight: 700;
  animation: chatbot-cursor-blink 0.8s steps(1) infinite;
  margin-left: 1px;
}

@keyframes chatbot-cursor-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* ─── Typing Dots ─── */
.chatbot-msg__bubble--typing {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.85rem 1.1rem;
}

.typing-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: chatbot-typing-dot 1.4s ease-in-out infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes chatbot-typing-dot {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

/* ─── Input Bar ─── */
.chatbot-panel__input-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  border-top: 1px solid rgba(158, 29, 76, 0.12);
  background: rgba(19, 10, 15, 0.4);
}

[data-theme="light"] .chatbot-panel__input-bar {
  background: rgba(252, 232, 240, 0.5);
}

.chatbot-panel__input {
  flex: 1;
  padding: 0.65rem 0.9rem;
  border-radius: 0.75rem;
  border: 1.5px solid rgba(158, 29, 76, 0.15);
  background: var(--bg-darker);
  color: var(--text-primary);
  font-size: 0.85rem;
  font-family: inherit;
  outline: none;
  transition: all 0.25s ease;
}

.chatbot-panel__input::placeholder {
  color: var(--text-muted);
}

.chatbot-panel__input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(158, 29, 76, 0.12);
}

.chatbot-panel__input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chatbot-panel__send {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.65rem;
  border: none;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.chatbot-panel__send:hover:not(:disabled) {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(158, 29, 76, 0.4);
}

.chatbot-panel__send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ═══════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════ */
@media (max-width: 480px) {
  .chatbot-fab {
    bottom: 1rem;
    left: 1rem;
    width: 3rem;
    height: 3rem;
  }

  .chatbot-panel {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 85vh;
    border-radius: 1.25rem 1.25rem 0 0;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .chatbot-fab {
    bottom: 1.5rem;
    left: 1.5rem;
    width: 3rem;
    height: 3rem;
  }

  .chatbot-panel {
    left: 1.5rem;
    bottom: 5rem;
    width: 360px;
  }
}
</style>
