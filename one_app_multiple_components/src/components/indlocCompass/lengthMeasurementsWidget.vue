<template>
<div class="mainLengthMeasurementWidgetContainer">
  <div class="measurementsButtonsContainer">
    <div class="measurementsButtonsStyle" @click="takeFirstMeasurement" v-if="!measurementDone">
      Take 1st meas.
    </div>
    <div class="measurementsButtonsStyle" @click="takeSecondMeasurement" v-if="!measurementDone">
      Take 2nd meas.
    </div>
  </div>
  <div class="labelsStyle">
    {{instructions}}
  </div>
  <div class="labelsStyle">
    Length = {{length}}
  </div>
  <div class="measurementsButtonsStyle" @click="startOver" v-if="this.measurementDone">
    Start Over
  </div>
</div>

</template>

<script>
export default {
  name: "lengthMeasurementsWidget",

  // watch:{
  //   xPos(){
  //     this.fillBuffers();
  //   }
  // },
  data () {
    return {
      firstMeasBuffer:[],
      firstBufferAvg:0,
      secondBufferAvg:0,
      secondMeasBuffer:[],
      fillFirstBuffer: false,
      fillSecondBuffer: false,
      bufferLimit:10,
      length:0,
      width:0,
      instructions: "Place the object exactly in the middle and click on 'Take 1st meas.' button",
      measurementDone: false,

    }
  },
  methods:{
    fillBuffers(xPos){

      if (this.fillFirstBuffer) {
        if (this.firstMeasBuffer.length < this.bufferLimit) {
          this.firstMeasBuffer.push(xPos)
        } else {
          this.fillFirstBuffer = false;
          this.instructions = "Place the left edge of the " +
              "object exactly on the first mark then click on the 'Take 2nd meas.' button";
        }
      }

      if (this.fillSecondBuffer){
        if (this.secondMeasBuffer.length<this.bufferLimit){
          this.secondMeasBuffer.push(xPos)
        } else {
          this.fillSecondBuffer = false;
          this.instructions = "Done!"
          this.calculateLength();
          this.measurementDone = true;
        }
      }

    },
    takeFirstMeasurement(){
      this.firstMeasBuffer = [];
      this.fillFirstBuffer = true;
      this.instructions = "Measuring...";
    },
    takeSecondMeasurement(){
      this.secondMeasBuffer = [];
      this.fillSecondBuffer = true;
      this.instructions = "Measuring...";

    },
    startOver(){
      this.measurementDone = false
      this.instructions = "Place the object exactly in the middle and click on 'Take 1st meas.' button";
      this.length = 0;
      this.width = 0;
    },
    calculateLength(){
      this.firstBufferAvg = this.firstMeasBuffer.reduce((a, b) => a + b, 0) / this.firstMeasBuffer.length;
      this.secondBufferAvg = this.secondMeasBuffer.reduce((a, b) => a + b, 0) / this.secondMeasBuffer.length;
      this.length = (( this.secondBufferAvg - this.firstBufferAvg+ 3.5)*2).toFixed(3).toString() + 'cm'
    }
  }
}
</script>

<style scoped>
.mainLengthMeasurementWidgetContainer{
  position: absolute;
  top:10px;
  left:10px;
  display: flex;
  flex-direction: column;
  height: 200px;
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
  height: fit-content;
  justify-content: center;
  align-items: center;
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

/*.labelsStyleInstructions{*/
/*  height: 20px;*/
/*  width: 160px;*/
/*  margin: 10px;*/
/*  font-family: Arial;*/
/*  font-size: 16px;*/
/*  color: #ffffff;*/

/*}*/
</style>