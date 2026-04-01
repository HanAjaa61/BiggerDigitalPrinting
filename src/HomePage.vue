<script setup>
import LandingPage from '@/components/LandingPage.vue';
import About from '@/components/About.vue';
import PaymentSection from '@/components/PaymentSection.vue';
import CollabSection from './components/CollabSection.vue';
import VisitorChart from './components/VisitorChart.vue';
</script>

<template>
  <main>
    <LandingPage />   
    <About />
    <PaymentSection />
    <CollabSection />
    <VisitorChart />
  </main>
</template>