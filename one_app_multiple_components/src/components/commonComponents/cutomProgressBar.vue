<template>
<div class="progressBarMainContainer">
  <div :style="fillingStyle">
  <div class="valueLable">
    {{value}}%
  </div>
  </div>
</div>
</template>

<script>
export default {
name: "cutomProgressBar",
props: ["value"],
data (){
  return {
    fillingStyle:{
      // position: "absolute",
      // flexGrow: "100",
      // top: "0px",
      // left: "0px",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "flex-end",
      width: this.value.toString() +'%',
      height: "12px",
      backgroundColor: "#233abf",
      borderRadius: "10px",
      border: "solid",
      borderColor:  "#233abf",
      transition: "width 1s",
    }
  }
},
methods:{
  setProgress(){
    if (this.value<40){
      this.fillingStyle.backgroundColor = "#233abf";
      this.fillingStyle.borderColor = "#233abf";
    } else if (this.value>=40 && this.value<60 ){
      this.fillingStyle.backgroundColor = "#006704";
      this.fillingStyle.borderColor = "#006704";
    } else {
      this.fillingStyle.backgroundColor = "#b1001c";
      this.fillingStyle.borderColor = "#b1001c";
    }
    this.fillingStyle.width = this.value.toString() +'%';
  }
},
watch:{
value(){
  this.setProgress()
}
}
}
</script>

<style scoped>
.progressBarMainContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
  height: 15px;
  background-color: #324951;
  border: none;
  border-radius: 10px;


  margin: 10px;
}

.valueLable{
  color: white;
  font-size: 10px;
  font-family: Arial;
}
</style>