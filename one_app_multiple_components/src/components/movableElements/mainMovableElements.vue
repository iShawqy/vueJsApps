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
                   :width="element.width"
                   :heigh="element.height"
                   @mousedown="executeElementMouseDown(element, $event)"
                   @mouseup="executeElementMouseUp(element, $event)"
                   @click="executeElementClick(element, $event)"
                   v-on:click.stop v-on:mousedown.stop v-on:mouseup.stop
                   :selected="element.selected"
                   :mouse-pos-x="mousePosX" :mouse-pos-y="mousePosY"
                   @dblclick="resize(element)" :parent-key-event="keyEvent"
                   @elementCenterXY="setElementCenterXY"
                   @elementDimensions="setElementDimensions"

  >
</circle-element>

  <lasso-elements-selector :mouse-pos-x="mousePosX" :mouse-pos-y="mousePosY"
                           :selecting="lassoSelecting"
                           @lassoSelectorDone="lassoSelectElements"
  >

  </lasso-elements-selector>


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
import lassoElementsSelector from "@/components/movableElements/lassoElementsSelector";


export default {
name: "mainMovableElements",
  components:{CircleElement, squareElement,
    rectangleElement, elementsBrowser, lassoElementsSelector},
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

    elementsDefaultDimensions: {
      circle: {
        width: '100px',
        height: '100px'
      },
      square : {
        width: '100px',
        height: '100px'
      },
      rectangle: {
        width: '300px',
        height: '100px'
      }
    },
    selectedItems: {},
    multipleSelected: false,
    lassoSelecting: false,
    keyEvent: 'none',
    moving: false,
    lassoInProgress: false,
    afterLassoIntervalId: null,

    elementsCopy: [],

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
      else if (event.key == 'C') {
        this.copyElements()
      }
      else if (event.key == 'V'){
        this.pasteElements();

      }

    },
    pasteElements(){
      for (let i=0; i<this.elementsCopy.length; i++) {
        var el = this.elementsCopy[i];
        var elementId = this.elementsHighestId +1;
        el['id'] = elementId;
        this.elements[el.type][elementId] = el;
        this.elementsHighestId += 1;
        this.elementsCount += 1;

      }

    },

    copyElements(){
      this.elementsCopy = [];
      if (Object.keys(this.selectedItems).length != 0) {
        for (const [id, value] of Object.entries(this.selectedItems)) {
        this.elementsCopy.push(this.copyElement(value))
      }
      }

    },
    copyElement(element) {
        var elementData = {
            type: element.type,
            id: 0,
            selected: false,
            moving: false,
            resizing: false,
            backgroundColor: element.backgroundColor,
            centerXY: {},
            width: element.width,
            height: element.height,
      }
      return elementData

    },
    deleteSelectedElements(){
      for (const [id, value] of Object.entries(this.selectedItems)) {
          delete this.elements[value.type][id];
          if (this.selectedItems.hasOwnProperty(id)){
                    delete this.selectedItems[id]
                    this.elementsCount -= 1;
                  }

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
            centerXY: {},
            width: this.elementsDefaultDimensions[type]['width'],
            height: this.elementsDefaultDimensions[type]['height'],
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
      this.lassoSelecting = true;
      // if (event.button == 0 && !event.shiftKey) {
      //   this.moveSelectedElements(true)
      // }
    },
    executeParentMouseUp(eventOriginal){
      console.log('parent mouse up')
      var event = eventOriginal;
      this.lassoSelecting = false;
      // if (event.button == 0 && !event.shiftKey) {
      //   this.moveSelectedElements(false);
      // }

    },
    executeParentClick(event) {
      console.log('parent mouse click')
      if (!this.lassoInProgress){
        this.deSelectAllElements();
      }

    },
    lassoSelectElements(lassoEdges){
      console.log(lassoEdges);
      if (lassoEdges.w >0 && lassoEdges.h >0) {
        for (const [type, els] of Object.entries(this.elements)) {
          for (const [id, elData] of Object.entries(this.elements[type])) {
            var elCenterXY = this.elements[type][id]['centerXY'];

            if (elCenterXY.x >= lassoEdges.x && elCenterXY.x <= (lassoEdges.x + lassoEdges.w)) {
              if (elCenterXY.y >= lassoEdges.y && elCenterXY.y <= (lassoEdges.y + lassoEdges.h)) {
                if (!this.elements[type][id]['selected']) {
                  this.elements[type][id]['selected'] = true;
                  this.selectedItems[id] = elData;
                }

              }
            }
          }
        }

        this.lassoInProgress = true;
        this.afterLassoIntervalId = setInterval(() => {
          this.resetLassoFlag();
        }, 100);
      }
    },
    resetLassoFlag(){
      this.lassoInProgress = false;
      clearInterval(this.afterLassoIntervalId);
    },
    setElementCenterXY(elData){
      this.elements[elData.type][elData.id]['centerXY'] = elData.centerXY;
    },
    resize(element){
      element.selected = false;
      element.resizing = true;
    },
    setElementDimensions(dimensions){
      this.elements[dimensions.type][dimensions.id]['width'] = dimensions.width;
      this.elements[dimensions.type][dimensions.id]['height'] = dimensions.height;
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