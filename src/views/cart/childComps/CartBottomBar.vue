<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){
        //全部选中
        this.cartList.forEach(item=>item.checked=false)
      }else{
        //部分或全部不选中
        this.cartList.forEach(item=>item.checked=true)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return ("￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2));
      //计算总和
    },
    checkLength(){
      return this.cartList.filter(item=>item.checked).length
    },
    isSelectAll(){
       //return !(this.cartList.filter(item=>!item.checked).length)
       if (this.cartList.length===0)return false
       return !this.cartList.find(item=>!item.checked)
    }
  },
};
</script>

<style>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  display: flex;
  position: fixed;
  line-height: 40px;
  right: 0;
  left: 0;
  bottom: 44px;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 15px;
  width: 60px;
}
.check-button {
  width: 18px;
  height: 18px;
  line-height: 22px;
}
.price {
  flex: 1;
  margin-left: 10%;
}
.calculate{
  width: 90px;
  background-color: blanchedalmond;
  text-align: center;
}
</style>