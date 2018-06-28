<template v-if="test">
  <li>
    <article class="bg-white mb30 shadow">

      <div class="p20 bg-dusk flex justify-between items-center">
        <h2>{{ test.assumption }}</h2>
        <div class="ml25 bold green caps heading fs14">{{ test.status }}</div>
      </div>

      <hr>

      <div class="p20">
        <h3 class="grey mb7">Details</h3>
        <div class="mb20 md" v-html="test.details"></div>

        <h3 class="grey mb7">Success Critera</h3>
        <div class="mb20 md" v-html="test.success"></div>

        <h3 class="grey mb7">Support &amp; Resources</h3>
        <div class="md" v-html="test.support"></div>
      </div>

      <hr>

      <div class="p20 flex justify-between items-center">
        <div>
          <a href="#category" class="mr15 tooltip" aria-label="Coming soon">{{ test.category }}</a>
          <span class="grey">{{ test.assignees }}</span>
        </div>

        <div class="flex">
          <a href="#close-test" class="btn white bg-purple mr10 shadow tooltip" aria-label="Coming soon">Close</a>
          <a href="#add-assumption" class="btn white bg-aqua shadow tooltip" aria-label="Coming soon">+</a>
        </div>
      </div>
    </article>
  </li>
</template>

<script>
  export default {
    props: {
      test: Object
    }
  }
</script>

<style scoped>
li {
  counter-increment: item;
  list-style-type: none;
  margin-left: 35px;
  position: relative;
}
li:before {
  content: counter(item);
  display: inline-block;
  position: absolute;
  left: -60px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-family: 'Merriweather Sans', Helvetica, sans-serif;
  font-size: 25px;
  text-align: center;
  background: #EAECEF;
  color: #767C88;
}
@media only screen and (max-width: 480px) {
  li {
    margin-left: -25px;
  }
  li:before {
    display: none;
  }
}
</style>
