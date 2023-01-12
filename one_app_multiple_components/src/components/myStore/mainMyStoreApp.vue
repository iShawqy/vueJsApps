<template>
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
<div class="mainMyStoreAppContainer">
  <store-header @click="showHomePage"></store-header>
  <products-selection-search-bar :categories="categories"
                                 @categorySelected="getProductsByCategory"
                                 @updateSearchValue="filterProductsBasedOnSearchValue"
  ></products-selection-search-bar>
  <products-view :products="this.filteredProductsList"
                 ref="refProductsView"

  ></products-view>



</div>
</template>

<script>
import axios from "axios";
import storeHeader from "@/components/myStore/storeHeader";
import productsSelectionSearchBar from "@/components/myStore/productsSelectionSearchBar";
import productsView from "@/components/myStore/productsView";


export default {
  name: "mainMyStoreApp",
  components: {storeHeader, productsSelectionSearchBar, productsView},
  mounted() {
    this.getAllProducts();
    this.getAllProductsDetails();
    // this.getProductsByCategory('shoes');
},
  data(){
    return{
      dbUrl: "http://localhost:3004/",
      productsUrl: "http://localhost:3004/products",
      productsDetailsUrl:"http://localhost:3004/productsDetails",
      basketUrl: "http://localhost:3004/basket",
      products: [],
      productsDetails: [],
      categories:[],
      response:'',
      filteredProductsList: [],


}},
  provide(){
    return {
      dbUrl: this.dbUrl,
      productsUrl: this.productsUrl,
      productsDetailsUrl:this.productsDetailsUrl,
      basketUrl: this.basketUrl,
      // categories: computed(() => this.categories)
    }

  },
  methods:{
    showHomePage(){
      this.$refs.refProductsView.showAllProducts();
    },
    getAllProducts(){
      axios.get(this.dbUrl+'products')
      .then(response => {
        this.response = response;
        this.products = response.data;
        this.filteredProductsList = this.products;
      })
      .catch( error => {
        this.response = error
      })
    },
    getAllProductsDetails(){
      axios.get(this.productsDetailsUrl)
      .then(response => {
        this.response = response;
        this.productsDetails = response.data;
      })
      .catch( error => {
        this.response = error
      })
    },
    getProductsByCategory(category){
      if (category == "All categories"){
        this.getAllProducts()
      } else {axios.get(this.dbUrl+'products?category='+category)
      .then(response => {
        this.response = response;
        this.products = response.data;
      })
      .catch( error => {
        this.response = error
        this.products = {};
      })}

    },
    getAllCategories(){
      var allProds = [];
      axios.get(this.dbUrl+'products')
      .then(response => {
        this.response = response;
        allProds = response.data;
        this.categories = ["All categories"];
      for (let i=0; i<allProds.length; i++){
        if (!this.categories.includes(allProds[i].category)){
          this.categories.push(allProds[i].category)
        }
      }

      })
      .catch( error => {
        this.response = error
      })


    },
    filterProductsBasedOnSearchValue(searchValue){

      this.filteredProductsList = [];
      for (let i=0;i<this.products.length;i++){
        if (this.products[i].name.toLowerCase().includes(searchValue.toLowerCase())
            || this.productsDetails[i].description.toLowerCase().includes(searchValue.toLowerCase())){
          this.filteredProductsList.push(this.products[i])
        }
      }
      if (this.filteredProductsList.length == 0){

        this.filteredProductsList = this.products;
      }
    }

  },
  watch:{
    products(){
      this.getAllCategories();
    }
  }




}
</script>

<style scoped>
.mainMyStoreAppContainer{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
</style>