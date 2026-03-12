<template>
  <section class="payment" ref="sectionRef">
    <div id="payment"></div>

    <div class="payment-bg-img" aria-hidden="true"></div>

    <div class="payment-bg-text" aria-hidden="true">PAYMENT</div>

    <div class="payment-container">

      <div class="payment-header" :class="{ visible: inView }">
        <div class="section-label">
          <span class="label-line"></span>
          Cara Pembayaran
        </div>
        <h2 class="payment-title">
          Bayar Mudah,<br>
          <em>Dari Mana Saja</em>
        </h2>
        <p class="payment-desc">
          Kami menerima pembayaran via QRIS dan transfer bank untuk kemudahan transaksi Anda dari jarak jauh.
        </p>
      </div>

      <div class="payment-grid">

        <div class="qris-card" :class="{ visible: inView }">
          <div class="qris-top">
            <div class="qris-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M14 14h2v2h-2zM18 14h3v2h-3zM14 18h2v3h-2zM18 18h3v3h-3z" fill="currentColor"/>
              </svg>
              QRIS
            </div>
            <span class="qris-subtitle">Scan & Bayar Instan</span>
          </div>

          <div class="qris-frame">
            <img src="@/assets/qris.jpeg" alt="QRIS Bigger Digital Printing" class="qris-img" />
            <div class="qris-corners">
              <span class="corner tl"></span>
              <span class="corner tr"></span>
              <span class="corner bl"></span>
              <span class="corner br"></span>
            </div>
          </div>

          <div class="qris-info">
            <p class="qris-name">Bigger Digital Printing</p>
            <p class="qris-note">Berlaku untuk semua e-wallet & m-banking</p>
          </div>

          <div class="qris-apps">
            <div class="app-chip" v-for="app in qrisApps" :key="app">{{ app }}</div>
          </div>
        </div>

        <div class="banks-col" :class="{ visible: inView }">
          <div class="banks-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
            Transfer Bank
          </div>

          <div
            class="bank-card"
            v-for="(bank, i) in banks"
            :key="bank.name"
            :style="{ '--bi': i }"
            :class="{ visible: inView, copied: copiedIndex === i }"
            @click="copyAccount(bank.account, i)"
          >
            <div class="bank-left">
              <div class="bank-logo">
                <img :src="bank.logo" :alt="bank.name" />
              </div>
              <div class="bank-info">
                <div class="bank-name">{{ bank.name }}</div>
                <div class="bank-account">{{ bank.account }}</div>
                <div class="bank-holder">a.n. {{ bank.holder }}</div>
              </div>
            </div>
            <div class="bank-copy">
              <transition name="copy-fade" mode="out-in">
                <span v-if="copiedIndex === i" key="copied" class="copy-done">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Tersalin
                </span>
                <span v-else key="copy" class="copy-idle">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Salin
                </span>
              </transition>
            </div>
          </div>

          <div class="payment-note" :class="{ visible: inView }">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>Setelah transfer, masukkan kode pesanan Anda untuk konfirmasi pembayaran dan menghindari penipuan.</p>
          </div>

          <a class="confirm-btn" :class="{ visible: inView }" @click.prevent="handleConfirmClick" href="/payment">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Lakukan Pembayaran</span>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sectionRef = ref(null)
const inView = ref(false)
const copiedIndex = ref(null)

const qrisApps = ['GoPay', 'OVO', 'Dana', 'ShopeePay', 'LinkAja', 'M-Banking']

const banks = [
  {
    name: 'Bank BPD Bali',
    account: '0460202085602',
    holder: 'KETUT SUKADANA',
    logo: '/bpd.png',
  },
  {
    name: 'Bank BRI',
    account: '475701015280533',
    holder: 'KETUT SUKADANA',
    logo: '/bri.png',
  },
]

function copyAccount(account, index) {
  navigator.clipboard.writeText(account).then(() => {
    copiedIndex.value = index
    setTimeout(() => { copiedIndex.value = null }, 2000)
  })
}

async function handleConfirmClick() {
  if (route.path === '/payment') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    await router.push('/payment')
    await new Promise(r => setTimeout(r, 80))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) inView.value = true },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap');

.payment {
  position: relative;
  background: #f9fafb;
  padding: 120px 0 120px;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

.payment-bg-img {
  position: absolute;
  inset: 0;
  background-image: url('@/assets/balibg.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.06;
  pointer-events: none;
  z-index: 0;
}

.payment::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(249,250,251,0.55) 0%,
    rgba(249,250,251,0.30) 40%,
    rgba(249,250,251,0.30) 60%,
    rgba(249,250,251,0.55) 100%
  );
  z-index: 0;
  pointer-events: none;
}

.payment-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(80px, 16vw, 200px);
  font-weight: 900;
  letter-spacing: -4px;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.04);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 0;
}

.payment-container {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
}

.payment-header {
  text-align: center;
  margin-bottom: 64px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
}

