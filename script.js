/* ============================================
   Wanderly — Interactive Logic
   ============================================ */

/* ---------- Destinations data ---------- */
const destinations = [
  {
    name: "Thailand",
    loc: "Phuket",
    badge: "Bestseller",
    rating: 4.9,
    price: 699,
    img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
    desc: "Crystal-clear waters, stunning limestone cliffs, and vibrant night markets await in the tropical paradise of Phuket."
  },
  {
    name: "France",
    loc: "Paris",
    badge: "Popular",
    rating: 4.8,
    price: 799,
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    desc: "Fall in love with the City of Light — iconic landmarks, world-class art, and unforgettable cuisine."
  },
  {
    name: "Bali, Indonesia",
    loc: "Ubud",
    badge: "Trending",
    rating: 4.9,
    price: 599,
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    desc: "Ancient temples, lush rice terraces, and serene beaches make Bali the ultimate island escape."
  },
  {
    name: "Dubai, UAE",
    loc: "Dubai",
    badge: "Bestseller",
    rating: 4.7,
    price: 899,
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    desc: "Experience futuristic skyscrapers, luxury shopping, and golden desert dunes in the city of superlatives."
  },
  {
    name: "Japan",
    loc: "Tokyo",
    badge: "Trending",
    rating: 4.9,
    price: 1099,
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    desc: "Where ancient traditions meet cutting-edge technology — discover neon-lit streets and serene shrines."
  },
  {
    name: "Italy",
    loc: "Rome",
    badge: "Popular",
    rating: 4.8,
    price: 849,
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    desc: "Walk through millennia of history, savor authentic pasta, and marvel at the eternal city's wonders."
  },
  {
    name: "Maldives",
    loc: "Male",
    badge: "Bestseller",
    rating: 5.0,
    price: 1499,
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    desc: "Overwater villas, turquoise lagoons, and pristine coral reefs — pure tropical luxury."
  },
  {
    name: "Switzerland",
    loc: "Zurich",
    badge: "New",
    rating: 4.8,
    price: 1199,
    img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    desc: "Snow-capped Alps, crystal lakes, and charming villages — a fairytale destination in the heart of Europe."
  }
];

