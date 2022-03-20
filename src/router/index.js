import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

import Layout from '@/layout';

export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        meta: {
          title: '主页',
          icon: 'HOME'
        },
        component: () => import('@/views/base/Home')
      }
    ]
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      noVerify: true
    },
    component: () => import('@/views/base/Login'),
    hidden: true
  },

  {
    path: '/hero',
    component: Layout,
    redirect: '/hero/mage/male',
    meta: {
      title: '英雄',
      icon: 'HERO'
    },
    children: [
      {
        path: 'tank',
        component: () => import('@/views/hero/Tank'),
        meta: { title: '坦克', icon: 'TANK' }
      },
      {
        path: 'warrior',
        component: () => import('@/views/hero/Warrior'),
        meta: { title: '战士', icon: 'WARRIOR' }
      },
      {
        path: 'assassin',
        component: () => import('@/views/hero/Assassin'),
        meta: { title: '刺客', icon: 'ASSASSIN' }
      },
      {
        path: 'Mage',
        component: () => import('@/views/hero/Mage'),
        meta: { title: '法师', icon: 'MAGE' }
      },
      {
        path: 'striker',
        component: () => import('@/views/hero/Striker'),
        meta: { title: '射手', icon: 'STRIKER' }
      },
      {
        path: 'assist',
        component: () => import('@/views/hero/Assist'),
        meta: { title: '辅助', icon: 'ASSIST' }
      }
    ]
  },
  {
    path: '/equip',
    component: Layout,
    redirect: '/equip/attack',
    meta: {
      title: '装备',
      icon: 'EQUIP'
    },
    children: [
      {
        path: 'attack',
        component: () => import('@/views/equip/Attack'),
        meta: { title: '攻击', icon: 'ATTACK' }
      },
      {
        path: 'magic',
        component: () => import('@/views/equip/Magic'),
        meta: { title: '法术', icon: 'MAGIC' }
      },
      {
        path: 'defense',
        component: () => import('@/views/equip/Defense'),
        meta: { title: '防御', icon: 'DEFENSE' }
      },
      {
        path: 'move',
        component: () => import('@/views/equip/Move'),
        meta: { title: '移动', icon: 'MOVE' }
      },
      {
        path: 'jungle',
        component: () => import('@/views/equip/Jungle'),
        meta: { title: '打野', icon: 'JUNGLE' }
      },
      {
        path: 'migration',
        component: () => import('@/views/equip/Migration'),
        meta: { title: '游走', icon: 'MIGRATION' }
      }
    ]
  },
  {
    path: '*',
    meta: {
      title: '404 NotFound'
    },
    component: () => import('@/views/base/NotFound'),
    hidden: true
  }
];

const router = new VueRouter({
  routes
});

import store from '@/store/index.js';
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // 如果本地存在token，但未登录，则自动登录
  if (!store.state.userStatus && store.state.token) {
    store.dispatch('userInfo');
    next();
  }
  // 如果状态为 true、或路由不需要验证，则跳转
  else if (store.state.userStatus === true || to.path === '/login') {
    next();
  } else {
    next('/login');
  }
});
export default router;
