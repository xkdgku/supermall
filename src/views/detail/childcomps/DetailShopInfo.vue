<template>
    <div class="detail_shop_info">
        <div class="shop">
            <img :src="shopInfo.logo"/>
            <div class="name">{{ shopInfo.name }}</div>
        </div>
        <div class="describe">
            <div class="left">
                <div class="num">
                    <div class="top">{{ shopInfo.sells }}</div>
                    <p>总数量</p>
                </div>
                <div class="baby">
                    <div class="top">{{ shopInfo.fans }}</div>
                    <p>全部宝贝</p>
                </div>
            </div>
            <div class="right">
                <div class="item_info" v-for="(item,index) in shopInfo.score" :key="index">
                    <span>{{ item.name }}</span>
                    <span class="branch" :class="{better_color:!item.isBetter}">{{ item.score }}</span>
                    <span class="evaluate" :class="{better_bg:!item.isBetter}">{{ item.isBetter?'高':'低' }}</span>
                </div>
            </div>
        </div>
        <div class="btn">
            <button>进店逛逛</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailShopInfo",
    props: {
        shopInfo: {
            type: Object,
            default() {
                return {};
            }
        }
    }
};
</script>

<style lang="less" scoped>
    .detail_shop_info{
        display: flex;
        flex-direction: column;
        border-top: 4.2px solid #F5F4F7;
        .shop{
            display: flex;
            align-items: center;
            padding-top: 16.8px;
            // border: 1px solid red;
            img{
                border-radius: 100%;
                border: 1px solid #F5F4F7;
                width: 105px;
                height: 105px;
                margin: 0 14px;
            }
            .name{
                font-size: 22.4px;
                color: #989898;
            }
        }
        .describe{
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            margin-left: 28px;
            .left{
                display: flex;
                justify-content: space-between;
                    .top{
                        font-weight: bold;
                        font-size: 22.4px;
                    }
                    p{
                        font-size: 19.6px;
                        margin-top: 7px;
                    }
                .baby{
                    padding: 0 28px;
                    border-right: 2px solid #F4F4F4;
                }
            }
            .right{
                display: flex;
                justify-content: space-between;
                width:224px; 
                height: 105px;
                // border: 1px solid red;
                font-size: 19.6px;
                flex-direction: column;
                margin-right:21px; 
                .item_info{
                    display: flex;
                    justify-content: space-between;
                    .branch{
                        color: red;
                    }
                    .better_color{
                        color: #67914B;
                    }
                    .better_bg{
                        background-color: #67914B !important;
                    }
                    .evaluate{
                        background-color: red;
                        color: white;
                        padding: 0 3px;
                    }
                }
            }
        }
        .btn{
            width: 100vw;
            height: 140px;
            text-align: center;
            border-bottom: 4.2px solid #f8f8f8;
            button{
                align-self: center;
                width: 21px;
                height: 70px;
                font-size: 28px;
                border: none;
                border-radius: 10px;
                color: #85868B;
                background-color: #F1F5FB;
                margin: 28px 0;
            }
        }
    }
</style>