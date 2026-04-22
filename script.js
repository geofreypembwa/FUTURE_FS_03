const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// General reveal animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Text animation groups
const textGroups = document.querySelectorAll(
  ".hero-text, .about-text, .delivery-text, .location-text, .contact-text, .section-header"
);

const textObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedTexts = entry.target.querySelectorAll(".text-animate");

        animatedTexts.forEach((text, index) => {
          setTimeout(() => {
            text.classList.add("show-text");
          }, index * 140);
        });

        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

textGroups.forEach((group) => textObserver.observe(group));

// WhatsApp form integration
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !message) {
      alert("Please fill in all fields before sending.");
      return;
    }

    const whatsappMessage =
      `Hello Campus Cafeteria,%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Message/Order: ${encodeURIComponent(message)}`;

    const whatsappURL = `https://wa.me/255784228460?text=${whatsappMessage}`;
    window.open(whatsappURL, "_blank");

    contactForm.reset();
  });
}