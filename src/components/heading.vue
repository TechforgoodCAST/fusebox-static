<template>
  <div class="maxw1080 mxauto py25 flex items-center">
    <h1 v-show="data.loaded === 1" class="h2 px15">
      {{ data.dashboard.team }} / <a href="/" class="snow bold">{{ data.dashboard.project }}</a>
    </h1>

    <loading :loaded="data.loaded" wrapper="ml20"></loading>

    <div class="h3 px15">{{ data.dashboard.description }}</div>
  </div>
</template>

<script>
import Loading from './loading.vue';

export default {
  props: {
    data: Object
  },
  components: {
    Loading
  }
}
</script>
