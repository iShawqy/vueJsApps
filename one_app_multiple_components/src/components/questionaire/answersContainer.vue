<template>
<div class="mainContainer">
<answer-container v-for="(answer,index) in answers"
                  :answer-idx="index+1" :answer-text="answer"
                  :correctStyle="correctStyles[index]"
                  @click="answerClicked(answer)"
>

</answer-container>
</div>
</template>

<script>
import answerContainer from "@/components/questionaire/answerContainer";
export default {
name: "answersContainer",
  components: {answerContainer},
  props: ['answers', 'correctStyles'],
  // data(){
  // return {
  //   answerIdx:0
  // }
  // },

  methods: {
  answerClicked(answer){
      this.$emit('answerClicked', answer);
    },

  }
}
</script>

<style scoped>
.mainContainer{
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  overflow-y: scroll;
  height: 200px;
  margin-bottom: 10px;
  margin-top: 10px;

}
</style>