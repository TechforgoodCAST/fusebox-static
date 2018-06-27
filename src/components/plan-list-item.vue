<template>
  <div>
    <hr>
    <a :href="planPath" class="block p20 plan-list-item">
      <h4 class="mb10 black">{{ plan.name }}</h4>
      <div class="mb15 f415 grey">{{ plan.description }}</div>
      <div class="bold green caps heading fs14">{{ plan.status }}</div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    plan: Object
  },
  data: function () {
    return {
      planPath: `/plan?name=${this.plan.sheet}`
    };
  }
}
</script>
