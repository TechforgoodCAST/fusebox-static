<template>
  <div class="maxw1080 mxauto py25 flex items-center">
    <h1 class="h2 px15">
      {{ data.team }} / <span class="bold">{{ data.project }}</span>
    </h1>

    <div class="h3 px15">{{ data.description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>
