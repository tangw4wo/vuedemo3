<template>
  <div>
      <div class="dialog-wrap">
        <div class="dialog-cover" @click="close"  v-if="isShow"></div>
        <transition name="drop">
          <div class="dialog-content" v-if="isShow">
              <p class="dialog-close" @click="close">x</p>
              <slot>我是登陆界面</slot>
          </div>
        </transition>
      </div>
  </div>
</template>

<script>
import {eventBus} from "../eventBus"
export default {
    props:{
        isShow:{
            type:Boolean,
            default:false
        },
     
    },
    methods:{
        close(){
            this.$emit('dialog-close')
        },
    }
}
</script>

<style lang="less" scoped>
.drop-enter,.drop-leave-to{
    opacity: 0;
    transform: translateY(-50%)
}
.drop-enter-active{
    transition: all .5s ease;
}
.drop-leave-active{
    transition: all .3s ease;
}
.dialog-warp{
    position: fixed;
    width: 100%;
    height: 100%
}
.dialog-cover{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    background: #000;
    opacity: .3;
    z-index:10
}
.dialog-content{
    width: 537px;
    position: fixed;
    top: 20%;
    left: 30%;
    z-index: 20;
    border-radius: 5px;
    background: white;
    border:1px solid rgba(28, 28, 228, 0.438);
    .dialog-close{
        position: absolute;
        width: 50px;
        height: 50px;
        line-height: 50px;
        opacity: .4;
        font-size: 25px;
        margin: 0;
        text-align: center;
        top:0;
        right:0;
        cursor: pointer;
    }
}
</style>
