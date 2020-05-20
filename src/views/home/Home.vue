<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles='["流行","新款","精选"]' 
                  @tabClick="tabClick" 
                  ref="tabControl1" class="tab-control" v-show="isTabFixd">
    </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles='["流行","新款","精选"]' 
                 @tabClick="tabClick" 
                 ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    <!-- showGoods是简写，在computed属性中 -->
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- 在我们需要监听一个组件的原生事件时，必须给对应的事件加上一个.native修饰符，才能监听 -->
    

  <!-- $el就是组件里面的根组件 -->
  
  </div>
</template>

<script>
//公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop"
//子组件
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"



import {getHomeMultidata,getHomeGoods} from '@/network/home';
// import { Swiper, SwiperItem } from '@/components/common/swiper/index'此时这两个组件就被封装了，这里就不需要了

export default {
name:"Home",
components:{
  NavBar,
  TabControl,

  HomeSwiper,
  RecommendView,
  FeatureView,
  GoodsList,
  BackTop,

  Scroll,

},
data() {
  return {
    // result:null;
    banners:[],
    // deKeyword:[],
    recommends:[],
    // keywords:[]
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]}
    },
    currentType:'pop',
    isShowBackTop:false,
    tabOffsetTop:0,
    isTabFixd:false,
    saveY:0,
  }
},
activated() {
  this.$refs.scroll.refresh()
  this.$refs.scroll.scroll.scrollTo(0,this.saveY)
  
},
deactivated() {
  this.saveY = this.$refs.scroll.scroll.y
},
created() {
  //1  请求多个数据
  this.getHomeMultidata()

  //2  请求商品数据 
  
  // console.log(this.goods)
  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')

  
},
mounted() {
  const refresh = this.debounce(this.$refs.scroll.refresh,200)
  //3  监听item中图片加载完成
  //   事件总线(所有组件共用相同的事件中心，
  //   可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件)
  this.$bus.$on('itemImgLoad',() => {
    // console.log("1111")
    refresh()
  })
  

},
computed: {
  showGoods() {
    return this.goods[this.currentType].list
  }
},
methods:{
  //------------------事件监听相关的方法------------------------
  tabClick(index) {
    switch(index) {
      case 0:
        this.currentType = 'pop';
        break;
      case 1:
        this.currentType = 'new';
        break;
      case 2:
        this.currentType = 'sell';    
        break;
    }
    this.$refs.tabControl1.currentIndex = index;
    this.$refs.tabControl2.currentIndex = index;
  },
  backClick() {
    this.$refs.scroll.scroll &&  this.$refs.scroll.scroll.scrollTo(0,0,500)
    // console.log(this.$refs.scroll.message)
  },
  contentScroll(position) {
    // console.log(position);
    //1  判断backtop是否显示
    this.$refs.scroll.scroll &&  (this.isShowBackTop = -(position.y) > 1000);

    //2  决定tabcontrol是否吸顶(position:fixed)
    this.isTabFixd = -(position.y) >= this.tabOffsetTop
  },
  loadMore() {
    this.getHomeGoods(this.currentType)
    
  },
  swiperImgLoad() {
    // console.log(this.$refs.tabControl2.$el)
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    
  },


  //防抖函数

  debounce(func,delay){
    let timer = null
    return function(...args){
      if(timer) {clearTimeout(timer)}
      timer = setTimeout(() => {
        func.apply(this, args)
      },delay) 
    }
  },


  //------------------下面是网络相关的请求方法--------------------
  getHomeMultidata(){
    getHomeMultidata().then(res =>{
    // console.log(res);
    // this.result = res;
    this.banners = res.data.banner.list;
    // this.deKeyword = res.data.deKeyword;
    this.recommends = res.data.recommend.list;
    // this.keywords = res.data.keywords;
  })
  },
  getHomeGoods(type) {
    const page = this.goods[type].page + 1;
    getHomeGoods(type,page).then(res => {
    // console.log(res);
    this.goods[type].list.push(...res.data.list);
    this.goods[type].page += 1; 

    this.$refs.scroll.finishPullUp()//finishPullUp方法才可以加载更多数据
  })
  }
}
}
</script>

<style scoped>
.home-nav{
  background-color:var(--color-tint);
  color:#fff;
  /* position:fixed;
  top:0;
  right:0;
  left:0;
  z-index: 9; */
}
#home{
  /* padding-bottom: 1000px; */
  /* padding-top: 44px; */
  height:100vh;
  position:relative;
}
.tab-control{
  /* position:sticky; */
  /* top:44px;上滑到离顶部还有44px的时候，此时固定不动 */
  /* z-index: 9; */
  position:relative;
  z-index:9;
}
.content{
  overflow: hidden;
  position:absolute;
  top:44px;
  bottom:49px;
  left:0;
  right:0;
}
</style>