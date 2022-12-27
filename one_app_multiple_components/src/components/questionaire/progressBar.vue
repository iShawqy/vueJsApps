<template>
<progress class="progressBar" :value="progress" max="100">

</progress>
</template>

<script>
export default {
name: "progressBar",
  props:["targetProgress"],
  data(){
    return {
      progress:0,
      intervalId: null,
      progressStep: 5,
    }
  },

  methods: {
  updateProgressBarSmooth(){

    if (this.progress < this.targetProgress) {
      this.progress += this.progressStep;
    } else {
      clearInterval(this.intervalId)
    }

  },

  },

  watch:{
  targetProgress(newValue, oldValue){
    if (newValue == 0){
      this.progress = 0;
    } else {
      this.intervalId = setInterval(() => {
              this.updateProgressBarSmooth();
            }, 50);
    }

  }
  }
}
</script>

<style scoped>
.progressBar{
  width: 100%;
  margin-top: 10px;
  height: 30px;
  /*accent-color: blue;*/
}
</style>