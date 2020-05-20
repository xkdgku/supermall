<template>
    <div class="detail_info">
        <h5 class="title">{{ goodsInfo.title }}</h5>
        <div class="price">
            <span class="new_price">{{ goodsInfo.newPrice }}</span>
            <span class="odl_price">{{ goodsInfo.oldPrice }}</span>
            <span class="discount">{{ goodsInfo.discount }}</span>
        </div>
        <div class="columns">
            <span v-for="(item,index) in goodsInfo.columns" :key="index">{{ item }}</span>
        </div>
        <div class="services">
            <div class="services_item" v-for="(item,index) in goodsInfo.services" :key="index">
                <img :src="item.icon"/>
                <span>{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "DetailBaseInfo",
    props: {
        goodsInfo: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>

.detail_info {
    padding: 0 14px;
    .title {
        font-size: 18px;
        margin: 14px 0;
    }
    .price{
        display: flex;
        align-items: center;
        margin: 21px 0;
        .new_price{
            font-size: 35px;
            color: #F02430;
        }
        .odl_price{
            font-size: 21px;
            color: gray;
            margin: 0 10px;
            align-self: flex-end;
            text-decoration: line-through;
        }
        .discount{
            font-size: 16px;
            color: white;
            padding: 6px;
            background-image: linear-gradient(to right, #F02430, #F9615E);
            border-radius: 20px;
        }
    }
    .columns{
        display: flex;
        justify-content: space-between;
        span{
            line-height: 42px;
            color: gray;
            font-size: 19px;
        }
    }
    .services{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #F3F5F4;
        height: 70px;
        .services_item{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 16.8px;
                height: 16.8px;
            }
            span{
                font-size: 15.4px;
            }
        }
    }
}
</style>