<template>
<div :style="[baseStyle, selectedStyle]"></div>
</template>

<script>
export default {
name: "lineWidthSelector",
props: ["width", "selected"],
data (){
  return {
    baseStyle:{
      width: "20px",
      height: "20px",
      minWidth: "20px",
      minHeight:"20px",
      borderRadius: "50%",
      backgroundColor: "white",
      margin: "3px",
      flex: "2 1 auto",

    },
    selectedStyle:{
      border: "none"
    }
  }
},
mounted() {
  this.initStyle();
  this.select();
},
watch:{
  selected(){
    this.select();
  },
},
methods:{
  initStyle(){
    this.baseStyle.width = this.width.toString() + "px";
    this.baseStyle.height = this.width.toString() + "px";
    this.baseStyle.minWidth = this.width.toString() + "px";
    this.baseStyle.minHeight = this.width.toString() + "px";
    this.baseStyle.borderRadius = "50%";
    this.baseStyle.flex = "2 1 auto";


  },
  select(){
      if (this.selected){
        var c = "black";
        this.selectedStyle.border = "dashed 2px " + c;
      } else {
        this.selectedStyle.border = "none";
      }
    }
}
}

</script>

<style scoped>

</style>