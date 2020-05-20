<template>
  <div class="cart-list">
    <scroll class="content"
    :probe-type="3"
    ref="scroll">
      <cart-list-item 
      v-for="(item,index) in cartList" 
      :item="item" 
      :key="index">
      </cart-list-item> 
    </scroll>
  </div>
</template>

<script>


import Scroll from '@/components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'
export default {
  name:"CartList",
  components:{
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.cart-list{
  height: calc(100vh - 44px - 49px - 48px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>