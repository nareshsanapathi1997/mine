export const THEME_STORAGE_KEY = "kyntriq-theme";

export type Theme = "light" | "dark";

export const themeBootScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=="light"&&t!=="dark"){t="dark"}var d=document.documentElement;d.setAttribute("data-theme",t);var c=t==="dark"?"#070b14":"#f8fafc";var m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement("meta");m.setAttribute("name","theme-color");document.head.appendChild(m)}m.setAttribute("content",c)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private browsing can block storage */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#070b14" : "#f8fafc");
}
