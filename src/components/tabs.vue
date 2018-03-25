<template>
  <el-row class="tabs">
       <el-col class="tabs_change">
                <span  v-for="(item,index) in newsList" :key="index" 
                class="tabs_change_item" 
                 >
                <router-link :to="{path:item.src}" active-class="is_active">{{item.value}}</router-link>
                </span>
                <div class="selected"
                :class="{is_active_II:tabs_activeName===firstSrc,is_active_III:tabs_activeName===lastSrc}"></div>
                <div class="details_title"></div>
            </el-col>
            <el-col>
                <keep-alive>
                <transition name="information_transform" mode="out-in">
                <router-view></router-view>
                </transition>
                </keep-alive>
            </el-col>
  </el-row>
</template>

<script>
export default {
    props:{
        newsList:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
            tabs_activeIndex:'',
            firstSrc:this.newsList[0].src,
            lastSrc:this.newsList[1].src
        }
    },
    computed:{
        tabs_activeName(){
            let path=this.$route.path;
            let name=path.split('/').pop();
            return name
        }
    },
    
}   
</script>

<style lang="less" scoped>
.transition(@args){
    transition:@args;
    -moz-transition:@args;
    -o-transition: @args;
    -webkit-transition:@args;
}
.tabs{
    text-align: center;
}
.tabs_change{
        margin-top:20px;
        position: relative;
        .is_active{
            color:red!important; 
        }
        .is_active_II{
            left:42.7%;
        }
        .is_active_III{
            left:52.35%
        }
        .tabs_change_item{
            margin: 0 30px;
            a{
            padding:10px 5px 20px 5px;
            font-size: 14px;
            text-decoration: none;
            color:#333;
            display: inline-block;
            .transition(color .5s ease)
            }
        }
        .selected{
            width: 66px;
            height: 3px;
            background:rgb(255, 136, 0);
            position: relative;
            .transition(all .75s ease);
            z-index: 10;
        }
    }
    .details_title{
        width: 100%;
        height:24px;
        background: url("../assets/images/detail_title.jpg");
        position: absolute;
        bottom: -1px;
    }
    .information_transform-enter-active{
        .transition(opacity .8s ease);
}
.information_transform-enter/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
