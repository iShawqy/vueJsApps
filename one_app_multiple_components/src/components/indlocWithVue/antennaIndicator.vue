<template>
<div class="antennaIndicatorMainContainer">
  <div class="realImagIndicatorsContainer">
    <div>
        real
      </div>
    <div :style="[realCircleStyle]">
      {{antennaNr}}
    </div>
    <div>
        imag
      </div>
    <div :style="[imagCircleStyle]">

      {{antennaNr}}

    </div>
  </div>
  <polar-plot :real="real" :imag="imag" :sum-real="sumReal" :sum-imag="sumImag" :id="antennaNr"></polar-plot>
</div>
</template>

<script>
import polarPlot from "@/components/indlocWithVue/polarPlot";
export default {
name: "antennaIndicator",
props: ["antennaNr", "real", "imag", "sumReal", "sumImag"],
components:{polarPlot},
data (){
  return {
    realColor: 'green',
    imagColor: 'blue',
    realCircleStyle: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      color: "black",
      fontFamily: "Arial",
      fontSize: "16px",
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      backgroundColor: "green",
      margin: "5px",

    },
    imagCircleStyle: {
      width: "90px",
      height: "90px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      color: "black",
      fontFamily: "Arial",
      fontSize: "16px",
      borderRadius: "50%",
      backgroundColor: "blue",
      margin: "5px",
    },

  }
},

methods: {
  calculateColor(value){
    return parseInt(255-(value * 255).toString()).toString()
  },
  setRealCircleColor(){
    if (this.sumReal != 0){
      this.realColor = this.calculateColor(Math.abs(this.real)/this.sumReal)
    }

    this.realCircleStyle.backgroundColor = "rgb(255," + this.realColor +"," + this.realColor+")"
  },
  setImagCircleColor(){
    if (this.sumImag != 0){
      this.imagColor = this.calculateColor(Math.abs(this.imag)/this.sumImag)
    }
    this.imagCircleStyle.backgroundColor = "rgb(255," + this.imagColor +"," + this.imagColor+")"
  }

},
watch: {
  real(){
    this.setRealCircleColor();
  },
  imag(){
    this.setImagCircleColor();
  }
}


}
</script>

<style scoped>
.antennaIndicatorMainContainer{
  display: flex;
  flex-direction: row;
  width: 370px;
  height: 230px;
  margin: 10px;
  border: solid white 2px;
  border-radius: 5px;
  justify-content: flex-start;
  align-items: center;
}

.realImagIndicatorsContainer{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 150px;
  margin-right: 10px;
  /*border: dashed white 2px;*/
  /*border-radius: 5px;*/
  font-size: 12px;
  font-family: Arial;
  color: white;
}
</style>