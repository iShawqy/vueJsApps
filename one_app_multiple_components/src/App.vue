<template>

  <div class="mainContainer" >
    <calculator-main></calculator-main>
    <main-plotting-demo></main-plotting-demo>
        <SignupForm form-title="Who are you?🙂" >
    </SignupForm>
    <main-chatting-app></main-chatting-app>
    <main-chatting-app></main-chatting-app>
    <main-movable-elements></main-movable-elements>
<!--    <main-indloc></main-indloc>-->
<!--    <main-my-store-app></main-my-store-app>-->
<!--    <main-editable-questionaire>-->

<!--    </main-editable-questionaire>-->
<!--    <main-chatting-app>-->

<!--    </main-chatting-app>-->

<!--  <main-movable-elements>-->

<!--  </main-movable-elements>-->
<!--    <questions-answers-contianer>-->
<!--    </questions-answers-contianer>-->
<!--    <calculatorMain>-->
<!--    </calculatorMain>-->
<!--    <SignupForm form-title="1st form" >-->
<!--    </SignupForm>-->
  </div>


</template>

<script>
// import SignupForm from "@/components/forms/SignupForm";
// import calculatorMain from "@/components/calculatorContainers/calculatorMain";
// import questionsAnswersContianer from "@/components/questionaire/questionsAnswersContianer";
// import mainMovableElements from "@/components/movableElements/mainMovableElements";
// import axios from 'axios';
// import mainEditableQuestionaire from "@/components/editableQuestionaire/mainEditableQuestionaire";

// import mainChattingApp from "@/components/chattingApp/mainChattingApp";
// import mainMyStoreApp from "@/components/myStore/mainMyStoreApp";
// import mainIndloc from "@/components/indlocWithVue/mainIndloc";
import mainPlottingDemo from "@/components/plottingWithVue/mainPlottingDemo";
import calculatorMain from "@/components/calculatorContainers/calculatorMain";
import SignupForm from "@/components/forms/SignupForm";
import mainChattingApp from "@/components/chattingApp/mainChattingApp";
import MainMovableElements from "@/components/movableElements/mainMovableElements";






export default {

  name: 'App',
  components: {MainMovableElements, mainChattingApp, calculatorMain, mainPlottingDemo, SignupForm},





  }


</script>

<style scoped>
  body {
    /*width: 100%;*/
    /*height: 100%;*/
    font-family: "Lucinda Grande";
    padding: 0;
    margin: 0;
    background-color: #000000;
    /*overflow: scroll;*/


}


  /*Uncomment this for centering your app in the middle of the screen*/
  /*.mainContainer{*/
  /*  position: absolute;*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  width: fit-content;*/
  /*  height: fit-content;*/
  /*  left: 50%;*/
  /*    top: 50%;*/
  /*    -webkit-transform: translate(-50%, -50%);*/
  /*    transform: translate(-50%, -50%);*/
  /*}*/

  /*Uncomment this for allowing your app to use the full screen*/
    .mainContainer{
      /*position: absolute;*/
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      width: 100vw;
      height: 100vh;
      background-color: #cfcfcf;
      /*background-color: black;*/
    /*left: 50%;*/
    /*  top: 50%;*/
    /*  -webkit-transform: translate(-50%, -50%);*/
    /*  transform: translate(-50%, -50%);*/
  }









</style>

