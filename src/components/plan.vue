<template>
  <div class="mx15" v-if="data">

    <h1 class="mb10">{{ data.name }}</h1>
    <div class="mb15 grey">{{ data.description }}</div>
    <div class="fs14 grey">
      <span class="mr15">{{ data.dueDate }}</span>
      <span>{{ data.lastUpdated }}</span>
    </div>

    <hr class="my30">

    <ol>
      <test v-for="(test, index) in data.items" :key="index" :test="test"></test>
    </ol>

  </div>
</template>

<script>
  import Test from './test.vue';

  export default {
    props: {
      data: Object
    },
    components: {
      Test
    }
  }
</script>
