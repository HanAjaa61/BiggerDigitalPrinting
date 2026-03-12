<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': menuOpen }">

    <div class="nav-container">

      <a href="#" class="logo" @click.prevent="handleNav({ label: 'Home', id: null })">
        <div class="logo-img-wrap">
          <img src="/logo.jpeg" alt="Bigger Digital Printing Logo" />
        </div>
        <div class="logo-text">
          <span class="logo-main">BIGGER</span>
          <span class="logo-sub">Digital Printing</span>
        </div>
      </a>

      <ul class="nav-menu">
        <li v-for="(item, i) in navItems" :key="item.label" :style="{ '--i': i }">
          
          <a href="#"
            :class="{ active: activeItem === item.label }"
            @click.prevent="handleNav(item)"
          >
            {{ item.label }}
            <span class="dot"></span>
          </a>
        </li>
      </ul>

      <div class="nav-right">
        <RouterLink to="/services" class="cta-btn" @click="activeItem = 'Payment'">
          <span>Order Now</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>

        <button
          class="hamburger"
          :class="{ open: menuOpen }"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

    </div>

    <transition name="drawer">
      <div v-if="menuOpen" class="mobile-drawer">
        <ul class="mobile-menu">
          <li v-for="(item, i) in navItems" :key="item.label" :style="{ '--i': i }">
            
            <a href="#"
              :class="{ active: activeItem === item.label }"
              @click.prevent="handleNav(item); menuOpen = false"
            >
              <span>{{ item.label }}</span>
              <span class="m-arrow">→</span>
            </a>
          </li>
        </ul>
        <div class="mobile-bottom">
          <RouterLink
            to="/payment"
            class="cta-btn-mobile"
            @click="activeItem = 'Payment'; menuOpen = false"
          >
            Order Now →
          </RouterLink>
        </div>
      </div>
    </transition>

  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuOpen = ref(false)
const isScrolled = ref(false)
const activeItem = ref('Home')

const navItems = [
  { label: 'Home',     id: null,       page: '/' },
  { label: 'About',    id: 'about-us', page: '/' },
  { label: 'Services', id: 'services', page: '/services' },
  { label: 'Payment',  id: 'payment',  page: '/' },
]

async function handleNav(item) {
  activeItem.value = item.label
  menuOpen.value = false

  if (item.page && route.path !== item.page) {
    await router.push(item.page)
    await new Promise(r => setTimeout(r, 100))
  }

  if (item.id) {
    const el = document.getElementById(item.id)
    if (el) {
      const offset = 70
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(() => route.path, (path) => {
  if (path === '/payment') {
    activeItem.value = 'Payment'
  } else if (path === '/') {
    if (activeItem.value === 'Payment') {
      activeItem.value = 'Home'
    }
  }
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (route.path === '/payment') activeItem.value = 'Payment'
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  font-family: 'Montserrat', sans-serif;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.navbar.scrolled {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-bottom-color: #e8e8e8;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 36px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
  flex-shrink: 0;
  animation: fadeDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.logo-img-wrap {
  width: auto;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.logo-img-wrap img {
  height: 100%;
  width: auto;
  display: block;
  object-fit: contain;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 3px;
  border-left: 2px solid #e5e7eb;
  padding-left: 13px;
}

.logo-main {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 3px;
  color: #111827;
}

.logo-sub {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #9ca3af;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2px;
  align-items: center;
}

.nav-menu li {
  animation: fadeDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(0.08s + var(--i) * 0.06s);
}

.nav-menu a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  text-decoration: none;
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-menu a:hover {
  color: #111827;
  background: #f9fafb;
}

.nav-menu a.active {
  color: #111827;
  background: #f3f4f6;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3b82f6;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.nav-menu a.active .dot {
  opacity: 1;
  transform: scale(1);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  animation: fadeDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  font-family: 'Montserrat', sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-decoration: none;
  color: #ffffff;
  background: #111827;
  border-radius: 10px;
  border: 1.5px solid #111827;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #1d4ed8;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.cta-btn span,
.cta-btn svg {
  position: relative;
  z-index: 1;
  transition: transform 0.25s ease;
}

.cta-btn:hover::before {
  transform: scaleX(1);
}

.cta-btn:hover svg {
  transform: translateX(3px);
}

.cta-btn:hover {
  border-color: #1d4ed8;
  box-shadow: 0 6px 20px rgba(29, 78, 216, 0.3);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px 9px;
  border-radius: 9px;
  background: transparent;
  border: 1.5px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hamburger:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.hamburger span {
  display: block;
  height: 2px;
  background: #374151;
  border-radius: 2px;
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.hamburger span:nth-child(1) { width: 18px; }
.hamburger span:nth-child(2) { width: 12px; }
.hamburger span:nth-child(3) { width: 18px; }

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 18px; }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 18px; }

.mobile-drawer {
  background: #ffffff;
  border-top: 1px solid #f3f4f6;
  padding: 12px 24px 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-menu {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 16px;
}

.mobile-menu li {
  animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: calc(var(--i) * 0.05s);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

.mobile-menu a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 14px;
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  border-radius: 10px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.mobile-menu a:hover {
  color: #111827;
  background: #f9fafb;
  border-color: #f3f4f6;
}

.mobile-menu a.active {
  color: #111827;
  background: #eff6ff;
  border-color: #dbeafe;
}

.m-arrow {
  font-size: 14px;
  opacity: 0.3;
  transition: all 0.2s ease;
}

.mobile-menu a:hover .m-arrow,
.mobile-menu a.active .m-arrow {
  opacity: 0.8;
  transform: translateX(3px);
}

.mobile-bottom {
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
}

.cta-btn-mobile {
  display: block;
  width: 100%;
  padding: 13px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-decoration: none;
  color: #ffffff;
  background: #111827;
  border-radius: 10px;
  transition: all 0.25s ease;
  cursor: pointer;
}

.cta-btn-mobile:hover {
  background: #1d4ed8;
  box-shadow: 0 6px 20px rgba(29, 78, 216, 0.28);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .cta-btn { display: none; }
  .nav-menu { display: none; }

  .nav-container {
    padding: 0 20px;
    height: 64px;
  }

  .logo-img-wrap { height: 42px; }
  .logo-main { font-size: 16px; letter-spacing: 2.5px; }
  .logo-sub { font-size: 9px; }
}

@media (max-width: 420px) {
  .logo-text { display: none; }
  .logo-img-wrap { height: 40px; }
}
</style>