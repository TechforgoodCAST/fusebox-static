<template v-if="e">
  <div class="p20" style="border: 2px solid #F6F8FA; border-top: 0px;">
    <div class="mb10 flex justify-between">
      <h4 class="grey">{{ e.name }}</h4>
      <a :href="e.editEvidenceUrl" target="_blank">Edit</a>
    </div>
    <div class="fs15 md" v-html="e.details"></div>
    <em class="fs14" v-html="e.source"></em>
  </div>
</template>

<script>
  export default {
    props: {
      e: Object
    }
  }
</script>
