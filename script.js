const config = window.bioConfig || {};

const socialIcons = {
  whatsapp:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.51 0 .16 5.35.16 11.93c0 2.1.55 4.16 1.6 5.97L.06 24l6.25-1.64a11.94 11.94 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.18-1.24-6.18-3.5-8.42ZM12.09 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.7.97.99-3.61-.23-.37a9.86 9.86 0 1 1 8.35 4.6Zm5.42-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" /></svg>',
  instagram:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25Z" /></svg>',
  location:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.25 6.6 11.93 6.88 12.21a.88.88 0 0 0 1.24 0c.28-.28 6.88-6.96 6.88-12.21A7.5 7.5 0 0 0 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" /></svg>',
  hours:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 1.8a7.7 7.7 0 1 1 0 15.4 7.7 7.7 0 0 1 0-15.4Zm.05 2.65c.5 0 .9.4.9.9v3.82l2.55 1.52a.9.9 0 0 1-.92 1.55l-2.99-1.78a.9.9 0 0 1-.44-.77V7.85c0-.5.4-.9.9-.9Z" /></svg>',
};

const isValidLink = (url) => typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
const isInfoCard = (link) => link && link.tipo === "hours";

const setText = (selector, value) => {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value || "";
  }
};

const createServiceCard = (service) => {
  const article = document.createElement("article");
  const number = document.createElement("span");
  const content = document.createElement("div");
  const title = document.createElement("h2");
  const description = document.createElement("p");

  article.className = "service-card reveal-card";
  number.className = "service-number";
  number.textContent = service.numero || "";
  title.textContent = service.titulo || "";
  description.textContent = service.descricao || "";

  content.append(title, description);
  article.append(number, content);

  return article;
};

const createStoreCard = (store) => {
  const hasRoute = isValidLink(store.rota);
  const article = document.createElement(hasRoute ? "a" : "article");
  const heading = document.createElement("div");
  const title = document.createElement("h2");
  const address = document.createElement("p");
  const hours = document.createElement("div");
  const cue = document.createElement("span");
  const schedules = Array.isArray(store.horarios) ? store.horarios : [];

  article.className = "store-card reveal-card";
  heading.className = "store-heading";
  address.className = "store-address";
  hours.className = "store-hours";
  cue.className = "store-route-cue";

  if (hasRoute) {
    article.href = store.rota;
    article.target = "_blank";
    article.rel = "noopener noreferrer";
    article.setAttribute("aria-label", `Abrir rota para ${store.titulo || "loja"} no Google Maps`);
  }

  heading.innerHTML = socialIcons.location || "";
  title.textContent = store.titulo || "";
  heading.appendChild(title);

  address.textContent = store.endereco || "";

  hours.innerHTML = socialIcons.hours || "";
  schedules.forEach((schedule) => {
    const line = document.createElement("span");
    line.textContent = schedule;
    hours.appendChild(line);
  });

  cue.textContent = "Toque para abrir a rota";

  article.append(heading, address, hours, cue);

  return article;
};

const createSocialCard = (link) => {
  const type = link.tipo || "link";
  const isInfo = isInfoCard(link) && !isValidLink(link.url);
  const anchor = document.createElement(isInfo ? "div" : "a");
  const icon = socialIcons[type] || "";
  const label = document.createElement("span");
  const strong = document.createElement("strong");

  anchor.className = `main-button ${type} reveal-card`;

  if (isInfo) {
    anchor.setAttribute("role", "group");
    anchor.setAttribute("aria-label", `${link.nome || "Informação"}: ${link.destaque || ""}`);
  } else {
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.setAttribute(
      "aria-label",
      `Abrir ${link.nome || "link"} de ${config.nome || "MA BRAND"} em uma nova aba`,
    );
  }

  label.innerHTML = icon;
  label.append(document.createTextNode(link.nome || "Link"));
  strong.textContent = link.destaque || "Abrir";

  anchor.append(label, strong);

  return anchor;
};

