<template>
  <div id="home">
    <nav-bar class="home-nav">
      <h2 slot="center">购物街</h2>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1" 
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      :probe-type="3"
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        class="tab-control"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils";
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      isshow: false,
      saveY: 0,
    };
  },
  /* 组件活跃状态 */
  activated() {
    this.$refs.scroll.scrollto(0, -this.saveY, 0);
    //滚动完进行一次刷新，防止无法滚动
    this.$refs.scroll.refresh();
  },
  /* 组件非活跃状态 */
  deactivated() {
    //1.保存Y值
    this.saveY = -this.$refs.scroll.getScrollY();

    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    
  },
  methods: {
    /*...意味着所有参数 */
    /*事件监听 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //2获取tabControl的offsetTop 对象到父模块之间的距离
    //所有的组件都有一个属性$el;用于获取组件中的元素
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*网络请求*/
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        /* console.log("res"); */
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  text-align: center;
  color: white;
  /* 在浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0; */
}
/* .tab-control {
  position: sticky;
  设置了sticky的元素，
  在屏幕范围（viewport）时该元素的位置并不受到定位影响
  （设置是top、left等属性无效），
  当该元素的位置将要移出偏移范围时，定位又会变成fixed，
  根据设置的left、top等属性成固定位置的效果。
  top: 44px;
  数字越大层级也越大
  z-index: 8;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>