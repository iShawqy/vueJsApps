<template>
<div :style="[baseStyle, selectedStyle]"
>

  </div>
</template>

<script>
export default {
name: "circleElement",
  props: {
    id: {
      type: Number,
      default:0
    },
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
            default: '100px'
          },
    height: {
            type: String,
            default: '100px'
          },
    backgroundColor: {
             type: String,
             default: 'green'
            },
    selected: {
      type: Boolean,
      default: false,
    },
    moving: {
      type: Boolean,
      default: false,
    },
    resizing: {
      type: Boolean,
      default: false,
    },
    parentKeyEvent: {
      type: String,
      default: 'none',
    },
  },
  data(){
  return {
    movingIntervalId: null,
    resizingIntervalId: null,
    elementPosX: 200 + Math.floor(Math.random() * 300),
    elementPosY:200+ Math.floor(Math.random() * 300),
    offsetX:0,
    offsetY:0,
    startPosX: 0,
    startPosY: 0,
    originalWidth:0,
    baseStyle: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      backgroundColor: this.backgroundColor,
      width: this.width,
      height: this.width,
      fontSize: '30px',
      fontFamily: 'Arial',
      border: 'none',
      borderRadius: '100%',
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
    elementKeyEvent: null,
    type: 'circle',
    centerXY: {
      x:0,
      y:0
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
            this.centerXY.x = this.elementPosX;
            this.centerXY.y = this.elementPosY;
            this.emitElementCenterXY()
            },
            // executeMouseDown(event){
            //   if (event.button == 0 && !this.multipleSelected) {
            //     this.startDragging()
            //   }
            // },
            // executeMouseUp(event){
            //   if (event.button == 0) {
            //     this.stopDragging()
            //   }
            // },
            startMoving(){
                this.offsetY = this.mousePosY - this.elementPosY;
                this.offsetX = this.mousePosX - this.elementPosX;
                this.movingIntervalId = setInterval(() => {
                  this.move();
                }, 25);
            },
            stopMoving(){
                this.centerXY.x = parseInt(this.baseStyle.left.split("px")[0]);
                this.centerXY.y = parseInt(this.baseStyle.top.split("px")[0]);
                this.emitElementCenterXY()
                clearInterval(this.movingIntervalId);

              },
            emitElementCenterXY(){
              var elData = {
                  id: this.id,
                  type: this.type,
                  centerXY: this.centerXY,
                }
                this.$emit('elementCenterXY', elData);
            },
            move(){
              if (this.moving){
                this.elementPosX = this.mousePosX - this.offsetX;
                this.elementPosY = this.mousePosY - this.offsetY;
                this.baseStyle.top = this.elementPosY.toString() +'px';
                this.baseStyle.left = this.elementPosX.toString() +'px';
              }
              },


            setSize(){
              this.stopResizing();
              if (this.parentKeyEvent == "Enter"){
                console.log('set')
              }
              else if (this.parentKeyEvent == "Escape") {
                console.log(this.originalWidth)
                this.baseStyle.width = this.originalWidth;
                this.baseStyle.height = this.originalWidth;
              }
              this.selectElement(true)

            },
            startResizing(){
              this.selectElement(false)
              this.originalWidth = this.baseStyle.width;
              this.baseStyle.border = '5px dashed black'
              this.startPosX = this.mousePosX;
              this.startPosY = this.mousePosY;
              this.resizingIntervalId = setInterval(() => {
                      this.resize();
                    }, 25);
            },
            resize(){
              var width = parseInt(this.baseStyle.width.split("px")[0]) +(this.mousePosX - this.startPosX);
              // var height = parseInt(this.baseStyle.width.split("px")[0])+ (this.mousePosX - this.startPosX);
              if (width <0) {
                width *= -1;
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
                this.baseStyle.width = width.toString() + 'px';
                this.baseStyle.height = width.toString() + 'px';
                this.startPosX = this.mousePosX;
            },
            stopResizing(){
              this.baseStyle.border = 'none';
              this.selectedStyle['border'] =  '5px solid black';
              clearInterval(this.resizingIntervalId)

            },

            selectElement(select){
              if (select){
                this.selectedStyle['border'] =  '5px solid black';
              } else {
                this.selectedStyle = {};
              }
            },
            handleKeyPress(event) {
            if (event.key == "Escape") {

            }
            }

  },
  watch:{
    selected(newValue){
    this.selectElement(newValue)
  },
    resizing(newValue){
      if (newValue) {
        this.startResizing()
      }
      else {
        this.setSize()
      }

    },

    moving(newValue){
      if (newValue){
        this.startMoving()
      } else {
        this.stopMoving()
      }
    },



  }



}
</script>

<style scoped>

</style>