// CodeGurex — progressive enhancement only. Every page works without this file
// except the contact form, which states so in a <noscript> notice.
(() => {
  const lang = document.documentElement.lang === "en" ? "en" : "es";
  const T = (es, en) => (lang === "es" ? es : en);

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
      mobileNav.hidden = !open;
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1080px)").addEventListener("change", (e) => e.matches && setOpen(false));
  }

  /* ---------- Hero drawing: highlight a layer ---------- */
  document.querySelectorAll("[data-drawing]").forEach((fig) => {
    const buttons = fig.querySelectorAll("[data-layer]");
    const select = (layer) => {
      if (layer) fig.dataset.focus = layer;
      else delete fig.dataset.focus;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.layer === layer)));
    };
    buttons.forEach((b) => {
      b.addEventListener("click", () => select(fig.dataset.focus === b.dataset.layer ? null : b.dataset.layer));
      b.addEventListener("mouseenter", () => {
        if (!fig.dataset.locked) fig.dataset.focus = b.dataset.layer;
      });
      b.addEventListener("mouseleave", () => {
        const pressed = fig.querySelector('[aria-pressed="true"]');
        if (pressed) fig.dataset.focus = pressed.dataset.layer;
        else delete fig.dataset.focus;
      });
    });
  });

  /* ---------- Work filters ---------- */
  const filterBar = document.querySelector("[data-filters]");
  const grid = document.querySelector("[data-work-grid]");
  if (filterBar && grid) {
    const empty = document.querySelector("[data-empty]");
    const status = document.querySelector("[data-filter-status]");
    filterBar.addEventListener("click", (e) => {
      const button = e.target.closest("button[data-filter]");
      if (!button) return;
      const key = button.dataset.filter;
      filterBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      let shown = 0;
      grid.querySelectorAll(".work-item").forEach((item) => {
        const match = key === "all" || item.dataset.disciplines.split(" ").includes(key);
        item.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (status) status.textContent = T(`${shown} proyectos`, `${shown} projects`);
    });
  }

  /* ---------- Contact form ---------- */
  const form = document.querySelector("[data-form]");
  if (form) {
    const started = Date.now();
    let lastSent = 0;
    const $ = (sel) => form.querySelector(sel);
    const message = $("#f-message");
    const counter = $("[data-count]");
    const hint = $("#f-message-hint");
    const service = $("#f-service");
    const auth = $("[data-auth]");
    const statusEl = $("[data-status]");
    const emailRequired = $("[data-email-required]");

    const params = new URLSearchParams(window.location.search);
    if (params.get("track") === "secure") $('input[name="track"][value="secure"]').checked = true;

    const track = () => form.querySelector('input[name="track"]:checked').value;
    const channel = () => form.querySelector('input[name="channel"]:checked').value;

    const syncTrack = () => {
      const current = track();
      service.querySelectorAll("optgroup").forEach((group) => {
        const on = group.dataset.group === current;
        group.hidden = !on;
        group.disabled = !on;
      });
      if (service.selectedOptions[0]?.dataset.track !== current) {
        const first = service.querySelector(`optgroup[data-group="${current}"] option`);
        if (first) first.selected = true;
      }
      auth.hidden = current !== "secure";
      $("#f-auth").required = current === "secure";
      const text = message.dataset[current === "secure" ? "hintSecure" : "hintBuild"];
      hint.firstChild.textContent = `${text} `;
    };
    const wanted = params.get("service");
    if (wanted) {
      const opt = service.querySelector(`option[value="${CSS.escape(wanted)}"]`);
      if (opt) {
        form.querySelector(`input[name="track"][value="${opt.dataset.track}"]`).checked = true;
        opt.selected = true;
      }
    }
    syncTrack();
    form.querySelectorAll('input[name="track"]').forEach((r) => r.addEventListener("change", syncTrack));

    const syncChannel = () => {
      const isEmail = channel() === "email";
      $("#f-email").required = isEmail;
      emailRequired.textContent = isEmail ? T("obligatorio", "required") : T("opcional", "optional");
    };
    syncChannel();
    form.querySelectorAll('input[name="channel"]').forEach((r) => r.addEventListener("change", syncChannel));

    message.addEventListener("input", () => {
      counter.textContent = String(message.value.length);
    });

    const setError = (input, text) => {
      const box = document.getElementById(`${input.id}-error`);
      input.setAttribute("aria-invalid", text ? "true" : "false");
      if (box) box.textContent = text;
    };
    // Collapse whitespace and strip control characters before building a message.
    const clean = (v) => v.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").replace(/[ \t]+/g, " ").trim();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      statusEl.textContent = "";
      const name = $("#f-name");
      const email = $("#f-email");
      let firstInvalid = null;
      const check = (input, ok, text) => {
        setError(input, ok ? "" : text);
        if (!ok && !firstInvalid) firstInvalid = input;
      };
      check(name, clean(name.value).length >= 2, T("Escribe tu nombre.", "Please enter your name."));
      check(
        message,
        clean(message.value).length >= 20,
        T("Describe el proyecto en al menos 20 caracteres.", "Describe the project in at least 20 characters."),
      );
      const emailValue = clean(email.value);
      const emailOk = emailValue === "" ? channel() !== "email" : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue);
      check(email, emailOk, T("Escribe un correo válido.", "Please enter a valid email."));
      // Credentials must never travel through this channel.
      if (/(password|contraseñ|passwd|api[_-]?key|secret|token)\s*[:=]/i.test(message.value) || /-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(message.value)) {
        check(message, false, T("Parece que incluiste una credencial. Elimínala antes de enviar.", "It looks like you included a credential. Please remove it before sending."));
      }
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      if (track() === "secure" && !$("#f-auth").checked) {
        statusEl.textContent = T("Confirma que tienes autorización sobre el sistema.", "Please confirm you are authorized for this system.");
        $("#f-auth").focus();
        return;
      }
      if (!$("#f-privacy").checked) {
        statusEl.textContent = T("Debes aceptar la política de privacidad.", "Please accept the privacy policy.");
        $("#f-privacy").focus();
        return;
      }
      // Simple abuse controls: honeypot, minimum fill time and a cooldown.
      if ($("#f-website").value || Date.now() - started < 3000) {
        statusEl.textContent = T("No pudimos preparar el mensaje. Inténtalo de nuevo.", "We could not prepare the message. Please try again.");
        return;
      }
      if (Date.now() - lastSent < 20000) {
        statusEl.textContent = T("Espera unos segundos antes de intentarlo de nuevo.", "Please wait a few seconds before trying again.");
        return;
      }
      lastSent = Date.now();

      const lines = [
        T("Hola CodeGurex,", "Hello CodeGurex,"),
        "",
        `${T("Tipo", "Type")}: ${track() === "secure" ? T("Evaluación de seguridad", "Security assessment") : T("Proyecto de desarrollo", "Development project")}`,
        `${T("Categoría", "Category")}: ${service.selectedOptions[0].textContent}`,
        `${T("Nombre", "Name")}: ${clean(name.value)}`,
      ];
      const company = clean($("#f-company").value);
      if (company) lines.push(`${T("Empresa", "Company")}: ${company}`);
      if (emailValue) lines.push(`Email: ${emailValue}`);
      const budget = $("#f-budget");
      if (budget.value) lines.push(`${T("Presupuesto", "Budget")}: ${budget.selectedOptions[0].textContent}`);
      lines.push("", clean(message.value).slice(0, 1500));
      const text = lines.join("\n");

      let url;
      if (channel() === "email") {
        const subject = track() === "secure" ? T("Solicitud de evaluación de seguridad", "Security assessment request") : T("Nuevo proyecto", "New project");
        url = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
        window.location.href = url;
      } else {
        url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank", "noopener");
      }
      statusEl.textContent = T(
        "Mensaje preparado. Revísalo y envíalo desde la aplicación que se abrió.",
        "Message prepared. Review it and send it from the app that opened.",
      );
    });
  }

  /* ---------- Analytics consent ---------- */
  const consent = window.cgConsent;
  const openers = document.querySelectorAll("[data-consent-open]");
  if (consent) {
    const privacyHref = lang === "es" ? "/privacidad/" : "/en/privacy/";
    const box = document.createElement("section");
    box.className = "consent";
    box.setAttribute("aria-labelledby", "consent-title");
    box.innerHTML = `<p class="mono">${T("Privacidad", "Privacy")}</p><h2 id="consent-title">${T(
      "¿Aceptas la analítica?",
      "Do you accept analytics?",
    )}</h2><p>${T(
      "Usamos Google Analytics para saber qué páginas son útiles. Empieza desactivada y la publicidad personalizada nunca se activa.",
      "We use Google Analytics to learn which pages are useful. It starts disabled and personalised advertising is never enabled.",
    )} <a href="${privacyHref}">${T("Más información", "Learn more")}</a></p><div class="actions"><button class="btn btn-small" type="button" data-choice="granted">${T(
      "Aceptar",
      "Accept",
    )}</button><button class="btn btn-small btn-line" type="button" data-choice="denied">${T("Rechazar", "Decline")}</button></div>`;
    box.hidden = consent.value === "granted" || consent.value === "denied";
    box.querySelectorAll("[data-choice]").forEach((b) =>
      b.addEventListener("click", () => {
        consent.save(b.dataset.choice);
        box.hidden = true;
      }),
    );
    document.body.append(box);
    openers.forEach((o) =>
      o.addEventListener("click", () => {
        box.hidden = false;
        box.querySelector("button").focus();
      }),
    );
  } else {
    openers.forEach((o) => (o.hidden = true));
  }
})();
