/*
 * First-visit splash (max ~900ms). Hidden by default in CSS; the inline
 * script shows it only on the first page view of a session, and skips it for
 * reduced motion, bots/headless browsers and repeat views. The page renders
 * underneath, so content is never blocked; without JS it never appears.
 */
const script = `(function(){try{var d=document.documentElement,k="kyntriq-splash";var bot=navigator.webdriver||/bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent);if(bot||sessionStorage.getItem(k)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;sessionStorage.setItem(k,"1");d.classList.add("kq-splash-on");setTimeout(function(){d.classList.remove("kq-splash-on")},900)}catch(e){}})();`;

export function Splash() {
  return (
    <>
      <div id="kq-splash" aria-hidden="true">
        <svg viewBox="0 0 64 64" className="kq-splash-mark" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="kq-splash-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#017df5" />
              <stop offset="1" stopColor="#02f5fb" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="56" height="56" rx="16" stroke="url(#kq-splash-g)" strokeWidth="2.5" pathLength="1" className="kq-splash-ring" />
          <path d="M22 18v28M22 32l18-14M27 28l15 18" stroke="url(#kq-splash-g)" strokeWidth="5" pathLength="1" className="kq-splash-k" />
        </svg>
        <span className="kq-splash-word">KYNTRIQ</span>
      </div>
      <script id="kq-splash-boot" dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
