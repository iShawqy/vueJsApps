<template>

<div class="productCardMainContainer animate__animated animate__fadeIn"  >
  <img class="imageStyle" :src="currentPhoto">

</div>
</template>

<script>
import axios from "axios";

export default {
name: "productCard",
props: ["productId"],
inject:["productsDetailsUrl","productsUrl"],
data(){return {
  productDetails:{},
  productProps: {},
  response: '',
  currentPhoto:'',
  currentPhotoIdx:1,

}},
methods:{
  initProductCard(){
    axios.get(this.productsDetailsUrl+'?id='+this.productId)
      .then(response => {
        this.response = response;
        this.productDetails = response.data;
        this.currentPhoto = '/myStorePhotos/'+ this.productDetails[0].imagesPath +'/'+ this.currentPhotoIdx.toString()+'.jpeg';
      })
      .catch( error => {
        this.response = error
      })

    axios.get(this.productsUrl+'?id='+this.productId)
      .then(response => {
        this.response = response;
        this.productProps = response.data;
      })
      .catch( error => {
        this.response = error
      })




  }
},
mounted() {
  this.initProductCard();
}
}
</script>

<style scoped>
.productCardMainContainer{
   display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  /*position: absolute;*/
  background-color: white;
  margin: 5px;
  box-shadow: 2px 2px 1px  #000000;
  transition: 0.3s;
}

.productCardMainContainer:hover {
        transform: scale(1.05); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  transition: 0.3s;
      }

.imageStyle{
  object-fit:contain;
  max-height: 70%;
  max-width:70%;
}
</style>