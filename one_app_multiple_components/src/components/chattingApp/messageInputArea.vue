<template>
<!--<div >-->
  <textarea class="messageInputMainContainer"
            v-model="message" placeholder="Type a message"
            @keyup.enter="sendMessage($event)" @focus="onFocus" @blur="outFocus"
  ></textarea>
<!--</div>-->
</template>

<script>
import axios from "axios";

export default {
name: "messageInputArea",
props: ["chatter", "chattee"],
mounted() {
  this.statusInterval = setInterval(this.updateStatus, 500)
},
unmounted() {
clearInterval(this.statusInterval)
},
  data(){
  return {
    message:"",
    usersUrl: "http://localhost:3004/users",
    messagesUrl: "http://localhost:3004/messages",
    focused: false,
    lastState: false,
    statusInterval:null,
    response:'',
    chatterCopy: {},

  }

},
  methods:{
  sendMessageWithSendBtn(){
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/"
              + currentdate.getFullYear() + " @ "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes()
    var data = {
    content: this.message,
    timestamp: datetime,
    status: "unread",
    timestampInSec: Math.floor(Date.now() / 1000).toString(),
    creator: this.chatter.name,
    destination: this.chattee.name,
      }
    if (this.checkValidMessage()){
      axios({
          method: 'post',
          url:this.messagesUrl,
          data: data
        })
        .then(response => {
          this.response = response;
          this.message = "";
          this.$toast.success('sent',  {
          position: "bottom",
          duration: 250})
        })
        .catch(error => {
          this.response = error;
          this.$toast.error('Error while logging you in', {
          position: "bottom"});
        })
    }


  },
  sendMessage(event){
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/"
              + currentdate.getFullYear() + " @ "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes()


    var data = {
    content: this.message,
    status: "unread",
    timestamp: datetime,
    timestampInSec: Math.floor(Date.now() / 1000).toString(),
    creator: this.chatter.name,
    destination: this.chattee.name,
      }
      if (!event.shiftKey) {
        if (this.checkValidMessage()){
          axios({
          method: 'post',
          url:this.messagesUrl,
          data: data
        })
          .then(response => {
            this.response = response;
            this.message = "";
            this.$toast.success('sent',  {
            position: "bottom",
            duration: 250})
          })
          .catch(error => {
            this.response = error;
            this.$toast.error('Error while logging you in', {
            position: "bottom"});
          })
        }
        else {
          this.message = "";
        }

      }



  },
  checkValidMessage(){
    if (!this.message.replace(/\s/g, '').length) {
      return false
    }
    else {
      return true
    }
    //  if (this.message != "" && this.message != "\n") {
    //    return true
    //  } else {
    //   this.message = "";
    //   return false
    // }
  },
  onFocus(){
    this.focused = true;
  },
  outFocus(){
    this.focused = false;
  },
  updateStatus(){

      if (this.focused && this.message != '') {
        this.chatterCopy = this.chatter;
        this.chatterCopy.status = 'typing...';

      } else {
        this.chatterCopy = this.chatter;
        this.chatterCopy.status = 'Online';
      }
      axios({
        method: 'put',
        url:this.usersUrl + '/' + this.chatter.id,
        data: this.chatterCopy
      })
      .then(response => {
        this.response = response;
      })
      .catch(error => {
        this.response = error;
        // this.$toast.error('Error while updating status', {
        // position: "bottom"});
      })






  },
  }
}
</script>

<style scoped>
.messageInputMainContainer{
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  background-color: #17211b;
  border-radius: 5px;
  border-color: #17211b;
  color: white;
  overflow-y: scroll;
  font-size: 20px;
  font-family: Arial;
  margin: 5px;
  resize: none;

}

.messageInputMainContainer:focus {
    outline-width: 0;
}
</style>