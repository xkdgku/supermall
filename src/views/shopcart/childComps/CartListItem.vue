<template>
  <div class="cart_list_item">
    <cart-check-button
      @click.native="checkClick"
      :is-checked="item.checked"
      ref="checkButtonRef"/>
    <div class="item_img" @click="checkClick">
      <img :src="item.img" alt="" />
    </div>
    <div class="item_info" @click="infoClick(item)">
      <p class="item_title">{{ item.title }}</p>
      <p class="item_desc">{{ item.desc }}</p>
      <span class="item_price">￥{{ item.price }}</span>
      <span class="item_count">x{{ item.count }}</span>
    </div>
  </div>
</template>
<script>
import CartCheckButton from "./CartCheckButton.vue";


export default {
  name:"CartListItem",
  props: {
    item:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.item.checked = !this.item.checked;
    },
    //信息点击事件
    infoClick(item) {
      this.$router.push("/detail/" + item.iid);
    }
  },
  components: {
    CartCheckButton
  }
};
</script>

<style scoped>
.cart_list_item {
  width: 100%;
  height: 7.5rem;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
  display: flex;
  padding: 0.4rem;
  padding-left: 0rem;
}

.item_img {
  width: 5.5rem;
  height: 100%;
  margin-right: 0.2rem;
}
.item_img img {
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
}

.item_info {
  position: relative;
  width: calc(100% - 3.5rem - 1.2rem - 3.4rem);
  margin-left: 0.4rem;
}
.item_info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item_title {
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
}
.item_desc {
  font-size: 1rem;
  color: gray;
}
.item_price {
  position: absolute;
  left: 0;
  bottom: 0.4rem;
  font-size: 1.1rem;
  color: orangered;
}
.item_count {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  font-size: 1rem;
}
</style>
