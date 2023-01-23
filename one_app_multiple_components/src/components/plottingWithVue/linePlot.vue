<template>
<div :style="outerGraphContainerStyle">
  <canvas :style="baseCanvasStyle" :width="width+2*plottingCanvasOffsetX" :height="height+2*plottingCanvasOffsetY" id="baseCanvas"></canvas>
  <canvas :style="plottingCanvasStyle" :width="width" :height="height" id="plottingCanvas"></canvas>
</div>
</template>

<script>
export default {
name: "linePlot",
props:{
  width:{
    type: Number,
    default: 400
  },
  height:{
    type: Number,
    default: 300,
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

  plottingCanvasOffsetX:{
    type: Number,
    default: 100,
  },

  plottingCanvasOffsetY:{
    type: Number,
    default: 100,
  },

  axesLineWidth:{
    type: Number,
    default: 2,
  },
  axesLineColor:{
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
data (){
  return {
    baseCanvasElement: null,
    baseCanvasCtx: null,
    plottingCanvasElement: null,
    plottingCanvasCtx: null,
    databuffer: [],
    outerGraphContainerStyle: {
      width: this.width + 2*this.plottingCanvasOffsetX,
      height: this.height + 2*this.plottingCanvasOffsetY,
      position: "relative",
      backgroundColor: this.backgroundColor,
      border: "solid 2px white",
      borderRadius: "5px",
      margin: "10px"
    },
    baseCanvasStyle: {
      // width: this.width + 2*this.plottingCanvasOffsetX,
      // height: this.height + 2*this.plottingCanvasOffsetY,
      position: "absolute",
      top: "0px",
      left: "0px",
      border: "solid 2px white",
      borderRadius: "5px",
      backgroundColor: this.backgroundColor
    },
    plottingCanvasStyle: {
      // width: this.width,
      // height: this.height,
      position: "absolute",
      top: "0px",
      left: "0px",
      border: "solid 2px white",
      borderRadius: "5px",
      backgroundColor: this.backgroundColor
    },
  }
},
mounted() {
  this.plottingCanvasStyle.top = this.plottingCanvasOffsetY.toString() +"px";
  this.plottingCanvasStyle.left = this.plottingCanvasOffsetX.toString() + "px";
  this.initBaseCanvas();
  this.initPlottingCanvas();
  // setInterval(this.updatePlottingCanvas, 100)
},

watch:{
  newData(){
    this.updatePlottingCanvas();
  }
},
methods:{
  drawGrid(){
    if (this.gridOn){
      this.plottingCanvasCtx.lineWidth = this.axesLineWidth;
      this.plottingCanvasCtx.strokeStyle = this.gridLineColor;
      var spaceBetweenGrids = Math.floor(this.width/(this.nrOfTicks-1));
      // var nrOfHorizontalGrids = Math.floor((this.height-this.plotOffsetY)/this.gridWidth) -1;
      for (let i=1; i<this.nrOfTicks; i++){
        this.plottingCanvasCtx.beginPath();
        this.plottingCanvasCtx.moveTo(spaceBetweenGrids*i, 0);
        this.plottingCanvasCtx.lineTo(spaceBetweenGrids*i, this.height);
        this.plottingCanvasCtx.stroke();

      }
      spaceBetweenGrids = Math.floor(this.height/(this.nrOfTicks-1));
      for (let i=1; i<this.nrOfTicks; i++){
        this.plottingCanvasCtx.beginPath();
        this.plottingCanvasCtx.moveTo(0, this.height- (spaceBetweenGrids*i));
        this.plottingCanvasCtx.lineTo(this.width, this.height- (spaceBetweenGrids*i));
        this.plottingCanvasCtx.stroke();

      }
    }
  },
  drawAxisLines(){
    this.baseCanvasCtx.lineWidth = this.axesLineWidth;
    this.baseCanvasCtx.strokeStyle = this.axesLineColor;
    // draw the y-axis
    this.baseCanvasCtx.beginPath();
    this.baseCanvasCtx.moveTo(this.plottingCanvasOffsetX-5, this.plottingCanvasOffsetY);
    this.baseCanvasCtx.lineTo(this.plottingCanvasOffsetX-5, this.plottingCanvasOffsetY+this.height);
    this.baseCanvasCtx.stroke();
    // draw the x-axis
    this.baseCanvasCtx.beginPath();
    this.baseCanvasCtx.moveTo(this.plottingCanvasOffsetX, this.plottingCanvasOffsetY+this.height+5);
    this.baseCanvasCtx.lineTo(this.plottingCanvasOffsetX+this.width, this.plottingCanvasOffsetY+this.height+5);
    this.baseCanvasCtx.stroke();
  },
  drawAxesTicks(){
    this.baseCanvasCtx.lineWidth = this.axesTicksWidth;
    this.baseCanvasCtx.strokeStyle = this.axesTicksColors;
    // draw the y-axis ticks
    var beginX = this.plottingCanvasOffsetX-5 - this.axesTicksLength
    var endX  = this.plottingCanvasOffsetX-5
    var spaceBetweenTicks = Math.floor(this.height/(this.nrOfTicks-1))
    for (let i=0; i<this.nrOfTicks; i++){
        this.baseCanvasCtx.beginPath();
        this.baseCanvasCtx.moveTo(beginX, this.plottingCanvasOffsetY+this.height - (i*spaceBetweenTicks));
        this.baseCanvasCtx.lineTo(endX, this.plottingCanvasOffsetY+this.height - (i*spaceBetweenTicks));
        this.baseCanvasCtx.stroke();
    }

    // draw the x-axis ticks

    var beginY = this.plottingCanvasOffsetY+this.height+5
    var endY  = this.plottingCanvasOffsetY+this.height+5 +this.axesTicksLength
    spaceBetweenTicks = Math.floor(this.width/(this.nrOfTicks-1))
    for (let i=0; i<this.nrOfTicks; i++){
        this.baseCanvasCtx.beginPath();
        this.baseCanvasCtx.moveTo(this.plottingCanvasOffsetX + (i*spaceBetweenTicks), beginY);
        this.baseCanvasCtx.lineTo(this.plottingCanvasOffsetX + (i*spaceBetweenTicks), endY);
        this.baseCanvasCtx.stroke();
    }

  },
  initBaseCanvas(){
    this.baseCanvasElement = document.getElementById("baseCanvas");
    this.baseCanvasCtx = this.baseCanvasElement.getContext("2d");
    this.baseCanvasCtx.lineWidth = 2;
    this.baseCanvasCtx.strokeStyle = "white";
    this.drawAxisLines();
    this.drawAxesTicks();
    // this.drawGrid();
  },
  initPlottingCanvas(){
    this.plottingCanvasElement = document.getElementById("plottingCanvas");
    this.plottingCanvasCtx = this.plottingCanvasElement.getContext("2d");
    this.drawGrid();
  },
  clearPottingCanvas(){
    this.plottingCanvasCtx.clearRect(0,0,this.width, this.height)
  },
  updateDataBuffer(){

    if (this.databuffer.length < this.bufferLength){
      this.databuffer.push(this.newData);
    }
    else {
      this.databuffer.shift();
      this.databuffer.push(this.newData);
    }


  },
  plotDatabuffer(){
    this.plottingCanvasCtx.lineWidth = this.plottingLineWidth
    this.plottingCanvasCtx.strokeStyle = this.plottingLineColor;
    var stepSize = Math.floor(this.width/this.bufferLength);

    if (this.databuffer.length > 1){
      this.plottingCanvasCtx.beginPath();
      for (let i=0; i<((this.databuffer.length)-1); i++){
        this.plottingCanvasCtx.moveTo((i*stepSize), this.height-this.databuffer[i]);
        this.plottingCanvasCtx.lineTo(((i+1)*stepSize) , this.height-this.databuffer[i+1]);
        this.plottingCanvasCtx.stroke();
    }


        // this.plottingCanvasCtx.closePath();
    }

  },
  updatePlottingCanvas(){
    this.clearPottingCanvas();
    this.drawGrid();
    this.updateDataBuffer();
    this.plotDatabuffer();

  },

}




}
</script>

<style scoped>

.asd{
  color: #646464;
}


</style>