<template>
<div class="mainContainer">
  <button class="optionBtnStyle btnGreen" @click="clickAnswerQuestionaire" v-if="selectedOption==null">
    Answer a questionaire
  </button >
  <button class="optionBtnStyle btnBlue" @click="selectedOption=2" v-if="selectedOption==null">
    Create a questionaire
  </button>
  <button class="optionBtnStyle btnRed" @click="clickEditRemoveQuestionaire" v-if="selectedOption==null">
    Edit/Remove a questionaire
  </button>
  <answer-questionaire v-if="selectedOption==1"></answer-questionaire>
  <create-questionaire v-if="selectedOption==2"></create-questionaire>
  <edit-remove-questionaire v-if="selectedOption==3"></edit-remove-questionaire>




</div>
</template>

<script>
import createQuestionaire from "@/components/editableQuestionaire/createQuestionaire";
import answerQuestionaire from "@/components/editableQuestionaire/answerQuestionaire";
import editRemoveQuestionaire from "@/components/editableQuestionaire/editRemoveQuestionaire";
import axios from "axios";
export default {
name: "homeView",
  components: {answerQuestionaire, createQuestionaire, editRemoveQuestionaire},
  data(){
  return {
    selectedOption: null,
    questionaires: [],
  }

  },
  methods : {
  getAvailableQuestionaires(){
    axios.get("http://localhost:3004/questionairs")
    .then(response => {
      this.questionaires = response.data;
    })
    .catch( error => {
      this.$toast.error(error, {
        position: "bottom"
      });
    })
  },
  clickAnswerQuestionaire(){
    if (this.questionaires.length == 0){
      this.$toast.error('There is no available questionaires to answer', {
        position: "bottom"
      });
    }
    else {
      this.selectedOption = 1
    }
  },
  clickEditRemoveQuestionaire(){
    if (this.questionaires.length == 0){
      this.$toast.error('There is no available questionaires to Edit/Remove', {
        position: "bottom"
      });
    }
    else {
      this.selectedOption = 3;
    }
  }
  },
  mounted() {

  this.selectedOption = null;
  this.getAvailableQuestionaires();
  }
}
</script>

<style scoped>


.optionBtnStyle{
  height: 60px;
  width: 300px;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 20px;
  font-family: Arial;
  border: solid;
  text-align: center;
  text-decoration: none;
  opacity: 0.6;
  transition: 0.3s;
  margin-top: 5px;
  margin-bottom: 5px;
}

.btnGreen{
  background-color: #00c631;
}

.btnBlue{
  background-color: #3e30ff;
}

.btnRed{
  background-color: #fd0000;
}

.optionBtnStyle:hover{
  opacity: 1;

}
.mainContainer{
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  /*background-color: black;*/
    left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
}
</style>