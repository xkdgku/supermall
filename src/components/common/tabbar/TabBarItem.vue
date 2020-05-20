<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active:isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
name:"TabBarItem",
props:{
  path:String
},
data(){
return{}
},
computed:{
  isActive() {
    return this.$route.path.indexOf(this.path) !== -1
//this.$route表示当前正在用于跳转的路由器对象，可以调用其name、path、query、params等属性。

  }
},
methods:{
  itemClick() {
    this.$router.replace(this.path)
// this.$router 实际上就是全局路由对象任何页面都可以调用 push(), go()等方法；
  }
}
}
</script>

<style scoped>
.tab-bar-item {
  flex:1;
  height:49px;
  font-size:14px;
  text-align: center;
}  

.tab-bar-item img {
  width: 24px;
  height:24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
  

}

.active {
  color:rgb(247, 87, 154);
}




</style>