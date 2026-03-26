import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/HomePage.vue'
import Payment from '@/components/Payment.vue'
import ServicesPage from '@/ServicesPage.vue'
import SpandukOrder from '@/components/SpandukOrder.vue'
import FotoOrder from '@/components/FotoOrder.vue'
import StempelOrder from '@/components/StempelOrder.vue'
import NeonBoxOrder from '@/components/NeonBoxOrder.vue'
import HurufTimbulOrder from '@/components/HurufTimbulOrder.vue'
import NotaOrder from '@/components/NotaOrder.vue'
import CuttingStikerOrder from '@/components/CuttingStikerOrder.vue'
import KaosSablonDTF from '@/components/KaosSablonDTF.vue'
import Terms from '@/components/TermsOfServices.vue'
import Privacy from '@/components/PrivacyPolicy.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
    },
    { path: '/services', 
      name: 'Services', 
      component: ServicesPage 
    },
    { path: '/services/spanduk', 
      name: 'SpandukOrder', 
      component: SpandukOrder 
    },
    {
      path: '/services/foto',
      name: 'FotoOrder',
      component: FotoOrder
    },
    {
      path: '/services/stempel',
      name: 'StempelOrder',
      component: StempelOrder
    },
    {
      path: '/services/neonbox',
      name: 'NeonBoxOrder',
      component: NeonBoxOrder
    },
    {
      path: '/services/huruftimbul',
      name: 'HurufTimbulOrder',
      component: HurufTimbulOrder
    },
    {
      path: '/services/cuttingstiker',
      name: 'CuttingStikerOrder',
      component: CuttingStikerOrder
    },
    {
      path: '/services/nota',
      name: 'NotaOrder',
      component: NotaOrder
    },
    {
      path: '/services/kaossablondtf',
      name: 'KaosSablonDTF',
      component: KaosSablonDTF
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    }
  ],
})

export default router