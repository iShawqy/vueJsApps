<template>
<div class="mainContainer">
  {{chattee}}
  <div class="italicText">
    {{status}}
  </div>

</div>
</template>

<script>
export default {
name: "chatHead",
props: ['chattee', 'status'],

}
</script>

<style scoped>
.mainContainer{
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(32,44,51);
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-family: Arial;
}

.italicText{
  margin-top: 5px;
  font-style: italic;
  font-size: 12px;
}
</style>