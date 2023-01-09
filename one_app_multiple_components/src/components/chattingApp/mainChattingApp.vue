<template>
<div class="mainAppContainer">
  <welcome-page v-if="!loggedIn" @emittedUser="selectChatter"></welcome-page>


  <div class="chatsViewChatViewContainer" v-if="loggedIn">
    <div class="chatsMainContainer" >
      <div class="userInfoBar">
        <button class="BtnStyle btnRed" @click="logOut">
          Log-out
        </button>
        <img :src="ChatterProfilePhoto">
        <div class="LabelStyle">
          {{chatter.name}}
        </div>

      </div>
      <div class="chatsContainer">
      <chat-card v-for="ch in chattees"
                 :username="ch.name"
                 :key="ch.id"
                 @click="selectChatteeFromCard(ch)"
      >

      </chat-card>
      </div>

    </div>
    <div class="noChatteeSelectedArea" v-if="Object.keys(chattee).length==0">
      <div class="noChatteeSelectedAreaLabel">
        Welcome to myMessenger
      </div>
      <div class="noChatteeSelectedAreaLabel">

        Please select a chat from the chats list to start.
      </div>
    </div>
    <div class="chatViewContainer" v-if="Object.keys(chattee).length>0">
    <chat-head :username="chattee.name"
               :status="chattee.status"
               :nrMsgsBarValue="nrMsgsBarValue"
               :lenMsgsBarValue="lenMsgsBarValue">
    </chat-head>
    <chat-area :messages="messages"
               :chatterName="chatter.name"
               :chatteeName="chattee.name"
               ref="refChatArea"

    ></chat-area>
    <div class="inputArea">
      <message-input-area :chatter="chatter" :chattee="chattee" ref="msgInputArea"></message-input-area>
      <button class="BtnStyle btnGreen" @click="sendMessage">
      Send
    </button>

    </div>




  </div>
  </div>




</div>


</template>

<script>
import axios from "axios";
import chatHead from "@/components/chattingApp/chatHead";
import chatArea from "@/components/chattingApp/chatArea";
import messageInputArea from "@/components/chattingApp/messageInputArea";
import welcomePage from "@/components/chattingApp/welcomePage";
import chatCard from "@/components/chattingApp/chatCard";

export default {
name: "mainChattingApp",
components: {chatHead, chatArea, messageInputArea, welcomePage, chatCard},
mounted () {
  this.fetchUsers();
  setInterval(this.fetchLatestMessages, 250);
  setInterval(this.updateChatteeStatus, 500);
  setInterval(this.compileStats, 1000)


},
data(){
  return {
    loggedIn: false,
    users: [],
    // chatterName: '',
    chatter: {},
    // chatteeName: '',
    chattee: {},
    // chatters: [],
    chattees: [],
    // ready: false,
    usersUrl: "http://localhost:3004/users",
    messagesUrl: "http://localhost:3004/messages",
    messages: [],
    lastMessageId: 0,
    newMessages: false,
    // chatStarted: false,
    response: '',
    nrMsgs: {
      total: 0,
      chatter:0,
      chattee:0
    },
    lenMsgs: {
      total: 0,
      chatter:0,
      chattee:0
    },
    nrMsgsBarValue:0,
    lenMsgsBarValue:0,
    ChatterProfilePhoto:'',


  }
},
methods: {
  fetchUsers(){
    axios.get(this.usersUrl)
    .then(response => {
      this.users = response.data;
      this.updateChatteesLists();
      // this.createChatters();
    })
    .catch( error => {
      console.log(error)
    })
  },
  fetchLatestMessages(){
    if (this.loggedIn) {
      axios.get(this.messagesUrl)
    .then(response => {
      var recievedMsgs = response.data;
      var filteredMsgs = [];
      for (let i=0; i<recievedMsgs.length; i++){
        if (recievedMsgs[i].creator == this.chatter.name && recievedMsgs[i].destination == this.chattee.name){
          filteredMsgs.push(recievedMsgs[i])
        } else if (recievedMsgs[i].creator == this.chattee.name && recievedMsgs[i].destination == this.chatter.name){
          filteredMsgs.push(recievedMsgs[i])
        }
      }
      this.messages = filteredMsgs;
      for (let i=0; i<this.messages.length; i++) {
        if (this.messages[i].id > this.lastMessageId) {
          this.newMessages = true;
          this.lastMessageId = this.messages[i].id

        }
      }
      if (this.newMessages){
         this.$refs.refChatArea.scrollToLastMessage(this.lastMessageId);
         this.newMessages = false;
      }




    })
    .catch( error => {
      console.log(error)
    })
    }

  },
  // createChatters(){
  //
  //   this.chatters = [];
  //   for (let i=0; i<this.users.length; i++) {
  //     this.chatters.push(this.users[i]);
  //   }
  // },
  // selectChattee(){
  //   for (let i=0; i<this.users.length; i++) {
  //     if (this.users[i].name == this.chatteeName) {
  //       this.chattee = this.users[i];
  //     }
  //   }
  //
  // },
  selectChatter(data){
    this.loggedIn = true;
    this.chatter = data
    this.getChatterProfilePhoto();

  },
  updateChatteesLists(){
    this.chattees = [];
    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].name != this.chatter.name) {
        this.chattees.push(this.users[i]);
      }

    }
    // console.log(this.chattees)
  },

  goOnline(){
    this.chatter.status = 'Online'
    axios({
        method: 'put',
        url:this.usersUrl + '/' + this.chatter.id,
        data: this.chatter
      })
      .then(response => {
        this.response = response;
        this.$toast.success('You are online',  {
        position: "bottom"})
        // this.ready=true;
        // this.chatStarted = true;
      })

      .catch(error => {
        this.response = error;
        this.$toast.error('Error while logging you in', {
        position: "bottom"});
      })

  },

  goOffline(){
    this.chatter.status = 'Offline'
    axios({
        method: 'put',
        url:this.usersUrl + '/' + this.chatter.id,
        data: this.chatter
      })
      .then(response => {
        this.response = response;
        this.$toast.success('You are Offline',  {
        position: "bottom"})
      })
      .catch(error => {
        this.response = error;
        this.$toast.error('Error while logging you in', {
        position: "bottom"});
      })
  },
  logOut(){
    this.loggedIn = false;


  },
  reset(){
    this.users = [];
    this.chatter = {};
    this.chattee = {};
    this.chattees = [];
    this.lastMessageId = 0;
    this.newMessages = false;
    this.loggedIn = false;
    this.nrMsgsBarValue= 0;
    this.lenMsgsBarValue = 0;

  },
  sendMessage(){
    this.$refs.msgInputArea.sendMessageWithSendBtn();
  },
  updateChatteeStatus(){
    if (this.loggedIn && Object.keys(this.chattee).length > 0){

      axios.get(this.usersUrl+'/'+this.chattee.id)
    .then(response => {
      // console.log(response.data.status)
      this.chattee.status = response.data.status;
    })
    .catch( error => {
      console.log(error)
    })
    }

  },
  compileStats(){
    this.nrMsgs= {
      total: 0,
      chatter:0,
      chattee:0
    };
    this.lenMsgs = {
      total: 0,
      chatter:0,
      chattee:0
    };
    for (let i=0;i<this.messages.length; i++){
        if (this.messages[i].creator == this.chatter.name){
          this.nrMsgs.chatter += 1;
          this.lenMsgs.chatter += this.messages[i].content.length;
        } else if (this.messages[i].creator == this.chattee.name){
          this.nrMsgs.chattee += 1
          this.lenMsgs.chattee += this.messages[i].content.length;
        }
    }
    this.nrMsgs.total = this.nrMsgs.chatter + this.nrMsgs.chattee;
    this.lenMsgs.total = this.lenMsgs.chatter + this.lenMsgs.chattee;

    if (this.nrMsgs.total>0){
      this.nrMsgsBarValue = Math.floor( (this.nrMsgs.chatter/this.nrMsgs.total) * 100);
    } else {
      this.nrMsgsBarValue = 0
    }

    if (this.lenMsgs.total>0){
      this.lenMsgsBarValue = Math.floor( (this.lenMsgs.chatter/this.lenMsgs.total) * 100);
    } else {
      this.lenMsgsBarValue = 0;
    }


  },
  getChatterProfilePhoto(){
    this.ChatterProfilePhoto = '/usersPhotos/'+ this.chatter.name +'.png';
  },
  selectChatteeFromCard(chattee){
    this.chattee = chattee;
    // this.chatteeName = chattee.name;
    // this.startChat();
  }
},
watch:{
  loggedIn(newValue){
    // console.log(newValue)
    if (newValue) {
      this.goOnline();
      this.fetchUsers();

    } else {
      this.goOffline();
      this.reset();
    }

  }
}
}
</script>

