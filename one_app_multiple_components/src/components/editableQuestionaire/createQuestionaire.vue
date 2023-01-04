<template>
<div class="mainContainer">
  <questionaire-head @filled="executeHeadFilled"
                     ref="refQestionaireHead"
                     @questionaireHeadData="updateQuestionaireHeadData"
  >
  </questionaire-head>
  <add-question-form @filled="executeQuestionFormFilled"
                     ref="refAddQuestionForm"
                     @formData="updateFormData"
                     @inputsStates="getInputStates"
  ></add-question-form>
  <div class="actionButtonsContainer">

    <button class="BtnStyle btnBlack"  @click="submitQuestion">
    Submit
  </button>


  </div>

  <div class="actionButtonsContainer">
    <button class="BtnStyle btnBlack" @click="goBack">
      &lt;
    </button>
    <button class="BtnStyle btnRed"  @click="deleteQuestion">
    delete question
  </button>

    <button class="BtnStyle btnBlue"  @click="addNewQuestion">
    +new question
    </button>




    <button class="BtnStyle btnBlack" @click="goForward">
      &gt;
    </button>
  </div>

  <button class="BtnStyle btnGreen" @click="saveQuestionaire">
    {{saveBtnLabel}}
  </button>




</div>
</template>

<script>
import questionaireHead from "@/components/editableQuestionaire/questionaireHead";
import addQuestionForm from "@/components/editableQuestionaire/addQuestionForm";
import axios from "axios";

