<template>
    <div class="cartcontrol">
        <div class="cart-decrease icon-remove_circle_outline" @click.stop.prevent='decrease' v-show="food.count > 0"></div>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    props:{
        food:{}
    },
    methods:{
        addCart(event){  //event._constructed是在better-scroll里面才有的
            if(!event._constructed){
                return;
            }
            console.log(111 )
            //当给对象添加一个他本身不存在的字段的时候(这里的count属性在food是不存在的)，我们直接去赋值是可以的，
            //他的defineproperty是检测不到这个属性的变化的，所以想要他能够观察到这个变化
            //我们需要用到vue的一个接口，
            if(!this.food.count){
                Vue.set(this.food,'count',1)  //给food添加count这个属性
                console.log(this.food)
            }else{
                this.food.count++
                console.log(this.food)
            }
        },
        decrease(event){
            if(!event._constructed){
                return;
            }
            if(this.food.count){
                this.food.count--
            }
        }
    }
}
</script>

<style lang="less">
    .cartcontrol{
        .cart-decrease, .cart-add{
            display: inline-block;
            padding: 6px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220)
        }
        .cart-count{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159)
        }
        .cart-add{
            display: inline-block;

        }
    }
</style>