<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0,//默认是对象或者是数组的时候，default(){return}
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null,
      message:"你好"
    }  
  },
  mounted() {
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
    })

    //监听滚动的位置
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
    // console.log(this.scroll)


    //监听上拉事件
    this.scroll.on('pullingUp',() => {
      // console.log("----")
      this.$emit('pullingUp')
    })
  },
  methods:{
    refresh() {
      // console.log("----")
        this.scroll && this.scroll.refresh()

      },
    finishPullUp() {
      this.scroll.finishPullUp()
    }

  }
}
</script>

<style scoped>

</style>