<template>
  <div>

    <div class="mx15" v-if="plan">

      <h1 class="mb10">{{ plan.name }}</h1>
      <div class="mb15 grey">{{ plan.description }}</div>
      <div class="fs14 grey">
        <span :class="plan.due ? mr15 : ''">{{ plan.due }}</span>
        <span>{{ plan.updated }}</span>
      </div>

      <hr class="my30">

      <ol>
        <test v-for="(test, index) in plan.tests" :key="index" :test="test"></test>
      </ol>

    </div>

    <div class="flex justify-center">
      <loading :loaded="loaded"></loading>
    </div>

  </div>
</template>

<script>
  import Loading from './loading.vue';
  import Test from './test.vue';

  export default {
    props: {
      plan: Object,
      loaded: Number
    },
    components: {
      Loading,
      Test
    }
  }
</script>
