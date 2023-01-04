<template>
<div class="messageContainerStyle" :class="{chatterStyle:isChatter}">
  <div class="messageContentStyle">
    {{message.content}}
  </div>
  <div class="timestampStyle">
    {{message.timestamp}}
  </div>
</div>
</template>

<script>
export default {
name: "messageContainer",
props: ["message", "isChatter"],

// data(){
//   return {
//
//   }
// },
}
</script>

<style scoped>

.messageContainerStyle{
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 40%;
  height: fit-content;
  margin: 5px;
  border-radius: 5px;
  background-color: rgb(32,44,51);
  color: white;
  align-self: flex-end;
}

.chatterStyle{
  background-color: rgb(0,92,75);
  color: white;
  align-self: flex-start;
}


.messageContentStyle{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  word-wrap: break-word;
  font-size: 20px;
  font-family: Arial;
  margin: 5px;
  color: white;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  overflow-wrap: break-word;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

.timestampStyle{
  font-size: 8px;
  font-family: Arial;
  margin: 5px;

  color: rgb(128,174,165);
}


</style>