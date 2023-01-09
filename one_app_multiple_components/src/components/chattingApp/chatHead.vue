<template>
  <div class="chatHeadMainContainer">
<!--    <div class="percentageLabelStyle">{{nrMsgsBarValue}}%</div>-->
    <cutom-progress-bar :value="nrMsgsBarValue">

    </cutom-progress-bar>
<!--    <progress class="progressBar" :value="nrMsgsBarValue"-->
<!--              :class="{dangerStyle:nrMsgsBarValue>=60, moderateStyle:nrMsgsBarValue<60 && nrMsgsBarValue>40}"-->

<!--              max="100"></progress>-->
    <div class="pictureNameStatusContainer">
      <img :src="profilePhoto">
      <div class="userNameStatusContainer">
        {{username}}
      <div class="italicText">
        {{status}}
      </div>
      </div>
    </div>

    <cutom-progress-bar :value="lenMsgsBarValue">

    </cutom-progress-bar>
<!--    <progress class="progressBar" :value="lenMsgsBarValue"-->
<!--              :class="{dangerStyle:lenMsgsBarValue>=60, moderateStyle:lenMsgsBarValue<60 && lenMsgsBarValue>40}"-->
<!--              max="100"></progress>-->
<!--    <div class="percentageLabelStyle">{{lenMsgsBarValue}}%</div>-->
  </div>

</template>

<script>
import cutomProgressBar from "@/components/commonComponents/cutomProgressBar";
export default {
name: "chatHead",
props: ['username', 'status', 'nrMsgsBarValue', 'lenMsgsBarValue'],
components: {cutomProgressBar},
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
    console.log(this.username)
    this.profilePhoto = '/usersPhotos/'+ this.username +'.png';
    // this.profilePhoto = 'logo.png';
  }
},
watch:{
  username(){
    this.getChatteePhoto()
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
  justify-content: space-around;
  align-items: center;
  background-color: rgb(32,44,51);
  border-radius: 5px;

}

.pictureNameStatusContainer{
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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