// ──────────────────────────────────────────────────────────────
//  Helpers: Google Drive link parsing, schedule timing, formatting
// ──────────────────────────────────────────────────────────────

// Extract a Drive file id from common share-link shapes.
export function driveFileId(url = "") {
  if (!url) return null;
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// A link suitable for <img>/inline preview of a Drive image.
export function drivePreview(url) {
  const id = driveFileId(url);
  if (!id) return url;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
}

// A link that renders a Drive file (image or pdf) inside an iframe.
export function driveEmbed(url) {
  const id = driveFileId(url);
  if (!id) return url;
  return `https://drive.google.com/file/d/${id}/preview`;
}

// A direct-download link for a Drive file.
export function driveDownload(url) {
  const id = driveFileId(url);
  if (!id) return url;
  return `https://drive.google.com/uc?export=download&id=${id}`;
}

// ── Arabic-Indic digits ──
const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
export function toArabicDigits(input) {
  return String(input).replace(/\d/g, (d) => AR_DIGITS[+d]);
}

// ── Schedule timing ──
// Build a Date for a given schedule day + "HH:MM" in local Cairo-ish time.
function dayTime(dateStr, hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  // handle the 24:00 marker as end-of-day
  const d = new Date(dateStr + "T00:00:00");
  d.setHours(h, m, 0, 0);
  return d;
}

// Given the schedule + a reference "now", find current & next activity.
export function resolveScheduleState(schedule, now = new Date()) {
  let current = null;
  let next = null;
  const flat = [];
  for (const day of schedule) {
    for (const item of day.items) {
      const start = dayTime(day.date, item.start);
      let end = dayTime(day.date, item.end);
      if (end <= start) end = new Date(start.getTime() + 60 * 60 * 1000);
      flat.push({ ...item, day, start, end });
    }
  }
  flat.sort((a, b) => a.start - b.start);
  for (const f of flat) {
    if (now >= f.start && now < f.end) current = f;
    if (now < f.start && !next) next = f;
  }
  return { current, next, flat };
}

// Format a "HH:MM" (24-hour) string into 12-hour format with AM/PM,
// using English numerals. Examples: "13:30" -> "1:30 PM", "09:15" -> "9:15 AM".
export function fmtTime(hhmm) {
  if (!hhmm || !hhmm.includes(":")) return hhmm;
  let [h, m] = hhmm.split(":").map(Number);
  // handle the 24:00 end-of-day marker as 12:00 AM
  if (h >= 24) h -= 24;
  const period = h >= 12 ? "PM" : "AM";
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  const mm = String(m).padStart(2, "0");
  return `${h12}:${mm} ${period}`;
}

// human friendly remaining time, returns { d,h,m,s, total }
export function diffParts(target, now = new Date()) {
  let total = Math.max(0, target - now);
  const d = Math.floor(total / 86400000);
  total -= d * 86400000;
  const h = Math.floor(total / 3600000);
  total -= h * 3600000;
  const m = Math.floor(total / 60000);
  total -= m * 60000;
  const s = Math.floor(total / 1000);
  return { d, h, m, s, total: target - now };
}

export function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}
