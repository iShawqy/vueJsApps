<template>
  <div class="mainContainer">
    <editable-input-with-label v-model.trim="questionaireHeadData.creator" label="Your name"
default-value-to-show="Elvis" width="100px">
</editable-input-with-label>
  <editable-input-with-label v-model.trim="questionaireHeadData.title" label="Title"
default-value-to-show="ex: Personality test" width="200px">
</editable-input-with-label>
    <editable-input-with-label v-model.trim="questionaireHeadData.description" label="Description"
default-value-to-show="explain what is it about in few words" width="350px" >
</editable-input-with-label>
  </div>


<!--<div v-if="questionaireHeadFilled">-->
<!--  All filled-->
<!--</div>-->
</template>

<script>
import editableInputWithLabel from "@/components/editableQuestionaire/editableInputWithLabel";

export default {
name: "questionaireHead",
components: {editableInputWithLabel},
// props: ['questionaireHeadDataDefault'],

data () {
  return {
    questionaireHeadData:{
      creator: '',
      title: '',
      description: '',
    },
    questionaireHeadFilled: false,
    errorMessage: null,

  }
},
mounted() {

  setInterval(() => {
              this.checkQuestionaireHeadFilled();
            }, 50);
  },
  methods:{
  checkQuestionaireHeadFilled(){
    var oldValue = this.questionaireHeadFilled;
    for (const [prop, value] of Object.entries(this.questionaireHeadData)) {
      if (value.length == 0){
        this.questionaireHeadFilled = false;
        this.errorMessage = 'Please fill the Questionaire Header first'
        break
      } else {
        this.questionaireHeadFilled = true;
        this.errorMessage = null;
      }
    }

    if (this.questionaireHeadFilled) {
        if (oldValue != this.questionaireHeadFilled) {
          this.$emit('filled', true)
        }
      } else {
      if (oldValue != this.questionaireHeadFilled) {
          this.$emit('filled', false)
        }
    }
  },
  reset(data){
    this.questionaireHeadData.creator = data.creator;
    this.questionaireHeadData.title = data.title;
    this.questionaireHeadData.description = data.description;
  },
  emitData(){
    if (this.errorMessage != null){
      this.$toast.error(this.errorMessage, {
        position: "bottom"
      });
      this.errorMessage = null;
    }
    this.$emit('questionaireHeadData', this.questionaireHeadData)
  },

  }
}
</script>

<style scoped>
.mainContainer{
  display: flex;
  width: 800px;
  height: fit-content;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>