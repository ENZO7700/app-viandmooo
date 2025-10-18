
export async function safeCopy(text: string): Promise<boolean> {
  // 1) zakázané v iframe/cross-origin → rovno fallback
  const inIframe = typeof window !== "undefined" && window.top !== window.self;

  // 2) moderné API, iba ak sme top-level a na HTTPS a s user gesture
  if (!inIframe && typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }

  // 3) fallback: dočasné textarea + execCommand('copy')
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length); // iOS
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
