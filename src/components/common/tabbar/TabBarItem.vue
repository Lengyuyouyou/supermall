<template>
  <div class="tab-bar-item"  @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <div :style="activestyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activecolor:{
      type:String,
      default:"red"
    }
  },
  data() {
    return {
      //isActive: false,
    };
  },
  computed: {
    isActive(){
      //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
      return this.$route.path.indexOf(this.path)!==-1
    },
    activestyle(){
      return this.isActive?{color:this.activecolor}:{}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}

</style>