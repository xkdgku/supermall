<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" 
  ref="scroll" 
  @scroll="contentScroll"
  :probe-type="3">
  <detail-swiper :top-imgs="topImgs"></detail-swiper>
  <detail-base-info :goods-info="goods"></detail-base-info>
  <detail-shop-info :shop-info="shop"></detail-shop-info>
  <detail-image-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-image-info>
  <detail-params-info :params-info="itemParams" ref="params"></detail-params-info>
  <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
  <goods-list :goods="recommends" ref="recommend"></goods-list>
  </scroll>
  <detail-footer-bar @addEvent="addToCart"></detail-footer-bar>
  
  
</div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar'
import DetailSwiper from './childcomps/DetailSwiper'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
import DetailImageInfo from './childcomps/DetailImageInfo'
import DetailParamsInfo from './childcomps/DetailParamsInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import DetailFooterBar from'./childcomps/DetailFooterBar'

import Scroll from '@/components/common/scroll/Scroll'

import GoodsList from '@/components/content/goods/GoodsList'


import {getDetail,Goods,Shop,getRecommend} from '@/network/detail'


export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailFooterBar,

    GoodsList
  },
  data() {
    return {
      iid:null,
      topImgs:[],
      goods:{},
      shop:{},
      detailInfo:{},
      itemParams:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
    }
  },
  created() {
    // console.log(this.$route.params.iid)
  //1  保存传入的iid
  this.iid = this.$route.params.iid

  //2  根据iid请求详情数据
  getDetail(this.iid).then(res => {
    // console.log(res)
    const data = res.result;
    //1  获取顶部的图片轮播数据
    this.topImgs = data.itemInfo.topImages;

    //2  获取商品信息
    this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

    //3  创建店铺信息的对象
    this.shop = new Shop(data.shopInfo)

    //4  保存商品的详细信息
    this.detailInfo = data.detailInfo

    //5  商品参数
    this.itemParams = data.itemParams

    //6取出评论信息
    if(data.rate.cRate !== 0){
      this.commentInfo = data.rate.list[0]
    }
  })

  //3  请求推荐数据
  getRecommend().then(res => {
    // console.log(res)
    this.recommends = res.data.list
  })

  //4  给getThemeTopY赋值
  this.getThemeTopY = this.debounce(() =>{
    this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)
  },200)
  

  },
  methods:{
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()

    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    debounce(func,delay){
    let timer = null
    return function(...args){
      if(timer) {clearTimeout(timer)}
      timer = setTimeout(() => {
        func.apply(this, args)
      },delay) 
    }
  },
  contentScroll(position) {
    // console.log(position)
    // 1  获取y值
    const positionY = -position.y

    //2  y值和界面上的参数，评论的y值进行对比
    let length = this.themeTopYs.length
    for(let i = 0;i < length; i ++ ){
      if((positionY >= this.themeTopYs[i] && positionY < 
  this.themeTopYs[i + 1]) || (positionY >= this.themeTopYs[i] && this.themeTopYs[i+1] === undefined)) {
    //  console.log(i);
    this.$refs.nav.currentIndex = i;
  }
    }
  },
  addToCart() {
    //1  获取购物车需要展示的信息
    const product = {};
    product.img = this.topImgs[0];
    product.title = this.goods.title;
    product.desc = this.goods.desc;
    product.price = this.goods.realPrice;
    product.iid = this.iid;

    //2  将商品加入购物车
    // this.$store.commit('addCart',product)
    this.$store.dispatch('addCart',product)

  }

  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index:9;
  background-color: #fff;
  height:100vh;
}
.detail-nav{
  position: relative;
  z-index:9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 63px);
  overflow: hidden;
}

</style>