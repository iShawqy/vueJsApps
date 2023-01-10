<template>
<div class="chatCardMainContainer">
  <div class="outerImagBorders" :style="[defaultBorderStyle, offOnLineBorderStyle]">

    <img :style="[imgDefaultStyle]" :src="loadedProfilePhoto">
  </div>

  <div class="usernameLastMsgContainer">
    <div class="usernameLabel">
      {{username}}
    </div>

    <div :style="[lastMsgLabel, lastMsgLabelOptionalStyle]">
      {{parsedLastMsg}}
    </div>
  </div>
  <div class="lastTSLabel">
    {{parsedLastTs}}
  </div>
  <div class="unreadLabelStyle" v-if="unreadCounter>0">
      +{{unreadCounter}}
    </div>

</div>
</template>

<script>
export default {
name: "chatCard",
props:["username", "lastMsg", "timestamp", "status", "unreadCounter"],
data(){
  return {
    loadedProfilePhoto: '',
    parsedLastMsg: '',
    parsedLastTs: '',
    imgDefaultStyle: {
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      marginRight: "10px",
      marginLeft: "10px",
    },
    defaultBorderStyle:{
      display: "flex",
      borderRadius: "50%",
      width: "fit-content",
      height: "fit-content",
      justifyContent: "center",
      alignItems: "center",
    },
    offOnLineBorderStyle:{
      width: "fit-content",
      height: "fit-content",
    },
    offlineBorderStyle:{
      width: "fit-content",
      height: "fit-content",
    },
    onlineBorderStyle:{
      width: "58px",
      height: "58px",
      backgroundImage: "linear-gradient(to left, #743ad5, #00f15d)"
    },
    lastMsgLabel:{
        fontSize: "14px",
        fontFamily: "Arial",
        marginBottom: "5px",
    },
    lastMsgLabelOptionalStyle:{
      fontSize: "14px",
    },
    typingStyle: {
      color: "#00c303",
        fontSize: "14px",
        fontFamily: "Arial",
        fontStyle: "italic",

    },
    notTypingStyle:{
      color: "#a0a0a0",
        fontSize: "14px",
        fontFamily: "Arial",
        fontStyle: "normal",
    }
    // imgOffOnlineStyles:{
    //   border: "none",
    //
    // },
    // imgOnlineStyle:{
    //   border:"none",
    // },
    // imgOfflineStyle:{
    //   border: "none",
    //
    // }
  }
},
mounted() {
  this.getProfilePhoto();
  setInterval(this.parseLastMsg, 500);
  setInterval(this.checkStatus, 500);
},

methods:{
  getProfilePhoto(){
    this.loadedProfilePhoto = '/usersPhotos/'+ this.username +'.png';
  },
  parseLastMsg(){
    try {
      if (this.status == "typing...") {
        this.parsedLastMsg = this.status;
        this.parsedLastTs = '';
        this.lastMsgLabelOptionalStyle = this.typingStyle;
      } else {
        this.parsedLastMsg = this.lastMsg.content;
        this.parsedLastTs = this.lastMsg.timestamp;
        this.lastMsgLabelOptionalStyle = this.notTypingStyle;
      if (this.parsedLastMsg.length > 15){
        this.parsedLastMsg = this.parsedLastMsg.slice(0, 15) + '...'
      }
      }


    } catch (e){
      this.lastMsgLabelOptionalStyle = this.notTypingStyle;
      console.log(this.lastMsg);
      this.parsedLastMsg = '';
      this.parsedLastTs ='';
      console.log('error parsing last msg')
    }
  },
  checkStatus(){
    if (this.status == "Online"){
      this.offOnLineBorderStyle = this.onlineBorderStyle;
    } else if (this.status == "Offline"){
      this.offOnLineBorderStyle = this.offlineBorderStyle;
    }
  },
}
}
</script>

<style scoped>
.chatCardMainContainer{
  display: flex;
  /*flex: 1 1 auto;*/
  flex-direction: row;
  justify-content: space-around;
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
/*img {*/
/*  border-radius: 50%;*/
/*  width: 50px;*/
/*  height: 50px;*/
/*  margin-right: 10px;*/
/*  margin-left: 10px;*/

/*}*/

.usernameLastMsgContainer{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 40%;
  min-height: 50px;
  margin-left: 10px;


}

.usernameLabel{
  color: white;
  font-size: 18px;
  font-family: Arial;
  margin-bottom: 5px;
}



.lastTSLabel{
  width: 30%;
  color: #a0a0a0;
  font-size: 12px;
  font-family: Arial;
  margin-left: 5px;
}

.unreadLabelStyle{
  display: flex;
  margin-right: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-image: linear-gradient(to left, #743ad5, #dc07f5);
  color: #ffffff;
  font-size: 12px;
  font-family: Arial;
  transition: width 1s;
  transition: height 1s;

}



</style>