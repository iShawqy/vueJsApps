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
export default {
name: "chatArea",
  components: {MessageContainer},
  props: ["messages", "chatterName", "chatteeName"],
  data(){
  return {
    scrolledFirstTime: false,
  }
  },
  // data(){
  // // return {
  // //   isChatter: false,
  // // }
  // // },
  methods:{
  checkIsChatter(message){

    if (message.creator == this.chatterName){
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

  }

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