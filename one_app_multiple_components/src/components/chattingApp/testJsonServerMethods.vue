<template>
<button @click="testData">
  test
</button>
</template>

<script>
import axios from "axios";

export default {
name: "testJsonServerMethods",
data(){
  return {
    usersUrl: "http://localhost:3004/users?chats.text=hello",
    response: '',
  }
},
methods:{
  testData(){
    axios.get(this.usersUrl)
    .then(response => {
      this.response = response;
    })
    .catch( error => {
      this.response = error;
    })

  }
},
mounted() {
  this.testData();
}
}
</script>

<style scoped>

</style>