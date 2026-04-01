<template>
  <div class="visitor-chart">
    <h2>Statistik Pengunjung (30 Hari Terakhir)</h2>

    <div v-if="loading" class="state">Memuat data...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <div v-else style="position: relative; height: 300px;">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Chart from 'chart.js/auto'

const chartCanvas = ref(null)
const loading = ref(true)
const error = ref(null)
let chartInstance = null

async function recordVisit() {
  const TODAY = new Date().toISOString().slice(0, 10)
  const STORAGE_KEY = 'visitor_recorded_date'
  if (localStorage.getItem(STORAGE_KEY) === TODAY) return
  try {
    await fetch('/api/visit', { method: 'POST' })
    localStorage.setItem(STORAGE_KEY, TODAY)
  } catch {}
}

async function loadChart() {
  try {
    const res = await fetch('/api/visitors')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    if (!data.length) {
      error.value = 'Belum ada data pengunjung.'
      return
    }

    const labels = data.map(row =>
      new Date(row.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
    )
    const counts = data.map(row => row.count)

    // Tunggu DOM benar-benar siap
    loading.value = false
    await nextTick()

    if (!chartCanvas.value) {
      error.value = 'Gagal memuat grafik.'
      return
    }

    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Pengunjung',
          data: counts,
          borderColor: '#1d4ed8',
          backgroundColor: 'rgba(29, 78, 216, 0.08)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ` ${ctx.parsed.y} pengunjung`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { precision: 0 }
          }
        }
      }
    })
  } catch (err) {
    error.value = 'Gagal memuat data. Coba refresh halaman.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await recordVisit()
  await loadChart()
})

onBeforeUnmount(() => {
  chartInstance?.destroy()
})
</script>

<style scoped>
.visitor-chart {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
  font-family: sans-serif;
}

h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 20px;
}

.state {
  text-align: center;
  color: #6b7280;
  padding: 40px 0;
}

.state.error {
  color: #ef4444;
}
</style>