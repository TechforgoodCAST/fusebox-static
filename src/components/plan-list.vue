<template>
  <aside class="px15" style="flex: 1 2 280px;">
    <div class="bg-white shadow">
      <div class="p20 flex justify-between items-center">
        <h3 class="grey">Recent plans</h3>
        <a :href="plansPath">View all</a>
      </div>

      <div v-show="data.loaded === 1">
        <plan-list-item
          v-for="(plan, index) in data.plans.slice(0, 3)"
          :key="index"
          :plan="plan"
          :t="data.params.t">
        </plan-list-item>
      </div>

      <hr v-show="data.loaded === 0 || -1">
      <loading :loaded="data.loaded" wrapper="m20"></loading>

    </div>
  </aside>
</template>

<script>
  import Loading from './loading.vue';
  import PlanListItem from './plan-list-item.vue';

  export default {
    props: {
      data: Object
    },
    components: {
      Loading,
      PlanListItem
    },
    data: function () {
      return {
        plansPath: `/plans?t=${this.data.params.t}`
      }
    }
  }
</script>
