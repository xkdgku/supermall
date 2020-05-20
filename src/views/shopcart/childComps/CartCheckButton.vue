<template>
  <div class="item_check">
    <div class="check_box" :class="{ checked: isChecked }"></div>
  </div>
</template>
<script>
export default {
  name:"CartCheckButton",
  props: {
    isChecked: {
      type:Boolean,
      default:true
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.item_check {
  width: 2.2rem;
}
.check_box {
  position: relative;
  top: calc(50% - 0.35rem);
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 auto;
  border-radius: 1.35rem;

  border: 0.04rem solid rgba(128, 128, 128, 0.4);
}

.checked {
  width: 1.4rem;
  height: 1.4rem;
  border-style: none;
  top: calc(50% - 0.5rem);
  background: url("~assets/img/cart/yes.svg") 0 0/90% no-repeat;
}
</style>
