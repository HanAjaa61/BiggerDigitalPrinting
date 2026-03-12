<template>
  <section class="collab" ref="sectionRef">
    <div id="collab"></div>

    <div class="collab-bg-img" aria-hidden="true"></div>
    <div class="collab-bg-text" aria-hidden="true">KOLABORASI</div>

    <div class="collab-container">

      <div class="collab-header" :class="{ visible: inView }">
        <div class="section-label">
          <span class="label-line"></span>
          Kerja Sama
        </div>
        <h2 class="collab-title">
          Kami Menerima<br>
          <em>Kerja Sama Desainer</em>
        </h2>
        <p class="collab-desc">
          Bergabunglah bersama jaringan desainer grafis kami di seluruh Indonesia. Wujudkan karya terbaik Anda menjadi produk nyata bersama Bigger Digital Printing.
        </p>
      </div>

      <div class="collab-grid">

        <div class="collab-visual" :class="{ visible: inView }">
          <div class="visual-frame">
            <img src="@/assets/collabillustration.png" alt="Kerja Sama Desainer" class="visual-img" />
            <div class="visual-corners">
              <span class="corner tl"></span>
              <span class="corner tr"></span>
              <span class="corner bl"></span>
              <span class="corner br"></span>
            </div>
          </div>

          <div class="collab-badges">
            <div class="badge" v-for="b in badges" :key="b.text">
              <span class="badge-dot"></span>
              {{ b.text }}
            </div>
          </div>

          <div class="collab-perks">
            <div class="perk" v-for="perk in perks" :key="perk.title">
              <div class="perk-icon" v-html="perk.icon"></div>
              <div>
                <div class="perk-title">{{ perk.title }}</div>
                <div class="perk-desc">{{ perk.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="collab-form-col" :class="{ visible: inView }">
          <div class="form-card">

            <div class="form-header">
              <div class="form-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Formulir Pendaftaran
              </div>
              <p class="form-sub">Isi data di bawah ini untuk memulai kerja sama</p>
            </div>

            <!-- Fields -->
            <div class="form-fields">

              <div class="field-group" :class="{ focused: focus.nama, filled: form.nama }">
                <label class="field-label">Nama Lengkap</label>
                <div class="field-wrap">
                  <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <input
                    v-model="form.nama"
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    @focus="focus.nama = true"
                    @blur="focus.nama = false"
                    class="field-input"
                  />
                </div>
              </div>

              <div class="field-group" :class="{ focused: focus.telepon, filled: form.telepon }">
                <label class="field-label">Nomor Telepon / WhatsApp</label>
                <div class="field-wrap">
                  <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <input
                    v-model="form.telepon"
                    type="tel"
                    placeholder="cth: 0812-3456-7890"
                    @focus="focus.telepon = true"
                    @blur="focus.telepon = false"
                    class="field-input"
                  />
                </div>
              </div>

              <div class="field-group" :class="{ focused: focus.domisili, filled: form.domisili }">
                <label class="field-label">Domisili</label>
                <div class="field-wrap">
                  <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <input
                    v-model="form.domisili"
                    type="text"
                    placeholder="cth: Denpasar, Bali"
                    @focus="focus.domisili = true"
                    @blur="focus.domisili = false"
                    class="field-input"
                  />
                </div>
              </div>

              <!-- Dropdown Alasan -->
              <div class="field-group dropdown-group" :class="{ focused: dropdownOpen, filled: form.alasan }">
                <label class="field-label">Alasan Bergabung</label>
                <div class="field-wrap dropdown-wrap" @click="toggleDropdown" ref="dropdownRef">
                  <svg class="field-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <div class="dropdown-display">
                    <span :class="form.alasan ? 'selected-val' : 'placeholder-val'">
                      {{ form.alasan || 'Pilih alasan Anda bergabung' }}
                    </span>
                  </div>
                  <svg class="dropdown-arrow" :class="{ open: dropdownOpen }" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <transition name="dropdown-slide">
                  <div class="dropdown-menu" v-if="dropdownOpen">
                    <div
                      class="dropdown-item"
                      v-for="opt in alasanOptions"
                      :key="opt"
                      :class="{ active: form.alasan === opt }"
                      @click.stop="selectAlasan(opt)"
                    >
                      <svg v-if="form.alasan === opt" width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      {{ opt }}
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Textarea alasan custom -->
              <transition name="fade-down">
                <div class="field-group" v-if="form.alasan === 'Lainnya'" :class="{ focused: focus.alasanCustom, filled: form.alasanCustom }">
                  <label class="field-label">Ceritakan Alasan Anda</label>
                  <div class="field-wrap textarea-wrap">
                    <textarea
                      v-model="form.alasanCustom"
                      placeholder="Tuliskan alasan Anda bergabung..."
                      rows="3"
                      @focus="focus.alasanCustom = true"
                      @blur="focus.alasanCustom = false"
                      class="field-input field-textarea"
                    ></textarea>
                  </div>
                </div>
              </transition>

            </div>

            <!-- Validation note -->
            <transition name="fade-down">
              <div class="validation-note" v-if="showValidation">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Mohon lengkapi semua data terlebih dahulu.
              </div>
            </transition>

            <!-- Submit -->
            <button class="submit-btn" @click="sendToWhatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Kirim via WhatsApp</span>
            </button>

            <p class="form-privacy">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Data Anda aman dan hanya digunakan untuk keperluan kerja sama.
            </p>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sectionRef = ref(null)
const dropdownRef = ref(null)
const inView = ref(false)
const dropdownOpen = ref(false)
const showValidation = ref(false)

const form = ref({
  nama: '',
  telepon: '',
  domisili: '',
  alasan: '',
  alasanCustom: '',
})

const focus = ref({
  nama: false,
  telepon: false,
  domisili: false,
  alasanCustom: false,
})

const badges = [
  { text: 'Seluruh Indonesia' },
  { text: 'Freelance Friendly' },
  { text: 'Komisi Kompetitif' },
]

const perks = [
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    title: 'Komisi Menarik',
    desc: 'Dapatkan komisi dari setiap order yang masuk melalui desain Anda.',
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
    title: 'Cetak Berkualitas',
    desc: 'Karya Anda dicetak dengan mesin & bahan premium terbaik.',
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    title: 'Jaringan Luas',
    desc: 'Bergabung dalam komunitas desainer Bigger di seluruh Indonesia.',
  },
]

const alasanOptions = [
  'Ingin menambah penghasilan dari desain',
  'Mencari mitra cetak terpercaya',
  'Ingin memperluas jangkauan klien',
  'Tertarik dengan program reseller',
  'Lainnya',
]

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function selectAlasan(opt) {
  form.value.alasan = opt
  dropdownOpen.value = false
  if (opt !== 'Lainnya') form.value.alasanCustom = ''
}

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}

