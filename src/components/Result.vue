<template>
  <div class="columns iscentered is-vcentered">
    <div class="column is-10 m-auto mt-6">
      <article class="message is-info">
        <div class="message-header">
          Congralutions
          <button @click.prevent="closeMessage()" class="delete"></button>
        </div>
        <div class="message-body">
          You scored {{ score }} out of {{ total }}. {{ getMessage() }}
        </div>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Result',
  props: {
    score: {
      props: Number,
      required: true,
    },
    total: {
      props: Number,
      required: true,
    },
    restartQuiz: {
      props: Function,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    getMessage() {
      let message = '';
      if (this.score < 5) {
        message = 'Better luck next time';
      } else if (this.score > 5 && this.score < 10) {
        message = 'Good. Keep it up!';
      } else {
        message = 'You earned a perfect score. You are the best';
      }
      return message;
    },
    closeMessage() {
      this.restartQuiz();
    },
  },
};
</script>
