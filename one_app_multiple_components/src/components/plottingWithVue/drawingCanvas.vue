<template>
    <div class="canvasToolsContainer">
      <div :style="outerContainerStyle" :id="outerId">

        <canvas :style="drawingCanvasStyle" :id="drawingId" tabindex=-1
            @mousedown="executeMouseDown($event)"
            @mouseup="executeMouseUp($event)"
            @mousemove="updateMousePos($event)"
            @keyup.esc="clearDrawingCanvas" @blur="executeMouseUp"
    ></canvas>
    </div>
      <div :style="toolsContainerStyle">

        <div :style="lineWidthPickerContainerStyle">
          <line-width-selector v-for="lineWidthSelector in lineWidthsSelectors"
                               :width="lineWidthSelector.width" :selected="lineWidthSelector.selected"
                               :key="lineWidthSelector.width"
                               @click="selectLineWidth(lineWidthSelector)"
          >

          </line-width-selector>
        </div>
        <div :style="colorsPickerContainerStyle">
          <color-selector v-for="selector in colorSelectors"
                        :color="selector.color" :selected="selector.selected"
                        @click="selectPencilColor(selector)"
                        :key="selector.color"
        >

        </color-selector>
        </div>

      </div>
    </div>




</template>

<script>
import colorSelector from "@/components/plottingWithVue/colorSelector";
import LineWidthSelector from "@/components/plottingWithVue/lineWidthSelector";
export default {
  name: "drawingCanvas",
  components:{LineWidthSelector, colorSelector},
  props:{
  width:{
    type: Number,
    default: 400
  },
  height:{
    type: Number,
    default: 300,
  },
  outerId:{
    type: String,
    default: "1"
  },
    drawingId:{
    type: String,
    default: "1_1"
  },
  plottingLineWidth:{
    type: Number,
    default: 4,
  },
  plottingLineColor:{
    type: String,
    default: "blue",
  },
  backgroundColor:{
    type: String,
    default: "black"
  },
  gridOn:{
    type:Boolean,
    default: true
  },
  gridLineColor:{
    type: String,
    default: "#646464"
  },

  drawingCanvasOffsetX:{
    type: Number,
    default: 5,
  },

  drawingCanvasOffsetY:{
    type: Number,
    default: 5,
  },

  drawingLineWidth:{
    type: Number,
    default: 2,
  },
  drawingLineColor:{
    type: String,
    default: "white",
  },

  axesTicksColors:{
    type: String,
    default: 'white'
  },

  axesTicksWidth:{
    type: Number,
    default: 2
  },

  axesTicksLength:{
    type: Number,
    default: 15,
  },

  nrOfTicks:{
    type: Number,
    default: 10
  },

  bufferLength:{
    type: Number,
    default: 100,
  },

  newData:{
    type: Number,
    default:0
  }
},
  // created() {
  //   window.addEventListener("resize", this.onResizeWindow);
  // },
  data (){
  return {
    mousePosX:0,
    mousePosY:0,
    boundingRect: null,
    drawingCanvasElement: null,
    drawingCanvasCtx: null,
    drawingIntervalId: null,
    startPointX: 0,
    startPointY:0,
    outerContainerStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "600px",
      height: "300px",
      minWidth: "200px",
      minHeight: "100px",
      position: "relative",
      backgroundColor: this.backgroundColor,
      borderRadius: "5px",
      margin: "5px"
    },

    drawingCanvasStyle: {
      // position: "absolute",
      // top: "0px",
      // left: "0px",
      flexGrow: "1",
      // border: "solid 2px white",
      // borderRadius: "10px",
      backgroundColor: this.backgroundColor
    },
    toolsContainerStyle:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "95%",
      height: "30px",
      border: "solid white 2px",
      borderRadius: "10px",
      backgroundColor: this.backgroundColor,

    },
    colorsPickerContainerStyle:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100px",
      height: "100%",
      overflowX: "scroll"

    },
    lineWidthPickerContainerStyle:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100px",
      height: "100%",
      overflowX: "scroll",
      marginRight: "10px",
    },
    colorSelectors: [],
    lineWidthsSelectors:[],

  }
},
mounted() {
  // this.drawingCanvasStyle.top = this.drawingCanvasOffsetY.toString() +"px";
  // this.drawingCanvasStyle.left = this.drawingCanvasOffsetX.toString() + "px";
  this.lineWidthPickerContainerStyle.width = Math.floor(this.width-(this.width*0.7)) +"px";
  this.createColorsDict();
  this.createLineWidthsDict();
  this.initOuterContainer();
  this.initToolsContainer();
  this.initDrawingCanvas();
  this.initPencilProperties();

},
methods:{
    createLineWidthsDict(){
      for (let i=1; i<20; i++){
        this.lineWidthsSelectors.push(
            {
              width: i,
              selected: false
            }
        )
      }
      this.lineWidthsSelectors[1].selected = true;

    },
    createColorsDict(){
    for (let r=0; r<255; r+=100){
      for (let g=0; g<255; g+=100){
        for (let b=0; b<255; b+=100){
          this.colorSelectors.push({
            color: "rgb("+r.toString()+","+g.toString()+","+b.toString()+")",
            selected: false
          })
        }
      }
    }
    this.colorSelectors[2].selected = true;
  },
    initPencilProperties(){
    for (let i=0;i<this.colorSelectors.length;i++){
      if (this.colorSelectors[i].selected){
        this.drawingCanvasCtx.strokeStyle = this.colorSelectors[i].color;
      }
    }
    for (let i=0; i<this.lineWidthsSelectors.length; i++){
      if (this.lineWidthsSelectors[i].selected){
        this.drawingCanvasCtx.lineWidth = this.lineWidthsSelectors[i].width;
      }
    }
  },
    selectLineWidth(lineWidthSelector){
      for (let i=0; i<this.lineWidthsSelectors.length; i++){
        if (this.lineWidthsSelectors[i].width == lineWidthSelector.width){
          this.lineWidthsSelectors[i].selected = true;
          this.drawingCanvasCtx.lineWidth = this.lineWidthsSelectors[i].width;

        } else {
          this.lineWidthsSelectors[i].selected = false;
        }
      }

    },

  selectPencilColor(selector){
    for (let i=0;i<this.colorSelectors.length;i++){
      if (this.colorSelectors[i].color == selector.color){
        this.colorSelectors[i].selected = true;
        this.drawingCanvasCtx.strokeStyle = selector.color;
      } else {
        this.colorSelectors[i].selected = false;
      }
    }
  },
  onResizeWindow(){
    this.drawingCanvasElement.width = this.outerCanvasContainerElement.getBoundingClientRect().width;
    this.drawingCanvasElement.height = this.outerCanvasContainerElement.getBoundingClientRect().height;
    this.boundingRect = this.drawingCanvasElement.getBoundingClientRect();
    this.initPencilProperties();
    },

  updateMousePos(event){
    this.mousePosX = event.clientX;
    this.mousePosY = event.clientY;
  },
  clearDrawingCanvas(){
    if (this.drawingIntervalId != null){
      this.executeMouseUp();
    }
    this.drawingCanvasCtx.clearRect(0,0,this.boundingRect.width, this.boundingRect.height)
  },
  initToolsContainer(){
    this.colorsPickerContainerStyle.width = Math.floor(this.width-(this.width*0.5)) +"px";
    // this.lineWidthPickerContainerStyle.width = Math.floor(this.width-(this.width*0.7)) +"px";
  },
  initOuterContainer(){

    this.outerContainerStyle.width = this.width.toString() +"px";
    this.outerContainerStyle.height = this.height.toString() +"px"
    this.outerContainerStyle.minWidth = Math.floor(this.width - (0.5*this.width)).toString() +"px";
    this.outerContainerStyle.minHeight = Math.floor(this.height - (0.5*this.height)).toString() +"px";
    this.outerCanvasContainerElement = document.getElementById(this.outerId);
  },
  initDrawingCanvas(){
    this.drawingCanvasElement = document.getElementById(this.drawingId);
    this.drawingCanvasCtx = this.drawingCanvasElement.getContext("2d");
    this.drawingCanvasElement.width = this.width;
    this.drawingCanvasElement.height = this.height;
  },
  executeMouseDown(event){
    this.boundingRect = this.drawingCanvasElement.getBoundingClientRect();
    this.startPointX = event.clientX - this.boundingRect.x;
    this.startPointY = event.clientY - this.boundingRect.y;

    this.drawingCanvasCtx.beginPath();
    this.drawingCanvasCtx.moveTo(this.startPointX, this.startPointY);
    this.drawingIntervalId = setInterval(this.drawPaths, 10)

  },
  executeMouseUp(){
     clearInterval(this.drawingIntervalId);
     this.drawingIntervalId = null;

  },
  drawPaths(){
    this.drawingCanvasCtx.lineTo(this.mousePosX- this.boundingRect.x, this.mousePosY-this.boundingRect.y);
    this.drawingCanvasCtx.stroke();
  },

  },


}
</script>

<style scoped>

.toolsContainer{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 30px;
  border: solid white 2px;
  border-radius: 5px;

}

.canvasToolsContainer{
  display: flex;
  height: fit-content;
  width: fit-content;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>