/* ---------- Render destination cards ---------- */
function renderDestinations() {
  const grid = document.getElementById("destinationsGrid");
  grid.innerHTML = destinations.map((d, i) => `
    <div class="dest-card" data-index="${i}">
      <div class="img" style="background-image:url('${d.img}')"></div>
      <div class="gradient"></div>
      <span class="badge">${d.badge}</span>
      <div class="info">
        <div class="loc"><i class="fa-solid fa-location-dot"></i> ${d.loc}</div>
        <h3>${d.name}</h3>
        <div class="meta">
          <div class="rating"><i class="fa-solid fa-star"></i> ${d.rating}</div>
          <div class="price"><small>From</small> $${d.price}</div>
        </div>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".dest-card").forEach(card => {
    card.addEventListener("click", () => openDestination(+card.dataset.index));
  });
}

/* ---------- Destination detail modal ---------- */
function openDestination(i) {
  const d = destinations[i];
  openModal(`
    <h3>${d.name} <small style="font-size:14px;color:var(--muted)">· ${d.loc}</small></h3>
    <div style="height:200px;border-radius:14px;background:url('${d.img}') center/cover;margin:14px 0"></div>
    <p>${d.desc}</p>
    <p><strong style="color:var(--primary)">Starting from $${d.price} per person</strong></p>
    <div style="display:flex;gap:10px;margin-top:18px">
      <a href="#home" onclick="closeModal()" class="btn btn-primary">Book Now</a>
      <button onclick="closeModal()" class="btn btn-outline">Close</button>
    </div>
  `);
}

/* ---------- Booking tabs ---------- */
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".booking-form").forEach(f => f.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

/* ---------- Swap from/to ---------- */
document.querySelector(".swap")?.addEventListener("click", () => {
  const from = document.querySelector("#flights input[placeholder='New York (NYC)']");
  const to = document.getElementById("flight-to");
  const tmp = from.value;
  from.value = to.value;
  to.value = tmp;
});

/* ---------- Search handling (show results) ---------- */
const sampleResults = {
  flights: [
    { label: "Non-stop · 7h 45m", sub: "Depart 09:30 · Arrive 22:15", price: 489 },
    { label: "1 Stop · 12h 10m", sub: "Depart 14:00 · Arrive 03:10+1", price: 399 },
    { label: "Non-stop · 8h 00m", sub: "Depart 21:15 · Arrive 11:15+1", price: 549 }
  ],
  hotels: [
    { label: "Grand Luxury Resort ★★★★★", sub: "Free cancellation · Breakfast included", price: 189 },
    { label: "Seaside Boutique Hotel ★★★★", sub: "Pool · Wi-Fi · Beach access", price: 132 },
    { label: "City Center Apartments ★★★", sub: "Self-catering · Near metro", price: 78 }
  ],
  tours: [
    { label: "7-Day Cultural Discovery", sub: "Guided tours · Hotels included", price: 699 },
    { label: "5-Day Adventure Package", sub: "Hiking · Rafting · Meals", price: 549 },
    { label: "10-Day Grand Tour", sub: "All-inclusive · Private guide", price: 1299 }
  ],
  packages: [
    { label: "Beach Escape Package", sub: "Flights + 7 nights hotel + transfers", price: 1299 },
    { label: "Romantic Getaway", sub: "5-star resort · Couple's spa · Sunset cruise", price: 1899 },
    { label: "Family Adventure", sub: "2 Adults + 2 kids · Theme park passes", price: 2199 }
  ]
};

document.querySelectorAll(".booking-form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const type = form.id;
    const results = sampleResults[type] || [];
    const items = results.map(r => `
      <div class="result-item">
        <div>
          <strong>${r.label}</strong>
          <small>${r.sub}</small>
        </div>
        <div class="price">$${r.price}</div>
      </div>
    `).join("");
    openModal(`
      <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Search Results</h3>
      <p>We found <strong>${results.length} great options</strong> matching your search.</p>
      <div class="result-list">${items}</div>
      <div style="margin-top:18px;text-align:center">
        <button onclick="closeModal()" class="btn btn-primary">Browse All</button>
      </div>
    `);
  });
});

/* ---------- Modal ---------- */
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");
function openModal(html) {
  modalBody.innerHTML = html;
  modalOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modalOverlay.classList.remove("show");
  document.body.style.overflow = "";
}
window.closeModal = closeModal;
document.getElementById("modalClose").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ---------- Toast ---------- */
const toast = document.getElementById("toast");
function showToast(msg, icon = "fa-circle-check") {
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* ---------- Newsletter ---------- */
document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value;
  showToast(`Subscribed successfully! We'll send deals to ${email}`, "fa-envelope-circle-check");
  e.target.reset();
});

/* ---------- User button ---------- */
document.getElementById("userBtn").addEventListener("click", () => {
  openModal(`
    <h3>Welcome to Wanderly</h3>
    <p>Sign in to manage your bookings, save your favorite destinations, and unlock exclusive member deals.</p>
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">
      <button onclick="closeModal();showToast('Sign in coming soon!','fa-user')" class="btn btn-primary">Sign In</button>
      <button onclick="closeModal();showToast('Account created!','fa-user-plus')" class="btn btn-outline">Create Account</button>
    </div>
  `);
});

/* ---------- Navbar scroll + active link ---------- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll(".nav-link").forEach(l => {
    l.classList.toggle("active", l.getAttribute("href") === "#" + current);
  });
});

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuToggle.innerHTML = navMenu.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});
document.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

/* ---------- Smooth scroll offset ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    if (id === "#" || id.length < 2) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    }
  });
});

/* ---------- Init ---------- */
renderDestinations();

/* Set default flight dates */
const today = new Date();
const depart = new Date(today.getTime() + 7 * 86400000);
const ret = new Date(today.getTime() + 14 * 86400000);
const fmt = d => d.toISOString().split("T")[0];
document.getElementById("flight-depart").value = fmt(depart);
document.getElementById("flight-return").value = fmt(ret);
