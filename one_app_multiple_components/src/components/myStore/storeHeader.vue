<template>
<div class="headerContainer">
  <div class="headerLabelStyle">
    Welcome to myStore
  </div>
</div>
</template>

<script>
export default {
  name: "storeHeader"
}
</script>

<style scoped>
.headerContainer{
  display: flex;
  flex-direction: row;
  width: 99%;
  border-radius: 10px;
  height: 5%;
  justify-content: center;
  align-items: center;
  /*position: absolute;*/
  background-color: white;
  margin-top: 5px;
  margin-bottom: 10px;
}

.headerLabelStyle{
  font-size: 30px;
  font-family: Arial;
  color: black;
}
</style>