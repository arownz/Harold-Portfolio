<script setup lang="ts">
import { Code2, Palette, Database } from "lucide-vue-next";
</script>

<template>
  <section id="about" class="about">
    <div class="container">
      <h2 class="section-title fade-in">About Me</h2>

      <div class="about-intro fade-in">
        <div class="intro-content">
          <div class="about-image">
            <img
              src="/harold_profile.png"
              alt="Harold F. Pasion"
              class="profile-img"
            />
          </div>

          <div class="intro-text">
            <p class="lead">
              I'm an Information Technology student at National University -
              Dasmariñas, specializing in Mobile and Web App Development.
            </p>

            <p>
              My passion lies in creating user-centric solutions that make
              technology more accessible to everyone. I led the development of
              <strong>Lexia</strong>, a gamified learning platform designed
              specifically for children with dyslexia, which taught me the
              importance of accessibility-first design.
            </p>

            <p>
              With experience in both frontend and backend development, I enjoy
              building full-stack applications that solve real-world problems.
              I'm constantly learning new technologies and best practices to
              improve my craft.
            </p>

            <p>
              I love exploring various tech stacks to adapt to ever-changing
              technologies and deliver innovative solutions.
            </p>
          </div>
        </div>
      </div>

      <div class="about-highlights fade-in">
        <div class="highlight-item">
          <Code2 :size="32" class="highlight-icon" />
          <div>
            <h3>Clean Code</h3>
            <p>Writing maintainable, scalable code following best practices</p>
          </div>
        </div>

        <div class="highlight-item">
          <Palette :size="32" class="highlight-icon" />
          <div>
            <h3>UI/UX Design</h3>
            <p>Creating intuitive and functional user experiences</p>
          </div>
        </div>

        <div class="highlight-item">
          <Database :size="32" class="highlight-icon" />
          <div>
            <h3>Full Stack</h3>
            <p>End-to-end development from database to user interface</p>
          </div>
        </div>
      </div>

      <div class="about-timeline fade-in">
        <h3 class="timeline-title">Education Background</h3>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-period">2022 - 2026</div>
              <h4>Bachelor of Science in Information Technology</h4>
              <p class="timeline-location">National University - Dasmariñas</p>
              <p class="timeline-description">
                Major in Mobile and Web Application Development. Focused on
                full-stack development, mobile technologies, and software
                engineering principles.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-period">2020 - 2022</div>
              <h4>
                Senior High School - Information Communication Technologies
              </h4>
              <p class="timeline-location">
                University of Perpetual Help System Dalta - Molino
              </p>
              <p class="timeline-description">
                Specialized in Information and Communications Technology,
                building foundational skills in programming and web
                development.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="about-timeline fade-in">
        <h3 class="timeline-title">Work Experience</h3>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-period">August 2024 - February 2025</div>
              <h4>Office Assistant</h4>
              <p class="timeline-location">MSQ Business Services, Inc</p>
              <p class="timeline-description">
                Provided administrative support and assisted with various office
                operations, developing professional communication and
                organizational skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="about-credentials fade-in">
        <div class="credential-card">
          <h3>Certification</h3>
          <div class="credential-content">
            <div class="cert-image-container">
              <img
                src="/html-css_cert.png"
                alt="IT Specialist HTML & CSS Certification"
                class="cert-image"
              />
            </div>
            <p class="credential-title">IT Specialist - HTML & CSS</p>
            <p class="credential-issuer">Certiport</p>
            <div class="credential-badge">
              <span class="badge-icon">✓</span>
              <span class="badge-text">Scored over 700</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--bg-dark);
  padding: 6rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-intro {
  margin-bottom: 4rem;
}

.intro-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  align-items: start;
}

.about-image {
  position: relative;
}

.profile-img {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  border: 3px solid var(--primary);
  box-shadow: 0 10px 30px -10px var(--shadow-lg);
  transition: transform 0.3s ease;
}

.profile-img:hover {
  transform: scale(1.05);
}

.intro-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.lead {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.intro-text p {
  margin-bottom: 1.25rem;
}

.about-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.highlight-item {
  display: flex;
  gap: 1rem;
  align-items: start;
}

.highlight-icon {
  color: var(--primary);
  flex-shrink: 0;
}

.highlight-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.highlight-item p {
  color: var(--text-muted);
  margin: 0;
  line-height: 1.6;
}

/* Timeline Styles */
.about-timeline {
  margin-bottom: 4rem;
}

.timeline-title {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: 2.5rem;
  text-align: center;
}

.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding-left: 2rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--primary), var(--secondary));
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  padding-bottom: 3rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 16px;
  height: 16px;
  background: var(--primary);
  border: 3px solid var(--bg-dark);
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--primary-light);
  z-index: 1;
}

.timeline-content {
  background: var(--bg-darker);
  padding: 1.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  margin-left: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(8px);
  border-color: var(--primary);
  box-shadow: 0 8px 24px -8px var(--shadow-lg);
}

.timeline-period {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.375rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.timeline-content h4 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.timeline-location {
  color: var(--primary);
  font-weight: 500;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Credentials Styles */
.about-credentials {
  max-width: 600px;
  margin: 0 auto;
}

.credential-card {
  background: var(--bg-darker);
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid var(--primary);
  box-shadow: 0 10px 30px -10px var(--shadow-lg);
  transition: all 0.3s ease;
}

.credential-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px -10px var(--shadow-lg);
}

.credential-card h3 {
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.credential-content {
  text-align: center;
}

.cert-image-container {
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid var(--border);
  transition: all 0.3s ease;
}

.cert-image-container:hover {
  border-color: var(--primary);
  transform: scale(1.02);
}

.cert-image {
  width: 100%;
  height: auto;
  display: block;
}

.credential-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.credential-issuer {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1rem;
}

.credential-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: 2rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.badge-icon {
  font-size: 1.25rem;
  font-weight: bold;
}

.badge-text {
  font-size: 0.95rem;
}

@media (max-width: 968px) {
  .intro-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-image {
    max-width: 250px;
    margin: 0 auto;
  }

  .about-highlights {
    grid-template-columns: 1fr;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-marker {
    left: -1.5rem;
  }
}

@media (max-width: 768px) {
  .about {
    padding: 4rem 1.5rem;
  }

  .intro-text {
    font-size: 1rem;
  }

  .lead {
    font-size: 1.15rem;
  }

  .highlight-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .timeline-content {
    padding: 1.25rem;
  }

  .timeline-content h4 {
    font-size: 1.1rem;
  }

  .credential-card {
    padding: 1.5rem;
  }

  .credential-title {
    font-size: 1.25rem;
  }
}
</style>
