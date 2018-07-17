<template v-if="e">
  <div>
    {{ e.name }}
    {{ e.details }}
    <a :href="e.editEvidenceUrl" target="_blank">Edit</a>
  </div>
</template>

<script>
  export default {
    props: {
      e: Object
    }
  }
</script>
