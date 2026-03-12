<template>
  <section class="about" ref="sectionRef">
    <div id="about-us"></div>

    <div class="about-bg-img" aria-hidden="true"></div>

    <div class="about-bg-text" aria-hidden="true">ABOUT</div>

    <div class="about-container">

      <div class="about-left" :class="{ visible: inView }">
        <div class="img-stack">
          <div class="img-card img-card--back">
            <img src="@/assets/hero.jpeg" alt="Tim Bigger Digital Printing" />
          </div>
          <div class="img-card img-card--front">
            <img src="@/assets/hero2.jpeg" alt="Proses Cetak" />
          </div>
          <div class="float-badge">
            <span class="float-num">10+</span>
            <span class="float-label">Tahun<br>Pengalaman</span>
          </div>
          <div class="float-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
            </svg>
            Kualitas Terjamin
          </div>
        </div>
      </div>

      <div class="about-right" :class="{ visible: inView }">
        <div class="section-label">
          <span class="label-line"></span>
          Tentang Kami
        </div>

        <h2 class="about-title">
          Kami Cetak<br>
          <em>Visi Anda</em><br>
          Jadi Nyata
        </h2>

        <p class="about-lead">
          Bigger Digital Printing hadir sebagai mitra terpercaya dalam solusi cetak digital berkualitas tinggi sejak lebih dari satu dekade.
        </p>

        <p class="about-body">
          Dengan teknologi mesin cetak terkini dan tim profesional berpengalaman, kami memastikan setiap hasil cetakan tampil sempurna mulai dari warna yang akurat hingga detail yang tajam. Kepuasan klien adalah standar kami, bukan sekadar tujuan.
        </p>

        <div class="pillars">
          <div class="pillar" v-for="(p, i) in pillars" :key="p.title" :style="{ '--pi': i }">
            <div class="pillar-icon">
              <span v-html="p.icon"></span>
            </div>
            <div>
              <div class="pillar-title">{{ p.title }}</div>
              <div class="pillar-desc">{{ p.desc }}</div>
            </div>
          </div>
        </div>

        <a href="#" class="about-cta">
          <span>Kenali Lebih Lanjut</span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M1 7.5h13M7.5 1l6.5 6.5-6.5 6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const inView = ref(false)

const pillars = [
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    title: 'Kualitas Premium',
    desc: 'Mesin cetak resolusi tinggi untuk hasil terbaik'
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    title: 'Pengerjaan Cepat',
    desc: 'Tepat waktu tanpa mengorbankan kualitas'
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    title: 'Tim Profesional',
    desc: 'Didukung tenaga ahli berpengalaman di bidangnya'
  },
]

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) inView.value = true },
    { threshold: 0.2 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&display=swap');

.about {
  position: relative;
  background: #ffffff;
  padding: 120px 0 140px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

.about-bg-img {
  position: absolute;
  inset: 0;
  background-image: url('@/assets/balibg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
}

.about::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.6) 0%,
    rgba(255,255,255,0.35) 40%,
    rgba(255,255,255,0.35) 60%,
    rgba(255,255,255,0.6) 100%
  );
  z-index: 0;
  pointer-events: none;
}

.about-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(100px, 18vw, 220px);
  font-weight: 900;
  letter-spacing: -4px;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.04);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 0;
}

.about-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
}

.about-left.visible {
  opacity: 1;
  transform: translateX(0);
}

.about-right {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s;
}

.about-right.visible {
  opacity: 1;
  transform: translateX(0);
}

.img-stack {
  position: relative;
  height: 520px;
}

.img-card {
  position: absolute;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,0.12);
}

.img-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.img-card:hover img {
  transform: scale(1.04);
}

.img-card--back {
  width: 72%;
  height: 74%;
  bottom: 0;
  right: 0;
  border: 4px solid #ffffff;
}

.img-card--front {
  width: 62%;
  height: 60%;
  top: 0;
  left: 0;
  border: 4px solid #ffffff;
  z-index: 2;
  box-shadow: 0 32px 80px rgba(0,0,0,0.18);
}

.float-badge {
  position: absolute;
  bottom: 28px;
  left: -12px;
  z-index: 3;
  background: #111827;
  color: #ffffff;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.2);
  animation: floatBadge 4s ease-in-out infinite;
}

@keyframes floatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.float-num {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1;
  color: #ffffff;
}

.float-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: rgba(255,255,255,0.6);
  line-height: 1.4;
}

.float-tag {
  position: absolute;
  top: 20px;
  right: -16px;
  z-index: 3;
  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 100px;
  padding: 8px 14px;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  animation: floatTag 4s ease-in-out infinite 1s;
}

.float-tag svg { color: #f59e0b; }

@keyframes floatTag {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.section-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 20px;
}

.label-line {
  display: block;
  width: 32px;
  height: 2px;
  background: #111827;
  border-radius: 2px;
  flex-shrink: 0;
}

.about-title {
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -1.5px;
  color: #111827;
  margin-bottom: 24px;
}

.about-title em {
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1.5px #111827;
}

.about-lead {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.65;
  color: #374151;
  margin-bottom: 16px;
}

.about-body {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.85;
  color: #6b7280;
  margin-bottom: 40px;
}

.pillars {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 44px;
}

.pillar {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  border-radius: 14px;
  border: 1px solid #f3f4f6;
  background: #fafafa;
  transition: all 0.25s ease;
  opacity: 0;
  transform: translateY(12px);
}

.about-right.visible .pillar {
  animation: pillarIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: calc(0.4s + var(--pi) * 0.1s);
}

@keyframes pillarIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.pillar:hover {
  border-color: #e5e7eb;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  transform: translateX(4px);
}

.pillar-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #111827;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.pillar:hover .pillar-icon {
  background: #1d4ed8;
  box-shadow: 0 4px 12px rgba(29,78,216,0.3);
}

.pillar-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #111827;
  letter-spacing: 0.2px;
  margin-bottom: 3px;
}

.pillar-desc {
  font-size: 12.5px;
  font-weight: 400;
  color: #9ca3af;
  line-height: 1.5;
}

.about-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-decoration: none;
  color: #ffffff;
  background: #111827;
  border-radius: 12px;
  border: 1.5px solid #111827;
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  position: relative;
  overflow: hidden;
}

.about-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #1d4ed8;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
  z-index: 0;
}

.about-cta span {
  position: relative;
  z-index: 1;
  color: #ffffff;
}

.about-cta svg {
  position: relative;
  z-index: 1;
  color: #ffffff;
  transition: transform 0.25s ease;
}

.about-cta:hover::before { transform: scaleX(1); }
.about-cta:hover { border-color: #1d4ed8; box-shadow: 0 6px 20px rgba(29,78,216,0.28); }
.about-cta:hover svg { transform: translateX(4px); }

@media (max-width: 960px) {
  .about-container {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .img-stack { height: 400px; }

  .about-left {
    transform: translateY(30px);
  }

  .about-left.visible {
    transform: translateY(0);
  }

  .about-right {
    transform: translateY(30px);
  }

  .about-right.visible {
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .about { padding: 80px 0 100px; }

  .about-container { padding: 0 24px; gap: 48px; }

  .img-stack { height: 320px; }

  .float-badge { left: 0; }
  .float-tag { right: 0; }

  .about-title { letter-spacing: -0.5px; }
}
</style>