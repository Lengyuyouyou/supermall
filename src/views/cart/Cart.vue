<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>
    <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList";
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
  },
  computed: {
    //两种语法
    ...mapGetters(["cartLength", "cartList"]),
    /* ...mapGetters({
      length:'cartLength',
      list:'cartList'
    }) */
  },
  activated () {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
  font-weight: 900;
}
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>