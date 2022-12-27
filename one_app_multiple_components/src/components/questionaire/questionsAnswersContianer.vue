<template>
<div class="mainContainer">
  <question-container :question-text="questionsAnswers[currentQuestionIndex].question"
                      :dark-mode-active="darkModeActive">

  </question-container>
  <answers-container :answers="questionsAnswers[currentQuestionIndex].choices"
                     :correct-styles="questionsAnswers[currentQuestionIndex].correctStyles"
                     @answerClicked="checkAnswer" >

  </answers-container>
  <score-widget :correct="correctCount" :wrong="wrongCount">
  </score-widget>
  <progress-bar :target-progress="progress">
  </progress-bar>

</div>
</template>

<script>
import questionContainer from "@/components/questionaire/questionContainer";
import answersContainer from "@/components/questionaire/answersContainer";
import scoreWidget from "@/components/questionaire/scoreWidget";
import progressBar from "@/components/questionaire/progressBar";
export default {
name: "questionsAnswersContianer",
  components: {questionContainer, answersContainer,
    scoreWidget, progressBar},
  data(){
    return {
      darkModeActive: false,
      currentQuestionIndex: 0,
      questionsAnswers: this.createQuestions(),
      correctCount: 0,
      wrongCount: 0,
      progress: 0,
    }
  },

  methods: {


    createQuestions(){
      let questions = [
          'What is the capital of France?',
          'What is the currency of Germany?',
          'Where is the statue of freedom located?',
          'What is the capital of Egypt?',
          'What is the capital of Austria?',
          'What is the currency of Switzerland?',
          'Where is the Alianz Arena football stadium located?',
          'What is the capital of Italy?',
      ];
      let answers = [
          ['Berlin', 'Paris', 'Amsterdam'],
          ['Euro', 'German Mark', 'Pound'],
          ['Spain', 'Italy', 'USA'],
          ['Alexandria', 'Marakesh', 'Cairo'],
          ['Berlin', 'Paris', 'Vienna'],
          ['Euro', 'Swiss Frank', 'Dollars'],
          ['Berlin', 'Munich', 'Hamburg', 'Barcelona'],
          ['Vienna', 'Rome', 'Budapest'],
      ];
      let correctAnswers = [
          'Paris',
          'Euro',
          'USA',
          'Cairo',
          'Vienna',
          'Swiss Frank',
          'Munich',
          'Rome'

      ];
      let QA = []
      for (let i = 0; i < questions.length; i++) {
        var cs = [];
        for (let s = 0; s < answers[i].length; s++) {
          cs.push(false)
        }
        QA.push(
            {
              question: questions[i],
              choices: answers[i].sort((a, b) => 0.5 - Math.random()),
              correctAnswer: correctAnswers[i],
              correctStyles: cs

            }
        )
      }

      return QA


    },
    nextQuestion(){

      this.resetCorrectStyles()
      // this.correctAnswer = false;
      if (this.currentQuestionIndex < this.questionsAnswers.length-1){
           this.currentQuestionIndex += 1;
      } else {
        this.currentQuestionIndex = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.progress = 0;
        this.questionsAnswers = this.createQuestions();
      }
    },
    checkAnswer(answer){
      if (this.questionsAnswers[this.currentQuestionIndex].correctAnswer == answer){
        this.correctCount += 1;
        var cs = [];
        for (let s = 0; s < this.questionsAnswers[this.currentQuestionIndex].correctStyles.length; s++) {
          if (this.questionsAnswers[this.currentQuestionIndex].choices[s] == answer){
            cs.push(true)
          }
          else{cs.push(false)}

        }
        this.questionsAnswers[this.currentQuestionIndex].correctStyles = cs;
        this.progress = ((this.currentQuestionIndex+1)/this.questionsAnswers.length)*100;
        setTimeout(() => {
                    this.nextQuestion()
                }, 400);
        // this.questionsAnswers[this.currentQuestionIndex].correctStyle = true;
        // this.correctAnswer = true;
        // this.nextQuestion()
      }
      else {
        this.wrongCount +=1;
        var cs = [];
        for (let s = 0; s < this.questionsAnswers[this.currentQuestionIndex].correctStyles.length; s++) {
          cs.push(false)
        }
        this.questionsAnswers[this.currentQuestionIndex].correctStyles = cs;
      }

    },
    resetCorrectStyles(){

      var cs = [];
        for (let s = 0; s < this.questionsAnswers[this.currentQuestionIndex].correctStyles.length; s++) {
          cs.push(false)
        }
        this.questionsAnswers[this.currentQuestionIndex].correctStyles = cs;

    },

    },

}
</script>

<style scoped>
.mainContainer{
  display: flex;
    flex-direction: column;
    width: fit-content;
    /*height: fit-content;*/
  justify-content: flex-start;

}
</style>