function sendToWhatsapp() {
  const { nama, telepon, domisili, alasan, alasanCustom } = form.value
  if (!nama || !telepon || !domisili || !alasan) {
    showValidation.value = true
    setTimeout(() => { showValidation.value = false }, 3000)
    return
  }

  const alasanFinal = alasan === 'Lainnya' ? alasanCustom || '-' : alasan

  const pesan = `Halo Bigger Digital Printing! 

Saya ingin mendaftar sebagai mitra desainer grafis.

*Nama Lengkap:* ${nama}
*No. Telepon:* ${telepon}
*Domisili:* ${domisili}
*Alasan Bergabung:* ${alasanFinal}

Mohon informasi lebih lanjut mengenai kerja sama ini. Terima kasih! `

  const waNumber = '628176819935' 
  const encoded = encodeURIComponent(pesan)
  window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank')
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) inView.value = true },
    { threshold: 0.1 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap');

.collab {
  position: relative;
  background: #f9fafb;
  padding: 120px 0;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}

.collab-bg-img {
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

.collab::before {
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

.collab-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: clamp(48px, 10vw, 160px);
  font-weight: 900;
  letter-spacing: -4px;
  color: transparent;
  -webkit-text-stroke: 1px rgba(0,0,0,0.04);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 0;
}

.collab-container {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ── Header ── */
.collab-header {
  text-align: center;
  margin-bottom: 64px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
}
.collab-header.visible { opacity: 1; transform: translateY(0); }

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

.collab-title {
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -1.5px;
  color: #111827;
  margin-bottom: 16px;
}

.collab-title em {
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1.5px #111827;
}

.collab-desc {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.75;
  color: #6b7280;
  max-width: 480px;
  margin: 0 auto;
}

/* ── Grid ── */
.collab-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 36px;
  align-items: start;
}

/* ── Visual / Ilustrasi ── */
.collab-visual {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s;
}
.collab-visual.visible { opacity: 1; transform: translateX(0); }

.visual-frame {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  border: 1.5px solid #f3f4f6;
  background: #ffffff;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  object-fit: contain;
}

.visual-corners {
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

.collab-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 14px;
  background: #111827;
  color: #ffffff;
  border-radius: 100px;
  font-size: 11.5px;
  font-weight: 700;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  flex-shrink: 0;
}

.collab-perks {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.perk {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.perk:hover {
  border-color: #e5e7eb;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transform: translateX(4px);
}

.perk-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #111827;
}

.perk-title {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 3px;
}

.perk-desc {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.6;
}

/* ── Form ── */
.collab-form-col {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s;
}
.collab-form-col.visible { opacity: 1; transform: translateX(0); }

.form-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 32px;
  border: 1px solid #f3f4f6;
  box-shadow: 0 8px 40px rgba(0,0,0,0.06);
}

.form-header {
  margin-bottom: 28px;
}

.form-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  background: #111827;
  color: #ffffff;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.form-sub {
  font-size: 12.5px;
  color: #9ca3af;
  font-weight: 500;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

/* Field group */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
}

.field-label {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #374151;
  text-transform: uppercase;
}

.field-wrap {
  position: relative;
  display: flex;
  align-items: center;
  background: #f9fafb;
  border: 1.5px solid #f3f4f6;
  border-radius: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  cursor: text;
}

.field-group.focused .field-wrap {
  border-color: #111827;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(17,24,39,0.06);
}

.field-group.filled .field-wrap {
  border-color: #e5e7eb;
  background: #ffffff;
}

.field-icon {
  position: absolute;
  left: 14px;
  color: #9ca3af;
  pointer-events: none;
  flex-shrink: 0;
  transition: color 0.2s;
}

.field-group.focused .field-icon { color: #111827; }

.field-input {
  width: 100%;
  padding: 13px 14px 13px 38px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  color: #111827;
  background: transparent;
  border: none;
  outline: none;
  border-radius: 12px;
}

.field-input::placeholder { color: #c4c9d4; font-weight: 400; }

.field-textarea {
  resize: none;
  padding-top: 12px;
  line-height: 1.6;
}

/* Dropdown */
.dropdown-wrap {
  cursor: pointer;
  user-select: none;
}

.dropdown-display {
  flex: 1;
  padding: 13px 14px 13px 38px;
  font-size: 13.5px;
  font-weight: 500;
}

.placeholder-val { color: #c4c9d4; font-weight: 400; }
.selected-val { color: #111827; }

.dropdown-arrow {
  position: absolute;
  right: 14px;
  color: #9ca3af;
  transition: transform 0.25s ease;
  pointer-events: none;
}
.dropdown-arrow.open { transform: rotate(180deg); }

.dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 12px 32px rgba(0,0,0,0.10);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s ease;
}

.dropdown-item:hover { background: #f9fafb; }
.dropdown-item.active { background: #f0fdf4; color: #16a34a; font-weight: 700; }
.dropdown-item.active svg { color: #16a34a; flex-shrink: 0; }

/* Dropdown animation */
.dropdown-slide-enter-active,
.dropdown-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1);
}
.dropdown-slide-enter-from,
.dropdown-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Fade down */
.fade-down-enter-active,
.fade-down-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Validation */
.validation-note {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 4px;
}

.validation-note svg { color: #dc2626; flex-shrink: 0; }

/* Submit button */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 26px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff;
  background: #25d366;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease;
  margin-bottom: 14px;
}

.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #128c7e;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}

.submit-btn span,
.submit-btn svg {
  position: relative;
  z-index: 1;
}

.submit-btn:hover::before { transform: scaleX(1); }
.submit-btn:hover { box-shadow: 0 6px 20px rgba(37,211,102,0.35); }
.submit-btn:active { transform: scale(0.98); }

.form-privacy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  color: #9ca3af;
  text-align: center;
}

.form-privacy svg { color: #9ca3af; flex-shrink: 0; }

/* ── Responsive ── */
@media (max-width: 960px) {
  .collab-grid {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }

  .collab-visual,
  .collab-form-col {
    transform: translateY(24px);
  }

  .collab-visual.visible,
  .collab-form-col.visible {
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .collab { padding: 80px 0 64px; }
  .collab-container { padding: 0 24px; }
  .collab-title { letter-spacing: -0.5px; }
  .form-card { padding: 24px; }
}
</style>