<template>
<div class="mainContainer" @mousemove="updateMousePos($event)"
     @click="executeParentClick($event)"
     @keyup="handleKeyPress($event)" tabindex="0"
     @mousedown="executeParentMouseDown($event)"
     @mouseup="executeParentMouseUp($event)"
>
<!--&gt;-->
  <elements-browser class="elementsBrowser animate__animated animate__fadeInLeft"

                    @addElement="addNewElement" v-if="mousePosX<100">

  </elements-browser>

  <circle-element  v-for="element in elements.circle"
                   :id="element.id"
                   :key="element.id"
                   :moving="element.moving"
                   :resizing="element.resizing"
                   :background-color="element.backgroundColor"
                   @mousedown="executeElementMouseDown(element, $event)"
                   @mouseup="executeElementMouseUp(element, $event)"
                   @click="executeElementClick(element, $event)"
                   v-on:click.stop v-on:mousedown.stop v-on:mouseup.stop
                   :selected="element.selected"
                   :mouse-pos-x="mousePosX" :mouse-pos-y="mousePosY"
                   @dblclick="resize(element)" :parent-key-event="keyEvent"

  >
</circle-element>


<!--    <square-element  v-for="element in elements.square"-->
<!--                   :id="element.id"-->
<!--                   :key="element.id"-->
<!--                   :can-move="element.canMove"-->
<!--                   :background-color="element.backgroundColor"-->
<!--                   @click="executeElementMouseDown(element, $event)"-->
<!--                   v-on:click.stop :selected-flag="element.selected"-->
<!--                   :mouse-pos-x="mousePosX" :mouse-pos-y="mousePosY"-->
<!--                   :multiple-selected="multipleSelected"-->
<!--  >-->
<!--</square-element>-->

<!--   <rectangle-element  v-for="element in elements.rectangle"-->
<!--                   :id="element.id"-->
<!--                   :key="element.id"-->
<!--                   :can-move="element.canMove"-->
<!--                   :background-color="element.backgroundColor"-->
<!--                   @click="executeElementMouseDown(element, $event)"-->
<!--                   v-on:click.stop :selected-flag="element.selected"-->
<!--                   :mouse-pos-x="mousePosX" :mouse-pos-y="mousePosY"-->
<!--                   :multiple-selected="multipleSelected"-->
<!--  >-->
<!--</rectangle-element>-->

  </div>
</template>

<script>
import squareElement from "@/components/movableElements/squareElement";
import rectangleElement from "@/components/movableElements/rectangleElement";
import CircleElement from "@/components/movableElements/circleElement";
import elementsBrowser from "@/components/movableElements/elementsBrowser";


