<template>

<div class="productCardMainContainer animate__animated animate__fadeIn"  >
  <img class="imageStyle" :src="currentPhoto">
  <div class="brandLabelStyle">
    {{productProps.brand}}
  </div>

  <div class="nameLabelStyle">
    {{productProps.name}}
  </div>

  <div class="priceLabelStyle">
    {{productProps.price}} €
  </div>

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
        this.productDetails = this.productDetails[0];
        this.currentPhoto = '/myStorePhotos/'+ this.productDetails.imagesPath +'/'+ this.currentPhotoIdx.toString()+'.jpeg';
      })
      .catch( error => {
        this.response = error
      })

    axios.get(this.productsUrl+'?id='+this.productId)
      .then(response => {
        this.response = response;
        this.productProps = response.data;
        this.productProps = this.productProps[0];
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
  z-index: 1;
      }

.imageStyle{
  object-fit:contain;
  max-height: 70%;
  max-width:70%;
}

.brandLabelStyle{
  margin: 5px;
  color: black;
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 80%;
}

.nameLabelStyle{
  margin: 5px;
  color: black;
  font-size: 16px;
  font-family: Arial;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 80%;
}

.priceLabelStyle{
  margin: 5px;
  color: #00920c;
  font-size: 16px;
  font-family: Arial;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 80%;
}
</style>