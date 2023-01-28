<template>

  <div id="tester" :style="[plotStyle]"></div>
</template>

<script>

import Plotly from 'plotly.js-dist-min';
export default {
  name: "helloWorldPlotly",
  data (){
    return {
      x: [],
      y: [],
      timeCounter: 0,
      plotInstance: null,
      bufferLength: 100,
      plotStyle: {
        width: "100%",
        height: "400px",

        borderRadius: "10px",
        border: "solid white 2px"
      }
    }
  },
  mounted() {
    this.initPlot();
    setInterval(this.updatePlot, 100);
  },
  methods:{
    initPlot(){
     this.plotInstance = document.getElementById('tester');
      Plotly.newPlot( this.plotInstance, [{
                                x: this.x,
                                y: this.y}], {
                                margin: { t: 0 } } );
    },
    updatePlot(){
      if (this.x.length < this.bufferLength){
      this.x.push(this.timeCounter);
      this.y.push(Math.floor(Math.random() * 100))
    }
    else {
      this.x.shift();
      this.y.shift();
      this.x.push(this.timeCounter);
      this.y.push(Math.floor(Math.random() * 100))
    }
    this.timeCounter += 1;
    Plotly.restyle(this.plotInstance, {
      x: [this.x],
      y: [this.y]
    })
    // this.initPlot();

    }
  }
}
</script>

<style scoped>

</style>