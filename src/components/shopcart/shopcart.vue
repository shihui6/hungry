<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper" >
                        <div class="logo" :class="{'highlight': totalCount > 0}">
                            <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight': totalCount > 0}">￥{{totalprice}}元</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="list_content">
                        <ul>
                            <li class="food" v-for="food in selectFoods" :key="food">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list_masks"  @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
    props:{
        selectFoods:{
            default(){
                return [
                    {
                        price:10,
                        count:2
                    }
                ]
            }
        },
        deliveryPrice:{
            default:0
        },
        minPrice:{
            default:0
        }
    },
    data(){
        return{
            fold:true,
        }
    },
    components:{
        cartcontrol
    },
    computed:{
        totalprice(){
            let total = 0;
            this.selectFoods.forEach((food)=>{
                total += food.price * food.count
            })
            return total;
            // 实现添加到购物车实现小球飞入的功能
                // 1将子组件的dom元素传给父组件
                // 2父组件再调用方法，把target方法传递给子组件
                // 然后就可以拿到组件的位置了
        },
        totalCount(){
            let count = 0;
            this.selectFoods.forEach((food)=>{
                count += food.count;
            })
            return count;
        },
        payDesc(){
            if(this.totalprice ===0 ){
                return `￥${this.minPrice}元起送`
            }else if(this.totalprice < this.minPrice){
                let diff = this.minPrice - this.totalprice
                return `还差￥${diff}起送`
            }else{
                return '去结算'
            }
        },
        payClass(){
            if(this.totalprice < this.minPrice){
                return 'not-enough'
            }else{
                return 'enough'
            }
        },
        listShow(){
            if(!this.totalCount){
                this.fold = true
                return false
            }
            let show = !this.fold
            if(show){
                this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.list_content,{
                            click:true
                        })
                    }else{
                        this.scroll.refresh() //当dom元素高度发生变化的时候就启动refresh这个接口
                    }
                })
            }
            return show;
        }

    },
    methods:{
        toggleList(){
            if(!this.totalCount){
                return
            }
            this.fold = !this.fold
        },
        empty(){
            this.selectFoods.forEach((food)=>{
                food.count = 0
            })
        },
        hideList(){
            this.fold = true
        },
        pay(){
            if(this.totalprice < this.minPrice){
                return
            }
            window.alert(`需要支付${this.totalprice}`)
        }
    }
    
}
</script>

<style lang="less">
    .shopcart{
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 68px;
        // background: black;
        .content{
            display: flex;
            background-color: #141d27;
            .content-left{
                flex: 1;
                .logo-wrapper{
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 69px;
                    height: 69px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background-color: #141d27;
                    .logo.highlight{
                        background:rgb(0, 160, 220)                      
                    }
                    .logo{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        text-align: center;
                        background: #2b343c;
                        .icon-shopping_cart.highlight{
                            color: #fff;
                        }
                        .icon-shopping_cart{
                            line-height: 58px;
                            font-size: 31px;
                            color: #80858a;
                        }
                    }
                    .num{
                        top: 0;
                        right: 0;
                        position:absolute;
                        width: 24px;
                        height: 16px;
                        text-align: center;
                        line-height: 16px;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color: #fff;
                        background: rgb(240, 20, 20);
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4)
                    }
                }
                .price.highlight{
                    color: #fff;
                }
                .price{
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin-top: 12px;
                    padding-right: 12px;
                    box-sizing: border-box;
                    border-right: 1px solid rgba(255, 255, 255, .1);
                    font-size:16px;
                    color: rgba(255, 255, 255, .4);
                    font-weight: 700;

                }
                .desc{
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    margin: 12px 0 0 12px;
                    color: rgba(255, 255, 255, .4);
                    font-size: 10px;
                }
            }
            .content-right{
                flex: 0 0 105px;
                width: 105px;
                .pay{
                    font-size: 16px;
                    height: 67px;
                    text-align: center;
                    line-height: 69px;
                    color: rgba(255, 255, 255, 0.4);
                    font-weight: 700;
                    background: #2b333b;
                }
                .pay.not-enough{
                    background: #2b333b
                }
                .pay.enough{
                    background: #00b433;
                    color: #fff;
                }
            }
        }
        .shopcart-list.fold-enter-active,.shopcart-list.fold-leave-active{
            transition: all .5s    //设计进入和离开都是0.5秒
        }
        .shopcart-list.fold-enter,.shopcart-list.fold-leave-active{
            transform: translate3d(0,0,0)  
        }
        .shopcart-list{
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            transform: translate3d(0,-100%,0);  //转化之后最终的状态
            .list-header{
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
                .title{
                    float: left;
                    font-size: 14px;
                    color: rgb(7, 17, 27)
                }
                .empty{
                    float: right;
                    font-size: 14px;
                    color: rgb(0, 160, 220)
                }
            }
            .list-content{
                padding:  0 18px;
                max-height: 217px;
                background: #fff;
                overflow: hidden;
                .food{
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgba(7, 17, 27, .1)
                }
                .name{
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27)
                }
                .price{
                    position: absolute;
                    right: 90px;
                    bottom: 7px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: red;
                }
                .cartcontrol-wrapper{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
            }
        }
    }
    .list_masks{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        backdrop-filter:blur(10px);
        opacity: 1;
        background: rgba(7, 17, 27, 0.6)
    }
    .list_masks.fade-enter-active,.list_masks.fade-leave-active{
        transition: all .5s;
    }
    .list_masks.fade-enter,.list_masks.fade-leave-active{
        opacity: 0;
        background: rgba(7, 17, 27, 0);
    }
</style>
