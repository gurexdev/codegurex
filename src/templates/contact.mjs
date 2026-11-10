import {
  t,
  tx,
  esc,
  route,
  crumbs,
  breadcrumbSchema,
  titleBlock,
  sheetLabel,
  page,
  SITE,
  UI,
  SERVICES,
  TRACKS,
  ROUTES,
  external,
} from "./base.mjs";

const L = (es, en) => ({ es, en });

export function contact(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("contact", lang), tr("Contacto", "Contact")]];
  const options = (tracks) =>
    SERVICES.filter((s) => tracks.includes(s.track))
      .map((s) => `<option value="${s.id}" data-track="${s.track === "secure" ? "secure" : "build"}">${t(s.name, lang)}</option>`)
      .join("");
  const budgets = [
    ["", tr("Prefiero conversarlo", "I'd rather discuss it")],
    ["lt1k", tr("Menos de USD 1.000", "Under USD 1,000")],
    ["1-5k", "USD 1.000 – 5.000".replace(/\./g, lang === "es" ? "." : ",")],
    ["5-15k", "USD 5.000 – 15.000".replace(/\./g, lang === "es" ? "." : ",")],
    ["gt15k", tr("Más de USD 15.000", "Over USD 15,000")],
  ];

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div>
        <h1>${tr("Cuéntanos qué necesitas construir o proteger.", "Tell us what you need to build or secure.")}</h1>
        <p class="lead">${tr(
          "No necesitas un alcance técnico perfecto. Describe el contexto y respondemos con un siguiente paso concreto.",
          "You do not need a perfect technical scope. Describe the context and we will reply with a concrete next step.",
        )}</p>
      </div>
      ${titleBlock([
        [tr("Respuesta", "Reply"), tr("Por el canal que elijas", "Through the channel you choose")],
        [tr("Idiomas", "Languages"), tr("Español · Inglés", "Spanish · English")],
        [tr("Zona", "Location"), tr("Ecuador (GMT-5) · Internacional", "Ecuador (GMT-5) · International")],
      ])}
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap contact-grid">
    <form class="form" id="inquiry" method="post" action="${route("contact", lang)}" novalidate data-form data-lang="${lang}" data-email="${SITE.email}" data-whatsapp="${SITE.phone.replace("+", "")}">
      <noscript><p class="note warn">${tr(
        "El formulario necesita JavaScript para preparar tu mensaje. Puedes escribirnos directamente a " + SITE.email + ".",
        "The form needs JavaScript to prepare your message. You can write to us directly at " + SITE.email + ".",
      )}</p></noscript>
      <fieldset class="field">
        <legend>${tr("¿Qué necesitas?", "What do you need?")}</legend>
        <div class="track-switch">
          <label><input type="radio" name="track" value="build" checked><strong>${tr("Construir", "Build")}</strong><span>${tr("Software, web, SaaS, integraciones o IA", "Software, web, SaaS, integrations or AI")}</span></label>
          <label><input type="radio" name="track" value="secure"><strong>${tr("Proteger", "Secure")}</strong><span>${tr("Evaluación de seguridad", "Security assessment")}</span></label>
        </div>
      </fieldset>
      <div class="field">
        <label for="f-service">${tr("Categoría del proyecto", "Project category")}</label>
        <select id="f-service" name="service">
          <optgroup label="${t(TRACKS.build.title, lang)} · ${t(TRACKS.integrate.title, lang)}" data-group="build">${options(["build", "integrate"])}<option value="other-build" data-track="build">${tr("Otro / aún no lo sé", "Other / not sure yet")}</option></optgroup>
          <optgroup label="${t(TRACKS.secure.title, lang)}" data-group="secure">${options(["secure"])}<option value="other-secure" data-track="secure">${tr("Otro / aún no lo sé", "Other / not sure yet")}</option></optgroup>
        </select>
      </div>
      <div class="field">
        <label for="f-message">${tr("Describe el proyecto", "Describe the project")} <small>${tr("obligatorio", "required")}</small></label>
        <textarea id="f-message" name="message" required minlength="20" maxlength="1500" aria-describedby="f-message-hint f-message-error" data-hint-build="${tr("Qué quieres construir, para quién y qué existe hoy.", "What you want to build, for whom, and what exists today.")}" data-hint-secure="${tr("Qué sistema quieres evaluar, qué datos maneja y qué te preocupa. No incluyas credenciales.", "Which system you want assessed, what data it handles and what worries you. Do not include credentials.")}"></textarea>
        <span class="hint" id="f-message-hint">${tr("Qué quieres construir, para quién y qué existe hoy.", "What you want to build, for whom, and what exists today.")} <span data-count>0</span>/1500</span>
        <span class="error" id="f-message-error" aria-live="polite"></span>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-name">${tr("Nombre", "Name")} <small>${tr("obligatorio", "required")}</small></label>
          <input id="f-name" name="name" autocomplete="name" required maxlength="80" aria-describedby="f-name-error">
          <span class="error" id="f-name-error" aria-live="polite"></span>
        </div>
        <div class="field">
          <label for="f-company">${tr("Empresa", "Company")} <small>${tr("opcional", "optional")}</small></label>
          <input id="f-company" name="company" autocomplete="organization" maxlength="100">
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-budget">${tr("Presupuesto estimado", "Estimated budget")} <small>${tr("opcional", "optional")}</small></label>
          <select id="f-budget" name="budget">${budgets.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join("")}</select>
        </div>
        <div class="field">
          <label for="f-email">${tr("Correo electrónico", "Email")} <small data-email-required>${tr("opcional", "optional")}</small></label>
          <input id="f-email" name="email" type="email" autocomplete="email" maxlength="120" aria-describedby="f-email-error">
          <span class="error" id="f-email-error" aria-live="polite"></span>
        </div>
      </div>
      <fieldset class="field">
        <legend>${tr("¿Cómo prefieres que te contactemos?", "How should we reach you?")}</legend>
        <div class="choice-row">
          <label><input type="radio" name="channel" value="whatsapp" checked> WhatsApp</label>
          <label><input type="radio" name="channel" value="email"> ${tr("Correo", "Email")}</label>
        </div>
      </fieldset>
      <div class="hp" aria-hidden="true"><label for="f-website">Website</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>
      <label class="check" data-auth hidden><input type="checkbox" name="authorized" id="f-auth"> <span>${tr(
        "Confirmo que el sistema es de mi propiedad o que tengo autorización para solicitar su evaluación.",
        "I confirm that I own the system or am authorized to request its assessment.",
      )}</span></label>
      <label class="check"><input type="checkbox" name="privacy" id="f-privacy" required> <span>${tr("Acepto la", "I accept the")} <a href="${route("privacy", lang)}">${tr("política de privacidad", "privacy policy")}</a>.</span></label>
      <div class="actions"><button class="btn btn-blue" type="submit">${tr("Preparar mensaje", "Prepare message")}</button></div>
      <p class="form-status" role="status" aria-live="polite" data-status></p>
      <p class="muted"><small>${tr(
        "El mensaje se prepara en tu dispositivo y se abre en WhatsApp o en tu correo para que lo revises antes de enviarlo. Este sitio no almacena lo que escribes.",
        "The message is prepared on your device and opened in WhatsApp or your email app so you can review it before sending. This site does not store what you type.",
      )}</small></p>
    </form>
    <aside class="contact-aside" aria-labelledby="direct-title">
      ${sheetLabel("→", L("Contacto directo", "Direct contact"), lang)}
      <h2 id="direct-title" class="sr-only">${tr("Contacto directo", "Direct contact")}</h2>
      <dl>
        <div><dt class="mono">${tr("Correo", "Email")}</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
        <div><dt class="mono">WhatsApp</dt><dd>${external(SITE.whatsapp, SITE.phoneDisplay, "")}</dd></div>
        <div><dt class="mono">LinkedIn</dt><dd>${external(SITE.linkedin, "linkedin.com/in/codegurex", "")}</dd></div>
        <div><dt class="mono">${tr("Ubicación", "Location")}</dt><dd>${t(UI.location, lang)}</dd></div>
      </dl>
      <p class="note warn">${tr(
        "No envíes contraseñas, tokens, llaves privadas ni datos de pacientes o clientes en el primer contacto.",
        "Do not send passwords, tokens, private keys or patient/customer data in the first message.",
      )}</p>
      <ol class="process steps-3">
        <li><h3>${tr("Contexto", "Context")}</h3><p>${tr("Leemos tu mensaje y, si hace falta, pedimos lo mínimo necesario.", "We read your message and, if needed, ask for the minimum we need.")}</p></li>
        <li><h3>${tr("Conversación", "Conversation")}</h3><p>${tr("Una llamada corta para entender el objetivo y las restricciones.", "A short call to understand goals and constraints.")}</p></li>
        <li><h3>${tr("Propuesta", "Proposal")}</h3><p>${tr("Alcance, fases, entregables y condiciones por escrito.", "Scope, phases, deliverables and terms in writing.")}</p></li>
      </ol>
    </aside>
  </div>
