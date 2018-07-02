<template>
  <vue-cookie-accept-decline
    :debug="false"
    :position="'bottom'"
    :disable-decline="false"
    :transition-name="'slideFromBottom'"
    @clickedAccept="accept">

    <div slot="message">
      This site tracks visits anonymously using cookies. <a href="https://www.wearecast.org.uk/privacy-policy/" target="_blank">Learn More</a>
    </div>
  </vue-cookie-accept-decline>
</template>

<script>
  import VueCookieAcceptDecline from 'vue-cookie-accept-decline';

  export default {
    components: {
      VueCookieAcceptDecline
    },
    methods: {
      accept () {
        window.location.reload();
      }
    }
  }
</script>