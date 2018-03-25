<template>
  <el-row class="zx-wrap">
    <el-col v-for="(item,index) in content" :key="index"  class="zx-item" v-if="!item.hot">
          <el-col :span="2" class="zx-title"><a href="">[渔家资讯 ]</a></el-col>
          <el-col :span="20" class="zx-content"><a href="">{{item.content}}</a></el-col>
          <el-col :span="2" class="zx-date">{{item.date}}</el-col>
    </el-col>
    </el-row>
</template>
<script>
export default {
  data(){
      return{
        content:'没有获取到相应数据',
        newsList:[]
      }
    },
  computed:{
    check(){
      this.content_left=this.content.leftList
    }
  },
  methods:{    
    getData(){
      this.$axios.get('/getNewList')
      .then((res)=>{
        console.log(res.data)
        this.content=res.data.getNewsList.leftList
      })
      .catch((error)=>{
        console.log(error)
      })
      
    }
  },
  mounted(){
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.a(@c,@s){
  color:@c;
  font-size:@s
}
.zx-wrap{

  .zx-item{
    height: 40px;
    line-height: 40px;
   .zx-content,.zx-date{
      text-align:left
    }
    .zx-title{
      text-align: right;
      a{
        .a(rgb(185, 4, 4),13px)
      }
    }
    .zx-content{
      padding-left:20px;
      a{
        .a(rgb(40, 40, 170),13px)
      }
    }
    .zx-date{
      .a(rgba(153, 153, 153, 0.76),12px)
    }
  }
}
</style>