<style scoped>


.mainAppContainer{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #152129;
}
.homeViewContainer{
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  /*background-color: black;*/
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

}

.chatViewContainer{
  display: flex;
  width: 70vw;
  height: 100vh;
  min-width: 400px;
  min-height: 400px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*position: absolute;*/
  background-color: rgb(32,44,51);
  margin-right: 5px;
  /*left: 50%;*/
  /*top: 50%;*/
  /*-webkit-transform: translate(-50%, -50%);*/
  /*transform: translate(-50%, -50%);*/
  /*border-radius: 10px;*/
}

.chatsViewChatViewContainer{
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 600px;
  min-height: 600px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  /*position: absolute;*/
  background-color: rgb(32,44,51);
}

.chatsMainContainer{
  display: flex;
  width: 30%;
  height: 100%;
  min-width: 100px;
  /*min-height: 600px;*/
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /*position: absolute;*/
  background-color: #0f2021;

}

.noChatteeSelectedArea{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgb(32,44,51);
}

.noChatteeSelectedAreaLabel{

  color: #7c7c7c;
  font-size: 30px;
  font-family: Arial;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.userInfoBar{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 96%;
  height: 50px;
  background-color: rgb(32,44,51);
  border-radius: 5px;
  margin-right: 5px;
  margin-left: 5px;
}

.chatsContainer{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #0f2021;
}

.homeView{
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #176b5b;
  border-radius: 10px;
  color: white;

}

.labelSelectContainer{
  display: flex;
  width: 800px;
  height: fit-content;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.label{
  font-size: 20px;
  font-family: Arial;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.selectStyle{
  width: 350px;
  height: 30px;
  border-radius: 10px;
  margin: 5px;
  color: black;
  border-color: green;
   font-size: 16px;
  font-family: Arial;
}

.BtnStyle{
  height: 30px;
  width: fit-content;
  border-radius: 10px;
  font-size: 20px;
  font-family: Arial;
  border: none;
  text-align: center;
  text-decoration: none;
  opacity: 0.6;
  transition: 0.3s;
  margin: 5px;
  color: white;
}
.BtnStyle:hover{
  opacity: 1;

}
.btnRed{
  background-color: #ff0000;
}

.btnGreen{
  height: 90%;
  background-color: #26c800;
}

.inputArea{
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

img {
  border-radius: 50%;
  width: 40px;
  margin-right: 10px;
}

.LabelStyle{
  color: white;
  font-size: 20px;
  font-family: Arial;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>