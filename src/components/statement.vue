<template>
  <article class="bg-white mb30 p20 shadow">

    <div class="mb20 flex justify-between items-center">
      <div>
        <h3 class="inline grey">{{ heading }}</h3>
        <a href="#statement-count" class="ml7 tooltip" aria-label="Coming soon">(0)</a>
      </div>

      <a href="#edit-statement" class="tooltip" aria-label="Coming soon">Edit</a>
    </div>

    <div
      class="mb20 md"
      v-html="data.dashboard[heading.toLocaleLowerCase()]"
      v-show="data.loaded === 1">
    </div>

    <loading :loaded="data.loaded" class="mb20"></loading>

    <div class="flex justify-between items-center">
      <div>
        <a href="#assumptions-count" class="tooltip" aria-label="Coming soon">0 assumptions</a>
        <span class="haze"> ❯ </span>
        <a href="#tests-count" class="tooltip" aria-label="Coming soon">0 tests</a>
        <span class="haze"> ❯ </span>
        <a href="#evidence-count" class="tooltip" aria-label="Coming soon">0 evidence</a>
      </div>

      <a href="#add-assumption" class="btn white bg-aqua shadow tooltip" aria-label="Coming soon">+</a>
    </div>
  </article>
</template>

<script>
import Loading from './loading.vue';

export default {
  props: {
    heading: String,
    data: Object
  },
  components: {
    Loading
  }
}
</script>