const renderProfile = () => {
  document.title = `${config.nome || "MA BRAND"} | Bio Oficial`;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && config.descricao) {
    metaDescription.setAttribute("content", config.descricao);
  }

  setText("#profile-name", config.nome);
  setText("#profile-description", config.descricao);

  const photo = document.querySelector("#profile-photo");
  if (photo && config.foto && config.foto.src) {
    photo.src = config.foto.src;
    photo.alt = config.foto.alt || `Logo de ${config.nome || "MA BRAND"}`;
  }

  const status = document.querySelector("#profile-status");
  const statusText = document.querySelector("[data-status-text]");
  if (status && statusText) {
    if (config.status) {
      statusText.textContent = config.status;
    } else {
      status.hidden = true;
    }
  }
};

const renderHeroActions = () => {
  const whatsappButton = document.querySelector("[data-hero-whatsapp]");
  const scrollButton = document.querySelector("[data-scroll-stores]");
  const whatsappLink = config.ctaFinal?.linkPrincipal;

  if (whatsappButton) {
    if (isValidLink(whatsappLink)) {
      whatsappButton.href = whatsappLink;
      whatsappButton.textContent = "Falar com a MA BRAND";
      whatsappButton.setAttribute("aria-label", `Falar com ${config.nome || "MA BRAND"} pelo WhatsApp`);
    } else {
      whatsappButton.hidden = true;
    }
  }

  if (scrollButton) {
    scrollButton.addEventListener("click", () => {
      const storesSection = document.querySelector(".stores-section");
      if (storesSection) {
        storesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
};

const renderServices = () => {
  const servicesGrid = document.querySelector("#services-grid");
  const services = Array.isArray(config.servicos) ? config.servicos : [];

  if (!servicesGrid || services.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();
  services.forEach((service) => fragment.appendChild(createServiceCard(service)));
  servicesGrid.appendChild(fragment);
};

const renderSocialLinks = () => {
  const socialLinks = document.querySelector("#social-links");
  const links = Array.isArray(config.linksSociais) ? config.linksSociais : [];
  const validLinks = links.filter((link) => link && (isValidLink(link.url) || isInfoCard(link)));

  if (!socialLinks || validLinks.length === 0) {
    if (socialLinks) {
      socialLinks.hidden = true;
    }
    return;
  }

  const fragment = document.createDocumentFragment();
  validLinks.forEach((link) => fragment.appendChild(createSocialCard(link)));
  socialLinks.appendChild(fragment);
};

const renderStores = () => {
  const storesGrid = document.querySelector("#stores-grid");
  const stores = Array.isArray(config.lojas) ? config.lojas : [];

  if (!storesGrid || stores.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();
  stores.forEach((store) => fragment.appendChild(createStoreCard(store)));
  storesGrid.appendChild(fragment);
};

const renderFinalCta = () => {
  const finalCta = document.querySelector("#final-cta");
  const ctaText = document.querySelector("[data-cta-text]");
  const ctaButton = document.querySelector("[data-cta-button]");
  const cta = config.ctaFinal || {};
  const hasButton = ctaButton && isValidLink(cta.linkPrincipal);

  if (!finalCta) {
    return;
  }

  if (!cta.texto && !hasButton) {
    finalCta.hidden = true;
    return;
  }

  if (ctaText) {
    ctaText.textContent = cta.texto || "";
    ctaText.hidden = !cta.texto;
  }

  if (ctaButton) {
    if (hasButton) {
      ctaButton.href = cta.linkPrincipal;
      ctaButton.textContent = cta.botao || "Falar agora";
      ctaButton.setAttribute("aria-label", `${cta.botao || "Falar agora"} com ${config.nome || "MA BRAND"}`);
    } else {
      ctaButton.hidden = true;
    }
  }
};

const setupRevealAnimation = () => {
  const revealItems = document.querySelectorAll(".reveal, .reveal-card");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealOnScroll.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    },
  );

  revealItems.forEach((item) => revealOnScroll.observe(item));
};

const setupTouchFeedback = () => {
  const interactiveLinks = document.querySelectorAll(".hero-button, .main-button, .cta-button, .store-card");

  interactiveLinks.forEach((link) => {
    link.addEventListener("pointerdown", () => {
      link.classList.add("is-pressing");
    });

    link.addEventListener("pointerup", () => {
      link.classList.remove("is-pressing");
    });

    link.addEventListener("pointerleave", () => {
      link.classList.remove("is-pressing");
    });
  });
};

renderProfile();
renderHeroActions();
renderServices();
renderStores();
renderSocialLinks();
renderFinalCta();
setupRevealAnimation();
setupTouchFeedback();
