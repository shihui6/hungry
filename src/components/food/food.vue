<template>
    <transition name="foods">
        <div class="food" v-show="showFlag" ref="foodList">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}元</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <div @click="addFirst(food,$event)" class="buy" v-show="!food.count || food.count == 0">
                        加入购物车
                    </div>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @ratingtype="getFromSon" @contenttoggle="getmessage" :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" :key="rating" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" class="avatar" width="12" height="12" alt="">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up': rating.rateType === 0,
                                    'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script> 
import BScroll from 'better-scroll'
import Vue from 'vue'
import {formatDate} from '@/common/js/date';
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import split from '@/components/split/split'
import ratingselect from '@/components/ratingselect/ratingselect'
const All = 2
export default {
    props:{
        food:{}
    },
    components:{
        cartcontrol,
        split,
        ratingselect
    },
    filters:{
        formatDate(time){
            let date = new Date(time)
            return formatDate(date,'yyyy-MM-dd hh:mm')
        }
    },
    computed:{

    },
    data(){
        return{
            showFlag:false,
            selectType:2,
            onlyContent:false,
            desc:{
                all:'全部',
                positive:'推荐',
                negative:'吐槽'
            }
        }
    },
    // 29号 父组件可以调用子组件的方法的，但是子组件不可以调用父组件的方法，比如这里
    // goods组件可以调用food组件的方法，但是food组件不可以调用goods组件里面的方法

    // 在父组件内部调用子组件的方法：
    // 1-在父组件内部获取到子组件的dom
    // 2-进行调用即可

    // 当现实food组件的时候，food显示，那时候点击就是在food组件内部进行点击的，点击hide
    // 时候直接出发hide
    methods:{
        show(){
            this.showFlag = true
            this.selectType = All
            this.onlyContent = false
            this.$nextTick(()=>{
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.foodList,{
                        click:true
                    })
                }else{
                    this.scroll.refresh()
                }
            })
        },
        hide(){
            this.showFlag = false
        },
        addFirst(food,event){
            if(!event._constructed){
                return;
            }
            console.log(111)
            console.log(event.target)
            // this.$emit("cart.add",event.target)
            Vue.set(this.food,'count',1)
        },
        getFromSon(value){
            console.log(value)
           this.selectType = value
           this.$nextTick(()=>{
               this.scroll.refresh()
           })
       },
       getmessage(value){
           this.onlyContent = value
           this.$nextTick(()=>{
               this.scroll.refresh()
           })
       },
       needShow(type,text){
        //    console.log('food组件中的needshow')
           if(this.onlyContent && !text){
               return false
           }
           if(this.selectType == All){
               return true
           }else{
               return type === this.selectType;
           }
       },
    },
    created(){

    }
}
</script>

<style lang="less">
    .food{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 68px;
        width: 100%;
        z-index: 18;
        background: #fff;
        transform: translate3d(0,0,0);
        transition: all .2s linear; 
        .image-header{
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .back{
                position: absolute;
                top: 10px;
                left: 0;
                .icon-arrow_lift{
                    display: block;
                    padding: 10px;
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
        .content{
            padding:18px;
            position: relative;
            .title{
                line-height: 14px;
                margin-bottom: 8px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(7, 17, 27)
            }
            .detail{
                margin-bottom: 18px;
                line-height: 10px;
                font-size: 0;
                height: 10px;
                .sell-count,.rating{
                    font-size: 10px;
                    color: rgb(147, 153, 159)
                }
                .sell-count{
                    margin-right: 12px;
                }
            }
            .price{
                font-weight: 700;
                line-height: 24px;
                .now{
                    margin-right: 8px;
                    font-size: 14px;
                    color: rgb(240, 20, 20)
                    }
                .old{
                    text-decoration: line-through;
                    font-size: 10px;
                    color:  rgb(147, 153, 159)
                    }
            }
                .cartcontrol-wrapper{
                    position: absolute;
                    right: 12px;
                    bottom: 12px;
                }
                .buy{
                    position: absolute;
                    right: 18px;
                    bottom: 18px;
                    z-index: 10;
                    height: 24px;
                    line-height: 24px;
                    padding: 0 12px;
                    box-sizing: border-box;
                    font-size: 10px;
                    border-radius: 12px;
                    color: #fff;
                    background: rgb(0,160,220);
                }
        }
        .info{
            padding: 18px;
            .title{
                line-height: 14px;
                margin-bottom: 6px;
                font-size: 14px;
                color: rgb(77,27,93);
            }
            .text{
                line-height: 24px;
                padding: 0 8px;
                font-size: 12px;
                color: rgb(77,85,93);
            }
        }
        .rating{
            padding-top: 18px;
            .title{
                line-height: 14px;
                margin-left: 18px;
                font-size: 14px;
                color: rgb(7,17,27)
            }
            .rating-wrapper{
                padding:  0 18px;
                .rating-item{
                    position: relative;
                    border-bottom: 1px solid rgba(7,17,27,.1);
                    .user{
                        position: absolute;
                        right: 0;
                        top: 16px;
                        font-size: 0;
                        line-height: 12px;
                        .name{
                            display: inline-block;
                            vertical-align: top;
                            font-size: 10px;
                            margin-right: 16px;
                            color: rgb(147,153,159);
                            .avatar{
                                border-radius: 50%;
                            }
                        }
                    }
                    .time{
                        margin-bottom: 6px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }
                    .text{
                        line-height: 16px;
                        font-size: 12px;
                        color: rgb(7,17,27);
                        .icon-thumb_up,.icon-thumb_down{
                            margin-right: 4px;
                            line-height: 16px;
                            font-size: 12px;
                        }
                        .icon-thumb_up{
                            color: rgb(0,160,220);
                        }
                        .icon-thumb_down{
                            color: rgb(147,153,159);
                        }
                    }
                }
                .no-rating{
                    padding: 16px 0;
                    font-size: 12px;
                    color: rgb(147, 153, 159)
                }
            }
        }

    }
    .food.foods-enter,.food.foods-leave{
        transform: translate3d(100%,0,0)
    }
</style>
