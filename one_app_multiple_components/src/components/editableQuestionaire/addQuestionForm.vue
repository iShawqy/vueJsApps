<template>
  <div class="mainContainer">
    <div class="choiceContainer">
      <editable-input-with-label
                               v-model.trim="question.inputValue" :label="question.label"
                               :default-value-to-show="question.defaultValueToShow" :width="question.width">
    </editable-input-with-label>
    <editable-input-with-label v-for="item in choices"
                               v-model.trim="item.inputValue" :label="item.label"
                               :default-value-to-show="item.defaultValueToShow" :width="item.width">
    </editable-input-with-label>
    </div>

    <div class="labelSelectContainer">
      <label class="label" for="comboBox">Correct answer</label>
  <select  class="selectStyle" id="comboBox" v-model="selected">
  <option disabled value="">Please select the correct answer</option>
  <option  v-for="item in choices">{{item.inputValue}}</option>
</select>

    </div>


  </div>

</template>

<script>
import editableInputWithLabel from "@/components/editableQuestionaire/editableInputWithLabel";
export default {
name: "addQuestionForm",
  components: {editableInputWithLabel},
  mounted() {
  const checkFormFilled = setInterval(() => {
              this.checkQuestionFormFilled();
            }, 50);
},
  data (){
  return {
    question: {
      inputValue: '',
        label: 'Question',
        defaultValueToShow: 'ask a question',
        width: '400px',
    },
    choices: [
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
    selected: '',
    questionFormFilled: false,
    errorMessage: null,
  }
  },
  methods:{
  checkQuestionFormFilled(){
    var oldValue = this.questionFormFilled;

    if (this.question.inputValue.length==0){
      this.questionFormFilled = false;
      this.errorMessage = 'Please type in a question first';
    } else {
      this.questionFormFilled = true;
      this.errorMessage = null;
    }



    if (this.questionFormFilled) {
      for (const [prop, value] of Object.entries(this.choices)) {
      if (value.inputValue.length == 0){
        this.questionFormFilled = false;
        this.errorMessage = 'Please give a choice @ ' + value.label
        break
      } else {
        this.questionFormFilled = true;
        this.errorMessage = null;
      }
    }
    }
    if (this.questionFormFilled) {
      if (this.selected!="") {
        this.questionFormFilled = true;
        this.errorMessage = null;
      } else {
        this.questionFormFilled = false;
        this.errorMessage = 'Please select the correct answer before submitting';

      }
    }


    if (this.questionFormFilled) {
        if (oldValue != this.questionFormFilled) {
          this.$emit('filled', true)
        }
      } else {
      if (oldValue != this.questionFormFilled) {
          this.$emit('filled', false)
        }
    }

  },
  reset(data){
    this.question.inputValue = data[0];
    for (let i=0; i<this.choices.length; i++){
      this.choices[i].inputValue = data[1][i];
    }
  },
  emitData(){
    if (this.errorMessage != null){
      this.$toast.error(this.errorMessage, {
        position: "bottom"
      });
      this.errorMessage = null;
    }
    this.$emit('formData', [this.question, this.choices, this.selected])
  },
  getInputsStates(){
    this.$emit('inputsStates', [this.question, this.choices])
  }
  }
}
</script>

<style scoped>
.mainContainer{
  display: flex;
  width: 800px;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.choiceContainer{
  display: flex;
  width: 800px;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.answerSelectorBtn {
  width: 60px;
  height: 25px;
  background-color: #008000;
  color: white;
  border-radius: 10px;
  /*margin-top: 5px;*/
  /*margin-bottom: 5px;*/
  /*margin-left: 5px;*/
  /*margin-right: 5px;*/
  font-size:10px;
  font-family:"Arial";
  align-content: center;
  text-align: center;
}

.selectStyle{
  width: 350px;
  height: 30px;
  border-radius: 10px;
  margin: 5px;
  color: black;
  border-color: green;
   font-size: 16px;
  font-family: Arial;
}

.label{
  font-size: 20px;
  font-family: Arial;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.labelSelectContainer{
  display: flex;
  width: 800px;
  height: fit-content;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>