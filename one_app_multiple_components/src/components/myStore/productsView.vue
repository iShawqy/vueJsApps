<template>
<div class="productsViewContainer animate__animated animate__fadeIn">
  <product-card v-for="product in products" :product-id="product.id"
                :key="product.id"
                @click="selectProduct(product.id)"
  >

  </product-card>
</div>
</template>

<script>
import productCard from "@/components/myStore/productCard";
export default {
  name: "productsView",
  components:{productCard},
  data(){return {

  }},
  props:["products"],
  methods:{
    selectProduct(id){
      this.$emit("productSelected", id)

    },

  }
}
</script>

<style scoped>


.productsViewContainer{
   display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 80%;
  width: 99%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  /*border-color: white;*/
  /*border: solid 2px white;*/
  /*position: absolute;*/
  /*background-color: white;*/
  margin-top: 5px;
  margin-bottom: 10px;
  overflow-y: scroll;
  /*box-shadow: 5px 5px 3px  #000000;*/
  transition: 0.5s;
}
</style>