<template>
<div class="mainAppContainer">
  <div class="homeViewContainer">
    <div class="homeView" v-if="!ready">
  <div class="labelSelectContainer">
      <label class="label" for="comboBox">Who are you?</label>
  <select  class="selectStyle" id="comboBox" v-model="chatterName"
           @change="selectChatter()">
  <option disabled value="">Please select who you are</option>
  <option  v-for="user in users" :key="user.id">{{user.name}}</option>
</select>

    </div>

  <div class="labelSelectContainer">
      <label class="label" for="comboBox1">Chat with:</label>
  <select  class="selectStyle" id="comboBox1" v-model="chatteeName"
  @change="selectChattee()">
  <option disabled value="">Please select who you want to chat with</option>
  <option  v-for="chatteeUser in chattees" :key="chatteeUser.id">{{chatteeUser.name}}</option>
</select>

    </div>
</div>
  </div>

  <div class="chatViewContainer" v-if="ready">
    <chat-head :chattee="chatteeName"
               :status="chattee.status"
               v-if="ready"
               :nrMsgsBarValue="nrMsgsBarValue"
               :lenMsgsBarValue="lenMsgsBarValue">
    </chat-head>
    <chat-area :messages="messages"
               :chatterName="chatterName"
               :chatteeName="chatteeName"
               ref="refChatArea"

    ></chat-area>
    <div class="inputArea">
      <message-input-area :chatter="chatter" :chattee="chattee" ref="msgInputArea"></message-input-area>
      <button class="BtnStyle btnGreen" v-if="ready" @click="sendMessage">
      Send
    </button>

    </div>




  </div>
  <button class="BtnStyle btnRed" v-if="ready" @click="logOut">
      Log-out
    </button>


</div>


</template>

<script>
import axios from "axios";
import chatHead from "@/components/chattingApp/chatHead";
import chatArea from "@/components/chattingApp/chatArea";
import messageInputArea from "@/components/chattingApp/messageInputArea";


export default {
name: "mainChattingApp",
components: {chatHead, chatArea, messageInputArea},
mounted () {
  this.fetchUsers();
  this.createChatters();
  // this.fetchMessages();
  setInterval(this.fetchLatestMessages, 250);
  setInterval(this.updateChatteeStatus, 500);
  setInterval(this.compileStats, 1000)


},
data(){
  return {
    users: [],
    chatterName: '',
    chatter: {},
    chatteeName: '',
    chattee: {},
    chatters: [],
    chattees: [],
    ready: false,
    usersUrl: "http://localhost:3004/users",
    messagesUrl: "http://localhost:3004/messages",
    messages: [],
    lastMessageId: 0,
    newMessages: false,
    chatStarted: false,
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


  }
},
methods: {
  fetchUsers(){
    axios.get(this.usersUrl)
    .then(response => {
      this.users = response.data;
      this.createChatters();
    })
    .catch( error => {
      console.log(error)
    })
  },
  // fetchMessages(){
  //   axios.get(this.messagesUrl)
  //   .then(response => {
  //     this.messages = response.data;
  //     this.createChatters();
  //
  //   })
  //   .catch( error => {
  //     console.log(error)
  //   })
  // },
  fetchLatestMessages(){
    if (this.chatStarted) {
      axios.get(this.messagesUrl)
    .then(response => {
      var recievedMsgs = response.data;
      var filteredMsgs = [];
      for (let i=0; i<recievedMsgs.length; i++){
        if (recievedMsgs[i].creator == this.chatterName && recievedMsgs[i].destination == this.chatteeName){
          filteredMsgs.push(recievedMsgs[i])
        } else if (recievedMsgs[i].creator == this.chatteeName && recievedMsgs[i].destination == this.chatterName){
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
  createChatters(){

    this.chatters = [];
    for (let i=0; i<this.users.length; i++) {
      this.chatters.push(this.users[i]);
    }
  },
  selectChattee(){
    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].name == this.chatteeName) {
        this.chattee = this.users[i];
      }
    }

    this.startChat();

  },
  selectChatter(){
    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].name == this.chatterName) {
        this.chatter = this.users[i];
      }
    }
    this.updateChattersChatteesLists();
  },
  updateChattersChatteesLists(){
    this.chattees = [];
    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].name != this.chatterName) {
        this.chattees.push(this.users[i]);
      }

    }
  },
  startChat(){
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
      })

      .catch(error => {
        this.response = error;
        this.$toast.error('Error while logging you in', {
        position: "bottom"});
      })
    this.ready=true;
    this.chatStarted = true;
  },
  logOut(){
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
    this.reset();

  },
  reset(){
    this.users = [];
    this.chatterName = '';
    this.chatter = {};
    this.chatteeName = '';
    this.chattee = {};
    this.chatters = [];
    this.chattees = [];
    this.ready =  false;
    this.chatStarted = false;
    this.lastMessageId = 0;
    this.newMessages = false;
    this.fetchUsers();
    // this.fetchMessages();
    this.createChatters();
  },
  sendMessage(){
    this.$refs.msgInputArea.sendMessage(false);
  },
  updateChatteeStatus(){
    if (this.chatStarted){
      axios.get(this.usersUrl+'/'+this.chattee.id)
    .then(response => {
      console.log(response.data.status)
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
        if (this.messages[i].creator == this.chatterName){
          this.nrMsgs.chatter += 1;
          this.lenMsgs.chatter += this.messages[i].content.length;
        } else if (this.messages[i].creator == this.chatteeName){
          this.nrMsgs.chattee += 1
          this.lenMsgs.chattee += this.messages[i].content.length;
        }
    }
    this.nrMsgs.total = this.nrMsgs.chatter + this.nrMsgs.chattee;
    this.lenMsgs.total = this.lenMsgs.chatter + this.lenMsgs.chattee;

    if (this.nrMsgs.total>0){
      this.nrMsgsBarValue = Math.floor( (this.nrMsgs.chatter/this.nrMsgs.total) * 100);
    }

    if (this.lenMsgs.total>0){
      this.lenMsgsBarValue = Math.floor( (this.lenMsgs.chatter/this.lenMsgs.total) * 100);
    }


  },
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
  width: 80vw;
  height: 80vh;
  min-width: 600px;
  min-height: 600px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgb(32,44,51);
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 10px;
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
</style>