export default {
name: "mainMovableElements",
  components:{CircleElement, squareElement,
    rectangleElement, elementsBrowser},
  data(){
  return {
    mousePosX: 0,
    mousePosY: 0,
    elements: {
      circle: {},
      square: {},
      rectangle: {},
    },
    elementsHighestId: 0,
    elementsCount: 0,
    elementsDefaultBackgroundColors: {
      circle: 'red',
      square: 'blue',
      rectangle: 'green'
    },
    selectedItems: {},
    multipleSelected: false,
    dragging: false,
    draggingIntervalId: null,
    keyEvent: 'none',
    moving: false,

  }
  },
  mounted() {
    setInterval(() => {
              this.updateMultipleSelected();
            }, 20);
  },
  methods:{
    updateMousePos(event){
      this.mousePosX = event.clientX;
      this.mousePosY = event.clientY;
    },
    deSelectAllElements(){
      var keys = Object.keys(this.selectedItems);
      for (let i=0; i< keys.length; i++){
        var type = this.selectedItems[keys[i]]['type'];
        var id = this.selectedItems[keys[i]]['id'];
        this.elements[type][id].selected = false;
      }
      this.selectedItems = {};

    },
    selectElement(element) {
      this.elements[element.type][element.id].selected = true;
      this.selectedItems[element.id] = element;
    },
    deSelectElement(element) {
      this.elements[element.type][element.id].selected = false;
      if (this.selectedItems.hasOwnProperty(element.id)) {
            delete this.selectedItems[element.id];
          }
    },
    executeElementMouseDown(element, eventOriginal){
      console.log('element mouse down');
      var event = eventOriginal;
      if (event.shiftKey) {
        if (element.selected) {
          this.deSelectElement(element);
        }
        else {
          this.selectElement(element);
        }
      }
      else {
        this.moveSelectedElements(true)
      }


    },
    executeElementMouseUp(element, eventOriginal){
      var event = eventOriginal;
      if (!event.shiftKey) {
        this.moveSelectedElements(false);
      }

    },
    executeElementClick(element, eventOriginal){
      console.log('element clicked');
      var event = eventOriginal;
      if (!event.shiftKey) {
        if (!this.moving) {
          this.deSelectAllElements();
          this.selectElement(element);
        } else {
          this.moveSelectedElements(false)
        }

      }
    },
    handleKeyPress(event) {
      console.log(event);
      this.keyEvent = event.key;
      if (event.key == "Delete") {
        this.deleteSelectedElements();
      }
      else if (event.key == "Enter" || event.key == "Escape") {
        if (Object.keys(this.selectedItems).length != 0){
          for (const [id, data] of Object.entries(this.selectedItems) ){
            this.elements[data.type][id].selected = true;
            this.elements[data.type][id].resizing = false;
          }
        }
      }
      else if (event.key == 'A') {
        this.selectAllElements()
      }

    },
    deleteSelectedElements(){
      for (const [id, value] of Object.entries(this.selectedItems)) {
          delete this.elements[value.type][id];
          if (this.selectedItems.hasOwnProperty(id)){
                    delete this.selectedItems[id]
                  }
          this.elementsCount -= 1;
        }
    },
    selectAllElements(){
      for (const [type, els] of Object.entries(this.elements)){
        for (const [id, elData] of Object.entries(this.elements[type])){
          if (!this.elements[type][id]['selected']) {
            this.elements[type][id]['selected'] = true;
            this.selectedItems[id] = elData;
          }
      }
      }
    },
    addNewElement(type){
      var elementId = this.elementsHighestId +1;
      var elementData = {
            type: type,
            id: elementId,
            selected: false,
            moving: false,
            resizing: false,
            backgroundColor: this.elementsDefaultBackgroundColors[type],
      }
      this.elements[type][elementId] = elementData
      this.elementsHighestId += 1
      this.elementsCount += 1
    },
    updateMultipleSelected(){
      if (Object.keys(this.selectedItems).length > 1){
        this.multipleSelected = true;
      } else {
        this.multipleSelected = false;
      }
    },
    moveSelectedElements(flag) {
      this.moving = flag;
      if (Object.keys(this.selectedItems).length != 0) {
        for (const [id, data] of Object.entries(this.selectedItems)) {
          this.elements[data.type][id].moving = flag;
          this.elements[data.type][id].resizing = false;
        }
      }
    },
    executeParentMouseDown(eventOriginal){
      var event = eventOriginal;
      console.log('parent mouse down')
      if (event.button == 0 && !event.shiftKey) {
        this.moveSelectedElements(true)
      }
    },
    executeParentMouseUp(eventOriginal){
      console.log('parent mouse up')
      var event = eventOriginal;
      if (event.button == 0 && !event.shiftKey) {
        this.moveSelectedElements(false);
      }

    },
    executeParentClick(event) {
      console.log('parent mouse click')
      this.deSelectAllElements();
    },
    stopDragging(){
      this.dragging = false
      clearInterval(this.draggingIntervalId)
    },
    resize(element){
      element.selected = false;
      element.resizing = true;
    },

  },

}
</script>

<style scoped>
    .mainContainer{
    position: absolute;
    width: 100%;
    height: 100%;
      background-color: #ffffff;
  }

    .elementsBrowser{
      position: absolute;
      top: 25%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
</style>