<template>
  <aside class="px15" style="flex: 1 2 280px;">
    <div class="bg-white shadow">
      <div class="p20 flex justify-between items-center">
        <h3 class="grey">Plans</h3>
        <a href="#plans">View</a>
      </div>

      <plan-list-item></plan-list-item>
      <plan-list-item></plan-list-item>
      <plan-list-item></plan-list-item>
    </div>
  </aside>
</template>

<script>
  import PlanListItem from './plan-list-item.vue';

  export default {
    components: {
      PlanListItem
    }
  }
</script>