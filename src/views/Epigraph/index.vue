<template>
  <!-- 铭文 -->
  <div class="Epigraph">
    <transition name="epigraph">
      <epigraph-category v-show="show_epigraph" />
    </transition>
    <div class="EpigraphMain"></div>
  </div>
</template>

<script>
import EpigraphCategory from "./childComps/epigraph-category";
export default {
  name: "Epigraph",
  components: { EpigraphCategory },
  data() {
    return {
      show_epigraph: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show_epigraph = true;
    }, 250);
  },
};
</script>
<style scoped lang="less">
.Epigraph {
  width: 100%;
  display: flex;
  flex-direction: column;
  .EpigraphMain {
    flex: 1;
  }
}

/* 路由 */
.epigraph-enter {
  opacity: 0;
  transform: translateY(-100%);
}

.epigraph-leave-to {
  opacity: 0;
}

.epigraph-leave-active,
.epigraph-enter-active {
  transition: all 0.25s;
}
</style>
