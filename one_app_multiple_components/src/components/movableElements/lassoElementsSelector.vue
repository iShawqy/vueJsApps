<template>
<div :style="[baseStyle]"
>

  </div>
</template>

<script>
export default {
name: "lassoElementsSelector",
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
            default: '0px'
          },
    height: {
            type: String,
            default: '0px'
          },

    selecting: {
      type: Boolean,
      default: false
    },
    // parentKeyEvent: {
    //   type: String,
    //   default: 'none',
    // },
  },
  data(){
  return {
    selectionIntervalId: null,
    elementPosX: 0,
    elementPosY: 0,
    offsetX:0,
    offsetY:0,
    startPosX: 0,
    startPosY: 0,
    originalWidth:0,
    originalHeight: 0,
    negativeWidth: false,
    negativeHeight: false,
    selectionEdges: {
      x:0,
      w:0,
      y:0,
      h:0
    },
    baseStyle: {
      position: 'absolute',
      top: '0px',
      left: '0px',
      transform: 'translate(0)',
      width: this.width,
      height: this.width,
      border: 'dashed',
      borderRadius: '5px',
      backgroundColor: '#6da2fc',
      opacity: '0.2',


    },

    elementKeyEvent: null,
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
            startSelecting() {
                this.baseStyle.top = this.mousePosY.toString() +'px';
                this.baseStyle.left = this.mousePosX.toString() +'px';
                this.offsetY = this.mousePosY;
                this.offsetX = this.mousePosX;
                this.selectionIntervalId = setInterval(() => {
                  this.select();
                }, 5);
            },
            select(){

              this.baseStyle.border = '2px dashed black';
              var w = this.mousePosX - this.offsetX;
              var h = this.mousePosY - this.offsetY;
              if (w<0){
                this.negativeWidth = true;
                w *= -1;
                this.baseStyle.left = this.mousePosX.toString() +'px';
                this.baseStyle.width = w.toString() +'px';
              }
              else {
                if (this.negativeWidth){
                  this.baseStyle.left = this.mousePosX.toString() +'px';
                  this.offsetX = this.mousePosX;
                  this.negativeWidth = false;
                }
                this.baseStyle.width = w.toString() +'px';
              }

              if (h<0) {
                this.negativeHeight = true;
                h *= -1;
                this.baseStyle.top = this.mousePosY.toString() +'px';
                this.baseStyle.height = h.toString() +'px';
              }
              else {
                if (this.negativeHeight){
                  this.baseStyle.top = this.mousePosY.toString() +'px';
                  this.offsetY = this.mousePosY;
                  this.negativeHeight = false;
                }
                this.baseStyle.height = h.toString() +'px';
              }




              // if (w>0 && h > 0) {
              //   this.baseStyle.width = w.toString() +'px';
              //   this.baseStyle.height = h.toString() +'px';
              // }
            },
            stopSelecting(){

              clearInterval(this.selectionIntervalId);
              this.selectionEdges.x = parseInt(this.baseStyle.left.split("px")[0]);
              this.selectionEdges.w = parseInt(this.baseStyle.width.split("px")[0]);
              this.selectionEdges.y = parseInt(this.baseStyle.top.split("px")[0]);
              this.selectionEdges.h = parseInt(this.baseStyle.height.split("px")[0]);
              this.$emit('lassoSelectorDone', this.selectionEdges);
              this.resetSelect();
            },
            resetSelect(){
              this.baseStyle.top = '0px';
                this.baseStyle.left = '0px';
                this.baseStyle.width = '0px';
                this.baseStyle.height = '0px';
                this.baseStyle.border = '0px dashed white'

            },


  },
  watch:{
    selecting(newValue){
      if (newValue) {
        this.startSelecting()
      } else {
        this.stopSelecting()
      }

  },





  }



}
</script>

<style scoped>
.asd{
  background-color: #6da2fc;
}
</style>