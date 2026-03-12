<template>
  <div class="landing">
    <NavBar />

    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-overlay-bottom"></div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Solusi Cetak Terbaik
        </div>

        <h1 class="hero-title">
          <span>Print</span>
          <em>Bigger.</em>
          <span>Dream Bigger.</span>
        </h1>

        <p class="hero-desc">
          Kami menghadirkan hasil cetak berkualitas tinggi untuk kebutuhan bisnis dan personal Anda. Dari spanduk besar hingga kartu nama elegan.
        </p>

        <div class="hero-actions">
          <a href="#" class="btn-primary">
            Lihat Layanan Kami
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="#footer" class="btn-secondary">
            Hubungi Kami
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.06 1.22 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">500+</div>
            <div class="stat-label">Klien Puas</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">10+</div>
            <div class="stat-label">Tahun Pengalaman</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Siap Melayani</div>
          </div>
        </div>
      </div>

      <div class="hero-scroll">
        <div class="scroll-line"></div>
        <span class="scroll-text">Scroll</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.landing {
  font-family: 'Montserrat', sans-serif;
}

.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('@/assets/hero.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: zoomOut 8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes zoomOut {
  from { transform: scale(1.08); }
  to   { transform: scale(1.0); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(0,0,0,0.72) 0%,
    rgba(0,0,0,0.45) 50%,
    rgba(0,0,0,0.25) 100%
  );
}

.hero-overlay-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 200px;
  background: linear-gradient(to top, rgba(255,255,255,1) 0%, transparent 100%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  padding-top: 70px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.85);
  margin-bottom: 28px;
  opacity: 0;
  animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
}

.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.65); }
}

.hero-title {
  font-weight: 900;
  font-size: clamp(44px, 7vw, 96px);
  line-height: 0.95;
  letter-spacing: -2px;
  color: #ffffff;
  margin-bottom: 28px;
  max-width: 780px;
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s forwards;
}

.hero-title em {
  font-style: normal;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.55);
  display: block;
}

.hero-title span {
  display: block;
}

.hero-desc {
  font-size: clamp(14px, 1.5vw, 16px);
  font-weight: 400;
  line-height: 1.75;
  color: rgba(255,255,255,0.68);
  max-width: 460px;
  margin-bottom: 44px;
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s forwards;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s forwards;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-decoration: none;
  color: #111827;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
}

.btn-primary svg { transition: transform 0.25s ease; }

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.35);
}

.btn-primary:hover svg { transform: translateX(4px); }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-decoration: none;
  color: rgba(255,255,255,0.88);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.22);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.42);
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  gap: 12px;
  margin-top: 52px;
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s forwards;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.16);
  border-radius: 14px;
  padding: 16px 24px;
  transition: all 0.25s ease;
  min-width: 120px;
}

.stat-card:hover {
  background: rgba(255,255,255,0.16);
  transform: translateY(-3px);
}

.stat-number {
  font-size: 26px;
  font-weight: 800;
  color: rgb(238, 236, 236);
  letter-spacing: -1px;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color:rgb(128, 127, 127);
}

.hero-scroll {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.1s forwards;
}

.scroll-line {
  width: 1px;
  height: 44px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.55), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.6; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(0.6); }
}

.scroll-text {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .hero-content { padding: 0 24px; padding-top: 64px; }
  .hero-title { letter-spacing: -1px; }
  .hero-stats { margin-top: 36px; }
  .hero-scroll { display: none; }
  .stat-label {color: white;}
}

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; align-items: flex-start; }
  .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
}
</style>