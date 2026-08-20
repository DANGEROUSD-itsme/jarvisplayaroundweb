/*
  JARVIS MARKETPLACE HELPER — bookmarklet source

  Why this exists: index.html (the main Jarvis app) runs on its own page and
  browsers block any webpage from reaching into facebook.com — that's a
  security boundary (same-origin policy), not a bug. A bookmarklet is
  different: it's JS that runs INSIDE whatever page you're currently on when
  you click it. So this only works if you're already on a Facebook
  Marketplace listing page when you click the bookmark.

  No install needed — see INSTALL steps at the bottom of this file.

  HONESTY CHECK: Facebook actively tries to block scripts like this
  (obfuscated class names that change often, bot-detection). It may stop
  working at any time, and using automation on Facebook can risk your
  account getting flagged. This always shows a confirm() popup before
  sending anything — never sends without you clicking OK.
*/

(async function jarvisMarketplaceHelper() {
  if (!location.hostname.includes('facebook.com')) {
    alert('Run this while on a Facebook Marketplace listing page.');
    return;
  }
  if (typeof puter === 'undefined') {
    // Inject Puter.js if this page doesn't already have it.
    await new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'https://js.puter.com/v2/';
      s.onload = resolve;
      document.head.appendChild(s);
    });
  }

  const intent = prompt('What are you looking for / your message intent?', 'gaming chair, ask if still available');
  if (!intent) return;

  // Best-effort scrape of listing title/price from the current page.
  const pageText = document.body.innerText.slice(0, 4000);

  const message = await puter.ai.chat(
    `The user is on a Facebook Marketplace listing page. Page text snippet:\n${pageText}\n\n` +
    `User's intent: ${intent}\n` +
    `Draft a short, casual 2-3 sentence enquiry message to the seller. No bot fluff.`
  );

  const confirmed = confirm(`Jarvis drafted this message:\n\n"${message}"\n\nClick OK to try auto-filling it into the chat box (you still hit send yourself), or Cancel to do nothing.`);
  if (!confirmed) return;

  // Best-effort selectors — Facebook's markup changes often, this may need
  // updating. If it can't find the message box, it just copies the text.
  const msgButton = [...document.querySelectorAll('div[aria-label="Message"]')][0];
  if (msgButton) msgButton.click();

  setTimeout(() => {
    const box = document.querySelector('div[aria-label="Message"][role="textbox"]');
    if (box) {
      box.focus();
      document.execCommand('insertText', false, message);
      alert('Message filled in — review it, then hit send yourself.');
    } else {
      navigator.clipboard.writeText(message);
      alert('Couldn\'t find the message box automatically — copied the message to your clipboard instead, paste it in manually.');
    }
  }, 800);
})();

/*
  INSTALL (no admin needed, just browser bookmarks):
  1. Show your bookmarks bar: Ctrl+Shift+B (Chrome/Edge)
  2. Right-click the bookmarks bar → "Add page"
  3. Name it "Jarvis Marketplace"
  4. For the URL, paste the MINIFIED one-liner below (starts with "javascript:")
  5. Save. Now, while on a Facebook Marketplace page, click that bookmark.

  Minify: take everything in the function above, remove comments/newlines,
  prefix with "javascript:". Simplest way — open browser DevTools console,
  paste the function above (without this comment block), it'll run once to
  test, and for a reusable bookmarklet, wrap it as:

  javascript:(async function(){ ...body... })();

  I can generate the exact minified string for you if you want it pasted
  in ready to go — just ask.
*/
