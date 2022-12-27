<template>
<div :style="[baseStyle, selectedStyle]" @mousedown="executeMouseDown($event)"
     @mouseup="executeMouseUp($event)" @dblclick="editElementProps"
     v-on:keyup="setElementProps($event)" tabindex="0"
>

  </div>
</template>

<script>
export default {
name: "rectangleElement",
  props: {
          mousePosX: {
            type: Number,
            default: 0
          },
          mousePosY: {
            type: Number,
            default: 0
          },
          width: {
                  type: String,
                  default: '300px'
                },
         height: {
                  type: String,
                  default: '100px'
                },
         backgroundColor: {
                   type: String,
                   default: 'green'
                  },
         canMove: {
           type: Boolean,
           default: true,
         },
         adjustable: {
                    type: Boolean,
                    default: true,
         },
          selectedFlag: {
            type: Boolean,
            default: false,
          },
    multipleSelected: {
      type: Boolean,
      default: false
    }

         },
  data(){
  return {
    dragging: false,
    draggingIntervalId: null,
    editingIntervalId: null,
    elementPosX: 300,
    elementPosY:600,
    offsetX:0,
    offsetY:0,
    editingFlag: false,
    startPosX: 0,
    startPosY: 0,
    originalWidth: 0,
    originalHeight: 0,

    baseStyle: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      backgroundColor: this.backgroundColor,
      width: this.width,
      height: this.height,
      fontSize: '30px',
      fontFamily: 'Arial',
      border: 'none',

      // padding: '20px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      // margin: '4px 2px',
      // borderRadius: '100%',

    },
    selectedStyle: {
      border: 'none'
    },

  }
  },
  mounted () {
  this.setElementPos()
  },
  methods: {
            setElementPos(){
            this.baseStyle.left = this.elementPosX.toString() + 'px';
            this.baseStyle.top = this.elementPosY.toString() + 'px';
            },
            executeMouseDown(event){
              if (event.button == 0 && !this.multipleSelected) {
                this.startDragging()
              }
            },
            executeMouseUp(event){
              if (event.button == 0) {
                this.stopDragging()
              }
            },
            startDragging(){

                if (this.canMove && !this.editingFlag) {
                  this.dragging = true;
                  this.offsetY = this.mousePosY - this.elementPosY;
                  this.offsetX = this.mousePosX - this.elementPosX;
                  this.draggingIntervalId = setInterval(() => {
                    this.drag();
                  }, 25);
                }



            },
            stopDragging(){

                this.dragging = false
                clearInterval(this.draggingIntervalId)

              },
            drag(){
              if (this.dragging){
                this.elementPosX = this.mousePosX - this.offsetX;
                this.elementPosY = this.mousePosY - this.offsetY;
                this.baseStyle.top = this.elementPosY.toString() +'px';
                this.baseStyle.left = this.elementPosX.toString() +'px';

              }
              },
            editElementProps(){
              this.selectElement(false)
              if (this.adjustable) {
                this.editingFlag = true;
                this.originalWidth = this.baseStyle.width;
                this.originalHeight = this.baseStyle.height;
                // this.baseStyle.width = '50px';
                this.baseStyle.border = '5px dashed black'
                this.startPosX = this.mousePosX;
                this.startPosY = this.mousePosY;
                this.editingIntervalId = setInterval(() => {
                        this.resize();
                      }, 25);
              }
            },
            setElementProps(event){
              if (event.key == "Enter"){
                this.baseStyle.border = 'none';
              this.editingFlag = false;
              clearInterval(this.editingIntervalId)
              }
              else if (event.key== "Escape") {
                 if (this.dragging) {
                  this.stopDragging()
                } else if (this.editingFlag){
                  this.baseStyle.border = 'none';
                  this.editingFlag = false;
                  clearInterval(this.editingIntervalId)
                  this.baseStyle.width = this.originalWidth;
                  this.baseStyle.height = this.originalHeight;
                }

              }
              this.selectElement(true);

            },
            resize(){
              if (this.editingFlag){
                var width = parseInt(this.baseStyle.width.split("px")[0]) +(this.mousePosX - this.startPosX);
                var height = parseInt(this.baseStyle.height.split("px")[0])+ (this.mousePosY - this.startPosY);
                if (width <0) {
                  width *= -1;
                }

                if (height <0) {
                  height *= -1;
                }
                  // var biggerDimension = 0;
                  // if (width >= height){
                  //   biggerDimension = width;
                  // } else {
                  //   biggerDimension = height;
                  // }

                  if (width < 5){
                    width = 5;
                  }

                  if (height < 5){
                    height = 5;
                  }
                  this.baseStyle.width = width.toString() + 'px';
                  this.baseStyle.height = height.toString() + 'px';
                  this.startPosX = this.mousePosX;
                  this.startPosY = this.mousePosY;

              }

            },
            selectElement(select){
              if (!this.editingFlag){
                if (select){
                this.selectedStyle['border'] =  '3px solid black';
              } else {
                this.selectedStyle = {};
              }
              }


            },

  },
  watch:{
  selectedFlag(newValue){
    this.selectElement(newValue)
  }
  }


}
</script>

<style scoped>

</style>