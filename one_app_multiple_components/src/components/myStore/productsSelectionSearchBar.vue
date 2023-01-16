<template>
<div class="productsSelectionSearchBarContainer">
  <select  class="selectStyle" v-model="selectedCategory">

  <option  v-for="category in categories"
           :key="category"
           :value="category"
  >{{category}}</option>
</select>

  <div>
<!--    <label class="label" for="inputWithLabel">{{ label }}</label>-->
<input  class="searchBarStyle" v-model="searchValue" placeholder="search for a product"
        @input="$emit('update:searchValue', $event.target.value)"
/>
  </div>
  <div class="magnifyingGlass" @click="search">
    &#x1f50d;
  </div>

  <div class="basketContainer">
    <img class="shoppingCartImageStyle" src="/myStorePhotos/shoppingCart.png">
    <div class="shoppingCartCounterStyle" v-if="shoppingCartCounter>0">
    {{shoppingCartCounter}}

  </div>
  </div>




</div>
</template>

<script>

export default {
  name: "productsSelectionSearchBar",
  props:['categories'],

  data(){
    return {
      selectedCategory: "All categories",
      searchValue:'',
      shoppingCartCounter: 0,


    }
  },
  methods:{
    emitselectedCategory(){
      this.$emit("categorySelected", this.selectedCategory)
    },
    search(){
      this.$emit("updateSearchValue", this.searchValue)
    }

  },
  watch:{
    // categories(){
    //
    //   this.selectedCategory = this.categories[0];
    // },

    selectedCategory(){
      this.emitselectedCategory()
    },
    searchValue(){
      this.search();
    }
  }

  // data(){
  //   return {
  //
  //   }
  // }
}
</script>

<style scoped>
.productsSelectionSearchBarContainer{
   display: flex;
  flex-direction: row;
  width: 99%;
  border-radius: 10px;
  height: 30px;
  justify-content: center;
  align-items: center;
  /*position: absolute;*/
  background-color: white;
  margin-top: 5px;
  margin-bottom: 10px;
  /*box-shadow: 5px 5px 3px  #000000;*/
}

.headerLabelStyle{
  font-size: 30px;
  font-family: Arial;
  color: black;
}

.selectStyle{
  width: 150px;
  height: 100%;
  border-radius: 10px;
  margin: 5px;
  color: black;
  border-color: green;
   font-size: 16px;
  font-family: Arial;
  overflow-y: scroll;
  border-color: black;
  border: solid 2px;

}

.searchBarStyle{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 400px;
  height: 100%;
  border-radius: 10px;
  /*margin: 5px;*/
  color: black;
  border-color: green;
  font-size: 16px;
  font-family: Arial;
  border-color: black;
  border: solid 2px;
  padding-top: 10px;
  padding-bottom: 10px;


}



.magnifyingGlass{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 100%;
  border-radius: 10px;
  margin: 5px;
  color: black;
  border-color: green;
   font-size: 16px;
  font-family: Arial;
  overflow-y: scroll;
  border-color: black;
  border: solid 2px;
}

.magnifyingGlass:hover{
  background-color: #d9d9d9;
}

.basketContainer{
  display: flex;
  flex-direction: row;
  width: 80px;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;

  color: black;
   font-size: 16px;
  font-family: Arial;
  overflow-y: scroll;
  border-color: black;
  border: solid 2px;
}

.shoppingCartImageStyle{
  width: 25px;
  height: 25px;
}

.shoppingCartCounterStyle{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  font-family: Arial;
  border-radius: 50%;
  background-color: green;
  width: 18px;
  height: 18px;


}
</style>