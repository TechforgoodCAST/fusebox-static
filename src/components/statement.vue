<template>
  <article class="bg-white mb30 p20 shadow">

    <div class="mb20 flex justify-between items-center">
      <div>
        <h3 class="inline grey">{{ heading }}</h3>
        <a href="#statement-count" class="ml7">(0)</a>
        <a href="#last-updated" class="ml15">{{ data.lastUpdated }}</a>
      </div>

      <a href="#edit-statement" class="tooltip" aria-label="Coming soon">Edit</a>
    </div>

    <div class="mb20" v-html="data[heading.toLocaleLowerCase()]"></div>

    <div class="flex justify-between items-center">
      <div>
        <a href="#assumptions-count">0 assumptions</a>
        <span class="haze"> ❯ </span>
        <a href="#tests-count">0 tests</a>
        <span class="haze"> ❯ </span>
        <a href="#evidence-count">0 evidence</a>
      </div>

      <a href="#add-assumption" class="btn white bg-aqua tooltip" aria-label="Coming soon">+ Add assumption</a>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    heading: String,
    data: Object
  }
}
</script>
