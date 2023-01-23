<template>
<div class="buttonsContainerStyle">
<appleCalculaterButton class="cBtn" v-for="btn in buttons" :value="btn.value"
                         :color="btn.color" :background-color="btn.backgroundColor"
                       @click="calculatorBtnClicked(btn.value)"
                       :key="btn.value"
>

</appleCalculaterButton>
</div>
</template>

<script>
import appleCalculaterButton from "@/components/customButtons/appleCalculaterButton";

export default {
name: "ButtonsContainer",
  components: {appleCalculaterButton},
  data(){
  return {

    btnsValues: [
        'C', '+/-', '%', '÷',
        '7', '8', '9', 'X',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '100', '.', '='
    ],

    btnsBackgroundColors: [
        '#9b9b9b', '#9b9b9b', '#9b9b9b', 'darkorange',
        '#333333', '#333333', '#333333', 'darkorange',
        '#333333', '#333333', '#333333', 'darkorange',
        '#333333', '#333333', '#333333', 'darkorange',
        '#333333', '#333333', '#333333', 'darkorange',

    ],

    btnsColors: [
        'black', 'black', 'black', 'white',
        'white', 'white', 'white', 'white',
        'white', 'white', 'white', 'white',
        'white', 'white', 'white', 'white',
        'white', 'white', 'white', 'white',
    ],

    btnsKeyNamesToValues: {
      'c': 'C',
      'n': '+/-',
      '%': '%',
      '/': '÷',
      '7': '7',
      '8': '8',
      '9': '9',
      '*': 'X',
      '4': '4',
      '5': '5',
      '6': '6',
      '-': '-',
      '1': '1',
      '2': '2',
      '3': '3',
      '+': '+',
      '0': '0',
      '.': '.',
      'Enter': '='
    },

    buttons: [],

    clickedBtn: '',
  }
  },

  mounted() {
    this.createBtnsList(),
        window.addEventListener("keypress", function(e) {
          let dictKeys = Object.keys(this.btnsKeyNamesToValues);
          if (dictKeys.includes(e.key)) {

            this.$emit('btnClicked', this.btnsKeyNamesToValues[e.key]);


          }

    }.bind(this));
  },
  methods: {

  createBtnsList(){
    for (let i = 0; i < this.btnsValues.length; i++) {

      this.buttons.push({
        value: this.btnsValues[i],
        backgroundColor: this.btnsBackgroundColors[i],
        color: this.btnsColors[i]
      })
    }

  },

    calculatorBtnClicked(value){
      this.$emit('btnClicked', value);
    },




  }
}
</script>

<style scoped>
.buttonsContainerStyle{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-around;
  /*row-gap: 5px;*/
  /*column-gap: 5px;*/
  gap: 10px;
  width: 330px;
  height: fit-content;
}


</style>