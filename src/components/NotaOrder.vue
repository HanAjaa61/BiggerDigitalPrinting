<template>
  <div class="nota-root">
    <section class="nota-section">
      <div class="nota-bg-img" aria-hidden="true"></div>
      <div class="nota-inner">

        <div class="page-head">
          <button class="back-btn" @click="$router.push('/services')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Kembali ke Layanan
          </button>
          <div class="page-eyebrow">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="9" y1="9" x2="15" y2="9"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            Pemesanan Produk
          </div>
          <h1 class="page-title">Pesan <em>Nota</em></h1>
          <p class="page-desc">Cetak nota custom untuk kebutuhan bisnis Anda dengan kualitas terbaik dan pengerjaan cepat.</p>
        </div>

        <div class="product-banner">
          <img src="/produk/nota.png" alt="Nota" class="banner-img" />
          <div class="banner-overlay">
            <span class="banner-tag">Mulai Rp 350.000 / rim</span>
            <p>2 fly · 3 fly · Custom desain · Cepat</p>
          </div>
        </div>

        <div v-if="!customerFilled" class="form-card">
          <div class="card-head">
            <div class="card-head-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h2 class="card-title">Data Pelanggan</h2>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label>Nama Lengkap <span class="req">*</span></label>
              <input v-model="customer.name" type="text" placeholder="Masukkan nama lengkap Anda" class="input-field" />
            </div>
            <div class="form-group">
              <label>Nomor Telepon <span class="req">*</span></label>
              <input
                v-model="customer.phone"
                type="tel"
                placeholder="08xxxxxxxxxx (maks 13 digit)"
                class="input-field"
                :class="{ 'input-error': phoneError }"
                @input="validatePhone"
                maxlength="13"
              />
              <p v-if="phoneError" class="msg-error">{{ phoneError }}</p>
              <p v-else class="msg-hint">Format: 08xxxxxxxxxx</p>
            </div>
            <div class="form-group">
              <label>Alamat Lengkap <span class="req">*</span></label>
              <textarea v-model="customer.address" placeholder="Masukkan alamat lengkap untuk pengiriman" class="input-field textarea" rows="4"></textarea>
              <p class="msg-hint">
                Jika pakai jasa kurir isi alamat sesuai. Jika tidak, isi <strong>"ambil di tempat"</strong>.<br>
                <span>Harga belum termasuk biaya kurir.</span>
              </p>
            </div>
          </div>
          <div class="card-foot">
            <button @click="saveCustomerData" class="btn-primary btn-full">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Simpan &amp; Lanjutkan
            </button>
          </div>
        </div>

        <div v-for="(order, index) in orders" :key="index" class="form-card">
          <div class="card-head">
            <div class="card-head-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>
            <h2 class="card-title">Pesanan #{{ index + 1 }}</h2>
            <button v-if="orders.length > 1" @click="removeOrder(index)" class="btn-remove">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Hapus
            </button>
          </div>

          <div class="card-body">
            <div class="form-group">
              <label class="label-main">Pilih Jenis Produk <span class="req">*</span></label>
              <div class="material-grid">
                <div
                  v-for="(material, key) in materialOptions"
                  :key="key"
                  class="material-card"
                  :class="{ 'material-card--selected': order.material === key }"
                  @click="selectMaterial(index, key)"
                >
                  <div class="material-card__check" v-if="order.material === key">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div class="material-card__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                  </div>
                  <p class="material-card__name">{{ material.name }}</p>
                  <p class="material-card__price">{{ formatCurrency(material.price) }} / rim</p>
                  <p class="material-card__hint">Min. {{ material.minQty }} rim</p>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Kuantitas <span class="req">*</span></label>
              <div class="qty-wrap">
                <button type="button" class="qty-btn" @click="decreaseQty(index)" :disabled="!order.material || order.quantity <= materialOptions[order.material]?.minQty">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
                <div class="qty-display">
                  <span class="qty-number">{{ order.quantity }}</span>
                  <span class="qty-unit">rim</span>
                </div>
                <button type="button" class="qty-btn" @click="increaseQty(index)" :disabled="!order.material">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
              <p v-if="order.material" class="msg-hint">
                Kelipatan {{ materialOptions[order.material].minQty }} rim · Minimal {{ materialOptions[order.material].minQty }} rim
              </p>
              <p v-else class="msg-hint">Pilih jenis produk terlebih dahulu</p>
            </div>

            <div class="form-group">
              <label>Catatan untuk Percetakan</label>
              <textarea
                v-model="order.komentar"
                placeholder="Contoh: nama toko, warna, kolom yang dibutuhkan, dll. (opsional)"
                class="input-field textarea"
                rows="3"
              ></textarea>
              <p class="msg-hint">Catatan khusus untuk tim percetakan kami.</p>
            </div>

            <div v-if="order.material" class="screenshot-guide">
              <div class="guide-head">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <h4>Wajib Screenshot sebelum kirim ke WhatsApp!</h4>
              </div>
              <div class="guide-body">
                <p class="guide-warning">
                  Screenshot bagian <strong>ringkasan harga</strong> di bawah ini sebagai bukti lampiran pemesanan.
                  Foto yang tidak sesuai atau terlewat setelah konfirmasi WhatsApp <strong>berhak kami tolak</strong>.
                </p>
                <div class="guide-img-wrap">
                  <span class="guide-img-badge">SCREENSHOT INI!</span>
                  <div class="guide-img-box">
                    <img src="/buktipesan.png" alt="Contoh Screenshot" />
                  </div>
                  <p class="guide-img-caption">Screenshot bagian ringkasan harga seperti contoh di atas</p>
                </div>
                <div class="guide-steps">
                  <p class="steps-title">Langkah-langkah:</p>
                  <ol>
                    <li><span class="snum">1</span><span>Selesaikan pemilihan detail pesanan</span></li>
                    <li><span class="snum">2</span><span>Geser ke bawah hingga menemukan ringkasan harga</span></li>
                    <li><span class="snum">3</span><span><strong>Screenshot dan simpan gambar</strong></span></li>
                    <li><span class="snum">4</span><span>Klik tombol <strong>"Kirim ke WhatsApp"</strong></span></li>
                    <li class="step-highlight">
                      <span class="snum snum--yellow">5</span>
                      <span>
                        <strong>JANGAN langsung kirim!</strong> Lampirkan foto screenshot terlebih dahulu:
                        <ul class="sub-list">
                          <li>Klik ikon 🧷 (pin / lampiran) di WhatsApp</li>
                          <li>Pilih <strong>Galeri</strong> lalu pilih foto screenshot</li>
                          <li>Jika lebih dari 1 pesanan, pilih semua gambar sekaligus</li>
                          <li><strong>Baru klik kirim pesan</strong></li>
                        </ul>
                      </span>
                    </li>
                  </ol>
                </div>
                <div class="guide-footer">
                  Pesanan tanpa lampiran screenshot yang valid dapat ditolak atau dengan kesepakatan bersama.
                </div>
              </div>
            </div>

            <div v-if="order.material" class="price-summary">
              <div class="price-row">
                <span>Jenis Produk</span>
                <span>{{ materialOptions[order.material].name }}</span>
              </div>
              <div class="price-row">
                <span>Harga Satuan</span>
                <span>{{ formatCurrency(materialOptions[order.material].price) }} / rim</span>
              </div>
              <div class="price-row">
                <span>Kuantitas</span>
                <span>{{ order.quantity }} rim</span>
              </div>
              <div class="price-divider"></div>
              <div class="price-row price-total">
                <span>Total Pesanan #{{ index + 1 }}</span>
                <span>{{ formatCurrency(order.totalPrice) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="customerFilled && orders.length > 0" class="grand-card">
          <div class="grand-head">
            <div class="grand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
            </div>
            <div>
              <p class="grand-label">Total Keseluruhan</p>
              <p class="grand-amount">{{ formatCurrency(grandTotal) }}</p>
            </div>
          </div>
          <div class="grand-actions">
            <button @click="addOrder" class="btn-outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Tambah Produk
            </button>
            <button @click="resetForm" class="btn-danger">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Batal
            </button>
            <button @click="sendToWhatsApp" class="btn-wa">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Kirim ke WhatsApp
            </button>
          </div>
        </div>

        <div v-if="showDialog" class="dialog-backdrop" @click="showDialog = false">
          <div class="dialog-box" @click.stop>
            <div class="dialog-icon dialog-icon--warn">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <h3 class="dialog-title">Batalkan Pesanan?</h3>
            <p class="dialog-msg">Semua data yang telah diisi akan dihapus dan tidak dapat dikembalikan.</p>
            <div class="dialog-actions">
              <button @click="showDialog = false" class="btn-outline">Tidak</button>
              <button @click="confirmReset" class="btn-danger">Ya, Batalkan</button>
            </div>
          </div>
        </div>

        <div v-if="showErrorDialog" class="dialog-backdrop" @click="showErrorDialog = false">
          <div class="dialog-box" @click.stop>
            <div class="dialog-icon dialog-icon--error">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </div>
            <h3 class="dialog-title">{{ errorTitle }}</h3>
            <p class="dialog-msg">{{ errorMessage }}</p>
            <div class="dialog-actions">
              <button @click="showErrorDialog = false" class="btn-primary btn-full">Mengerti</button>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotaOrder',
  data() {
    return {
      waNumber: '6281805816635',
      orderCode: '',
      customer: { name: '', phone: '', address: '' },
      customerFilled: false,
      orders: [],
      phoneError: '',
      showDialog: false,
      showErrorDialog: false,
      errorTitle: '',
      errorMessage: '',
      materialOptions: {
        nota2fly: { name: 'Nota 2 Fly', price: 350000, minQty: 40 },
        nota3fly: { name: 'Nota 3 Fly', price: 475000, minQty: 40 },
      }
    }
  },
  computed: {
    grandTotal() {
      return this.orders.reduce((sum, o) => sum + o.totalPrice, 0)
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.generateOrderCode()
  },
  methods: {
    generateOrderCode() {
      const ts   = Date.now().toString(36).toUpperCase()
      const rand = Math.random().toString(36).substring(2, 5).toUpperCase()
      this.orderCode = `NTA-${ts.slice(-4)}${rand}`
    },
    saveCustomerData() {
      if (!this.customer.name.trim() || !this.customer.phone.trim() || !this.customer.address.trim()) {
        this.showError('Data Tidak Lengkap', 'Mohon lengkapi semua data pelanggan terlebih dahulu.'); return
      }
      if (this.phoneError) {
        this.showError('Nomor Telepon Salah', 'Mohon perbaiki nomor telepon Anda.'); return
      }
      this.customerFilled = true
      this.addOrder()
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    },
    validatePhone() {
      const p = this.customer.phone
      if (!p) { this.phoneError = ''; return }
      if (!p.startsWith('08')) { this.phoneError = 'Nomor harus diawali dengan 08'; return }
      if (p.length < 9)        { this.phoneError = 'Nomor minimal 9 digit'; return }
      if (p.length > 13)       { this.phoneError = 'Nomor maksimal 13 digit'; return }
      if (!/^\d+$/.test(p))   { this.phoneError = 'Hanya boleh angka'; return }
      this.phoneError = ''
    },
    showError(title, msg) {
      this.errorTitle = title; this.errorMessage = msg; this.showErrorDialog = true
    },
    selectMaterial(index, key) {
      const minQty = this.materialOptions[key].minQty
      this.orders[index].material = key
      this.orders[index].quantity = minQty
      this.calculatePrice(index)
    },
    addOrder() {
      this.orders.push({ material: '', quantity: 0, komentar: '', totalPrice: 0 })
    },
    removeOrder(index) { this.orders.splice(index, 1) },
    increaseQty(index) {
      const o = this.orders[index]
      if (!o.material) return
      o.quantity += this.materialOptions[o.material].minQty
      this.calculatePrice(index)
    },
    decreaseQty(index) {
      const o = this.orders[index]
      if (!o.material) return
      const min = this.materialOptions[o.material].minQty
      if (o.quantity > min) {
        o.quantity -= min
        this.calculatePrice(index)
      }
    },
    calculatePrice(index) {
      const o = this.orders[index]
      if (!o.material || !o.quantity) { o.totalPrice = 0; return }
      o.totalPrice = this.materialOptions[o.material].price * (o.quantity / this.materialOptions[o.material].minQty)
    },
    formatCurrency(n) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)
    },
    resetForm() { this.showDialog = true },
    confirmReset() {
      this.customer = { name: '', phone: '', address: '' }
      this.customerFilled = false; this.orders = []; this.phoneError = ''
      this.showDialog = false
      this.generateOrderCode()
      this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    },
    sendToWhatsApp() {
      if (!this.customer.name || !this.customer.phone || !this.customer.address) {
        this.showError('Data Pelanggan Tidak Lengkap', 'Mohon lengkapi data pelanggan terlebih dahulu.'); return
      }
      if (this.phoneError) {
        this.showError('Nomor Telepon Salah', 'Mohon perbaiki nomor telepon Anda.'); return
      }
      for (let i = 0; i < this.orders.length; i++) {
        const o = this.orders[i]
        if (!o.material || !o.quantity) {
          this.showError('Data Pesanan Tidak Lengkap', `Mohon lengkapi data pesanan #${i + 1}!`); return
        }
      }
      let msg = `*PESANAN NOTA*\n`
      msg += `*Kode Pesanan: ${this.orderCode}*\n\n`
      msg += `*DATA PELANGGAN*\n`
      msg += `Nama: ${this.customer.name}\n`
      msg += `No. HP: ${this.customer.phone}\n`
      msg += `Alamat: ${this.customer.address}\n\n`
      msg += `*DETAIL PESANAN*\n`
      msg += `━━━━━━━━━━━━━━━━━━━━\n`
      this.orders.forEach((o, i) => {
        msg += `\n*Pesanan #${i + 1}*\n`
        msg += `Jenis Produk: ${this.materialOptions[o.material].name}\n`
        msg += `Kuantitas: ${o.quantity} rim\n`
        msg += `Harga Satuan: ${this.formatCurrency(this.materialOptions[o.material].price)} / rim\n`
        if (o.komentar && o.komentar.trim()) msg += `Catatan: ${o.komentar.trim()}\n`
        msg += `Subtotal: ${this.formatCurrency(o.totalPrice)}\n`
      })
      msg += `\n━━━━━━━━━━━━━━━━━━━━\n`
      msg += `*TOTAL: ${this.formatCurrency(this.grandTotal)}*\n\n`
      msg += `Segera konfirmasi saya terkait ketersediaan produk atau hal-hal lainnya. Terima kasih!`
      window.open(`https://wa.me/${this.waNumber}?text=${encodeURIComponent(msg)}`, '_blank')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

.nota-root { font-family: 'Montserrat', sans-serif; background: #f4f4f0; min-height: 100vh; }
.nota-section { position: relative; padding: 100px 20px 140px; min-height: 100vh; }
.nota-bg-img { position: fixed; inset: 0; background-image: url('@/assets/balibg.png'); background-size: cover; background-position: center; opacity: 0.05; pointer-events: none; z-index: 0; }
.nota-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; }
.page-head { margin-bottom: 32px; }
.back-btn { display: inline-flex; align-items: center; gap: 7px; background: rgba(255,255,255,0.85); border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 8px 16px; font-family: 'Montserrat', sans-serif; font-size: 0.8rem; font-weight: 600; color: #6b7280; cursor: pointer; transition: all 0.2s ease; margin-bottom: 22px; backdrop-filter: blur(8px); }
.back-btn:hover { color: #111827; border-color: #111827; transform: translateX(-3px); }
.page-eyebrow { display: inline-flex; align-items: center; gap: 7px; font-size: 10.5px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: #6b7280; margin-bottom: 12px; padding-left: 8px; }
.page-title { font-size: clamp(1.9rem, 5vw, 3rem); font-weight: 900; color: #111827; letter-spacing: -1px; line-height: 1.1; margin: 0 0 10px; }
.page-title em { font-style: normal; color: #1d4ed8; }
.page-desc { font-size: 0.95rem; font-weight: 500; color: #6b7280; line-height: 1.7; max-width: 520px; }
.product-banner { position: relative; height: 210px; border-radius: 20px; overflow: hidden; margin-bottom: 24px; border: 1.5px solid #e5e7eb; }
.banner-img { width: 100%; height: 100%; object-fit: cover; }
.banner-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 18px 22px; background: linear-gradient(to top, rgba(0,0,0,0.75), transparent); color: #fff; }
.banner-tag { display: inline-block; background: #1d4ed8; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; margin-bottom: 5px; }
.banner-overlay p { font-size: 0.8rem; font-weight: 500; opacity: 0.85; margin: 0; }
.form-card { background: #ffffff; border-radius: 20px; border: 1.5px solid #e5e7eb; margin-bottom: 18px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); animation: cardIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }
@keyframes cardIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
.card-head { display: flex; align-items: center; gap: 12px; padding: 18px 22px; background: #111827; }
.card-head-icon { width: 34px; height: 34px; background: rgba(255,255,255,0.1); border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
.card-title { font-size: 0.95rem; font-weight: 800; color: #fff; margin: 0; flex: 1; }
.btn-remove { display: inline-flex; align-items: center; gap: 5px; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #fca5a5; border-radius: 8px; padding: 6px 11px; font-family: 'Montserrat', sans-serif; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
.btn-remove:hover { background: #ef4444; border-color: #ef4444; color: #fff; }
.card-body { padding: 22px; }
.card-foot { padding: 0 22px 22px; }
.form-group { margin-bottom: 20px; }
.form-group:last-child { margin-bottom: 0; }
.form-group label, .label-main { display: block; font-size: 0.8rem; font-weight: 700; color: #374151; letter-spacing: 0.3px; margin-bottom: 9px; }
.req { color: #ef4444; }
.input-field { width: 100%; padding: 12px 15px; border: 1.5px solid #e5e7eb; border-radius: 11px; font-family: 'Montserrat', sans-serif; font-size: 0.875rem; font-weight: 500; color: #111827; background: #f9fafb; transition: all 0.2s ease; box-sizing: border-box; }
.input-field:focus { outline: none; border-color: #111827; background: #fff; box-shadow: 0 0 0 3px rgba(17,24,39,0.06); }
.input-field.input-error { border-color: #ef4444; background: #fef2f2; }
.input-field::placeholder { color: #9ca3af; font-weight: 400; }
.textarea { resize: vertical; min-height: 88px; line-height: 1.6; }
.msg-error { font-size: 0.775rem; color: #ef4444; font-weight: 600; margin-top: 5px; }
.msg-hint { font-size: 0.775rem; color: #9ca3af; font-weight: 500; margin-top: 5px; line-height: 1.5; }
.msg-hint strong { color: #6b7280; }
.msg-hint span { display: block; margin-top: 3px; font-size: 0.73rem; }
.material-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(185px, 1fr)); gap: 10px; margin-top: 4px; }
.material-card { position: relative; background: #f9fafb; border: 1.5px solid #e5e7eb; border-radius: 13px; padding: 14px; cursor: pointer; transition: all 0.25s ease; }
.material-card:hover { border-color: #111827; background: #fff; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.07); }
.material-card--selected { background: #111827; border-color: #111827; box-shadow: 0 8px 20px rgba(17,24,39,0.18); transform: translateY(-2px); }
.material-card__check { position: absolute; top: 9px; right: 9px; width: 20px; height: 20px; background: #1d4ed8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; animation: popIn 0.2s ease both; }
@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
.material-card__icon { color: #9ca3af; margin-bottom: 9px; transition: color 0.2s ease; }
.material-card--selected .material-card__icon { color: rgba(255,255,255,0.35); }
.material-card__name { font-size: 0.85rem; font-weight: 700; color: #111827; margin: 0 0 3px; transition: color 0.2s ease; }
.material-card--selected .material-card__name { color: #fff; }
.material-card__price { font-size: 0.85rem; font-weight: 800; color: #1d4ed8; margin: 0 0 2px; transition: color 0.2s ease; }
.material-card--selected .material-card__price { color: #93c5fd; }
.material-card__hint { font-size: 0.72rem; font-weight: 600; color: #9ca3af; margin: 0; transition: color 0.2s ease; }
.material-card--selected .material-card__hint { color: rgba(255,255,255,0.45); }
.qty-wrap { display: flex; align-items: stretch; border: 1.5px solid #e5e7eb; border-radius: 11px; overflow: hidden; height: 52px; background: #f9fafb; }
.qty-btn { background: #fff; border: none; width: 48px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #6b7280; transition: all 0.2s ease; }
.qty-btn:hover:not(:disabled) { background: #111827; color: #fff; }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.qty-display { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; }
.qty-number { font-family: 'Montserrat', sans-serif; font-size: 1.1rem; font-weight: 800; color: #111827; line-height: 1; }
.qty-unit { font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 600; color: #9ca3af; letter-spacing: 0.5px; text-transform: uppercase; }
.screenshot-guide { border: 2px solid #ef4444; border-radius: 14px; overflow: hidden; margin-top: 20px; animation: pulseRed 2.5s ease-in-out infinite; }
@keyframes pulseRed { 0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.25); } 50% { box-shadow: 0 0 0 5px rgba(239,68,68,0); } }
.guide-head { display: flex; align-items: center; gap: 9px; background: #ef4444; padding: 12px 18px; color: #fff; }
.guide-head h4 { font-size: 0.825rem; font-weight: 800; margin: 0; }
.guide-body { padding: 18px; background: #fff5f5; }
.guide-warning { font-size: 0.8rem; color: #7f1d1d; line-height: 1.7; background: #fff; border-left: 3px solid #ef4444; padding: 11px 13px; border-radius: 8px; margin-bottom: 14px; font-weight: 500; }
.guide-warning strong { color: #991b1b; font-weight: 800; }
.guide-img-wrap { position: relative; margin-bottom: 14px; }
.guide-img-badge { position: absolute; top: -7px; right: -4px; background: #059669; color: #fff; font-size: 0.68rem; font-weight: 800; padding: 3px 9px; border-radius: 999px; z-index: 1; }
.guide-img-box { background: #fff; border: 2px solid #1d4ed8; border-radius: 10px; padding: 10px; text-align: center; }
.guide-img-box img { max-width: 220px; width: 100%; border-radius: 6px; display: block; margin: 0 auto; }
.guide-img-caption { margin-top: 9px; font-size: 0.75rem; font-weight: 700; color: #374151; text-align: center; }
.guide-steps { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 11px; padding: 14px; margin-bottom: 12px; }
.steps-title { font-size: 0.8rem; font-weight: 700; color: #111827; margin-bottom: 11px; }
.guide-steps ol { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 7px; }
.guide-steps ol li { display: flex; align-items: flex-start; gap: 9px; background: #f9fafb; border-left: 3px solid #e5e7eb; border-radius: 7px; padding: 9px 11px; font-size: 0.8rem; color: #374151; font-weight: 500; line-height: 1.6; }
.step-highlight { background: #fffbeb !important; border-left-color: #f59e0b !important; }
.step-highlight span:last-child { color: #78350f; }
.snum { display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; min-width: 22px; background: #111827; color: #fff; border-radius: 50%; font-size: 0.72rem; font-weight: 800; flex-shrink: 0; }
.snum--yellow { background: #f59e0b; animation: numPulse 1.5s ease-in-out infinite; }
@keyframes numPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
.sub-list { list-style: none; padding: 0; margin: 8px 0 0; display: flex; flex-direction: column; gap: 5px; }
.sub-list li { font-size: 0.75rem; color: #78350f; line-height: 1.5; padding: 3px 0; }
.guide-footer { background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 9px; padding: 10px 13px; font-size: 0.75rem; font-weight: 700; color: #78350f; line-height: 1.5; }
.price-summary { background: #111827; border-radius: 13px; padding: 18px; margin-top: 18px; }
.price-row { display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,0.75); font-size: 0.85rem; font-weight: 500; padding: 4px 0; }
.price-row span:last-child { font-weight: 700; color: #fff; text-align: right; max-width: 55%; }
.price-divider { height: 1px; background: rgba(255,255,255,0.12); margin: 9px 0; }
.price-total { font-size: 0.95rem !important; }
.price-total span:last-child { font-weight: 900 !important; font-size: 1.1rem; color: #93c5fd !important; }
.grand-card { background: #fff; border-radius: 20px; border: 1.5px solid #e5e7eb; overflow: hidden; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); animation: cardIn 0.4s ease both; }
.grand-head { display: flex; align-items: center; gap: 14px; background: linear-gradient(135deg, #059669, #047857); padding: 18px 22px; }
.grand-icon { width: 46px; height: 46px; background: rgba(255,255,255,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
.grand-label { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.8); margin: 0 0 3px; }
.grand-amount { font-size: 1.55rem; font-weight: 900; color: #fff; margin: 0; letter-spacing: -0.5px; }
.grand-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 18px 22px; }
.btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 13px 18px; background: #111827; color: #fff; border: none; border-radius: 11px; font-family: 'Montserrat', sans-serif; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.25s ease; }
.btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
.btn-full { width: 100%; }
.btn-outline { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 10px 14px; background: #fff; color: #111827; border: 1.5px solid #e5e7eb; border-radius: 11px; font-family: 'Montserrat', sans-serif; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
.btn-outline:hover { border-color: #111827; background: #f9fafb; }
.btn-danger { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 10px 14px; background: #ef4444; color: #fff; border: none; border-radius: 11px; font-family: 'Montserrat', sans-serif; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
.btn-danger:hover { background: #dc2626; transform: translateY(-1px); }
.btn-wa { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 10px 14px; background: #16a34a; color: #fff; border: none; border-radius: 11px; font-family: 'Montserrat', sans-serif; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
.btn-wa:hover { background: #15803d; transform: translateY(-1px); box-shadow: 0 5px 14px rgba(22,163,74,0.3); }
.dialog-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
.dialog-box { background: #fff; border-radius: 20px; padding: 34px 28px; max-width: 420px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.18); animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both; text-align: center; }
@keyframes slideUp { from { opacity: 0; transform: translateY(18px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
.dialog-icon { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
.dialog-icon--warn { background: #fffbeb; color: #d97706; }
.dialog-icon--error { background: #fef2f2; color: #ef4444; }
.dialog-title { font-size: 1.15rem; font-weight: 800; color: #111827; margin: 0 0 9px; }
.dialog-msg { font-size: 0.85rem; color: #6b7280; line-height: 1.6; font-weight: 500; margin: 0 0 22px; }
.dialog-actions { display: flex; gap: 10px; }
@media (max-width: 768px) { .nota-section { padding: 88px 16px 120px; } .product-banner { height: 165px; } .grand-amount { font-size: 1.3rem; } .material-grid { grid-template-columns: 1fr 1fr; } .grand-actions { grid-template-columns: 1fr; gap: 9px; padding: 16px 20px; } }
@media (max-width: 480px) { .nota-section { padding: 78px 14px 120px; } .product-banner { height: 145px; } .card-body { padding: 16px; } .card-foot { padding: 0 16px 16px; } .material-grid { grid-template-columns: 1fr; } .grand-actions { padding: 14px 16px; } .dialog-box { padding: 26px 18px; } .dialog-actions { flex-direction: column; } }
</style>