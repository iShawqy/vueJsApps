<template>

<div class="chatAreaMainContainer" id="chatAreaElement">
  <message-container v-for="message in messages"
                     :message="message"
                     :key="message.id"
                      :id="message.id.toString()"
                     :is-chatter="checkIsChatter(message)">
  </message-container>

</div>
</template>

<script>
// import messageContainer from "@/components/chattingApp/messageContainer";
import MessageContainer from "@/components/chattingApp/messageContainer";
import axios from "axios";
export default {
name: "chatArea",
components: {MessageContainer},
props: ["messages", "chatter", "chattee"],

  data(){
return {
  scrolledFirstTime: false,
  messagesUrl: "http://localhost:3004/messages",
  response: '',
  clearUnreadFlag: false,

}
},

methods:{

checkIsChatter(message){

  if (message.creator == this.chatter.name){
   return true
  } else {
    return false
  }

},
scrollToLastMessage(lastMsgId){
  var element = document.getElementById(lastMsgId.toString());
  if (this.scrolledFirstTime){
    element.scrollIntoView({behavior: "smooth"});
  } else {
    element.scrollIntoView();
    this.scrolledFirstTime = true;
  }
  this.readAllMessages();
  if (this.clearUnreadFlag){
    this.emitClearUnreadCounter()
  }

},
readAllMessages(){
  var msgCopy = {}
  for (let i=0; i<this.messages.length; i++){
    if (this.messages[i].creator != this.chatter.name){
      if (this.messages[i].status == "unread"){
        this.clearUnreadFlag = true;
        msgCopy = this.messages[i];
        msgCopy.status = "read";
        axios({
            method: 'put',
            url:this.messagesUrl + '/' + this.messages[i].id,
            data: msgCopy
          })
          .then(response => {
            this.response = response;
          })
          .catch(error => {
            this.response = error;

          })
      }
    }


  }
},
emitClearUnreadCounter(){
  this.$emit("clearUnreadCounter", this.chattee);
  this.clearUnreadFlag = false;
},
  }
}
</script>

<style scoped>
.chatAreaMainContainer{
  display: flex;
  width: 100%;
  height: 90%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #102520;
  /*border-radius: 10px;*/
  color: #000000;
  overflow-y: scroll;
}
</style>