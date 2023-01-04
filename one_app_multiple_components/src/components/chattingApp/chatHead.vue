<template>
  <div class="chatHeadMainContainer">
    <div class="percentageLabelStyle">{{nrMsgsBarValue}}%</div>

    <progress class="progressBar" :value="nrMsgsBarValue"
              :class="{dangerStyle:nrMsgsBarValue>=60, moderateStyle:nrMsgsBarValue<60 && nrMsgsBarValue>40}"

              max="100"></progress>

    <img :src="profilePhoto">
    <div class="userNameStatusContainer">
  {{chattee}}
  <div class="italicText">
    {{status}}
  </div>

</div>
    <progress class="progressBar" :value="lenMsgsBarValue"
              :class="{dangerStyle:lenMsgsBarValue>=60, moderateStyle:lenMsgsBarValue<60 && lenMsgsBarValue>40}"
              max="100"></progress>
    <div class="percentageLabelStyle">{{lenMsgsBarValue}}%</div>
  </div>

</template>

<script>
export default {
name: "chatHead",
props: ['chattee', 'status', 'nrMsgsBarValue', 'lenMsgsBarValue'],
mounted() {
  this.getChatteePhoto();
},
  data (){
  return {
    profilePhoto: '',
  }
},
methods :{
  getChatteePhoto(){
    this.profilePhoto = '/usersPhotos/'+ this.chattee +'.png';
    // this.profilePhoto = 'logo.png';
  }
}

}
</script>

<style scoped>
.chatHeadMainContainer{
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgb(32,44,51);
  border-radius: 5px;

}
.userNameStatusContainer{
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-family: Arial;
}

.percentageLabelStyle{
  color: white;
  font-size: 12px;
  font-family: Arial;
}

.italicText{
  margin-top: 5px;
  font-style: italic;
  font-size: 12px;
}

img {
  border-radius: 50%;
  width: 40px;
  margin-right: 10px;
}

.progressBar {
  margin-right: 10px;
  margin-left: 10px;

}

.dangerStyle{
  accent-color: #ff0000;
}

.moderateStyle{
  accent-color: #0be23d;
}
/*.progressBar::-moz-progress-bar {*/
/*    background: green;*/
/*}*/

/* For Chrome or Safari */
/*.progressBar::-webkit-progress-value {*/
/*    background: green;*/
/*}*/

</style>