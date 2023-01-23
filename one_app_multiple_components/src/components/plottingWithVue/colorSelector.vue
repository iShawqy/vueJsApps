<template>
<div :style="[baseStyle, selectedStyle]"></div>
</template>

<script>

export default {
  name: "colorSelector",
  props: ["color", "selected"],
  data (){
    return {
      baseStyle:{
        width: "20px",
        height: "20px",
        minWidth: "20px",
        minHeight:"20px",
        borderRadius: "50%",
        backgroundColor: this.color,
        margin: "3px",
        flex: "2 1 auto",

      },
      selectedStyle:{
        border: "none"
      }
    }
  },
  mounted() {
    this.select();
  },
  watch:{
    selected(){
      this.select();
    },
  },
  methods:{
    select(){
      if (this.selected){
        var c = "white";
        if (this.color == "white"){
          c = "black";
        }
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