export default {
name: "createQuestionaire",
components:{questionaireHead, addQuestionForm},


data(){
  return {
    headFilled: false,
    questionFormFilled: false,
    currentQuestionIndex: 0,
    questionaire: {
      id: 0,
      title: "",
      length: 0,
      creator: "",
      createdOn: "",
      description: "",
      questions : [
          {
          question: "",
          choices : [],
          correctAnswer: "",
          submitted: false,
        }
      ]
    },
    questionaireHeadDefault: {
      creator: '',
      title: '',
      description: '',
    },
    questionDefault: {
      inputValue: '',
        label: 'Question',
        defaultValueToShow: 'ask a question',
        width: '400px',
    },
    choicesDefault: [
        {
          type: 'choice',
        inputValue: '',
        label: 'Choice 1',
        defaultValueToShow: 'Write choice 1',
        width: '400px',
          correctAnswer: false,
      },
        {
          type: 'choice',
        inputValue: '',
        label: 'Choice 2',
        defaultValueToShow: 'Write choice 2',
        width: '400px',
          correctAnswer: false,
      },
        {
          type: 'choice',
        inputValue: '',
        label: 'Choice 3',
        defaultValueToShow: 'Write choice 3',
        width: '400px',
          correctAnswer: false,
      },
        {
          type: 'choice',
        inputValue: '',
        label: 'Choice 4',
        defaultValueToShow: 'Write choice 4',
        width: '400px',
          correctAnswer: false,
      }
    ],
    submitted: false,
    saveBtnLabel: 'Save questionaire'

  }
},
methods:{
  executeHeadFilled(filled){
    this.headFilled = filled;
  },
  executeQuestionFormFilled(filled){
    this.questionFormFilled = filled;
  },

  get(){
    this.$refs.refQestionaireHead.emitData();
    this.$refs.refAddQuestionForm.emitData();
  },
  updateQuestionaireHeadData(data){
    if (this.headFilled) {
      this.questionaire.title = data.title;
      this.questionaire.creator = data.creator;
      this.questionaire.description = data.description;
    }


  },

  updateFormData(data){
    if (this.questionFormFilled) {
      this.questionaire.questions[this.currentQuestionIndex].question = data[0].inputValue;
      this.questionaire.questions[this.currentQuestionIndex].choices = [];
      for (let i=0; i<data[1].length; i++) {
        this.questionaire.questions[this.currentQuestionIndex].choices.push(data[1][i].inputValue)
      }
      this.questionaire.questions[this.currentQuestionIndex].correctAnswer = data[2];

      this.$toast.success('Question was added successfully', {
          position: "bottom"
        });
      this.submitted = true;
      this.questionaire.questions[this.currentQuestionIndex].submitted = true;

    }

  },

  deleteQuestion(){
    // this.reset();
    if (this.questionaire.questions[this.currentQuestionIndex].submitted){
      this.questionaire.questions.splice(this.currentQuestionIndex, 1);
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex -= 1;
        this.set();
      } else {
        this.appendNewQuesrionDict()
        this.set()
      }
      this.$toast.success('Question was deleted successfully', {
        position: "bottom"
      });
    } else {
      this.$toast.error('Can not delete an unsubmitted question', {
        position: "bottom"
      });
    }



  },

  appendNewQuesrionDict(){
    var choices = [];
    for (let i=0; i<4;i++){
      choices.push('')
    }
    var question = {
          question: "",
          choices : choices,
          correctAnswer: ""
        }
    this.questionaire.questions.push(question)

  },

  submitQuestion(){
    this.get();
    // if (!this.headFilled || !this.questionFormFilled) {
    //     this.$toast.error('Please fill-in all data before you can submit', {
    //     position: "bottom"
    //   });
    // }


  },

  addNewQuestion(){
    if (this.submitted){
      if (this.currentQuestionIndex != this.questionaire.questions.length-1){
        this.currentQuestionIndex = this.questionaire.questions.length-1;
      }
      this.appendNewQuesrionDict();
      this.currentQuestionIndex += 1;
      this.set();
      this.submitted = false;
    } else {
      this.$toast.error('Please submit the current question first', {
        position: "bottom"
      });
    }
    // this.reset();

  },

  goBack(){
    if (this.currentQuestionIndex > 0) {

      if (!this.questionaire.questions[this.currentQuestionIndex].submitted){
        this.getInputStates()
      }
      this.currentQuestionIndex -= 1;
      this.set()
    } else {
      this.$toast.error('Can not go back anymore', {
          position: "bottom"
        });
    }
  },

  goForward() {
    if (this.currentQuestionIndex < this.questionaire.questions.length-1) {
      if (!this.questionaire.questions[this.currentQuestionIndex].submitted){
        this.getInputStates()
      }
      this.currentQuestionIndex += 1;
      this.set();
    } else {
      this.$toast.error('Can not go forward anymore', {
          position: "bottom"
        });
    }
  },

  getInputStates(){

  },
  reset() {
    // this.$refs.refQestionaireHead.reset(this.questionaireHeadDefault);
    var choices = [];
    for (let i=0; i<4;i++){
      choices.push('')
    }
    var question = {
          question: "",
          choices : choices,
          correctAnswer: ""
        }
    this.$refs.refAddQuestionForm.reset([question.question, choices]);
    },

  set(){
    this.$refs.refAddQuestionForm.reset([this.questionaire.questions[this.currentQuestionIndex].question,
      this.questionaire.questions[this.currentQuestionIndex].choices]);
  },

  saveQuestionaire(){
    if (this.questionaire.id>0){
      var qLength = this.questionaire.questions.length;
      this.questionaire.length = qLength;
      axios({
        method: 'put',
        url:'http://localhost:3004/questionairs/' + this.questionaire.id.toString(),
        data: this.questionaire
      })
      .then(response => {
        this.questionaire.id = response.data.id;
        this.$toast.success('Questionaire was updated successfully',  {
        position: "bottom"})
      })

      .catch(error => {

        this.$toast.error('Error while updating the questionaire', {
        position: "bottom"});
      })
      // .finally(()=>{
      //
      //   this.$toast.info('updating done',  {
      //   position: "bottom"})
      // })
    } else {
      if (this.headFilled && this.questionFormFilled) {

      var qLength = this.questionaire.questions.length;
      this.questionaire.length = qLength;
      this.questionaire.createdOn = Date.now().toString()

      axios({
        method: 'post',
        url:'http://localhost:3004/questionairs',
        data: this.questionaire
      })
      .then(response => {
        this.questionaire.id = response.data.id;
        this.saveBtnLabel = 'Update questionaire';
        this.$toast.success('Questionaire was saved successfully',  {
        position: "bottom"})
      })

      .catch(error => {

        this.$toast.error('Error while saving the questionaire', {
        position: "bottom"});
      })
      // .finally(()=>{
      //   this.$toast.info('saving done',  {
      //   position: "bottom"})
      // })

    } else {
      this.$toast.error('Please fill-in all data before you can save the questionaire', {
        position: "bottom"
      });
    }
    }

  },





},

}
</script>

<style scoped>
.mainContainer{
  display: flex;
  width: fit-content;
  height: fit-content;
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: center;*/
}

.actionButtonsContainer{
  display: flex;
  width: 500px;
  height: 30px;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 5px;
}

.BtnStyle{
  height: 30px;
  width: fit-content;
  border-radius: 10px;
  font-size: 20px;
  font-family: Arial;
  border: none;
  text-align: center;
  text-decoration: none;
  opacity: 0.6;
  transition: 0.3s;
  margin: 5px;
  color: white;
}

.BtnStyle:hover{
  opacity: 1;

}

.btnGreen{
  background-color: #00c631;
}

.btnBlue{
  background-color: #0022ff;
}
.btnRed{
  background-color: #ff0000;
}

.btnBlack{

  background-color: #000000;
  color: white;
}

</style>