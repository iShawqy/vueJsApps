<template>
<div class="baseStyle" :class="{ darkModeStyle: darkModeActive,
lightModeStyle: darkModeActive}">
  {{questionText}}
  </div>
</template>

<script>
export default {
name: "questionContainer",
  props: {
    questionText: String,
    darkModeActive: Boolean
  },

  data(){
  return {


  }
  },
}
</script>

<style scoped>

.baseStyle{
      width: 400px;
      height: 50px;
      font-size: 24px;
      font-family: Arial;
      border: none;
      text-align: center;
      text-decoration: none;
      border-radius: 10px;
      margin-bottom: 5px;
      overflow-y: scroll;
}



.lightModeStyle{
  color: black;
}

.darkModeStyle{
  color: white;
}
</style>