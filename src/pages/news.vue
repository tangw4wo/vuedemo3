<template>
  <el-row class="news">
      <el-col class="news-title">
        <p class="left">新闻<span>中心&nbsp;ISLAND&nbsp;NE</span>WS</p>
        <p class="right"><span>新闻和攻略给你最好的优惠，给您最好的</span>旅游方法！</p>
      </el-col>
      <el-col class="news-content"><tabs :newsList="newsList"></tabs></el-col>
     
  </el-row>
</template>
<script>
import tabs from "../components/tabs"
export default {
    components: {
        tabs
    },
    data(){
        return {
            newsList:[{value:'渔家资讯',src:'zx'},{value:'旅游攻略',src:'gl'}]
        }
    }
}
</script>

<style lang="less">
.news{
    .news-title{
            height: 280px;
            background: url('../assets/images/channel1title_5kw9.png') no-repeat center 40%;
            position: relative;
            span{
                border-bottom: 1px solid rgb(173, 5, 5);
            }
            p{
                margin: 0;
            }
            .left{
                position: absolute;
                left:29.5%;
                top:33%;
                font-size: 25px;
                color:rgb(173, 5, 5);
                font-weight:bolder;
            }
            .right{
                position: absolute;
                left:51%;
                top:50%;
                font-size: 14px;
                color:rgb(145, 41, 41);
            }
         }
         .news-content{
             height: 400px;
         }
}
</style>
