<template>
<div class="resultContainerStyle" >
  {{result}}
</div>
</template>

<script>
export default {
name: "resultContainer",
  props: ['result'],

}
</script>

<style scoped>
.resultContainerStyle{
  display: flex;
  flex-direction: row;
  /*flex-wrap: wrap;*/
  justify-content: flex-end;
  flex-wrap: wrap;
  align-content: space-around;
  /*align-content: space-around;*/
  /*row-gap: 5px;*/
  /*column-gap: 5px;*/
  /*gap: 10px;*/
  width: 330px;
  height: 100px;
  color: white;
  font-size: 50px;
  font-family: 'Arial';
  /*border-color: white;*/
  /*    border-style: solid;*/
}
</style>