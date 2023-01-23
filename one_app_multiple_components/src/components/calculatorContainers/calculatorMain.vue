<template>

  <div class="calculatorContainer" @blur="setBlur(true)" @click="setBlur(false)" tabindex="-1">
    <resultContainer v-model:result="result">

    </resultContainer>
    <buttons-container @btnClicked="executeClick">

    </buttons-container>
  </div>

</template>

<script>
import ResultContainer from "@/components/calculatorContainers/resultContainer";
import ButtonsContainer from "@/components/calculatorContainers/ButtonsContainer";


export default {
  name: "calculatorMain",
  components: {ResultContainer, ButtonsContainer},

  data() {
    return {
      blurred:false,
      result: '0',
      actionBtns: ['C', '+/-', '%', '÷',
        'X', '-', '+', '='],
      currentOperation: null,
      resultInMemory: null,
    }
  },
  methods: {
    setBlur(flag){
    this.blurred = flag;
  },
    // checkResultLength() {
    //   if (this.result.length > 11) {
    //     this.result = this.result.slice(0, 11);
    //   }
    // },
    executeClick(value) {
      if (!this.blurred){
        if (this.actionBtns.includes(value)) {
        console.log(value);
        if (value == 'C') {
          this.result = '0';
          this.resultInMemory = null;
          this.currentOperation = null;
        }
        else if (value == '+/-') {
          let oldResult = this.result;
          if (!oldResult.includes('-')) {

            if (oldResult != '0') {
              this.result = '-';
              this.result += oldResult;
            }

          }
          else {
            if (oldResult != '0') {

              this.result = oldResult.replace('-', '');
            }
          }
        }
        else if (value == '%') {
          let tempResult = parseFloat(this.result);
          tempResult = tempResult / 100;
          this.result = tempResult.toString();
        }
        else if (value == '÷' || value == 'X' || value == '-' || value == '+') {
          if (this.currentOperation != null) {
            this.flushResult()
          }
          this.resultInMemory = parseFloat(this.result);
          this.currentOperation = value


        }
        else if (value == '=') {
          this.flushResult()

        }
      }

      else {
        if (this.result == '0') {
          if (value == '.') {
            this.result += '.'
          } else {
            this.result = value;
          }

        }
        else {
          if (this.currentOperation != null) {
            if (value == '.') {
              this.result = '0.'
            } else {
              this.result = value
            }

          } else {
            this.result += value;
          }
        }
      }
      }

    },
    flushResult() {
      if (this.currentOperation == '÷') {
        this.result = (this.resultInMemory / parseFloat(this.result)).toString()
      }
      else if (this.currentOperation == 'X') {
        this.result = (this.resultInMemory * parseFloat(this.result)).toString()
      }
      else if (this.currentOperation == '-') {
        this.result = (this.resultInMemory - parseFloat(this.result)).toString()
      }
      else if (this.currentOperation == '+') {
        this.result = (this.resultInMemory + parseFloat(this.result)).toString()
      }

      this.resultInMemory = null;
      this.currentOperation = null;
    },

  },
  watch:{
    result(newValue) {
      if (newValue.length > 10) {
        this.result = newValue.slice(0, 10);
        var temp = parseFloat(this.result)
        temp =  temp.toExponential(4)
        this.result = temp.toString()
      }
    }
  },

}
</script>

<style scoped>
.calculatorContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background-color: black;
      width: fit-content;
      height: fit-content;
      border-radius: 10px;
      margin: 20px;
      box-shadow: 10px 10px 3px #0091b5;


  }
.calculatorContainer:hover{
  transform: scale(1.03);
  transition: 0.3s;
}
</style>