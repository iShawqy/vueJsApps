<template>
  <div :style="[mainGaugeContainer]">
    <div :style="[fillLabelContainer]">
      <div :style="[fillLevelLabelStyle]">
      {{fillLevelInternal}}
      </div>
    </div>
<div :style="[outerContainerStyle]">
<!--  <Transition name="width">-->
    <div :style="[innerContainerStyle]"></div>


<!--  </Transition>-->

</div>
  </div>

</template>

<script>
export default {
  name: "antennaGauge",
  props: ["position", "id", "fillLevel"],
  data () {
    return {
      fillLevelInternal:0,
      mainGaugeContainer:{
        display: "flex",
        flexDirection: "column",
        width: "30%",
        height: "30px",
        justifyContent: "center"
      },
      outerContainerStyle: {
        width: "30%",
        height: "30px",
        border: "solid white 2px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
      innerContainerStyle:{
        width: "30%",
        height: "30px",
        borderRadius: "5px",
        backgroundColor: "white",
        transition: "width 0.3s",
      },
      fillLabelContainer:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
        height: "fit-content",


      },
      fillLevelLabelStyle: {

        color: "white",
        fontSize: "14px",
        fontFamily: "Arial",
      }
    }
  },
  mounted() {
    this.initGaugeProps();
    setInterval(this.updateFillLevel, 200)
  },
  methods:{
    initGaugeProps(){
      if (this.position == "up") {
        this.outerContainerStyle.width = "30px";
        this.outerContainerStyle.height = "200px";
        this.outerContainerStyle.flexDirection = "column";
        this.outerContainerStyle.justifyContent = "flex-end";
        this.innerContainerStyle.width = "100%";
        this.innerContainerStyle.height = "100%";
        this.innerContainerStyle.transition = "height 0.3s";
        this.mainGaugeContainer.flexDirection = "column";
        this.mainGaugeContainer.height = "fit-content";
        this.mainGaugeContainer.width = "fit-content";
      } else if (this.position == "down"){
        this.outerContainerStyle.width = "30px";
        this.outerContainerStyle.height = "200px";
        this.outerContainerStyle.flexDirection = "column";
        this.outerContainerStyle.justifyContent = "flex-start";
        this.innerContainerStyle.width = "100%";
        this.innerContainerStyle.height = "100%";
        this.innerContainerStyle.transition = "height 0.3s";
        this.mainGaugeContainer.flexDirection = "column";
        this.mainGaugeContainer.height = "fit-content";
        this.mainGaugeContainer.width = "fit-content";
      } else if (this.position == "left"){
        this.outerContainerStyle.width = "200px";
        this.outerContainerStyle.height = "30px";
        this.outerContainerStyle.flexDirection = "row";
        this.outerContainerStyle.justifyContent = "flex-end";
        this.innerContainerStyle.width = "100%";
        this.innerContainerStyle.height = "100%";
        this.innerContainerStyle.transition = "width 0.3s";
        this.mainGaugeContainer.height = "fit-content";
        this.mainGaugeContainer.width = "fit-content";
      } else if (this.position == "right"){
        this.outerContainerStyle.width = "200px";
        this.outerContainerStyle.height = "30px";
        this.outerContainerStyle.flexDirection = "row";
        this.outerContainerStyle.justifyContent = "flex-start";
        this.innerContainerStyle.width = "100%";
        this.innerContainerStyle.height = "100%";
        this.innerContainerStyle.transition = "width 0.3s";
        this.mainGaugeContainer.height = "fit-content";
        this.mainGaugeContainer.width = "fit-content";
      } else if (this.position == "middle"){

        this.outerContainerStyle.width = "200px";
        this.outerContainerStyle.height = "30px";
        this.outerContainerStyle.flexDirection = "row";
        this.outerContainerStyle.justifyContent = "center";
        this.innerContainerStyle.width = "100%";
        this.innerContainerStyle.height = "100%";
        this.innerContainerStyle.transition = "width 0.3s";
        this.mainGaugeContainer.height = "fit-content";
        this.mainGaugeContainer.width = "fit-content";
      }
    },
    updateFillLevel(){
      this.fillLevelInternal = (this.fillLevel*100).toFixed(2).toString() + "%"
      if (this.position == "up" || this.position == "down"){

        this.innerContainerStyle.height = this.fillLevelInternal;
      } else {
        this.innerContainerStyle.width = this.fillLevelInternal;
      }

    }
  },
  watch:{
    fillLevel(){
      this.updateFillLevel();
    }
  }

}
</script>

<style scoped>


/*.width-enter-active,*/
/*.width-leave-active {*/
/*  transition: width 0.5s;*/
/*}*/

/*.width-enter-from,*/
/*.width-leave-to {*/
/*  opacity: 1;*/
/*}*/

</style>