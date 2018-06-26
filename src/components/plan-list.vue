<template>
  <aside class="px15" style="flex: 1 2 280px;">
    <div class="bg-white shadow">
      <div class="p20 flex justify-between items-center">
        <h3 class="grey">Recent plans</h3>
        <a href="/plans">View all</a>
      </div>

      <plan-list-item v-for="(plan, index) in plans.slice(0, 3)" :key="index" :plan="plan"></plan-list-item>
    </div>
  </aside>
</template>

<script>
  import PlanListItem from './plan-list-item.vue';

  export default {
    props: {
      plans: Array
    },
    components: {
      PlanListItem
    }
  }
</script>
