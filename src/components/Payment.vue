<template>
  <div class="page">
    <NavBar />

    <main class="main">
      <div class="page-container">

        <div class="page-header" :class="{ visible: mounted }">
          <RouterLink to="/" class="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Kembali ke Beranda
          </RouterLink>
          <div class="header-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Konfirmasi Pembayaran
          </div>
          <h1 class="page-title">
            Konfirmasi<br>
            <em>Pembayaran</em>
          </h1>
          <p class="page-desc">
            Masukkan kode pesanan kamu, lalu kirim bukti pembayaran langsung ke WhatsApp admin kami.
          </p>
        </div>

        <div class="form-area" :class="{ visible: mounted }">
          <div class="form-card">

            <div class="form-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>

            <h2 class="form-title">Masukkan Kode Pesanan</h2>
            <p class="form-subtitle">
              Kode pesanan tersedia di pesan WhatsApp saat kamu memesan. Contoh: <strong>SPD-ABCD</strong>
            </p>

            <div class="input-group">
              <label class="input-label">Kode Pesanan</label>
              <div class="input-wrap" :class="{ focused: isFocused, error: showError }">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <input
                  v-model="orderCode"
                  type="text"
                  placeholder="Contoh: SPD-ABCD"
                  maxlength="12"
                  @input="handleInput"
                  @focus="isFocused = true; showError = false"
                  @blur="isFocused = false"
                  @keyup.enter="sendToWhatsApp"
                />
                <button v-if="orderCode" class="input-clear" @click="orderCode = ''; showError = false">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <p v-if="showError" class="error-msg">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Kode pesanan tidak boleh kosong
              </p>
              <p v-else class="hint-msg">Kode dikirim otomatis saat kamu klik "Kirim ke WhatsApp" saat order</p>
            </div>

            <!-- Preview template pesan -->
            <div v-if="orderCode.trim()" class="preview-box">
              <div class="preview-head">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Preview pesan yang akan dikirim
              </div>
              <div class="preview-body">
                <p>*KONFIRMASI PEMBAYARAN*</p>
                <p>Kode Pesanan: <strong>{{ orderCode.trim().toUpperCase() }}</strong></p>
                <p>Terlampir bukti transfer pembayaran.</p>
                <p>Mohon dikonfirmasi. Terima kasih! 🙏</p>
              </div>
            </div>

            <button @click="sendToWhatsApp" class="wa-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Kirim Bukti ke WhatsApp
            </button>

            <div class="info-box">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01" stroke-linecap="round"/>
              </svg>
              <span>Setelah WhatsApp terbuka, <strong>lampirkan foto bukti transfer</strong> sebelum mengirim pesan.</span>
            </div>

          </div>
        </div>

      </div>
    </main>

    <FooterSection />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const waNumber  = '628176819935'
const mounted   = ref(false)
const orderCode = ref('')
const isFocused = ref(false)
const showError = ref(false)

function handleInput() {
  orderCode.value = orderCode.value.toUpperCase()
  showError.value = false
}

function sendToWhatsApp() {
  if (!orderCode.value.trim()) {
    showError.value = true
    return
  }

  const code = orderCode.value.trim().toUpperCase()
  const msg  = `*KONFIRMASI PEMBAYARAN*\nKode Pesanan: ${code}\nTerlampir bukti transfer pembayaran.\nMohon dikonfirmasi. Terima kasih! 🙏`

  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank')
}

onMounted(() => { setTimeout(() => { mounted.value = true }, 50) })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap');

