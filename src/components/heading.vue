<template>
  <div class="maxw1080 mxauto py25">
    <div v-show="data.loaded === 1" class="px15">
      <h1  class="h2 mb10">
        {{ data.dashboard.team }} / <a :href="dashboardPath" class="snow bold">{{ data.dashboard.project }}</a>
      </h1>

      <div class="h3">{{ data.dashboard.description }}</div>
    </div>

    <loading :loaded="data.loaded" wrapper="ml20"></loading>
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
  },
  data: function () {
    return {
      dashboardPath: `/?t=${this.data.params.t}`
    }
  }
}
</script>
