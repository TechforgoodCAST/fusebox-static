<template>
  <div>
    <div v-if="data.loaded === 1">
      <a href="#">Back</a>
      <h1>Add Evidence</h1>

      <iframe name="hidden-iframe" id="hidden-iframe" style="display:none;"></iframe>

      <form :action="data.config.formUrl" method="POST" target="hidden-iframe" v-on:submit="submit()">

        <label for="name">Name</label>
        <input :name="data.config.formInputName" type="text" id="name" required>

        <label for="details">Details</label>
        <textarea :name="data.config.formInputDetails" id="details" required></textarea>

        <label for="name">Source</label>
        <input :name="data.config.formInputSource" type="text" id="source">

        <label for="_ref" hidden>_ref</label>
        <input :name="data.config.formInputTestId" type="text" id="_ref" :value="data.params.testId" required hidden>

        <input class="button" type="submit" value="Add evidence">
      </form>

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
    methods: {
      submit: function() {
        window.location.href = `/plan?t=${this.data.params.t}&name=${this.data.params.testId.split(':')[0]}`;
      }
    }
  }
</script>
