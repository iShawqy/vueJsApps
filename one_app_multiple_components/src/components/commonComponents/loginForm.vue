<template>
<div class="formMainContainer">
<!--  <label class="label" for="usernameInput">Username</label>-->
  <input class="inputStyle" v-model="username" placeholder="username" />
  <input class="inputStyle" v-model="password" placeholder="password" type="password"/>
  <button class="BtnStyle btnAppleBlue" @click="login">
    Login
  </button>
</div>
</template>

<script>
export default {
name: "loginForm",
data (){
  return {
    username: "",
    password: "",
  }
},
methods:{
  login(){
    var data = {
      username: this.username,
      password: this.password
    }
    if (this.checkFieldsNotEmpty(data.username) && this.checkFieldsNotEmpty(data.password)){
      this.$emit("login", data);
    } else {
      this.$toast.error( 'Please fill all the empty fields!', {position: "bottom"})
    }

  },
  updateUsernamePassword(data){
    this.username = data.username;
    this.password = data.password;
  },
  checkFieldsNotEmpty(data){
    if (!data.replace(/\s/g, '').length) {
      return false
    }
    else {
      return true
    }
    },
}
}
</script>

<style scoped>
.formMainContainer{
  display: flex;
  width: 400px;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #176b5b;
  border-radius: 10px;
  color: white;
}

.label{
  font-size: 20px;
  font-family: Arial;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.inputStyle{
  width: 80%;
  height: 30px;
  font-size: 20px;
  font-family: Arial;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 10px;
  border: none;
}

.BtnStyle{
  height: fit-content;
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

  background-color: #26c800;
}

.btnAppleBlue{

  background-color: rgb(0,113,227);
}

</style>