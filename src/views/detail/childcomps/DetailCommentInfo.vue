<template>
    <div class="comment_info" v-if="Object.keys(commentInfo).length !==0 ">
        <div class="user">
            <img :src="commentInfo.user.avatar" />
            <div class="name">{{ commentInfo.user.uname }}</div>
        </div>
        <div class="comment">
            <p>{{ commentInfo.content }}</p>
            <div class="center">
                <span class="data">{{ commentInfo.created | showDate }}</span>
                <span>{{ commentInfo.style }}</span>
            </div>
            <div class="img">
                <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" />
            </div>
        </div>
    </div>
</template>
<script>
import {dateFormat} from '../../../common/utils'
export default {
    name: "DetailCommentInfo",
    props: {
        commentInfo: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {};
    },
    filters: {
        showDate(value) {
            // //1、将服务器返回过来的时间戳转化为Date对象
            const date = new Date(value*1000) //因为服务器返回的时间是秒，所以要乘以1000;
            //2、将date进行时间格式化
           return dateFormat("yyyy-MM-dd hh:mm",date)
        }
    }
};
</script>
<style lang="less" scoped>
.comment_info {
    margin-top: 28px;
    border-top: 4.2px solid #ececec;
    padding: 0 21px;
    .user {
        display: flex;
        align-items: center;
        img {
            width: 105px;
            height: 105px;
            border: 1px solid #f5f4f7;
            border-radius: 100%;
            margin: 21px 21px 0 0;
        }
        .name {
            font-size: 22.4px;
            font-weight: bold;
        }
    }
    .comment {
        p {
            margin-top: 21px;
            font-size: 21px;
            line-height: 28px;
        }
        .center {
            font-size: 14px;
            color: gray;
            line-height: 44.8px;
            .data {
                margin-right: 21px;
            }
        }
        .img {
            img {
                width:105px;
                height: 105px;
            }
        }
    }
}
</style>