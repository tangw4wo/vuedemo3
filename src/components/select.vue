<template>
  <div class="select">
      <div class="select-show" @click="toggle">
          <span>{{nop}}人</span>
          <div class="arrow"></div>
      </div>
      <div class="opation-list" v-if="isShow" @mouseover="changfocus">
          <ul>
          <li v-for="(item,index) in maxnum"
           :key="index" class="opation-list-item"
            @click="select(item)"
            :class="{isactive:isfocus && index+1===nop}" 
            >{{item}}人</li>
          </ul>
      </div>
  </div>
</template>
<script>
import {eventBus} from "../eventBus"
export default {
    props:{
        maxnum:{
            type:Number,
            default:4
        }
    },
    data(){
        return{
            nop:1,
            isShow:false,
            isfocus:false
        }
    },
    methods:{
        toggle(){
            event.stopPropagation()
            this.isShow=!this.isShow
            this.isfocus=!this.isfocus
        },
        select(item){
            this.nop=item
            this.isShow=false
            this.$emit('on-change',this.nop)
        },
        changfocus(){
            this.isfocus=false;
        }
    },
    mounted(){
        eventBus.$on('reset-component',()=>{
            this.isShow=false
        })
    }
}
</script>

<style lang="less" scoped>
.isactive{
     background:#1e90ff!important;
     color:white;
}
.select{
    width: 35%;
    background: white;
    position: relative;
    user-select: none;
    .arrow{
        display: inline-block;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid #555;
        width: 0;
        height: 0;
        margin-top: -1px;
        margin-left: 120px;
        // margin-right: -50px;
        vertical-align: middle;
    }
    .select-show{
        padding-left:5px; 
        height: 30px;
        line-height: 30px;
    }
    .opation-list{
        width: 100%;
       
        position: absolute;
        z-index:10;
        left:0;
        border:1px solid #7b9dd4;
    }
    ul{
        margin: 0;

        padding: 0
    }
    .opation-list-item{
        list-style-type: none;
        background: white;
        cursor: pointer;
        display: block;
        padding:2px 0 2px 5px;
        &:hover{
            background:#1e90ff;
            color:white;
        }
    }
}
</style>
