<template>
  <div id="app">
    <Header />
    <main class="container" id="app">
      <QuestionBox v-if="questions.length && index < totalNumberOfQuestions && !showResult"
      :totalQuestions="totalNumberOfQuestions" :index="index"
      :question="questions[index]" :next="next" :incrementScore="incrementScore"
      :getTotalScore="getTotalScore" :submitQuiz="submitQuiz" />
      <Result v-if="showResult"
        :score="totalCorrect" :total="totalNumberOfQuestions" :restartQuiz="restartQuiz" />
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import QuestionBox from '@/components/Question.vue';
import Result from '@/components/Result.vue';

export default {
  name: 'App',
  data() {
    return {
      questions: [],
      index: 0,
      totalNumberOfQuestions: 2,
      totalCorrect: 0,
      showResult: false,
    };
  },
  components: {
    Header,
    QuestionBox,
    Footer,
    Result,
  },
  methods: {
    async getQuizQuestions() {
      this.index = 0;
      this.totalCorrect = 0;
      this.showResult = false;
      this.questions.splice(0, this.questions.length);
      try {
        const questions = await fetch(`https://opentdb.com/api.php?amount=${this.totalNumberOfQuestions}`, {
          method: 'get',
        });
        const formattedQuestions = await questions.json();
        this.questions = formattedQuestions.results;
      } catch (err) {
        console.error(err);
      }
    },
    next() {
      if (this.index < this.totalNumberOfQuestions) {
        this.index += 1;
      }
    },
    incrementScore() {
      this.totalCorrect += 1;
    },
    getTotalScore() {
      return this.totalCorrect;
    },
    submitQuiz() {
      this.showResult = true;
    },
    restartQuiz() {
      this.getQuizQuestions();
    },
  },

  async mounted() {
    this.getQuizQuestions();
  },
};
</script>
<style>
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 16px !important;
    position: relative;
    min-height: 100vh;
    text-rendering: optimizeLegibility;
  }

  .m-auto {
    margin: auto;
  }

  .mt-6 {
    margin-top: 3rem;
  }
</style>
