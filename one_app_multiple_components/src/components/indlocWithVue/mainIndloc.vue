<template>
<div class="mainIndlocContainer">
  <div class="antennasIndicatorContainer">
    <antenna-indicator v-for=" ant in antennasData"
                       :antenna-nr="ant.id"
                       :real="ant.real"
                       :imag="ant.imag"
                       :sum-real="sumReal"
                       :sum-imag="sumImag"
                       :key="ant.id"
    ></antenna-indicator>
  </div>
</div>
</template>

<script>
import antennaIndicator from "@/components/indlocWithVue/antennaIndicator";
import axios from "axios";
export default {
name: "mainIndloc",
components:{antennaIndicator},
mounted(){
  // this.initAntennasData();
  setInterval(this.updateAntennasValues, 100)
},
data (){
  return{
    // antennasNrsList: [0, 7,6,1,8,5,2,3,4],
    antennasNrsList: [0],
    dbUrl: "http://localhost:8976/antennas/",
    response: '',
    tempSumReal:0,
    tempSumImag:0,
    sumReal:0,
    sumImag:0,
    antennasData:[],
}
},
methods:{
  // initAntennasData(){
  //   for (let i=0; i<this.antennasNrsList.length; i++){
  //     this.antennasData.push(
  //         {
  //           id: this.antennasNrsList[i],
  //           real:0,
  //           imag:0,
  //
  //         }
  //     )
  //   }
  // },
  updateAntennasValues(){
    axios.get(this.dbUrl)
      .then(response => {
        this.response = response;
        this.antennasData = this.response.data

        this.tempSumReal = 0;
        this.tempSumImag = 0;

        for (let i=0; i<this.antennasData .length; i++){
          this.tempSumReal += Math.abs(this.antennasData[i].real)
          this.tempSumImag += Math.abs(this.antennasData[i].imag)
        }
        this.sumReal = this.tempSumReal;
        this.sumImag = this.tempSumImag;
      })
      .catch( error => {
        this.response = error
      })
  },
}
}
</script>

<style scoped>
.mainIndlocContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000;
}

.antennasIndicatorContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1200px;
  height: 800px;
  justify-content: center;
  /*border: solid white 2px;*/
  /*border-radius: 10px;*/
}
</style>