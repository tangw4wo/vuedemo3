<template>
<div class="gl-wrap">
  <div class="err" v-if="getContentErr"><span>404 </span>无法获取到相应的内容</div>
  <el-row class="gl-cover" v-if="!getContentErr">
    <el-col v-for="(item,index) in content" :key="index"  class="gl-item" v-if="!item.hot">
          <el-col :span="2" class="gl-title"><a href="">[渔家资讯 ]</a></el-col>
          <el-col :span="20" class="gl-content"><a href="">{{item.content}}</a></el-col>
          <el-col :span="2" class="gl-date">{{item.date}}</el-col>
    </el-col>
    </el-row>
</div>
</template>
<script>
export default{
  data(){
      return{
        content:'',
        getContentErr:false
      }
    },
  methods:{    
    getData(){
      this.$axios.get('api/getNewsList')
      .then((res)=>{
        this.getContentErr=false
        this.content=res.data.getNewsList.leftList
      })
      .catch((error)=>{
        this.getContentErr=true
        if (process.env.NODE_ENV !== 'production') {
             console.log(error)
        }
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
.gl-wrap{
  min-height: 300px;
}
.err{
  position: absolute;
  top:50%;
  color:#666;
  font-size:25px;
  left: 38%;
  span{
    color:red
  }
}
.gl-cover{
  .gl-item{
    height: 40px;
    line-height: 40px;
   .gl-content,.gl-date{
      text-align:left
    }
    .gl-title{
      text-align: right;
      a{
        .a(rgb(185, 4, 4),13px)
      }
    }
    .gl-content{
      padding-left:20px;
      a{
        .a(rgb(40, 40, 170),13px)
      }
    }
    .gl-date{
      .a(rgba(153, 153, 153, 0.76),12px)
    }
  }
}
</style>
