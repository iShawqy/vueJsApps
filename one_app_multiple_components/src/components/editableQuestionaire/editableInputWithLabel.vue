<template>
  <div>
    <label class="label" for="inputWithLabel">{{ label }}</label>
<input :style="[baseStyle]" :value="modelValue" :placeholder="defaultValueToShow"
       name="inputWithLabel" id="inputWithLabel"
@input="$emit('update:modelValue', $event.target.value)"/>
  </div>

</template>

<script>
export default {
  name: "editableInputWithLabel",
  props: {
    label: {
      type: String,
      default: "Label"
    },
    modelValue: {
      type: String,
      default: ""
    },

    defaultValueToShow: {
      type: String,
      default: "please type something!"
    },

    width: {
            type: String,
            default: '200px'
          },
    height: {
            type: String,
            default: '30px'
          },
  },
  emits: ['update:modelValue'],
  data(){
    return {
      baseStyle: {
        height:this.height,
        width:this.width,
        fontSize:"20px",
        fontFamily:"Arial",
        marginTop:"5px",
        marginBottom:"5px",
        marginLeft:"5px",
        marginRight:"5px",
        borderRadius:" 10px",
      }

    }
  }
}
</script>

<style scoped>
.label{
  font-size: 20px;
  font-family: Arial;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

/*.input{*/
/*  height: 30px;*/
/*  width: 200px;*/
/*  font-size: 20px;*/
/*  font-family: Arial;*/
/*  margin-top: 5px;*/
/*  margin-bottom: 5px;*/
/*  margin-left: 5px;*/
/*  margin-right: 5px;*/
/*  border-radius: 10px;*/
/*}*/



input::placeholder {
    font-style: italic;
    opacity: 0.5;
    color: blue;
}
</style>