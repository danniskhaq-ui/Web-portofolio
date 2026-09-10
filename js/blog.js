// Variable global untuk menyimpan semua data artikel
let allPosts = [];
let filteredPosts = []; // Menyimpan data artikel setelah difilter
let currentPage = 1;
const itemsPerPage = 9; // Maksimal 9 artikel per halaman

async function loadCMSPosts() {
  const repo = "danniskhaq-ui/Web-portofolio";
  const container = document.getElementById("blog-container");

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/content/blog`);
    const files = await response.json();

    if (!Array.isArray(files)) return;

    container.innerHTML = "";
    allPosts = [];

    for (const file of files) {
      if (file.name.endsWith(".md")) {
        const res = await fetch(file.download_url);
        const rawText = await res.text();

        const parts = rawText.split("---");
        const metadata = parts[1] || "";

        const titleMatch = metadata.match(/title:\s*["']?(.*?)["']?\n/);
        const categoryMatch = metadata.match(/category:\s*["']?(.*?)["']?\n/);
        const dateMatch = metadata.match(/date:\s*["']?(.*?)["']?\n/);
        const descMatch = metadata.match(/description:\s*["']?(.*?)["']?\n/);
        const thumbMatch = metadata.match(/thumbnail:\s*["']?(.*?)["']?\n/);

        allPosts.push({
          fileName: file.name,
          title: titleMatch ? titleMatch[1] : "Artikel Tanpa Judul",
          category: categoryMatch ? categoryMatch[1].trim() : "Blog",
          rawDate: dateMatch ? dateMatch[1] : null,
          dateObj: dateMatch ? new Date(dateMatch[1]) : new Date(0),
          description: descMatch ? descMatch[1] : "",
          thumbnail: thumbMatch ? thumbMatch[1] : ""
        });
      }
    }

    // Urutkan artikel dari yang terbaru
    allPosts.sort((a, b) => b.dateObj - a.dateObj);
    
    // Inisialisasi awal filteredPosts dengan semua artikel
    filteredPosts = [...allPosts];

    // Tampilkan artikel & render tombol pagination
    renderBlogPage();

  } catch (err) {
    console.error("Gagal mengambil data blog:", err);
  }
}

// Fungsi utama merender artikel sesuai halaman aktif
function renderBlogPage() {
  // Hitung batas data artikel untuk halaman ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Potong maksimal 9 artikel sesuai halaman aktif
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

  renderArticles(postsToShow);
  renderPaginationButtons();
}

// Fungsi Render Elemen Artikel ke HTML
function renderArticles(posts) {
  const container = document.getElementById("blog-container");
  if (!container) return;
  
  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--bkm-ink-soft);">Tidak ada artikel dalam kategori ini.</p>`;
    return;
  }

  posts.forEach(post => {
    const formattedDate = post.rawDate 
      ? new Date(post.rawDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
      : "";

    const imageHTML = post.thumbnail 
      ? `<img src="${post.thumbnail}" alt="${post.title}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">`
      : `<div class="bkm-gallery-placeholder">Gambar Artikel</div>`;

    const article = document.createElement("article");
    article.className = "bkm-blog-card";
    article.setAttribute("data-category", post.category.toUpperCase());
    
    article.innerHTML = `
      ${imageHTML}
      <p class="bkm-blog-meta">${post.category} &middot; ${formattedDate}</p>
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <a href="post.html?file=${encodeURIComponent(post.fileName)}" class="bkm-blog-link">Baca Selengkapnya &rarr;</a>
    `;

    container.appendChild(article);
  });
}

// Fungsi Render Tombol-Tombol Pagination
function renderPaginationButtons() {
  const pageNumbersContainer = document.getElementById("pageNumbers");
  if (!pageNumbersContainer) return;

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  pageNumbersContainer.innerHTML = "";

  // Bikin tombol angka halaman
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    if (i === currentPage) {
      btn.classList.add("active");
    }
    btn.onclick = () => goToPage(i);
    pageNumbersContainer.appendChild(btn);
  }

  // Atur kondisi tombol Prev dan Next
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) {
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => changePage(-1);
  }
  
  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    nextBtn.onclick = () => changePage(1);
  }
}

// Navigasi Halaman
function changePage(direction) {
  currentPage += direction;
  renderBlogPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPage(page) {
  currentPage = page;
  renderBlogPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listener untuk Filter Kategori
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter").toUpperCase();

      if (filterValue === "ALL") {
        filteredPosts = [...allPosts];
      } else {
        filteredPosts = allPosts.filter(post => post.category.toUpperCase() === filterValue);
      }

      currentPage = 1; // Reset kembali ke halaman 1 saat filter berubah
      renderBlogPage();
    });
  });
});

loadCMSPosts();
