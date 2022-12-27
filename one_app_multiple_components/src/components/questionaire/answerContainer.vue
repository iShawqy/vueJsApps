<template>
<div class="baseStyle" :class="{ darkModeStyle: darkModeActive,
lightModeStyle: darkModeActive, correctStyle: correctStyle}">
  <div class="answerIdxConainer">
<!--    <p>-->
<!--      {{answerIdx}}:-->
<!--    </p>-->
    <p>
      {{answerText}}
    </p>
  </div>

  </div>
</template>

<script>
export default {
name: "answerContainer",
  props: {
    answerIdx: Number,
    answerText: String,
    darkModeActive: Boolean,
    correctStyle: Boolean,
  },
}
</script>

<style scoped>
.baseStyle{
      width: 400px;
      height: fit-content;
      font-size: 16px;
      font-family: Arial;
      border: solid;
      text-align: center;
      text-decoration: none;
      border-radius: 10px;

}

.baseStyle:hover{
  background-color: black;
  color: white;
}

.correctStyle{
  background-color: #76e75b;
  color: white;
}

.correctStyle:hover{
  background-color: #76e75b;
  color: white;
}


.lightModeStyle{
  color: black;
}

.darkModeStyle{
  color: white;
}

.answerIdxConainer{
  display: flex;
  flex-direction: row;
  justify-content: center;

}
</style>