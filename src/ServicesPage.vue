<template>
  <div class="services-root">
    <section class="services-section">
      <div class="services-bg-img" aria-hidden="true"></div>
      <div class="services-bg-text" aria-hidden="true">SERVICES</div>

      <div class="services-inner">

        <div class="page-head">
          <span class="page-eyebrow">Layanan Kami</span>
          <h1 class="page-title">Produk <em>Percetakan</em></h1>
          <p class="page-desc">Temukan layanan cetak terlaris kami untuk kebutuhan promosi dan branding Anda.</p>
        </div>

        <div class="search-wrap">
          <div class="search-box" :class="{ focused: searchFocused }">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari produk percetakan..."
              class="search-input"
              @focus="searchFocused = true"
              @blur="searchFocused = false"
            />
            <button v-if="searchQuery" class="search-clear" @click="searchQuery = ''">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="filter-chips">
            <button
              v-for="cat in categories"
              :key="cat"
              class="chip"
              :class="{ 'chip--active': activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div v-if="filteredProducts.length > 0" class="cards-grid">
          <div
            v-for="(product, idx) in filteredProducts"
            :key="product.id"
            class="product-card"
            :style="{ animationDelay: idx * 0.07 + 's' }"
            @click="goToProduct(product)"
          >
            <div class="product-card__img-wrap">
              <img :src="product.img" :alt="product.name" class="product-card__img" />
              <div class="product-card__img-overlay"></div>
              <span v-if="product.badge === 'Terlaris'" class="product-card__badge">🔥 Terlaris
              </span>
              <span class="product-card__category">{{ product.category }}</span>
            </div>

            <div class="product-card__body">
              <h3 class="product-card__name">{{ product.name }}</h3>
              <p class="product-card__desc">{{ product.desc }}</p>

              <div class="product-card__footer">
                <div class="product-card__price">
                  <span class="price-val">{{ product.startPrice }}</span>
                  <span class="price-unit">{{ product.unit }}</span>
                </div>
                <button class="product-card__btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="empty-img-wrap">
            <img src="/produk/notfound.png" alt="Produk tidak ditemukan" class="empty-img" />
          </div>
          <h3 class="empty-title">Produk Tidak Ditemukan</h3>
          <p class="empty-desc">
            Tidak ada produk yang cocok dengan pencarian
            <strong v-if="searchQuery">"{{ searchQuery }}"</strong>.
            Coba kata kunci lain atau hapus filter.
          </p>
          <button class="empty-reset" @click="resetFilter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            Reset Pencarian
          </button>
        </div>

        <div class="results-info" v-if="searchQuery || activeCategory !== 'Semua'">
          <span>Menampilkan <strong>{{ filteredProducts.length }}</strong> produk</span>
          <button class="results-reset" @click="resetFilter">Tampilkan Semua</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import productsData from '@/data/products.json'

const router = useRouter()

const searchQuery = ref('')
const searchFocused = ref(false)
const activeCategory = ref('Semua')

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})

const categories = computed(() => {
  return ['Semua', ...new Set(productsData.map(p => p.category))]
})

const filteredProducts = computed(() => {
  let result = productsData

  if (activeCategory.value !== 'Semua') {
    result = result.filter(p => p.category === activeCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.badge.toLowerCase().includes(q)
    )
  }

  return result
})

function goToProduct(product) {
  router.push(product.route)
}

function resetFilter() {
  searchQuery.value = ''
  activeCategory.value = 'Semua'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

.services-root {
  font-family: 'Montserrat', sans-serif;
  background: #f4f4f0;
  min-height: 100vh;
}

.services-section {
  position: relative;
  padding: 120px 24px 100px;
  overflow: hidden;
  min-height: 100vh;
}

.services-bg-img {
  position: absolute;
  inset: 0;
  background-image: url('@/assets/balibg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.07;
  pointer-events: none;
  z-index: 0;
}

.services-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(244,244,240,0.6) 0%,
    rgba(244,244,240,0.25) 40%,
    rgba(244,244,240,0.25) 60%,
    rgba(244,244,240,0.6) 100%
  );
  z-index: 0;
  pointer-events: none;
}

.services-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(80px, 16vw, 220px);
  font-weight: 900;
  letter-spacing: -4px;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.04);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 0;
}

