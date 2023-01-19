<template>
<div class="productDetailsViewContainer animate__animated animate__fadeIn">
  <div class="imageViewerContainer">
    <div class="imageContainer">
      <img class="imageStyle" :src="currentPhoto">
    </div>

  <div class="imagesNavigator">
    <div class="navigateButton" @click="decrementPhotoIdx">
      &#8592;
    </div>
    <div class="labelImagesNr">
      {{currentPhotoIdx}} &#x2f; {{productDetails.nrImages}}
    </div>
    <div class="navigateButton" @click="incrementPhotoIdx">
      &#8594;
    </div>
  </div>
  </div>
  <div class="productDetailsContainer">
    <div class="brandLabel">
      {{productProps.brand}}
    </div>
    <div class="reviewsContainer">
      {{ratingStars}} | {{ratingCount}} ratings
    </div>
    <div class="nameLabel">
      {{productProps.name}}
    </div>
    <div class="descriptionLabel">
      Product description: {{productDetails.description}}
    </div>
    <div class="optionsContainer">
      <div class="optionContainer" v-for="(value, optionName) in productDetails.options"
           :key="optionName">
        {{optionName}}:
        <div class="optionBtn"
            :style=[optionBtnBaseStyle,optionBtnSelectedStyle]
             v-for="option in value"

             :key="option"
        >
        {{option}}
        </div>
      </div>
    </div>

    <div class="priceLabel">
      {{productProps.price}} €
    </div>

    <div class="stockCountLabel">
      {{productProps.stockCount}} items available
    </div>
  </div>
</div>
</template>

<script>

import axios from "axios";

export default {
  name: "productDetailsView",
  props:["productId"],
  inject:["productsDetailsUrl","productsUrl"],
  data(){return {
    currentPhoto: "",
    currentPhotoIdx: 1,
    productDetails: {},
    productProps:{},
    ratingStars: '',
    ratingCount: '',
    optionBtnBaseStyle:{
      width: "fit-content",
      backgroundColor: "rgb(48,111,219)",
      color: "white",
      fontSize: "16px",
      fontFamily: "Arial",
      marginLeft: "5px",
      marginRight: "5px",
      borderRadius: "5px",
      padding: "5px",
      opacity: "0.7",
    },
    optionBtnSelectedStyle:{
      opacity: "0.7",
    },
    optionsBtnsDict:{},

  }},
  methods:{
    // createOptionsBtnsDict(){
    //   for (var key in this.productDetails.options){
    //
    //   }
    // },
    initProductDetails(){
    axios.get(this.productsDetailsUrl+'?id='+this.productId)
      .then(response => {
        this.response = response;
        this.productDetails = response.data;
        this.productDetails = this.productDetails[0];
        this.reloadProductPhoto();
        // this.createOptionsBtnsDict();
      })
      .catch( error => {
        this.response = error
      })

    axios.get(this.productsUrl+'?id='+this.productId)
      .then(response => {
        this.response = response;
        this.productProps = response.data;
        this.productProps = this.productProps[0];
        this.createProductRatingsText();
      })
      .catch( error => {
        this.response = error
      })




  },
    reloadProductPhoto(){
      this.currentPhoto = '/myStorePhotos/'+ this.productDetails.imagesPath +'/'+ this.currentPhotoIdx.toString()+'.jpeg';
    },
    incrementPhotoIdx(){
      if (this.currentPhotoIdx<this.productDetails.nrImages){
        this.currentPhotoIdx += 1;
        this.reloadProductPhoto();
      }
    },
    decrementPhotoIdx(){
      if (this.currentPhotoIdx>1){
        this.currentPhotoIdx -= 1;
        this.reloadProductPhoto();
      }
    },
    createProductRatingsText(){
      this.ratingStars = '';

      for (let i=0; i<this.productProps.reviewStarsCount; i++){
        this.ratingStars += "\u2B50";
      }

      for (let ii=this.productProps.reviewStarsCount; ii<5; ii++){
        this.ratingStars += "\u2606";
      }

      this.ratingCount = this.productProps.nrReviews;
    },




  },
  mounted() {
    this.initProductDetails()
  }

}
</script>

<style scoped>


.productDetailsViewContainer{
   display: flex;
  flex-direction: row;
  height: 80%;
  width: 99%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  /*border-color: white;*/
  /*border: solid 2px white;*/
  /*position: absolute;*/
  /*background-color: white;*/
  /*margin-top: 5px;*/
  /*margin-bottom: 10px;*/
  /*box-shadow: 5px 5px 3px  #000000;*/
  transition: 0.5s;
}

.imageContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border-radius: 5px;
  border: 2px solid black;
}

.imageStyle{
  object-fit:contain;
  /*max-height: 400px;*/
  width:500px;
  max-height: 500px;

}

.imagesNavigator{
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
}

.navigateButton{
  width: 30px;
  height: 30px;
  color: black;
  font-weight: bold;
  font-family: Arial;
  font-size: 20px;
  opacity: 0.7;
  margin-right: 5px;
  margin-left: 5px;


}

.navigateButton:hover{
  opacity: 1;
}

.imageViewerContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
}
.labelImagesNr{
  color: black;
  font-family: Arial;
  font-size: 16px;
  margin-right: 2px;
  margin-left: 2px;
}

.productDetailsContainer{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 500px;
  height: 500px;
  margin-left: 10px;

}

.brandLabel{
  margin-bottom: 10px;
  color: #0046f5;
  font-size: 24px;
  font-family: Arial;
  font-weight: bold;
}
.nameLabel{
  margin-bottom: 10px;
  color: black;
  font-size: 22px;
  font-family: Arial;
  overflow-y: scroll;

}
.descriptionLabel{
  margin-bottom: 10px;
  color: black;
  font-size: 16px;
  font-family: Arial;
  overflow-y: scroll;
  max-height: 200px;

}
.priceLabel{
  margin-bottom: 10px;
  color: #00db3c;
  font-size: 30px;
  font-family: Arial;
  font-style: italic;
}

.stockCountLabel{
  margin-bottom: 10px;
  color: #186e00;
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
}

.reviewsContainer{
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 20px;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-family: Arial;
}

.optionsContainer{
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 200px;
  justify-content: flex-start;
  align-items: center;
}

.optionContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 50px;
  overflow-y: scroll;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 16px;
  font-family: Arial;
  margin-bottom: 5px;
}


.optionBtn{
  opacity: 0.7;
}
.optionBtn:hover{
  cursor: pointer;
  opacity: 1;
}

.optionBtn:active{
  opacity: 1;
}
</style>