<template>
<div class="headerContainer">
  <div class="headerLabelStyle">
    &#169; All copyrights reserved Ibrahim Shawkey 2023
  </div>
</div>
</template>

<script>
export default {
  name: "storeFooter"
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
  font-size: 12px;
  font-family: Arial;
  color: #5f5f5f;
}
</style>