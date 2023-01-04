<template>
<div class="mainContainer">
<home-view>

</home-view>
</div>
</template>

<script>
import homeView from "@/components/editableQuestionaire/homeView";
export default {
name: "mainEditableQuestionaire",
  components:{homeView}
}
</script>

<style scoped>
.mainContainer{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>