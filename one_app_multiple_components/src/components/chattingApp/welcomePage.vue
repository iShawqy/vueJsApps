<template>
  <div class="welcomePageMainContainer">
    <div class="loginSignupSelectorContainer">
      <button class="BtnStyle btnColor" @click="selectLogin">
    Login
  </button>
      <button class="BtnStyle btnColor" @click="selectSignup">
    Signup
  </button>
    </div>
    <login-form v-if="loginSelector" @login="login" ref="refLoginPage"
                @keyup.enter="emitDataFromLoginForm"
    ></login-form>
    <signup-form v-if="!loginSelector" @signup="signup" ref="refSignupPage"
                 @keyup.enter="emitDataFromSignupForm"
    ></signup-form>
  </div>

</template>

<script>
import loginForm from "@/components/commonComponents/loginForm";
import signupForm from "@/components/commonComponents/signupForm";
import axios from "axios";
export default {
name: "welcomePage",
components: {loginForm, signupForm},
data (){
  return {
    loginSelector: true,
    users: [],
    usersUrl: "http://localhost:3004/users",
    loggedIn: false,
    response:"",
    userJustSignnedUp: false,
    userDataAfterSignup:{
      username: "",
      password: "",
    }
  }
},
mounted() {
  setInterval(this.setLoginPageData, 500)
},
  methods:{
  selectLogin(){
    this.loginSelector = true;
  },
  selectSignup(){
    this.loginSelector = false;
  },
  fetchUsers(){
    axios.get(this.usersUrl)
    .then(response => {
      this.users = response.data;
    })
    .catch( error => {
      console.log(error)
    })
  },
  login(data){
    axios.get(this.usersUrl)
    .then(response => {
      this.users = response.data;
      this.loggedIn = false;
      for (let i=0; i<this.users.length; i++){
        if (this.users[i].name == data.username && this.users[i].password == data.password){
          this.$toast.success('Logged In!', {
            position: "bottom"});
          this.loggedIn = true;
          this.$emit("emittedUser", data)
          break
        }
      }
      if (!this.loggedIn){
        this.$toast.error('wrong username and/or password!', {
            position: "bottom"})
      }
      })
    .catch( error => {
      console.log(error)
    })


  },
  signup(data){
    axios.get(this.usersUrl)
    .then(response => {
      this.users = response.data;
      var userExist = this.checkUserExist(data.username, data.email);
      if (!userExist){
        var userData = {
          name: data.username,
          email: data.email,
          password: data.password,
          status: "offline",
        }
        axios({
          method: 'post',
          url:this.usersUrl,
          data: userData
        })
          .then(response => {
            this.response = response;
            this.loginSelector = true;
            this.userDataAfterSignup.username = userData.name;
            this.userDataAfterSignup.password = userData.password;
            this.userJustSignnedUp = true;
            this.$toast.success("User created successfully. Now you can login", {
              position: "bottom"})

          })
          .catch(error => {
            this.response = error;
            this.$toast.error('Error while signning you up', {
            position: "bottom"});
          })

      }

    })
    .catch( error => {
      this.response = error;
      this.$toast.error("Error while checking signup data" , {
              position: "bottom"})
    })




  },
  checkUserExist(username, email){
    var userExist = false;
    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].name == username || this.users[i].email == email) {
        console.log(this.users[i])
        this.$toast.error('Username and/or email already exists. Use another one!', {
          position: "bottom"})
        userExist = true;
      }
    }
    return userExist
  },

  setLoginPageData(){
    if (this.userJustSignnedUp){
      this.$refs.refLoginPage.updateUsernamePassword(this.userDataAfterSignup);
      this.userJustSignnedUp = false;
      this.userDataAfterSignup.username = "";
      this.userDataAfterSignup.password = "";
    }

  },
  emitDataFromLoginForm(){
    this.$refs.refLoginPage.login()
  },
  emitDataFromSignupForm(){
    this.$refs.refSignupPage.signup()
  },
}
}
</script>

<style scoped>
.welcomePageMainContainer{
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
.loginSignupSelectorContainer{
  display: flex;
  width: 100%;
  height: 30px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  flex-grow: 1;

}

.BtnStyle{
  height: fit-content;
  width: 100%;
  border-radius: 5px;
  font-size: 20px;
  font-family: Arial;
  border: none;
  border-color: #2ac6a7;
  text-align: center;
  text-decoration: none;
  opacity: 1;
  transition: 0.3s;
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 5px;

  color: white;
}
.BtnStyle:hover{
  /*opacity: 1;*/
  background-color: #2ac6a7;
  color: black;

}
.btnRed{
  background-color: #ff0000;
}

.btnColor{
  background-color: #176b5b;
}
</style>