.payment-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-label {
  display: inline-flex;
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

.payment-title {
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -1.5px;
  color: #111827;
  margin-bottom: 16px;
}

.payment-title em {
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1.5px #111827;
}

.payment-desc {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.75;
  color: #6b7280;
  max-width: 460px;
  margin: 0 auto;
}

.payment-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 32px;
  align-items: start;
}

.qris-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 32px;
  border: 1px solid #f3f4f6;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s;
}

.qris-card.visible {
  opacity: 1;
  transform: translateX(0);
}

.qris-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.qris-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  background: #111827;
  color: #ffffff;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

.qris-subtitle {
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
}

.qris-frame {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1.5px solid #f3f4f6;
  margin-bottom: 20px;
  background: #ffffff;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qris-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  object-fit: contain;
}

.qris-corners {
  position: absolute;
  inset: 8px;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: #111827;
  border-style: solid;
}

.corner.tl { top: 0; left: 0; border-width: 2.5px 0 0 2.5px; border-radius: 4px 0 0 0; }
.corner.tr { top: 0; right: 0; border-width: 2.5px 2.5px 0 0; border-radius: 0 4px 0 0; }
.corner.bl { bottom: 0; left: 0; border-width: 0 0 2.5px 2.5px; border-radius: 0 0 0 4px; }
.corner.br { bottom: 0; right: 0; border-width: 0 2.5px 2.5px 0; border-radius: 0 0 4px 0; }

.qris-info {
  text-align: center;
  margin-bottom: 18px;
}

.qris-name {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
}

.qris-note {
  font-size: 11.5px;
  color: #9ca3af;
}

.qris-apps {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  justify-content: center;
}

.app-chip {
  padding: 5px 12px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.2s ease;
  cursor: default;
}

.app-chip:hover {
  background: #111827;
  color: #ffffff;
  border-color: #111827;
}

.banks-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s;
}

.banks-col.visible {
  opacity: 1;
  transform: translateX(0);
}

.banks-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 4px;
}

.bank-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 22px;
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.25s ease;
  opacity: 0;
  transform: translateY(12px);
  gap: 12px;
}

.banks-col.visible .bank-card {
  animation: bankIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
  animation-delay: calc(0.3s + var(--bi) * 0.1s);
}

@keyframes bankIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.bank-card:hover {
  border-color: #e5e7eb;
  box-shadow: 0 8px 24px rgba(0,0,0,0.07);
  transform: translateX(4px);
}

.bank-card.copied {
  border-color: #bbf7d0;
  background: #f0fdf4;
}

.bank-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.bank-logo {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #f3f4f6;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 6px;
}

.bank-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.bank-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
}

.bank-account {
  font-size: 15px;
  font-weight: 700;
  color: #1d4ed8;
  letter-spacing: 1.5px;
  margin-bottom: 3px;
  font-variant-numeric: tabular-nums;
}

.bank-holder {
  font-size: 11.5px;
  font-weight: 500;
  color: #9ca3af;
}

.bank-copy {
  flex-shrink: 0;
}

.copy-idle,
.copy-done {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 14px;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.copy-idle {
  background: #f9fafb;
  color: #6b7280;
  border: 1px solid #f3f4f6;
}

.copy-done {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.copy-fade-enter-active,
.copy-fade-leave-active {
  transition: all 0.2s ease;
}

.copy-fade-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.copy-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.payment-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s;
}

.payment-note.visible {
  opacity: 1;
  transform: translateY(0);
}

.payment-note svg {
  color: #d97706;
  flex-shrink: 0;
  margin-top: 1px;
}

.payment-note p {
  font-size: 12.5px;
  font-weight: 500;
  color: #92400e;
  line-height: 1.65;
}

.confirm-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-decoration: none;
  color: #ffffff;
  background: #111827;
  border-radius: 12px;
  border: 1.5px solid #111827;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.confirm-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #1d4ed8;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}

.confirm-btn span,
.confirm-btn svg {
  position: relative;
  z-index: 1;
  color: #ffffff;
}

.confirm-btn svg {
  transition: transform 0.25s ease;
}

.confirm-btn.visible {
  opacity: 1;
  transform: translateY(0);
}

.confirm-btn:hover::before { transform: scaleX(1); }
.confirm-btn:hover { border-color: #1d4ed8; box-shadow: 0 6px 20px rgba(29,78,216,0.28); }
.confirm-btn:hover svg { transform: scale(1.1); }

@media (max-width: 960px) {
  .payment-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
    margin: 0 auto;
  }

  .qris-card,
  .banks-col {
    transform: translateY(24px);
  }

  .qris-card.visible,
  .banks-col.visible {
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .payment {
    padding: 80px 0 64px;
  }
  .payment-container { padding: 0 24px; }
  .payment-title { letter-spacing: -0.5px; }
  .qris-card { padding: 24px; }
  .bank-account { font-size: 13px; letter-spacing: 1px; }
}
</style>