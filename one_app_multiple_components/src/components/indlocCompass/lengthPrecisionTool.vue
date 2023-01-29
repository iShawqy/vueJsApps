<template>

<div class="mainLengthPrecisionToolWidgetContainer">
  <div class="labelsStyle">Precisise length</div>
  <div class="measurementsButtonsContainer">
         <button class="buttonCustomStyle" @click="takeFirstMeasurement" :disabled="firstBtnDisabled">
           Take 1st meas.
         </button>
      <button class="buttonCustomStyle" @click="takeSecondMeasurement" :disabled="secondBtnDisabled">
        Take 2nd meas.
      </button>


  </div>
  <div class="instructionsContainer">
    <div class="labelsStyleInstructions">
    {{instructions}}
  </div>
  </div>

  <div class="labelsStyle">
    Length = {{objectLength}}
  </div>
  <div class="measurementsButtonsStyle" @click="startOver" v-if="this.measurementDone">
    Start Over
  </div>
</div>
</template>

<script>
export default {
name: "lengthPrecisionTool",
data () {
  return {
    exciterWidth: 48,
    xOffsetCalibration: 10,
    objectLength:0,
    ratioCalibration:0,
    ratioP1:0,
    xOffsetP1: 3.5,
    firstBtnDisabled:false,
    secondBtnDisabled:true,
    firstMeasBuffer:[],
    firstBufferAvg:0,
    secondBufferAvg:0,
    secondMeasBuffer:[],
    fillFirstBuffer: false,
    fillSecondBuffer: false,
    bufferLimit:10,
    instructions: "",
    measurementDone: false,
  }
},
mounted() {
  this.initProps();
},
methods:{
  initProps(){
      this.instructions = "Place the right edge of the box @ x = " + this.xOffsetCalibration.toString() +" cm " +
        "and click on 'Take 1st meas.' button"
  },
  fillBuffers(normalizedValues){

      if (this.fillFirstBuffer) {
        this.ratioCalibration = normalizedValues[5]/normalizedValues[3]
        if (this.firstMeasBuffer.length < this.bufferLimit) {
          this.firstMeasBuffer.push(this.ratioCalibration)
        } else {
          this.fillFirstBuffer = false;
          this.secondBtnDisabled = false;
          this.instructions = "Place the left edge of the " +
              "object exactly on x = -" + this.xOffsetP1.toString()+" cm then click on the 'Take 2nd meas.' button";
        }
      }

      if (this.fillSecondBuffer){
        this.ratioP1 = normalizedValues[5]/normalizedValues[3];
        if (this.secondMeasBuffer.length<this.bufferLimit){
          this.secondMeasBuffer.push(this.ratioP1)
        } else {
          this.fillSecondBuffer = false;
          this.instructions = "Done!"
          this.calculateLength();
          this.measurementDone = true;
        }
      }

    },
    takeFirstMeasurement(){
      this.firstBtnDisabled = true;
      this.firstMeasBuffer = [];
      this.fillFirstBuffer = true;
      this.instructions = "Measuring...";
    },
    takeSecondMeasurement(){
      this.secondBtnDisabled = true;
      this.secondMeasBuffer = [];
      this.fillSecondBuffer = true;
      this.instructions = "Measuring...";

    },
    startOver(){
      this.measurementDone = false
      this.firstBtnDisabled = false;
      this.instructions = "Place the right edge of the box @ x = "+ this.xOffsetCalibration.toString() +" cm and click on 'Take 1st meas.' button";
      this.objectLength = 0;

    },

  calculateLength(){
      this.firstBufferAvg = this.firstMeasBuffer.reduce((a, b) => a + b, 0) / this.firstMeasBuffer.length;
      this.secondBufferAvg = this.secondMeasBuffer.reduce((a, b) => a + b, 0) / this.secondMeasBuffer.length;
      this.objectLength = 2*(((this.exciterWidth/2)+this.xOffsetCalibration)-
          ((this.firstBufferAvg/this.secondBufferAvg)*((this.exciterWidth/2)-this.xOffsetP1))).toFixed(4).toString() + 'cm'
    }
},
}
</script>

<style scoped>
.mainLengthPrecisionToolWidgetContainer{
  /*position: absolute;*/
  /*top:500px;*/
  /*left:10px;*/
  margin: 10px;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: fit-content;
  border: solid black 2px;
  background-color: #2d2d2d;
  box-shadow: 5px 5px 3px #acacac;
  border-radius: 5px;
  font-family: Arial;
  font-size: 14px;
  color: #ffffff;


}

.measurementsButtonsContainer{
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 10px;
}

.measurementsButtonsStyle{
  width: 80px;
  margin: 10px;
  height: fit-content;
  background-color: #3e30ff;
  border-radius: 10px;
  opacity: 0.6;
  text-align: center;
}
.measurementsButtonsStyle:hover{
  opacity: 1;
}

.measurementsButtonsStyle{
  width: 80px;
  margin: 10px;
  height: fit-content;
  background-color: #3e30ff;
  border-radius: 10px;
  opacity: 0.6;
  text-align: center;
}
.measurementsButtonsStyle:hover{
  opacity: 1;
}

.labelsStyle{
  height: fit-content;
  width: 160px;
  margin: 10px;
  font-family: Arial;
  font-size: 16px;
  color: #ffffff;

}

.buttonCustomStyle{
  width: 80px;
  margin: 10px;
  height: fit-content;
  background-color: #3e30ff;
  border-radius: 10px;
  opacity: 0.6;
  text-align: center;
  font-family: Arial;
  font-size: 14px;
  color: #ffffff;
  border: none;
}

.buttonCustomStyle:hover{
  opacity: 1;
}


.instructionsContainer{
  display: flex;
  flex-direction: column;
  height: 120px;
  width: 80%;
}
.labelsStyleInstructions{
  width: 200px;
  height: fit-content;
  font-family: Arial;
  font-size: 16px;
  color: #00ba5a;
  font-style: italic;
  margin: 10px;

}

</style>