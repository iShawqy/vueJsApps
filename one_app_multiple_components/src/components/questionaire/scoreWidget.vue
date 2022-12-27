<template>
<div class="scoreWidget">
  <div class="correctScore">
    correct answers: {{correct}}
  </div>
  <div class="wrongScore">
    wrong answers: {{wrong}}
  </div>

</div>
</template>

<script>
export default {
  name: "scoreWidget",
  props: ["correct", "wrong"],
}
</script>

<style scoped>
.scoreWidget{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 20px;
  margin-top: 30px;
  border: solid;
  border-radius: 5px;

}

.correctScore{
  font-size: 16px;
  font-family: Arial;
  color: green;
}

.wrongScore{
  font-size: 16px;
  font-family: Arial;
  color: #ff0005;
}


</style>