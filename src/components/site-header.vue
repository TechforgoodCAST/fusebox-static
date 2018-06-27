<template>
  <header class="snow">
    <nav class="bg-midnight">
      <div class="maxw1080 mxauto p15 flex justify-between items-center">
        <div>
          Fusebox
          <span class="fs14">by CAST</span>
        </div>

        <a href="mailto:hello@wearecast.org.uk?subject=Fusebox"  target="_blank" class="snow">Help</a>
      </div>
    </nav>

    <div :class="bg">
      <heading :data="data.dashboard"></heading>

      <div class="maxw1080 mxauto px15 flex">
        <a href="/" class="px20 py10" :class="isDashboard ? activeClasses : inactiveClasses">Dashboard</a>
        <a href="/plans" class="px20 py10" :class="isPlans ? activeClasses : inactiveClasses">Plans</a>
      </div>
    </div>
  </header>
</template>

<script>
  import Heading from './heading.vue';

  export default {
    props: {
      bg: String,
      data: Object,
      isDashboard: Boolean,
      isPlans: Boolean
    },
    components: {
      Heading
    },
    data: function () {
      return {
        activeClasses: 'black bg-ice shadowt',
        inactiveClasses: 'ice inactive',
      }
    }
  }
</script>

<style scoped>
.inactive {
  background-color: rgba(255, 255, 255, 0.05);
}
.inactive:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
