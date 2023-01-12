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
  height: 5%;
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
  width: 400px;
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
</style>