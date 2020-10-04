<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style>
.goods{
  display: flex;
  /*元素换行方式,根据元素宽度决定到底显示多少个*/
  flex-wrap: wrap;
  /*子元素对齐方式  此处设置为均等分*/ 
  justify-content: space-around;
}
</style>