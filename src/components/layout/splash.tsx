/*
 * First-visit splash (max ~900ms). Hidden by default in CSS; the inline
 * script shows it only on the first page view of a session, and skips it for
 * reduced motion, bots/headless browsers and repeat views. The page renders
 * underneath, so content is never blocked; without JS it never appears.
 */
const script = `(function(){try{var d=document.documentElement,k="varasena-splash";var bot=navigator.webdriver||/bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent);if(bot||sessionStorage.getItem(k)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;sessionStorage.setItem(k,"1");d.classList.add("kq-splash-on");setTimeout(function(){d.classList.remove("kq-splash-on")},900)}catch(e){}})();`;

export function Splash() {
  return (
    <>
      <div id="kq-splash" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- splash must paint before hydration */}
        <img
          src="/varasena-brand-pack/varasena-v-mark-192.webp"
          alt=""
          width={96}
          height={96}
          className="kq-splash-mark"
        />
        <span className="kq-splash-word">VARASENA</span>
      </div>
      <script id="kq-splash-boot" dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
