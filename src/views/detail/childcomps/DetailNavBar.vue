<template>
  <div>
    <nav-bar>
      <div slot="left" class="container" @click="backClick"></div>
      <div slot="center" class="title">
        <div class="title-item" 
        :class="{active: currentIndex === index}"
        v-for="(item,index) in titles" :key="index"
        @click="titleClick(index)">
          {{item}}
        </div>
      </div>
      <div slot="right"></div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
  name:"DetailNavBar",
  data() {
    return {
    titles:["商品","参数","评论","推荐"],
    currentIndex:0,
    }
  },
  components:{
    NavBar
  },
  methods:{
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.back()
    }

  },
}
</script>

<style scoped>
/* 绘制返回的箭头 */
.container{
    width: 0;
    height: 0;
    border: 10px solid;
    border-color:  transparent black transparent transparent;
    position: relative;
    bottom:-12px;
    left:6px;
}
.container::after{
    content: '';
    position: absolute;
    right: -12px;
    top: -7px;
    border: 7px solid;
    border-color:  transparent white transparent transparent;
}

.title{
  display:flex;
  /* text-align: center; */
}
.title-item{
  flex:1;
  
}
.active{
  color:var(--color-high-text)
}
</style>