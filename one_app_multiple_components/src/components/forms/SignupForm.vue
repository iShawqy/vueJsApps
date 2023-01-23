<template>

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
<form class="customForm" v-if="visible">
  <div class="topBar">
    <button class="topBarButtons">
      <div class="topBarButtonsContents" @click="hideForm">
        x
      </div>
    </button>
  </div>
  <div class="baseStyle formTitle">
    {{formTitle}}
  </div>


  <div>
    <input id="firstname" @focusout="checkEmptyInput('firstName')" @click="removePlaceHolder('firstName')"
           v-model.trim="userInfo.firstName" class="baseStyle input" type="text" name="text"/>
  </div>
  <div>
    <input id="lastname" @focusout="checkEmptyInput('lastName')" @click="removePlaceHolder('lastName')"
           v-model.trim="userInfo.lastName" class="baseStyle input" type="text" name="text" />
  </div>

  <div>
    <input id="age" @focusout="checkEmptyInput('age')" @click="removePlaceHolder('age')"
           v-model.trim="userInfo.age" class="baseStyle input" type="text" name="text"/>
  </div>

  <div>
    <input id="job"  @focusout="checkEmptyInput('job')" @click="removePlaceHolder('job')"
           v-model.trim="userInfo.job" class="baseStyle input" type="text" name="text"/>
  </div>

  <div class="baseStyle error_label animate__animated animate__fadeInDown "
        v-if="showError">
              {{error}}
  </div>
  <div class="submitBtnContainer">
    <input class="submitBtn" type="button" :value="sendBtnText" @keyup.enter="send" @click="send"/>
  </div>
</form>
</template>

<script>
export default {
  name: "SignupForm",
  props: ["formTitle"],
  data() {
    return {
      userInfo: {
        firstName: 'First name',
        lastName: 'Last name',
        age: 'Age',
        job: 'Job'},
      userInfoPlaceHolders: {
        firstName: 'First name',
        lastName: 'Last name',
        age: 'Age',
        job: 'Job'

        },

      showError: false,
      error: 'error message',
      visible: true,
      sendBtnText: 'Send',

    }
  },


  methods: {
    hideForm(){
      this.visible = false;
    },
    removePlaceHolder(keyName){
          if (this.userInfo[keyName] == this.userInfoPlaceHolders[keyName]){
            this.userInfo[keyName] = '';
          }

    },
    checkEmptyInput(keyName){
      if (this.userInfo[keyName].length == 0){
        this.userInfo[keyName] = this.userInfoPlaceHolders[keyName];
        this.showError = true;
        this.hideError()
      }
    },

    hideError(){
            setTimeout(() => {
                    this.showError = false
                }, 2000);
        },

    send(){
      this.sendBtnText = 'Sending...';
    },

    },


}






</script>

<style scoped>
      .baseStyle{
        font-size: 20px;
        font-family: "Arial Unicode MS";
        /*color: #ffffff;*/
      }
      .topBar{
        display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      width: 100%;
      }

      .topBarButtons{
        cursor: pointer;
        border-radius: 50%;
        background-color: red;
        color: #0e0404;
        margin-top: 10px;
        margin-right: 10px;
        border: none;
        width: 15px;
        height: 15px;
        position: relative;

      }

      .topBarButtonsContents{
        position: absolute;
        bottom: 18%;
        left: 36%;
        font-size: 10px;
      }



      .error_label {
          color: #f44336;
          font-size: 12px;
          text-align: center;
          margin-top: 10px;
        }



    .formTitle{
      font-size: 16px;
      color: #9b9b9b;
      margin-top: 10px;
      margin-left: 20px;
      margin-bottom: 20px;
    }

    .input{
      width: 110%;
      border-radius: 10px;
      height: 40px;
      border: #662323;
      color: #0e0404;
      margin-bottom: 5px;
      margin-left: 20px;
      background-color: transparent;

    }

    .customForm{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      width: fit-content;
      min-width: 300px;
      height: fit-content;
      border-radius: 20px;

      /*background: linear-gradient(#086fe9, #3d416e);*/
      background-color: white;
      box-shadow: 5px 5px 3px  #000000;
    }

    .customForm:hover {
        transform: scale(1.03);
  transition: 0.3s;/* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
      }

    /*.submitBtn{*/
    /*  background-color: #2b5bd2;*/
    /*  border-radius: 5px;*/
    /*  color: white;*/
    /*  font-size: 14px;*/
    /*  width: 5vw;*/
    /*  min-width: 5vw;*/
    /*}*/

      .submitBtnContainer{
        display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      }
    .submitBtn {
      border-radius: 10px;
      background: #0071e3;
      color: #ffffff;
      padding: 10px;
      box-sizing: border-box;
      border: none;
      cursor: pointer;
      /*width: 5vw;*/
      min-width: 100px;
      font-size: 21px;
      margin-top: 5px;
      margin-bottom: 20px;

    }

    .submitBtn:hover {
      background: #78c1e0;
    }


</style>