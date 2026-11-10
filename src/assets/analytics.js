// Google Analytics 4 with Consent Mode v2. Analytics storage starts DENIED and is only
// granted after an explicit choice; advertising signals are always denied.
(() => {
  const measurementId = "G-3NH66XEY32";
  const key = "codegurex_analytics_consent";
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  let stored = null;
  try {
    stored = window.localStorage.getItem(key);
  } catch {
    stored = null;
  }

  window.gtag("consent", "default", {
    analytics_storage: stored === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
  window.gtag("js", new Date());
  // Strip query strings so no form or campaign text is ever sent with page views.
  window.gtag("config", measurementId, {
    page_location: window.location.origin + window.location.pathname,
  });

  window.cgConsent = {
    key,
    value: stored,
    save(value) {
      this.value = value;
      try {
        window.localStorage.setItem(key, value);
      } catch {
        /* preference still applies for this visit */
      }
      window.gtag("consent", "update", { analytics_storage: value });
    },
  };
})();
