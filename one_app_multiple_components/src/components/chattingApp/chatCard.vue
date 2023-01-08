<template>
<div class="chatCardMainContainer">
  <img :src="loadedProfilePhoto">
</div>
</template>

<script>
export default {
name: "chatCard",
props:["username", "lastMsg", "timestamp"],
data(){
  return {
    loadedProfilePhoto: '',
  }
},
mounted() {
  this.getProfilePhoto();
},
methods:{
  getProfilePhoto(){
    this.loadedProfilePhoto = '/usersPhotos/'+ this.username +'.png';
  }
}
}
</script>

<style scoped>
.chatCardMainContainer{
  display: flex;

  flex: 1 1 auto;
  overflow-y: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 96%;
  min-height: 80px;
  background-color: rgb(32,44,51);
  border-radius: 5px;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
}
img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-left: 10px;
}


</style>