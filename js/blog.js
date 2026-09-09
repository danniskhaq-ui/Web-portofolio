 // Variable global untuk menyimpan semua data artikel
let allPosts = [];

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

    // Tampilkan semua artikel pertama kali
    renderArticles(allPosts);

  } catch (err) {
    console.error("Gagal mengambil data blog:", err);
  }
}

// Fungsi Render Artikel
function renderArticles(posts) {
  const container = document.getElementById("blog-container");
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
    // Simpan kategori di data-attribute artikel
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

// Event Listener untuk Tombol Filter
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Ubah status tombol aktif
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter").toUpperCase();

      if (filterValue === "ALL") {
        renderArticles(allPosts);
      } else {
        const filteredPosts = allPosts.filter(post => post.category.toUpperCase() === filterValue);
        renderArticles(filteredPosts);
      }
    });
  });
});

loadCMSPosts();
