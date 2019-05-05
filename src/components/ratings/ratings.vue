<template>
    <div class="ratings">
        <div class="rating-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>                       
                    </div>
                    <div class="deliveryTime-wrapper">
                        <span class="title">送达时间</span>
                        <span class="deliveryTime">{{seller.deliveryTime}}</span>
                    </div>
                </div>
            </div>
            <!-- <split><split> -->
            <ratingselect></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li :key="rating" v-for="rating in ratings" class="rating-item">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="devery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="racommend" v-show="rating.recommend.length && rating.recommend"></div>
                            <span class="icon-thumb_up"></span>
                            <span v-for="recommend in rating.recommend" :key="recommend">{{recommend}}</span>
                        </div>
                        <div class="time">
                            {{rating.rateTime | formatDate}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
const ALL = 2
import star from '../stars/star'
// import split from '../split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
export default {
    props:{
        seller:{}
    },
    data(){
        return{
            showFlag:false,
            selectType:ALL,
            onlyContent:true
        }
    },
    components:{
        star,
        // split,
        ratingselect
    }
}
</script>

<style lang="less">
    .ratings{
        position: absolute;
        top: 174px;
        bottom:0;
        width: 100%;
        left: 0;
        overflow: hidden;
        .overview{
            display: flex;
            padding: 18px 0;
            .overview-left{
                flex: 0 0 137px;
                width: 137px;
                padding: 6px 0;   
                border-right: 1px solid rgba(7,17,27,.1);
                text-align: center;
                @media  screen and (max-width: 320px){
                    flex: 0 0 114px;
                    width: 120px;
                    height: 75px;
                }

                .score{
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255,152,0);
                }
                .title{
                    margin: 8px 0;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7,17,27);
                }
                .rank{
                    padding-top:6px;
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
            }
            .overview-right{
                flex: 1;
                padding-left: 24px;
                padding-top: 6px;
                // @media  screen and (max-width: 320px){
                //     padding-left: 6px;
                // }
                .score-wrapper{
                    line-height: 18px;
                    margin-bottom: 8px;
                    font-size: 0;
                     @media  screen and (max-width: 320px){
                         margin-bottom: 3px;
                     }
                    .title{
                        font-size: 12px;
                        color: rgb(7,17,27);
                    }
                    .star{
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                        @media  screen and (max-width: 320px){
                            margin: 0 5px;
                        }
                    }
                    .score{
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(255,153,0);
                    }
                }
                .deliveryTime-wrapper{
                    font-size: 12px;
                    color: rgb(153, 153, blue)
                }
            }
        }
    }
</style>
