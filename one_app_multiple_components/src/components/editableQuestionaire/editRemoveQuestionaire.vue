<template>
<div class="mainContainer">
  <div v-if="questionaires.length==0">
    There is no available questionairs to edit. Refresh this page to create a questionaire.
  </div>
  <div v-if="questionaires.length>0" v-for="questionaire in questionaires"
  :key="questionaire.id" @click="edititing=true"
  >
    {{questionaire.title}}
  </div>
  <div class="buttonsContainer">
    <button class="actionBtns btnBlue" @click="edit">
    Edit
  </button >
  <button class="actionBtns btnRed">
    Remove
  </button>
  </div>
</div>

</template>

<script>
import axios from "axios";


export default {
name: "editRemoveQuestionaire",

  data(){
  return {
    questionaires: [],
    edititing: false,
  }
  },
  methods:{
  getAvailableQuestionaires(){
    axios.get("http://localhost:3004/questionairs")
    .then(response => {
      this.questionaires = response.data;
    })
    .catch( error => {
      console.log(error)
    })
  },
  edit(){
    if (!this.edititing){
      console.log('toast')
      this.$toast.error('Please select a questionaire to edit!', {
        position: "bottom"
      });
    }
    // this.edititing = true;

    },
  },
  mounted() {
  this.getAvailableQuestionaires()
  }
}
</script>

<style scoped>

.mainContainer{
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}


.buttonsContainer{
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.actionBtns{
    height: 50px;
  width: 80px;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-family: Arial;
  border: solid;
  text-align: center;
  text-decoration: none;
  opacity: 0.6;
  transition: 0.3s;
  margin-top: 5px;
  margin-bottom: 5px;
}

.btnRed{
  background-color: #fd0000;
}

.btnBlue{
  background-color: #3e30ff;
}


.actionBtns:hover{
  opacity: 1;

}
</style>