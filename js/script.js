"use strict";

const WEDDING_DATE = new Date("2027-01-18T08:00:00+07:00");
const SUPABASE_URL = "https://gnmvcjbbbtgzaggyemhu.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZTuRep_krDyNacCQJ8KO2Q_DUV2vgKB";
const db = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const $ = (id) => document.getElementById(id);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const guest = new URLSearchParams(location.search).get("to");
if (guest && $("guestName")) $("guestName").textContent = guest;

const cover = $("cover");
const openBtn = $("openBtn");
const bgm = $("bgm");
const musicBtn = $("musicBtn");

if (openBtn && cover) {
  openBtn.addEventListener("click", () => {
    cover.classList.add("is-hidden");
    document.body.classList.remove("is-locked");
    if (musicBtn) musicBtn.hidden = false;
    if (bgm) {
      bgm.play().then(() => musicBtn?.classList.add("is-playing")).catch(() => {});
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (musicBtn && bgm) {
  musicBtn.addEventListener("click", () => {
    if (bgm.paused) {
      bgm.play().then(() => musicBtn.classList.add("is-playing")).catch(() => {});
    } else {
      bgm.pause();
      musicBtn.classList.remove("is-playing");
    }
  });
}

function tick() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  if ($("d")) $("d").textContent = String(Math.floor(diff / 86400000)).padStart(2, "0");
  if ($("h")) $("h").textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, "0");
  if ($("m")) $("m").textContent = String(Math.floor(diff / 60000) % 60).padStart(2, "0");
  if ($("s")) $("s").textContent = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
  if (diff === 0 && $("countdownMsg")) $("countdownMsg").hidden = false;
}
tick();
window.setInterval(tick, 1000);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => observer.observe(el));
} else {
  $$(".reveal").forEach((el) => el.classList.add("is-visible"));
}

const nav = $("mainNav");
function updateNav() {
  if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

$$("#navLinks .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navLinks = $("navLinks");
    if (navLinks && window.bootstrap && navLinks.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navLinks).hide();
    }
  });
});

const lightboxEl = $("lightbox");
const lightboxImg = $("lightboxImg");
if (lightboxEl && lightboxImg && window.bootstrap) {
  const lightbox = bootstrap.Modal.getOrCreateInstance(lightboxEl);
  $$(".gallery-item").forEach((button) => {
    button.addEventListener("click", () => {
      const thumbnail = button.querySelector("img");
      if (!thumbnail) return;
      const fullImage = button.dataset.full || thumbnail.currentSrc || thumbnail.src;
      lightboxImg.onerror = () => {
        lightboxImg.onerror = null;
        lightboxImg.src = thumbnail.currentSrc || thumbnail.src;
      };
      lightboxImg.alt = button.dataset.alt || thumbnail.alt || "Foto galeri";
      lightboxImg.src = fullImage;
      lightbox.show();
    });
  });
  lightboxEl.addEventListener("hidden.bs.modal", () => {
    lightboxImg.removeAttribute("src");
    lightboxImg.alt = "";
    lightboxImg.onerror = null;
  });
}

if ($("copyBtn") && $("rek")) {
  $("copyBtn").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const originalText = "Salin Nomor Rekening";
    try {
      await navigator.clipboard.writeText($("rek").textContent.trim());
      button.textContent = "Tersalin";
    } catch {
      button.textContent = "Tidak dapat menyalin";
    }
    window.setTimeout(() => { button.textContent = originalText; }, 2000);
  });
}

if ($("pesan") && $("charNow")) {
  const updateCharCount = () => { $("charNow").textContent = String($("pesan").value.length); };
  $("pesan").addEventListener("input", updateCharCount);
  updateCharCount();
}

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function showToast(message) {
  const toastEl = $("toast");
  if (!toastEl || !$("toastMsg") || !window.bootstrap) return;
  $("toastMsg").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastEl).show();
}

async function renderWishes() {
  const wishesEl = $("wishes");
  if (!wishesEl) return;

  if (!db) {
    wishesEl.innerHTML = '<p class="wishes-empty">Ucapan belum bisa dimuat.</p>';
    return;
  }

  const { data, error } = await db
    .from("wishes")
    .select("name, attendance, message, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Gagal memuat ucapan:", error);
    wishesEl.innerHTML = '<p class="wishes-empty">Ucapan belum bisa dimuat. Coba muat ulang halaman.</p>';
    return;
  }

  wishesEl.innerHTML = data.length
    ? data.map((wish) => `<article class="wish"><div class="wish-head"><b>${escapeHTML(wish.name)}</b><span class="wish-badge">${escapeHTML(wish.attendance)}</span></div><p>${escapeHTML(wish.message)}</p></article>`).join("")
    : '<p class="wishes-empty">Belum ada ucapan. Jadilah yang pertama.</p>';
}

if ($("rsvpForm")) {
  $("rsvpForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    form.classList.add("was-validated");
    if (!form.checkValidity()) return;

    if (!db) {
      showToast("Ucapan belum bisa dikirim. Coba muat ulang halaman.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const payload = {
      name: $("nama").value.trim(),
      attendance: $("hadir").value,
      message: $("pesan").value.trim()
    };

    if (submitBtn) submitBtn.disabled = true;
    const { error } = await db.from("wishes").insert(payload);
    if (submitBtn) submitBtn.disabled = false;

    if (error) {
      console.error("Gagal mengirim ucapan:", error);
      showToast("Ucapan gagal terkirim. Coba lagi.");
      return;
    }

    form.reset();
    form.classList.remove("was-validated");
    if ($("charNow")) $("charNow").textContent = "0";
    showToast("Terima kasih, ucapanmu sudah terkirim!");
    renderWishes();
  });
}
renderWishes();

let inWishesView = false;
function syncView() {
  const wantWishes = location.hash === "#ucapan";
  if (wantWishes === inWishesView) return;
  inWishesView = wantWishes;
  document.body.classList.toggle("is-wishes-view", wantWishes);

  if (wantWishes) {
    window.scrollTo(0, 0);
    renderWishes();
    return;
  }

  let target = null;
  try {
    target = location.hash.length > 1 ? document.querySelector(location.hash) : null;
  } catch {}
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
}

$("openWishes")?.addEventListener("click", (event) => {
  event.preventDefault();
  location.hash = "#ucapan";
});

$("backToInvite")?.addEventListener("click", (event) => {
  event.preventDefault();
  location.hash = "#rsvp";
});

window.addEventListener("hashchange", syncView);
syncView();