</section>`;

  return page({
    lang,
    paths: ROUTES.contact,
    current: "contact",
    title: tr("Contacto — Hablemos de tu proyecto | CodeGurex", "Contact — Discuss a project | CodeGurex"),
    description: tr(
      "Cuéntanos qué necesitas construir o proteger: desarrollo de software, SaaS, integraciones, IA o una evaluación de seguridad.",
      "Tell us what you need to build or secure: software development, SaaS, integrations, AI or a security assessment.",
    ),
    body,
    schema: [breadcrumbSchema(lang, trail), { "@type": "ContactPage", url: `${SITE.origin}${ROUTES.contact[lang]}`, name: tr("Contacto", "Contact") }],
  });
}

export function privacy(lang) {
  const tr = (es, en) => (lang === "es" ? es : en);
  const trail = [[route("privacy", lang), tr("Privacidad", "Privacy")]];
  const sections = [
    [
      L("Responsable", "Controller"),
      L(
        `CodeGurex, empresa ecuatoriana de ingeniería de software y ciberseguridad, es responsable del tratamiento descrito aquí. Contacto: <a href="mailto:${SITE.email}?subject=Datos%20personales">${SITE.email}</a>.`,
        `CodeGurex, an Ecuadorian software engineering and cybersecurity company, is the controller for the processing described here. Contact: <a href="mailto:${SITE.email}?subject=Personal%20data">${SITE.email}</a>.`,
      ),
    ],
    [
      L("Qué datos tratamos", "What data we process"),
      L(
        "En el formulario puedes indicar nombre, empresa, correo, categoría del proyecto, presupuesto orientativo y una descripción. El formulario prepara el mensaje en tu dispositivo y abre WhatsApp o tu aplicación de correo: CodeGurex no recibe nada hasta que tú lo envías. Cloudflare y GitHub Pages procesan datos técnicos necesarios para entregar y proteger el sitio (IP, navegador, recursos solicitados, eventos de seguridad). Si aceptas la analítica, Google Analytics registra páginas visitadas y datos generales de navegación; nunca enviamos a Analytics lo que escribes en el formulario.",
        "In the form you can provide your name, company, email, project category, an indicative budget and a description. The form prepares the message on your device and opens WhatsApp or your email app: CodeGurex receives nothing until you send it. Cloudflare and GitHub Pages process technical data needed to deliver and protect the site (IP address, browser, requested resources, security events). If you accept analytics, Google Analytics records pages visited and general browsing data; we never send what you type in the form to Analytics.",
      ),
    ],
    [
      L("Para qué los usamos", "Why we use it"),
      L(
        "Responder tu solicitud, preparar propuestas, mantener la seguridad y disponibilidad del sitio y, si lo aceptas, medir de forma agregada su uso. La base es tu consentimiento y, si existe una relación comercial, la ejecución de medidas precontractuales o contractuales. No vendemos datos ni los usamos para publicidad.",
        "To answer your request, prepare proposals, keep the site secure and available and, if you accept, measure its use in aggregate. The legal basis is your consent and, where a business relationship exists, pre-contractual or contractual measures. We do not sell data or use it for advertising.",
      ),
    ],
    [
      L("Proveedores", "Providers"),
      L(
        "WhatsApp/Meta (canal de mensajes que eliges), GitHub Pages (alojamiento), Cloudflare (DNS, entrega y protección) y Google Analytics (medición, solo con consentimiento). Pueden procesar información fuera de Ecuador según sus propias políticas.",
        "WhatsApp/Meta (the messaging channel you choose), GitHub Pages (hosting), Cloudflare (DNS, delivery and protection) and Google Analytics (measurement, only with consent). They may process information outside Ecuador under their own policies.",
      ),
    ],
    [
      L("Conservación", "Retention"),
      L(
        "Las consultas se conservan el tiempo necesario para responder y dar seguimiento, con un máximo de referencia de 12 meses desde el último contacto, salvo que exista una relación contractual u obligación legal.",
        "Inquiries are kept as long as needed to reply and follow up, with a reference maximum of 12 months from the last contact, unless a contract or legal obligation requires otherwise.",
      ),
    ],
    [
      L("Tus derechos", "Your rights"),
      L(
        `Puedes solicitar acceso, rectificación, eliminación, oposición, suspensión o portabilidad, y retirar tu consentimiento, escribiendo a <a href="mailto:${SITE.email}?subject=Datos%20personales">${SITE.email}</a> con el asunto “Datos personales”. También puedes reclamar ante la Superintendencia de Protección de Datos Personales del Ecuador.`,
        `You may request access, rectification, erasure, objection, restriction or portability, and withdraw consent, by writing to <a href="mailto:${SITE.email}?subject=Personal%20data">${SITE.email}</a> with the subject “Personal data”. You may also complain to Ecuador's Superintendency for Personal Data Protection.`,
      ),
    ],
    [
      L("Cookies y analítica", "Cookies and analytics"),
      L(
        `Usamos Google Analytics 4 (${SITE.analyticsId}). La analítica empieza desactivada y solo se activa si la aceptas; la publicidad personalizada está siempre desactivada. Puedes cambiar tu decisión en cualquier momento desde “Preferencias de privacidad” en el pie de página.`,
        `We use Google Analytics 4 (${SITE.analyticsId}). Analytics starts disabled and is only enabled if you accept it; personalised advertising is always disabled. You can change your choice at any time from “Privacy preferences” in the footer.`,
      ),
    ],
    [
      L("Seguridad", "Security"),
      L(
        `Aplicamos HTTPS, una política de seguridad de contenido, restricción de permisos del navegador y protección de red. Ningún sistema es absolutamente seguro. Si detectas un posible problema de seguridad en este sitio, escríbenos a <a href="mailto:${SITE.email}?subject=Seguridad">${SITE.email}</a>.`,
        `We apply HTTPS, a content security policy, browser-permission restrictions and network protection. No system is absolutely secure. If you find a possible security issue on this site, write to <a href="mailto:${SITE.email}?subject=Security">${SITE.email}</a>.`,
      ),
    ],
  ];

  const body = `
<section class="page-hero">
  <div class="wrap">
    ${crumbs(lang, trail)}
    <div class="page-hero-grid">
      <div><h1>${tr("Política de privacidad", "Privacy policy")}</h1><p class="lead">${tr("Qué datos puede recibir CodeGurex, para qué y qué control tienes sobre ellos.", "What data CodeGurex may receive, why, and what control you have over it.")}</p></div>
      ${titleBlock([
        [tr("Actualizada", "Updated"), SITE.updated],
        [tr("Aplica a", "Applies to"), "codegurex.com"],
      ])}
    </div>
  </div>
</section>
<section class="section"><div class="wrap">${sections
    .map(([h, p], i) => `<div class="split"><h2><span class="mono muted">${String(i + 1).padStart(2, "0")}</span><br>${t(h, lang)}</h2><div class="body"><p>${tx(p, lang)}</p></div></div>`)
    .join("")}</div></section>`;

  return page({
    lang,
    paths: ROUTES.privacy,
    current: "privacy",
    title: tr("Política de privacidad | CodeGurex", "Privacy policy | CodeGurex"),
    description: tr("Cómo trata CodeGurex los datos de contacto, la analítica y los registros técnicos de codegurex.com.", "How CodeGurex handles contact data, analytics and technical logs on codegurex.com."),
    body,
    schema: [breadcrumbSchema(lang, trail)],
  });
}

export function notFound() {
  const body = `
<section class="section"><div class="wrap notfound">
  <p class="mono muted">ERROR · 404</p>
  <p class="code404" aria-hidden="true">404</p>
  <h1>Esta página no existe. <span class="muted">This page does not exist.</span></h1>
  <p class="lead">La dirección pudo cambiar con la nueva estructura del sitio. The address may have changed with the new site structure.</p>
  <div class="actions"><a class="btn" href="/">Ir al inicio</a><a class="btn btn-line" href="/en/">Go to the English site</a></div>
</div></section>`;
  return page({
    lang: "es",
    paths: ROUTES.home,
    current: "",
    title: "404 — CodeGurex",
    description: "Página no encontrada. Page not found.",
    body,
    robots: "noindex, follow",
  });
}

export function redirectStub(target, lang = "es") {
  const url = `${SITE.origin}${target}`;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>CodeGurex</title>
<link rel="canonical" href="${url}">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body><p class="redirect">Esta página se movió a <a href="${target}">${url}</a>.</p></body>
</html>
`;
}
