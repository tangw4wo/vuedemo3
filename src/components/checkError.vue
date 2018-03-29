<template>
<transition name="drop">
  <div class="checkError" v-if="isShow" >
      <el-row class="error-warp">
         <span  :class="{error:isError.error}">{{text()}}</span>
      </el-row>
  </div>
  </transition>
</template>
<script>
export default {
    props:{
        isShow:{
            type:Boolean,
            default:false
        },
        isError:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            errorText:'',
            timer:null
        }
    },
    methods:{
        check_content(){
             this.timeout=setTimeout(()=>{
                this.$emit('on-close')
            },3000)
        },
        text(){
            this.check_content();
            return this.isError.text
        }
    }
}
</script>
<style lang="less" scoped>
.error{
         color:rgba(21, 255, 0, 0.829)!important;
    }
.checkError{
    width: 100%;
    line-height: 50px;
    position: absolute;
    top:15%;
    span{
        display: inline-block;
        background-color: #fff;
        padding:15px 20px;
        color:rgba(255, 0, 0, 0.829);
        border-radius: 5px;
        opacity: .8;
    }
}
.drop-enter,.drop-leave-to{
    transform: translateY(-500px);
    opacity: 0;
}
.drop-enter-active{
    transition:all .8s ease
}
.drop-leave-active{
    transition:all .5s ease
}
</style>
