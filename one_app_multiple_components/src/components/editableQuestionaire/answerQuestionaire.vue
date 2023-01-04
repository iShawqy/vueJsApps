<template>
<div>
  <div v-if="questionaires.length==0">
    There is no available questionairs. Refresh this page to create a questionaire.
  </div>
  <div v-if="questionaires.length>0" v-for="questionaire in questionaires"
  :key="questionaire.id"
  >
    {{questionaire.title}}
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
name: "answerQuestionaire",
  data(){
  return {
    questionaires: []
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
  }
  },
  mounted() {
  this.getAvailableQuestionaires()
  }
}
</script>

<style scoped>

</style>