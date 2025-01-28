// app.js
class App {
  static navigation;
  static currentSection = "main";

  static init() {
    this.navigation = new Navigation();
    this.showMainMenu();
    this.setupEventListeners();
  }

  static showMainMenu() {
    const content = document.getElementById("content");
    content.innerHTML = this.generateMenu();
    this.navigation.updateMenuItems();
    this.updateStatusBar("Main Menu");
  }

  static generateMenu() {
    return `
            <div class="menu-container">
                ${MENU_DATA.main.items
                  .map(
                    (item, index) => `
                    <div class="menu-item" data-id="${item.id}">
                        <div class="menu-icon">${item.icon}</div>
                        <div class="menu-content">
                            <div class="menu-text">${item.text}</div>
                            <div class="menu-hint">${item.hrNote}</div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
                
            </div>
        `;
  }

  static async showScreen(screenId) {
    const content = document.getElementById("content");

    // Fade out current content
    content.style.opacity = "0";
    await this.wait(300);

    // Generate new content
    switch (screenId) {
      case "profile":
        content.innerHTML = this.generateProfile();
        break;
      case "projects":
        content.innerHTML = this.generateProjects();
        break;
      case "skills":
        content.innerHTML = this.generateSkills();
        break;
      case "contact":
        content.innerHTML = this.generateContact();
        break;
      default:
        this.showMainMenu();
        break;
    }

    // Fade in new content
    content.style.opacity = "1";
    this.updateStatusBar(screenId);
    this.navigation.updateMenuItems();
  }

  static updateStatusBar(screenId) {
    const title =
      MENU_DATA[screenId]?.title ||
      screenId.charAt(0).toUpperCase() + screenId.slice(1);
    document.querySelector(".status-bar span").textContent = title;
  }

  static setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });

    // Add keyboard navigation support
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.navigation.handleKeyPress("up");
          break;
        case "ArrowDown":
          this.navigation.handleKeyPress("down");
          break;
        case "ArrowLeft":
          this.navigation.handleKeyPress("left");
          break;
        case "ArrowRight":
          this.navigation.handleKeyPress("right");
          break;
        case "Enter":
          this.navigation.handleKeyPress("select");
          break;
        case "Escape":
          this.navigation.handleKeyPress("back");
          break;
      }
    });
  }

  static generateProfil() {
    const profile = MENU_DATA.profile;
    const summary = profile.professionalSummary;

    return `
            <div class="screen-content profile-screen">
                <div class="profile-header">
                    <h2 class="name">${profile.name}</h2>
                    <div class="role">${profile.role}</div>
                    <div class="tagline">${profile.tagline}</div>
                </div>

                <div class="section">
                    <div class="section-title">Professional Overview</div>
                    ${summary.overview
                      .map(
                        (item) => `
                        <div class="summary-item">
                            <span class="bullet">•</span>
                            <span class="text">${item}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>

                <div class="section">
                    <div class="section-title">Key Achievements</div>
                    ${summary.achievements
                      .map(
                        (item) => `
                        <div class="achievement-item">
                            <span class="bullet">✓</span>
                            <span class="text">${item}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>

                <div class="section">
                    <div class="section-title">Current Work</div>
                    <div class="current-role">
                        <div class="role-header">
                            <h3>${summary.currentWork.role}</h3>
                            <span class="period">${
                              summary.currentWork.period
                            }</span>
                        </div>
                        <div class="role-highlights">
                            ${summary.currentWork.highlights
                              .map(
                                (highlight) => `
                                <div class="highlight-item">
                                    <span class="bullet">→</span>
                                    <span class="text">${highlight}</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">Education</div>
                    <div class="education-card">
                        <h3>${summary.education.degree}</h3>
                        <div class="education-details">
                            <div class="institution">${
                              summary.education.institution
                            }</div>
                            <div class="period">${
                              summary.education.period
                            }</div>
                        </div>
                        <div class="specialization">${
                          summary.education.specialization
                        }</div>
                        <div class="achievements">
                            ${summary.education.achievements
                              .map(
                                (achievement) => `
                                <div class="achievement-item">
                                    <span class="bullet">★</span>
                                    <span class="text">${achievement}</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>

                ${
                  summary.certifications.length > 0
                    ? `
                    <div class="section">
                        <div class="section-title">Certifications</div>
                        ${summary.certifications
                          .map(
                            (cert) => `
                            <div class="cert-card">
                                <h3>${cert.name}</h3>
                                <div class="cert-details">
                                    <span class="issuer">${cert.issuer}</span>
                                    <span class="date">${cert.date}</span>
                                </div>
                                <div class="topics">
                                    ${cert.topics
                                      .map(
                                        (topic) => `
                                        <span class="topic-tag">${topic}</span>
                                    `
                                      )
                                      .join("")}
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
            </div>
        `;
  }
  static generateProfile() {
    const profile = MENU_DATA.profile;
    const summary = profile.professionalSummary;

    return `
            <div class="screen-content profile-screen">
                <div class="profile-header">
                    <h2 class="name">${profile.name}</h2>
                    <div class="role">${profile.role}</div>
                    <div class="tagline">${profile.tagline}</div>
                </div>

                <div class="section">
                    <div class="section-title">Professional Profiles</div>
                    <a href="${
                      MENU_DATA.contact.social.github.url
                    }" target="_blank" class="profile-link">
                        <div class="profile-item">
                            <span class="profile-icon">💻</span>
                            <div class="profile-content">
                                <div class="profile-name">GitHub</div>
                                <div class="profile-description">Project repositories • Code samples</div>
                            </div>
                            <span class="arrow">→</span>
                        </div>
                    </a>
                    <a href="${
                      MENU_DATA.contact.social.linkedin.url
                    }" target="_blank" class="profile-link">
                        <div class="profile-item">
                            <span class="profile-icon">💼</span>
                            <div class="profile-content">
                                <div class="profile-name">LinkedIn</div>
                                <div class="profile-description">Professional network • Career updates</div>
                            </div>
                            <span class="arrow">→</span>
                        </div>
                    </a>
                </div>

                <div class="section">
                    <div class="section-title">Professional Overview</div>
                    ${summary.overview
                      .map(
                        (item) => `
                        <div class="summary-item">
                            <span class="bullet">•</span>
                            <span class="text">${item}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
    
                
    
                <div class="section">
                    <div class="section-title">Key Achievements</div>
                    ${summary.achievements
                      .map(
                        (item) => `
                        <div class="achievement-item">
                            <span class="bullet">✓</span>
                            <span class="text">${item}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
    
                <div class="section">
                    <div class="section-title">Current Work</div>
                    <div class="current-role">
                        <div class="role-header">
                            <h3>${summary.currentWork.role}</h3>
                            <span class="period">${
                              summary.currentWork.period
                            }</span>
                        </div>
                        <div class="role-highlights">
                            ${summary.currentWork.highlights
                              .map(
                                (highlight) => `
                                <div class="highlight-item">
                                    <span class="bullet">→</span>
                                    <span class="text">${highlight}</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
    
                <div class="section">
                    <div class="section-title">Education</div>
                    <div class="education-card">
                        <h3>${summary.education.degree}</h3>
                        <div class="education-details">
                            <div class="institution">${
                              summary.education.institution
                            }</div>
                            <div class="period">${
                              summary.education.period
                            }</div>
                        </div>
                        <div class="specialization">${
                          summary.education.specialization
                        }</div>
                        <div class="achievements">
                            ${summary.education.achievements
                              .map(
                                (achievement) => `
                                <div class="achievement-item">
                                    <span class="bullet">★</span>
                                    <span class="text">${achievement}</span>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
    
                ${
                  summary.certifications.length > 0
                    ? `
                    <div class="section">
                        <div class="section-title">Certifications</div>
                        ${summary.certifications
                          .map(
                            (cert) => `
                            <div class="cert-card">
                                <h3>${cert.name}</h3>
                                <div class="cert-details">
                                    <span class="issuer">${cert.issuer}</span>
                                    <span class="date">${cert.date}</span>
                                </div>
                                <div class="topics">
                                    ${cert.topics
                                      .map(
                                        (topic) => `
                                        <span class="topic-tag">${topic}</span>
                                    `
                                      )
                                      .join("")}
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
            </div>
        `;
  }

  static generateProjects() {
    const projects = MENU_DATA.projects.featured;
    return `
            <div class="screen-content projects-screen">
                ${projects
                  .map(
                    (project) => `
                    <div class="nokia-project-card">
                        <div class="project-title">${project.name}</div>
                        <div class="project-type">${project.type}</div>
                        
                        <div class="project-details">
                            <div class="detail-row">
                                <span class="period">${project.timeline}</span>
                                <span class="role">${project.role}</span>
                            </div>
                        </div>
    
                        <div class="metrics">
                            ${project.metrics
                              .map(
                                (metric) => `
                                <div class="metric-item">• ${metric}</div>
                            `
                              )
                              .join("")}
                        </div>
    
                        <div class="tech-stack">
                            ${project.tech
                              .map(
                                (tech) => `
                                <span class="tech-item">${tech}</span>
                            `
                              )
                              .join(" ")}
                        </div>
    
                        ${
                          project.url
                            ? `
                            <div class="project-link">
                                <a href="https://${project.url}" target="_blank">
                                    Select to View Live →
                                </a>
                            </div>
                        `
                            : ""
                        }
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  static generateSkills() {
    const skills = MENU_DATA.skills.technical;
    return `
            <div class="screen-content skills-screen">
                ${Object.entries(skills)
                  .map(
                    ([category, items]) => `
                    <div class="nokia-skills-category">
                        <div class="category-header">
                            ${category.toUpperCase()}
                        </div>
                        
                        ${items
                          .map(
                            (skill) => `
                            <div class="skill-item" onclick="App.showSkillDetails('${
                              skill.name
                            }')">
                                <div class="skill-header">
                                    <span class="skill-name">${
                                      skill.name
                                    }</span>
                                    <span class="skill-level">${this.generateSkillLevel(
                                      skill.level
                                    )}</span>
                                </div>
                                
                                <div class="skill-details">
                                    <div class="projects-info">
                                        ${skill.projects} ${
                              skill.projects === 1 ? "project" : "projects"
                            }
                                    </div>
                                    <div class="skill-focus">${
                                      skill.focus
                                    }</div>
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  static generateSkillLevel(level) {
    return `<span class="skill-dots">
            ${"●".repeat(level)}${"○".repeat(5 - level)}
        </span>`;
  }

  static generateContact() {
    const contact = MENU_DATA.contact;
    return `
            <div class="screen-content contact-screen">
                <div class="nokia-contact-section">
                    <div class="section-header">
                        Professional Contact
                    </div>
                    
                    <div class="contact-items">
                        <div class="contact-item" onclick="App.copyToClipboard('${contact.professional.email}')">
                            <div class="contact-icon">✉️</div>
                            <div class="contact-info">
                                <div class="contact-label">Email</div>
                                <div class="contact-value monospace">
                                    ${contact.professional.email}
                                </div>
                                <div class="copy-hint">Click to copy</div>
                            </div>
                        </div>
    
                        <div class="contact-item" onclick="App.copyToClipboard('${contact.professional.phone}')">
                            <div class="contact-icon">📱</div>
                            <div class="contact-info">
                                <div class="contact-label">Phone</div>
                                <div class="contact-value monospace">
                                    ${contact.professional.phone}
                                </div>
                                <div class="copy-hint">Click to copy</div>
                            </div>
                        </div>
    
                        <div class="contact-item">
                            <div class="contact-icon">📍</div>
                            <div class="contact-info">
                                <div class="contact-label">Location</div>
                                <div class="contact-value">
                                    ${contact.professional.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                
    
                <div class="nokia-contact-section">
                    
                    
                    
                </div>
            </div>
        `;
  }

  static showProjectDetails(projectIndex) {
    const project = MENU_DATA.projects.featured[projectIndex];
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${project.name}</h3>
                    <button onclick="App.closeModal()" class="close-button">×</button>
                </div>
                <div class="modal-body">
                    <div class="project-timeline">${project.timeline}</div>
                    <div class="project-role">${project.role}</div>
                    
                    <div class="section">
                        <h4>Key Responsibilities</h4>
                        <ul>
                            ${project.responsibilities
                              .map(
                                (resp) => `
                                <li>${resp}</li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>

                    <div class="section">
                        <h4>Impact</h4>
                        <div class="metrics-grid">
                            ${project.metrics
                              .map(
                                (metric) => `
                                <div class="metric-item">${metric}</div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>

                    ${
                      project.url
                        ? `
                        <div class="project-actions">
                            <a href="https://${project.url}" target="_blank" class="action-button">
                                View Live Project
                            </a>
                        </div>
                    `
                        : ""
                    }
                </div>
            </div>
        `;
    document.body.appendChild(modal);
  }

  static showSkillDetails(skillName) {
    let skillDetails = null;
    Object.values(MENU_DATA.skills.technical).forEach((category) => {
      const skill = category.find((s) => s.name === skillName);
      if (skill) skillDetails = skill;
    });

    if (!skillDetails) return;
    this.showNotification(`${skillName}: ${skillDetails.focus}`);
  }

  static async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showNotification("Copied to clipboard!");
    } catch (err) {
      this.showNotification("Failed to copy");
    }
  }

  static showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    const container =
      document.querySelector(".notification-container") ||
      document.createElement("div");

    if (!document.querySelector(".notification-container")) {
      container.className = "notification-container";
      document.body.appendChild(container);
    }

    container.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  static closeModal() {
    const modal = document.querySelector(".modal-overlay");
    if (modal) {
      modal.classList.add("modal-closing");
      setTimeout(() => modal.remove(), 300);
    }
  }

  static updateStatusBar(screenId) {
    const title =
      MENU_DATA[screenId]?.title ||
      screenId.charAt(0).toUpperCase() + screenId.slice(1);
    document.querySelector(".status-bar span").textContent = title;
  }

  static generateSkillLevel(level) {
    return "●".repeat(level) + "○".repeat(5 - level);
  }

  static wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeModal();
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
