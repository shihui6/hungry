<template>
    <div class="header">
        <div class="content_wraper">
            <div class="avator">
                <img :src="seller.avatar" alt="" width="64" height="64">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}{{seller.deliveryTime}}
                </div>
                <div v-if="seller.supports" class="supports">
                    <span class="icon" :class="matchImage[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>

                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bullentin_wraper">
            <span class="bullentin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="backgroud">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="detail">
            <div v-show="detailshow" class="detail" transition="fade">
                <div class="detail_wraper clearfix">
                    <div class="detail_main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star_wraper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports">
                            <li class="support_item" v-for="(item,index) of seller.supports" :key="index">
                                <span class="icon" :class="matchImage[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detail_close">
                    <i class="icon-close" @click="hideDetail"></i>
                </div>
            </div>
        </transition>    
    </div>
</template>
<script>
import star from '../stars/star'
export default {
    props:{
        seller:{
            // type:Object
        }
    },
    components:{
        star
    },
    data(){
        return{
            matchImage:['decrease','discount','guarantee','invoice','special'],
            detailshow:false
        }
    },
    methods:{
        showDetail(){
            this.detailshow = true
        },
        hideDetail(){
            this.detailshow = false
        }
    },
created(){
    console.log(this.seller)
}
}

</script>

<style lang="less">
    .header{
        position: relative;
        color:#fff;
        background-color:rgba(7, 17, 27, .5);
        .content_wraper{
            position: relative;
            padding:24px 12px 18px 24px;
            .avator{
                display: inline-block;
                vertical-align: top;
                img{
                    border-radius: 2px;
                }
            }
            .content{
                display: inline-block;
                margin-left: 16px;
                font-size: 14px;
                .title{
                    margin: 2px 0 8px 0;
                    .brand{
                        vertical-align: top;
                        width: 30px;
                        height: 18px;
                        display: inline-block;
                        background-image: url("../../assets/img/brand@2x.png");
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                    }
                    .name{
                        margin-left: 6px;
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold
                    }
                }
                .description{
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .supports{
                    .icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px ;
                        background-repeat: no-repeat;
                    }
                    .icon.decrease{
                        background-image: url("../../assets/img/decrease_1@2x.png")
                    }
                    .icon.discount{
                        background-image: url("../../assets/img/discount_1@2x.png")
                    }
                    .icon.guarantee{
                        background-image: url("../../assets/img/guarantee_1@2x.png")
                    }
                    .icon.invoice{
                        background-image: url("../../assets/img/invoice_1@2x.png")
                    }
                    .icon.special{
                        background-image: url("../../assets/img/special_1@2x.png")
                    }
                    .text{
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
            }
            .support-count{
                position: absolute;
                right: 12px;
                bottom:18px;
                padding: 0 8px;
                height: 24px;
                line-height: 24px;
                border-radius: 14px;
                background:rgba(0,0,0,0.2);
                text-align: center;
                .count{
                    font-size: 10px;
                }
                .icon-keyboard_arrow_right{
                    margin-left: 2px;
                    line-height: 24px;
                    font-size: 10px;
                }
            }
        }
        .bullentin_wraper{
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: rgba(7, 17, 27, .2);
            .bullentin-title{
                display: inline-block;
                vertical-align: center;
                margin-top: 7px;
                width: 22px;
                height: 12px;
                background-image: url("../../assets/img/bulletin@2x.png");
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }
            .bullentin-text{
                margin: 0 4px;
                vertical-align: center;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right{
                position: absolute;
                font-size: 10px;
                right:12px;
                top: 8px;
            }
        }
        .backgroud{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter: blur(10px)
        }
        .detail.detail-enter-active,.detail.detail-leave-active{
            // opacity: 1;
            // background: rgba(7, 17, 27,.8)
            transition: all .5s
        }
        .detail.detail-enter,.detail.detail-leave-active{
            opacity: 0;
            background: rgba(7, 17, 27,0)
        }
        .detail{
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background:rgba(7, 12, 27, .8);
            // transition: all .5s;
            .detail_wraper{
                min-height: 100%;
                width: 100%;
                .detail_main{
                    margin-top: 64px;
                    padding-bottom: 64px;
                    .name{
                        line-height: 16px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 700;
                    }
                    .star_wraper{
                        margin-top: 18px;
                        padding: 2px 0;
                        text-align: center;
                    }
                    .title{
                        display: flex;
                        width: 80%;
                        margin: 28px auto 24px auto;
                        .line{
                            flex: 1;
                            position: relative;
                            top: -6px;
                            border-bottom: 1px solid rgba(255, 255, 255, .2)
                        }
                        .text{
                            padding: 0 12px;
                            font-weight: 700;
                            font-size: 14px;
                        }
                    }
                    .supports{
                        width: 80px;
                        margin: 0 auto;
                        .support_item{
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                        }
                        .support_item:last-child{
                            margin-bottom: 0;
                        }
                        .icon{
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right: 6px;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;

                        }
                        .icon.decrease{
                            background-image: url("./decrease_2@2x.png")
                        }
                        .icon.discount{
                            background-image: url("./discount_2@2x.png")
                        }
                        .icon.guarantee{
                            background-image: url("./guarantee_2@2x.png")
                        }
                        .icon.invoice{
                            background-image: url("./invoice_2@2x.png")
                        }
                        .icon.special{
                            background-image: url("./special_2@2x.png")
                        }
                    }
                     

                }
            }
            .detail_close{
                position: relative;
                width: 32px;
                height: 32px;
                margin: -64px auto;
                clear: both;
                font-size: 32px;
            }
        }
    }
</style>
