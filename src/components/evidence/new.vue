<template>
  <div>
    <div v-if="data.loaded === 1">
      <iframe name="hidden-iframe" id="hidden-iframe" style="display:none;"></iframe>

      <div class="bg-white shadow">
        <h1 class="h3 grey p20">Add evidence</h1>

        <hr>

        <form class="p20" :action="data.config.formUrl" method="POST" target="hidden-iframe" v-on:submit="submit()">

          <label for="name" class="h3 block mb7">Name *</label>
          <div class="fs15 grey mb7">Give the evidence a memorable name that conveys the key insights.</div>
          <input class="mb15" :name="data.config.formInputName" type="text" id="name" required>

          <label for="details" class="h3 block mb7">Details *</label>
          <div class="fs15 grey mb7">Provide more details about the evidence such as quotes, statistics and your analysis.</div>
          <textarea class="mb15" :name="data.config.formInputDetails" id="details" rows="4" required></textarea>

          <label for="name" class="h3 block mb7">Source</label>
          <div class="fs15 grey mb7">Reference the source of this evidence e.g. User interview.</div>
          <input class="mb20" :name="data.config.formInputSource" type="text" id="source">

          <label for="_ref" hidden>_ref</label>
          <input :name="data.config.formInputTestId" type="text" id="_ref" :value="data.params.testId" required hidden>

          <input class="btn white bg-teal" type="submit" value="Add evidence">
          <a :href="planPath" class="btn">Cancel</a>
        </form>
      </div>
    </div>

    <loading :loaded="data.loaded"></loading>
  </div>
</template>

<script>
  import Loading from '../loading.vue';

  export default {
    props: {
      data: Object
    },
    components: {
      Loading
    },
    data: function () {
      return {
        planPath: `/plan?t=${this.data.params.t}&name=${this.data.params.testId.split(':')[0]}`
      }
    },
    methods: {
      submit: function() {
        window.location.href = this.planPath;
      }
    }
  }
</script>
