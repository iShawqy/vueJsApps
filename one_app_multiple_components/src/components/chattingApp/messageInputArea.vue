<template>
<!--<div >-->
  <textarea class="messageInputMainContainer"
            v-model="message" placeholder="Type a message"
            @keyup.enter="sendMessage" @focus="onFocus" @blur="outFocus"
  ></textarea>
<!--</div>-->
</template>

<script>
import axios from "axios";

export default {
name: "messageInputArea",
props: ["chatter", "chattee"],
mounted() {
  setInterval(this.updateStatus, 250)
},
  data(){
  return {
    message:"",
    usersUrl: "http://localhost:3004/users",
    messagesUrl: "http://localhost:3004/messages",
    focused: false,
    lastState: false,

  }

},
  methods:{
  sendMessage(){
    console.log(this.message)
    if (this.message != "" && this.message != "\n") {
      var currentdate = new Date();
      var datetime = currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes()



      var data = {
        content: this.message,
        timestamp: datetime,
        creator: this.chatter.name,
        destination: this.chattee.name,
      }
      axios({
          method: 'post',
          url:this.messagesUrl,
          data: data
        })
        .then(response => {
          this.message = "";
          this.$toast.success('sent',  {
          position: "bottom",
          duration: 250})
        })
        .catch(error => {

          this.$toast.error('Error while logging you in', {
          position: "bottom"});
        })
    }
    else {
      this.message = "";
    }

  },
  onFocus(){
    this.focused = true;
  },
  outFocus(){
    this.focused = false;
  },
  updateStatus(){

      if (this.focused && this.message != '') {
        this.chatter.status = 'typing...'
      } else {
        this.chatter.status = 'Online'
      }
      axios({
        method: 'put',
        url:this.usersUrl + '/' + this.chatter.id,
        data: this.chatter
      })
      .then(response => {})
      .catch(error => {
        this.$toast.error('Error while updating status', {
        position: "bottom"});
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
  background-color: #00301a;

  border-radius: 5px;
  color: white;
  overflow-y: scroll;
  font-size: 20px;
  font-family: Arial;
  margin: 5px;

}
</style>