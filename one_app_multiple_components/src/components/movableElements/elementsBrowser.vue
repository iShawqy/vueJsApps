<template>
<div class="browserContainer">
  <div v-for="(value, key) in elements" :class="value.elementStyle" :key="key"
       @click="addElement(value)"
  >
  </div>
</div>
</template>

<script>




export default {
  name: "elementsBrowser",

  data(){
    return {
      elements: {
        circle: {
          type: 'circle',
          elementStyle: 'circleStyle',
        },
        square:{
          type: 'square',
          elementStyle: 'squareStyle',
        },
        rectangle: {
          type: 'rectangle',
          elementStyle: 'rectangleStyle',
        }
    }
    }

  },
  methods:{
    addElement(value){
      this.$emit('addElement', value.type);
    }
  }
}
</script>

<style scoped>
.browserContainer{

  flex: none;
  /*display: flex;*/
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /*gap: 5px;*/
  width: 50px;
  height: fit-content;
  max-height: 300px;
  overflow-y: scroll;
  border: 2px solid black;
  border-radius: 10px;
  animation-duration: 0.5s; /* don't forget to set a duration! */
}

.circleStyle{
  /*flex: none;*/
  flex-grow: 0;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
  background-color: black;

}

.squareStyle{
  /*flex: none;*/
  flex-grow: 0;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background-color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
}

.rectangleStyle{
  flex-grow: 0;
  flex-shrink: 0;
  width: 40px;
  height: 20px;
  background-color: black;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
}

.customSeprator{
  width: 40px;
  height: 2px;
  background-color: black;

}

.button{
  width: 40px;
  height: 40px;
}
</style>