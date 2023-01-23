<template>
<div class="polarPlotMainContainer">
  <canvas class="plotOuterCircle" :id="id" width="200" height="200">

  </canvas>
</div>
</template>

<script>
export default {
name: "polarPlot",
props:["real", "imag", "sumReal", "sumImag","id"],
data () {
  return {
    canvas: null,
    ctx: null,
    // offsetTop: 0,
    // offsetLeft: 0,
    // centerX:0,
    // centerY:0,
    x:0,
    y:0,
    radius: 100,
    boundingBox: null,
    normalizedX:0,
    normalizedY:0,
    theta:0,

  }
},
mounted() {
  this.initPolarPlot();
  setInterval(this.updateLine, 500)
},
methods: {

  getTheta(){
    this.theta = Math.atan(this.imag/this.real);
  },
  // getCircleX(radius) {
  //
  // return Math.cos(radians) * radius;
  // },
  // getCircleY(radians, radius) {
  // return Math.sin(radians) * radius;
  // },

  initPolarPlot(){
    this.canvas = document.getElementById(this.id);
    this.boundingBox = this.canvas.getBoundingClientRect();
    this.radius = (this.boundingBox.right - this.boundingBox.left)/2;
    this.ctx = this.canvas.getContext("2d");
    // Set line width
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "white";
  },
  updateLine(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.sumReal>0 && this.sumImag>0){
      this.x = this.radius+((this.real/this.sumReal) * this.radius)
      this.y = this.radius-((this.imag/this.sumImag) * this.radius)
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.radius, this.radius);
    this.ctx.lineTo(this.x,this.y);
    // this.ctx.moveTo(20, 20);
    // this.ctx.lineTo(this.boundingBox.right,  500)
    //
    // //
    // //
    this.ctx.stroke();
  }
}
}
</script>

<style scoped>
.polarPlotMainContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.plotOuterCircle{

  border: solid white 2px;
  border-radius: 50%;
  position: relative;
}
</style>