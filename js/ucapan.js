"use strict";

const STORAGE_KEY = "wishes-wahyu-mita";
const wishesContainer = document.getElementById("wishes");
const wishForm = document.getElementById("wish-form");

function loadWishes() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
    }

    function saveWishes(wishes) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {
        console.error("Gagal menyimpan ucapan:", e);
    }
    }

    function renderWishes() {
    const wishes = loadWishes();
    wishesContainer.replaceChildren();

    if (wishes.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Belum ada ucapan. Jadilah yang pertama!";
        wishesContainer.append(empty);
        return;
    }

    // Terbaru di atas
    [...wishes].reverse().forEach(({ name, message, date }) => {
        const item = document.createElement("div");
        item.className = "wish-item";

        const title = document.createElement("strong");
        title.textContent = name;

        const text = document.createElement("p");
        text.textContent = message;

        const time = document.createElement("small");
        time.textContent = new Date(date).toLocaleString("id-ID");

        item.append(title, text, time);
        wishesContainer.append(item);
    });
    }

    function addWish(name, message) {
    const wishes = loadWishes();
    wishes.push({ name, message, date: Date.now() });
    saveWishes(wishes);
    renderWishes();
    }

    if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(wishForm);
        const name = String(data.get("name") || "").trim();
        const message = String(data.get("message") || "").trim();

        if (name && message) {
        addWish(name, message);
        wishForm.reset();
        }
    });
}

renderWishes();