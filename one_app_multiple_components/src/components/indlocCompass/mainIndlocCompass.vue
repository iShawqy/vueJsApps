<template>
<div class="mainIndlocCompassMainContainer">
  <box-position-element :normalized-values="normalizedValues" :detection-width-height="800" ref="refBoxPositionElement"></box-position-element>
<!--  <div class="rowContainer" v-if="ready">-->
<!--    <antenna-gauge v-for="i in 3"-->
<!--        :position="antennasGaugesList[i-1].postion" :id="antennasGaugesList[i-1].id"-->
<!--                   :key="antennasGaugesList[i-1].id"-->
<!--                 :fill-level="antennasGaugesList[i-1].fillLevel"-->
<!--  ></antenna-gauge>-->
<!--  </div>-->
<!--  <div class="rowContainer" v-if="ready">-->
<!--    <antenna-gauge v-for="i in 3"-->
<!--        :position="antennasGaugesList[i-1+3].postion" :id="antennasGaugesList[i-1+3].id"-->
<!--                   :key="antennasGaugesList[i-1+3].id"-->
<!--                 :fill-level="antennasGaugesList[i-1+3].fillLevel"-->
<!--  ></antenna-gauge>-->
<!--  </div>-->
<!--  <div class="rowContainer" v-if="ready">-->
<!--    <antenna-gauge v-for="i in 3"-->
<!--        :position="antennasGaugesList[i-1+6].postion" :id="antennasGaugesList[i-1+6].id"-->
<!--                   :key="antennasGaugesList[i-1+6].id"-->
<!--                 :fill-level="antennasGaugesList[i-1+6].fillLevel"-->
<!--  ></antenna-gauge>-->
<!--  </div>-->

<!--  <div :style="[objectBoxSizeStyle]"></div>-->
</div>
</template>

<script>
// import antennaGauge from "@/components/indlocCompass/antennaGauge";
import axios from "axios";
import boxPositionElement from "@/components/indlocCompass/boxPositionElement";
// import antennaGauge from "@/components/indlocCompass/antennaGauge";

export default {
  name: "mainIndlocCompass",
  components: {boxPositionElement},
  mounted() {
    this.initAntennasGaugesList();
    setInterval(this.getAntennasSignals, 100);
  },
  data (){
    return {
      indlocCompassDBURL: 'http://localhost:3004/antennasSignals/1',
      antennasData:[],
      response:null,
      ready: false,
      antennasMappings:{
        0:6,
        1:7,
        2:0,
        3:5,
        4:8,
        5:1,
        6:4,
        7:3,
        8:2
      },
      antennasGaugesList:[],
      normalizedValues:[],
    }
  },
  methods:{
    getAntennasSignals(){
      axios.get(this.indlocCompassDBURL)
      .then(response => {
        this.response = response;
        this.antennasData = this.response.data.normalized
        for (let i=0; i<this.antennasData.length; i++){
          this.antennasGaugesList[i].fillLevel = this.antennasData[this.antennasMappings[i]]
          this.normalizedValues[i] = this.antennasData[this.antennasMappings[i]]
        }
        this.$refs.refBoxPositionElement.updateBoxPosition();



      })
      .catch( error => {
        this.response = error
        console.log(this.response)
      })
  },
    initAntennasGaugesList(){
      var postion = "up";
      for (let i=0; i<9;i++){
        if (i<3){
          postion = "up";
        }
        else if (i>=3 && i<6){
          if (i == 3) {
            postion = "left";
          } else if (i==4){
            postion = "middle"
          } else {
            postion = "right"
          }

        }
        else {
          postion = "down";
        }

        this.antennasGaugesList.push(
            {
              postion: postion,
              id: i,
              fillLevel:0,
            }
        )
      }
      this.ready = true;
    }
    },


}
</script>

<style scoped>
.mainIndlocCompassMainContainer{
  width: 800px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #2d2d2d;
  box-shadow: 5px 5px 3px #acacac;
  border-radius: 10px;
  margin: 20px;
    left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
}

.rowContainer{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 250px;
  justify-content: space-around;
  align-items: center;
}

</style>