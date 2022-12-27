<template>
  <div :style="[baseStyle, optionalStyle]"
       @mouseover="applyHoverStyle"
       @mouseleave="applyOriginalStyle"

  >
  {{value}}
  </div>
</template>

<script>
export default {
name: "appleCalculaterButton",
  props: ["value", "color", "backgroundColor"],
  data () {
  return {
    baseStyle: {
      width: '35px',
      height: '35px',
      fontSize: '30px',
      fontFamily: 'Arial',
      border: 'none',
      padding: '20px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // margin: '4px 2px',
      borderRadius: '100%',
    },

    optionalStyle: {
      color: this.color,
      backgroundColor: this.backgroundColor,
    },

    hoverStyle: {
      color: 'black',
      backgroundColor: '#E9E9E9',
    },




  }
  },

  methods: {
  applyHoverStyle(){
    this.optionalStyle.backgroundColor = this.hoverStyle.backgroundColor;
    this.optionalStyle.color = this.hoverStyle.color;
  },

  applyOriginalStyle(){
    this.optionalStyle.backgroundColor = this.backgroundColor;
    this.optionalStyle.color = this.color;
  },

  },


}
</script>

<style scoped>


</style>