export function phpText(value) {
  return `₱${Math.round(value).toLocaleString("ko-KR")}`;
}

export function krwText(value, phpToKrw) {
  return `₩${Math.round(value * phpToKrw).toLocaleString("ko-KR")}`;
}

export function usdText(value, phpPerUsd) {
  const usd = phpPerUsd > 0 ? value / phpPerUsd : 0;
  return `$${usd.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function html(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function originalMoneyText(value, currency) {
  if (currency === "PHP") return `₱${Math.round(value).toLocaleString("ko-KR")}`;
  if (currency === "USD") return `$${Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `₩${Math.round(value).toLocaleString("ko-KR")}`;
}
