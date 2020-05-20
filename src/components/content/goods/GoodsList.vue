<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :goodsItem="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name:"GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default() {
        return [];
      }
    }
  }

}
</script>

<style scoped>
.goods{
  display: flex;
    flex-wrap: wrap;/*水平方向均等 wrap该样式用于设置换行 */
    justify-content: space-around;/*两边留有一半的间隔空间 */
    padding: 2px;
}
</style>