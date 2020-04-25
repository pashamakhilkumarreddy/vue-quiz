<template>
    <div class="columns is-mobile is-centered is-vcentered mt-6">
        <div class="column is-10 has-text-centered">
            <section class="hero">
                <div class="hero-body">
                    <div class="is-flex">
                        <div class="content has-text-grey">
                            Counter : {{ index + 1 }}/{{ totalQuestions }}
                        </div>
                        <div class="content has-text-weight-bold has-text-primary">
                            Total correct : {{ getTotalScore() }}
                        </div>
                    </div>
                    <hr />
                    <div class="container">
                        <h2 class="title is-1">{{ question.question }}</h2>
                        <div class="list is-hoverable">
                            <span v-for="(answer, index) in answers" :key="index"
                            :class="['list-item', {'is-danger': isAnswered && !isCorrectAnswer
                            && (selectedIndex == index + 1)},
                            {'is-success': isAnswered && isCorrectAnswer
                            && (selectedIndex == index + 1)}]"
                            @click="checkAnswer(answer, index + 1)">
                                {{ answer }}
                            </span>
                        </div>
                        <div class="buttons">
                            <button @click.prevent="submitQuiz()" class="button is-primary"
                            :disabled="index === 0">
                                Submit
                            </button>
                            <button @click="next" class="button is-info"
                            :disabled="index === index || !isAnswered">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<style scoped>
.mt-6 {
    margin-top: 3rem;
}

.hero {
    border: 2px solid #f7f7f7;
    border-radius: 0.5rem;
    box-shadow: 1px 0.1rem 0.25rem 0.1rem rgba(0, 0, 0, 0.2);
}

.is-flex {
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
}

.is-flex > * {
    margin-bottom: 0 !important;
}

span.list-item {
    color: #3273dc;
    background: #f5f5f5;
    cursor: pointer;
}

span.list-item:hover {
    background: #3273dc;
    color: #fff;
}

.is-danger {
    background: #f14668 !important;
    color: #fff;
}

.is-success {
    background: #48c774 !important;
    color: #fff;
}

.buttons {
    justify-content: center;
}
</style>
<script>
import _ from 'lodash';

export default {
  name: 'Question',
  data() {
    return {
      isAnswered: false,
      isCorrectAnswer: false,
      selectedIndex: undefined,
    };
  },
  props: {
    totalQuestions: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    question: {
      type: Object,
      required: true,
    },
    next: {
      type: Function,
      required: true,
    },
    incrementScore: {
      type: Function,
      required: true,
    },
    getTotalScore: {
      type: Function,
      required: true,
    },
    submitQuiz: {
      type: Function,
      required: true,
    },
  },
  methods: {
    checkAnswer(choice, index) {
      this.isAnswered = true;
      this.selectedIndex = index;
      if (choice === this.question.correct_answer) {
        this.isCorrectAnswer = true;
        this.incrementScore();
      }
      if (this.index < this.totalQuestions) {
        setTimeout(() => this.nextQuestion(), 1000);
      } else {
        this.submitQuiz();
      }
    },
    nextQuestion() {
      this.isAnswered = false;
      this.next();
      this.isCorrectAnswer = false;
      this.selectedIndex = undefined;
    },
  },
  computed: {
    answers() {
      const answers = [...this.question.incorrect_answers, this.question.correct_answer]
        .map((answer) => _.unescape(answer));
      return _.shuffle(answers);
    },
  },
};
</script>
