<template>
  <transition name="fade">
    <div class="LybLoading flex" v-show="show">
      <img src="./img/daji.png" alt="妲己" />
      <span
        v-for="(item, index) in color"
        :key="index"
        :style="{
          backgroundColor: item,
          animationDelay: index * 0.1 - 0.8 + 0.5 + 's',
          boxShadow: '0 0 50px ' + item,
        }"
      ></span>
      <h1>加载中...</h1>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  name: "LybLoading",
  data() {
    return {
      color: [
        "#ffff00",
        "#76ff03",
        "#f06292",
        "#4fc3f7",
        "#ba68c8",
        "#f57c00",
        "#673ab7",
      ],
    };
  },
};
</script>
<style scoped lang="less">
.LybLoading {
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
  img {
    position: absolute;
    width: 40vw;
    left: 0;
    bottom: 0;
  }
  span {
    display: inline-block;
    width: 1.5vw;
    height: 1.5vw;
    transform: scale(0.2);
    animation: animate 1s infinite;
  }
  h1 {
    position: absolute;
    right: 2vh;
    top: 2vh;
    font-size: 2vw;
    color: #fff;
  }
}
@keyframes animate {
  0% {
    transform: translateY(0%) scale(0.2);
  }
  25% {
    transform: translateY(-200%) scale(1);
    border-radius: 50%;
  }
  50% {
    transform: translateY(200%) scale(1);
    border-radius: 50%;
  }
  100% {
    transform: translateY(0%) scale(0.2);
  }
}

/* 进入前状态 */
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* 进入和离开动画属性 */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.25s;
}
</style>
