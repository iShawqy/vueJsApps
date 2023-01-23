<template>
  <div class="mainPlottingDemoContainer" >
<!--    <line-plot :width="width" :height="height" :new-data="newData" ref="linePlotWidget"-->
<!--               :grid-on="false"-->
<!--    ></line-plot>-->
    <drawing-canvas :width="width" :height="height" v-for="dc in drawingCanvases" :key="dc.outerId"
                    :outer-id="dc.outerId" :drawing-id="dc.drawingId"
    ></drawing-canvas>
  </div>

</template>

<script>
// import linePlot from "@/components/plottingWithVue/linePlot";
import drawingCanvas from "@/components/plottingWithVue/drawingCanvas";
export default {
name: "mainPlottingDemo",
components: {drawingCanvas},
// mounted() {
//   setInterval(this.generateRandomData, 100)
// },
data(){
  return {
    width: 600,
    height: 400,
    drawingCanvases: [
      {
        outerId: "1",
        drawingId: "1_1"
      },
      //   {
      //   outerId: "2",
      //   drawingId: "2_1"
      // },
      //   {
      //   outerId: "3",
      //   drawingId: "3_1"
      // }
    ],

    // newData:0,

  }
},
methods: {
  generateRandomData(){
    this.newData = Math.floor(Math.random() * this.height);


    // this.$refs.linePlotWidget.updatePlottingCanvas()

  }
}
}
</script>

<style scoped>
.mainPlottingDemoContainer{
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /*flex-direction: column;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  position: relative;
  background-color: #2d2d2d;
  box-shadow: 5px 5px 3px #d60000;
  border-radius: 10px;
  margin: 20px;
}
.mainPlottingDemoContainer:hover{
  transform: scale(1.03);
  transition: 0.3s;
}
</style>