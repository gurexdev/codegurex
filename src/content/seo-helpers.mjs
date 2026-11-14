import { PAGE_SEO } from "./seo.mjs";

const pick = (value, lang) => (value && typeof value === "object" && "es" in value ? value[lang] : value);

/** Title and description for a static page. */
export const pageMeta = (key, lang) => ({
  title: pick(PAGE_SEO[key].title, lang),
  description: pick(PAGE_SEO[key].description, lang),
});

/** Descriptive H1 text for a static page (escaped by the caller's template). */
export const pageH1 = (key, lang) => pick(PAGE_SEO[key].h1, lang);