.page { font-family: 'Montserrat', sans-serif; min-height: 100vh; background: #f9fafb; }
.main { padding-top: 70px; }
.page-container { max-width: 640px; margin: 0 auto; padding: 60px 24px 100px; }

.page-header {
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.page-header.visible { opacity: 1; transform: translateY(0); }

.back-link {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 12.5px; font-weight: 600; color: #6b7280;
  text-decoration: none; margin-bottom: 28px; transition: all 0.2s ease;
}
.back-link:hover { color: #111827; gap: 10px; }

.header-badge {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 6px 14px; background: #f3f4f6; border-radius: 100px;
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; color: #374151; margin-bottom: 20px;
}

.page-title {
  font-size: clamp(32px, 5vw, 48px); font-weight: 900;
  line-height: 1.05; letter-spacing: -1.5px; color: #111827; margin-bottom: 16px;
}
.page-title em { font-style: italic; color: transparent; -webkit-text-stroke: 1.5px #111827; }
.page-desc { font-size: 14.5px; font-weight: 400; line-height: 1.7; color: #6b7280; }

.form-area {
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s;
}
.form-area.visible { opacity: 1; transform: translateY(0); }

.form-card {
  background: #fff; border-radius: 24px; padding: 40px;
  border: 1px solid #f3f4f6; box-shadow: 0 8px 40px rgba(0,0,0,0.06);
}

.form-icon {
  width: 52px; height: 52px; background: #111827; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; margin-bottom: 20px;
}

.form-title { font-size: 20px; font-weight: 800; color: #111827; letter-spacing: -0.5px; margin-bottom: 8px; }
.form-subtitle { font-size: 13.5px; color: #6b7280; line-height: 1.6; margin-bottom: 32px; }
.form-subtitle strong { color: #111827; }

.input-group { margin-bottom: 24px; }
.input-label { display: block; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #374151; margin-bottom: 10px; }

.input-wrap {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px; border: 1.5px solid #e5e7eb;
  border-radius: 12px; background: #fff; transition: all 0.2s ease;
}
.input-wrap svg { color: #9ca3af; flex-shrink: 0; transition: color 0.2s ease; }
.input-wrap.focused { border-color: #111827; box-shadow: 0 0 0 3px rgba(17,24,39,0.06); }
.input-wrap.focused svg { color: #111827; }
.input-wrap.error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.08); }
.input-wrap input {
  flex: 1; border: none; outline: none;
  font-family: 'Montserrat', sans-serif; font-size: 15px;
  font-weight: 600; color: #111827; letter-spacing: 1px; background: transparent;
}
.input-wrap input::placeholder { color: #d1d5db; font-weight: 400; letter-spacing: 0.5px; }
.input-clear { background: none; border: none; cursor: pointer; color: #9ca3af; padding: 2px; display: flex; align-items: center; transition: color 0.2s ease; }
.input-clear:hover { color: #374151; }

.error-msg { display: flex; align-items: center; gap: 6px; margin-top: 8px; font-size: 12px; font-weight: 600; color: #ef4444; }
.hint-msg { margin-top: 8px; font-size: 12px; font-weight: 500; color: #9ca3af; }

.preview-box {
  border: 1.5px solid #e5e7eb; border-radius: 14px;
  overflow: hidden; margin-bottom: 20px;
  animation: fadeIn 0.3s ease both;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

.preview-head {
  display: flex; align-items: center; gap: 8px;
  background: #f3f4f6; padding: 10px 16px;
  font-size: 11.5px; font-weight: 700; color: #6b7280;
  letter-spacing: 0.3px;
}
.preview-head svg { color: #9ca3af; }

.preview-body {
  padding: 16px; background: #fff;
  font-size: 13px; color: #374151;
  line-height: 1.8;
}
.preview-body p { margin: 0; }
.preview-body strong { color: #1d4ed8; }

.wa-btn {
  width: 100%; padding: 16px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700;
  color: #fff; background: #16a34a; border: none; border-radius: 12px;
  cursor: pointer; transition: all 0.25s ease; margin-bottom: 16px;
}
.wa-btn:hover { background: #15803d; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.3); }

.info-box {
  display: flex; align-items: flex-start; gap: 9px;
  padding: 13px 15px; background: #fffbeb;
  border: 1px solid #fde68a; border-radius: 10px;
  font-size: 12.5px; font-weight: 500; color: #92400e; line-height: 1.6;
}
.info-box svg { color: #d97706; flex-shrink: 0; margin-top: 1px; }
.info-box strong { color: #78350f; }

@media (max-width: 640px) {
  .page-container { padding: 40px 20px 80px; }
  .form-card { padding: 28px 20px; }
}
</style>