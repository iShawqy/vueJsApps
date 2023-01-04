<template>
  <div class="chatHeadMainContainer">
    <img :src="profilePhoto">
    <div class="userNameStatusContainer">
  {{chattee}}
  <div class="italicText">
    {{status}}
  </div>

</div>
  </div>

</template>

<script>
export default {
name: "chatHead",
props: ['chattee', 'status'],
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
</style>