.services-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.page-head {
  text-align: center;
  margin-bottom: 48px;
}

.page-eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #111827;
  background: rgba(255,255,255,0.85);
  border: 1px solid #e5e7eb;
  padding: 6px 16px;
  border-radius: 999px;
  margin-bottom: 18px;
}

.page-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900;
  color: #111827;
  margin: 0 0 14px;
  line-height: 1.1;
  letter-spacing: -1px;
}

.page-title em {
  font-style: normal;
  color: #1d4ed8;
}

.page-desc {
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
  max-width: 440px;
  margin: 0 auto;
  line-height: 1.7;
}

.search-wrap {
  max-width: 680px;
  margin: 0 auto 48px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 16px;
  padding: 0 16px;
  height: 54px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  margin-bottom: 16px;
}

.search-box.focused {
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29,78,216,0.08), 0 4px 16px rgba(0,0,0,0.06);
}

.search-icon {
  color: #9ca3af;
  flex-shrink: 0;
  margin-right: 12px;
  transition: color 0.2s ease;
}

.search-box.focused .search-icon {
  color: #1d4ed8;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #111827;
  background: transparent;
}

.search-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.search-clear {
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.search-clear:hover {
  background: #e5e7eb;
  color: #111827;
}

.filter-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.chip {
  padding: 7px 18px;
  background: rgba(255,255,255,0.85);
  border: 1.5px solid #e5e7eb;
  border-radius: 999px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.chip:hover {
  border-color: #111827;
  color: #111827;
}

.chip--active {
  background: #111827;
  border-color: #111827;
  color: #ffffff;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.product-card {
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  border: 1.5px solid #e5e7eb;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.2s ease;
  animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0,0,0,0.1);
  border-color: #1d4ed8;
}

.product-card__img-wrap {
  position: relative;
  height: 190px;
  overflow: hidden;
  background: #f3f4f6;
}

.product-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-card__img {
  transform: scale(1.07);
}

.product-card__img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%);
}

.product-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  color: #fff;
  background: #059669;
}


.product-card__category {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.85);
}

.product-card__body {
  padding: 18px;
}

.product-card__name {
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px;
  letter-spacing: -0.2px;
}

.product-card__desc {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
  line-height: 1.6;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.product-card__price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex-wrap: wrap;
}

.price-from {
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 600;
}

.price-val {
  font-size: 1rem;
  font-weight: 900;
  color: #1d4ed8;
  letter-spacing: -0.3px;
}

.price-unit {
  font-size: 0.7rem;
  color: #9ca3af;
  font-weight: 500;
}

.product-card__btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #111827;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #059669;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.product-card:hover .product-card__btn {
  background: #1d4ed8;
}

.results-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28px;
  padding: 12px 18px;
  background: rgba(255,255,255,0.75);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
  backdrop-filter: blur(8px);
}

.results-info strong {
  color: #111827;
}

.results-reset {
  background: none;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1d4ed8;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}

.results-reset:hover {
  color: #111827;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
  animation: cardIn 0.4s ease both;
}

.empty-img-wrap {
  width: 120px;
  height: 120px;
  background: rgba(255,255,255,0.85);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  border: 2px solid #e5e7eb;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}

.empty-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.35;
  filter: grayscale(1);
}

.empty-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 10px;
}

.empty-desc {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
  max-width: 360px;
  line-height: 1.7;
  margin: 0 0 28px;
}

.empty-desc strong {
  color: #374151;
}

.empty-reset {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background: #111827;
  color: #fff;
  background: #059669;
  border: none;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-reset:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(29,78,216,0.25);
}

@media (max-width: 768px) {
  .services-section {
    padding: 100px 16px 80px;
  }

  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .product-card__img-wrap {
    height: 150px;
  }

  .product-card__body {
    padding: 14px;
  }

  .product-card__name {
    font-size: 0.9rem;
  }

  .search-wrap {
    margin-bottom: 36px;
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .product-card__img-wrap {
    height: 120px;
  }

  .product-card__desc {
    display: none;
  }

  .product-card__body {
    padding: 10px 12px 12px;
  }

  .price-val {
    font-size: 0.875rem;
  }

  .filter-chips {
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
  }

  .filter-chips::-webkit-scrollbar {
    display: none;
  }

  .chip {
    flex-shrink: 0;
    padding: 6px 14px;
  }
}
</style>