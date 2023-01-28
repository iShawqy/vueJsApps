<template>
<div :style="[positionBoxStyle]"></div>
  <div :style="[middlePositionBoxStyle]"></div>
  <img :src="currentImg" :style="[imageStyle]">
</template>

<script>
export default {
  name: "boxPositionElement",
  props:["normalizedValues", "detectionWidthHeight"],
  mounted() {
    this.initBoxProps();
    // setInterval(this.updateBoxPosition, 100);

  },

  data () {
    return {
      currentImg: "wrong.png",
      imgWidth:0,
      imgHeight:0,
      imageStyle:{
        position: "absolute",
        top: "0px",
        left: "0px",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
      },
      signalToPxRatio: 1.57,
      x:0,
      y:0,
      xBuffer:[],
      yBuffer:[],
      posBufferLength:1,
      leftRightRatio:0,
      upDownRatio:0,
      xOffset:0,
      yOffset:0,
      ready: false,
      positionBoxStyle:{
        position: "absolute",
        width: "100px",
        height: "100px",
        top: "0px",
        left: "0px",
        border: "dashed white 3px",
        borderRadius: "5px",

      },
      middleBoxWidth:0,
      middleBoxHeight:0,
      objectBoxWidth:0,
      objectBoxHeight:0,
      middlePositionBoxStyle:{
        position: "absolute",
        width: "120px",
        height: "120px",
        top: "0px",
        left: "0px",
        border: "solid red 1px",
        borderRadius: "5px",
        background: "rgba(224, 56, 101, 0.5)",
      }
    }
  },
  methods:{
    initBoxProps(){
      this.objectBoxWidth = Math.floor(this.positionBoxStyle.width.split("px")[0])
      this.objectBoxHeight = Math.floor(this.positionBoxStyle.height.split("px")[0])
      this.middleBoxWidth = Math.floor(this.middlePositionBoxStyle.width.split("px")[0])
      this.middleBoxHeight = Math.floor(this.middlePositionBoxStyle.height.split("px")[0])
      this.imgWidth = Math.floor(this.imageStyle.width.split("px")[0])
      this.imgHeight = Math.floor(this.imageStyle.height.split("px")[0])
      this.imageStyle.left = ((this.detectionWidthHeight/2) - this.imgWidth/2).toString()+'px';
      this.imageStyle.top = ((this.detectionWidthHeight/2) - this.imgHeight/2).toString()+'px';
      this.middlePositionBoxStyle.left = ((this.detectionWidthHeight/2) - this.middleBoxWidth/2).toString()+'px';
      this.middlePositionBoxStyle.top = ((this.detectionWidthHeight/2) - this.middleBoxHeight/2).toString()+'px';
      this.xOffset = this.objectBoxWidth/2;
      this.yOffset = this.objectBoxHeight/2;
      this.ready = true;
    },
    updateBoxPosition(){
      if (this.ready){
        this.leftRightRatio = this.normalizedValues[5]/this.normalizedValues[3];
        this.upDownRatio = this.normalizedValues[7]/this.normalizedValues[1];
        if (this.leftRightRatio>= 1){
          // this.x = (this.detectionWidthHeight/2) + (1-)
          this.x = (this.detectionWidthHeight/2) +((this.leftRightRatio-1) * (this.detectionWidthHeight/2))/this.signalToPxRatio;

        } else {
          this.leftRightRatio = this.normalizedValues[3]/this.normalizedValues[5];
          this.x = ((this.leftRightRatio-1) * (this.detectionWidthHeight/2))/this.signalToPxRatio;
          this.x = (this.detectionWidthHeight/2) -this.x;

        }
        if (this.upDownRatio>=1){
          this.y = (this.detectionWidthHeight/2) + ((this.upDownRatio-1) * (this.detectionWidthHeight/2))/this.signalToPxRatio;

        } else {
          this.upDownRatio = this.normalizedValues[1]/this.normalizedValues[7];
          this.y = ((this.upDownRatio-1) * (this.detectionWidthHeight/2))/this.signalToPxRatio;
          this.y = (this.detectionWidthHeight/2) -this.y;

        }
        // this.updatePosBuffer();
        // this.smoothPos();
        this.positionBoxStyle.left = (this.x - this.xOffset).toString() + 'px';
        this.positionBoxStyle.top = (this.y - this.yOffset).toString() + 'px';
        this.checkCentered();


      }
    },
    checkCentered(){
        if ((this.x - this.xOffset)>=((this.detectionWidthHeight/2) - this.middleBoxWidth/2)
          && ((this.x - this.xOffset) +this.objectBoxWidth <= ((this.detectionWidthHeight/2) + this.middleBoxWidth/2))
          && (this.y - this.yOffset)>=((this.detectionWidthHeight/2) - this.middleBoxHeight/2) &&
            ((this.y - this.yOffset) +this.objectBoxHeight <= ((this.detectionWidthHeight/2) + this.middleBoxHeight/2))
        ){
          this.middlePositionBoxStyle.border = "solid green 1px";
           this.middlePositionBoxStyle.background = "rgba(64, 161, 77, 0.4)";
           this.currentImg = "correct.png";

        } else {
          this.middlePositionBoxStyle.border = "solid red 1px";
          this.middlePositionBoxStyle.background = "rgba(224, 56, 101, 0.4)";
          this.currentImg = "wrong.png";
        }

    },
    updatePosBuffer(){
      if (this.xBuffer.length < this.posBufferLength){
        this.xBuffer.push(this.x);
        this.yBuffer.push(this.y);
      } else {
        this.xBuffer.shift();
        this.xBuffer.push(this.x);
        this.yBuffer.shift();
        this.yBuffer.push(this.y);
      }


    },

    smoothPos(){
      this.x = this.xBuffer.reduce((a, b) => a + b, 0) / this.xBuffer.length;
      this.y = this.yBuffer.reduce((a, b) => a + b, 0) / this.yBuffer.length;
    }
  }
}
</script>

<style scoped>

</style>