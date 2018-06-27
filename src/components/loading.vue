<template>
  <div>
    <div v-show="loaded === 0" :class="wrapper" class="loading">
      <div></div><div></div><div></div><div></div>
    </div>

    <div v-show="loaded === -1" :class="wrapper" :style="styles">
      Error loading data! Please contact
      <a href="mailto:hello@wearecast.org.uk?subject=Fusebox+error" target="_blank">help</a>.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loaded: Number,
    wrapper: String
  },
  data: function () {
    return {
      styles: 'position: relative; display: inline-block;'
    }
  }
}
</script>
