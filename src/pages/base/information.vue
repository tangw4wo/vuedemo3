<template>
  <el-row class="information">
    <div class="err" v-if="getContentErr"><span>404 </span>无法获取到相应的内容</div>
    <el-col class="tabs-left" :span="12" v-if="!getContentErr">
      <ul>
        <li v-for="(item,index) in content.leftList" :key="index" :class="{is_hot:item.hot}">
            <a href="" class="hot_title" v-if="item.hot">{{item.title}}</a>
            <span class="date" :class="{is_block:item.hot}">{{item.date}}</span>
            <a href="" class="content" :class="{is_text:item.hot}">{{item.content}}</a>
        </li>
      </ul>
      <a href="xxx" class="more">了解更多</a>    
      </el-col>
    <el-col class="tabs-right" :span="12" v-if="!getContentErr">
      <ul>
        <li v-for="(item,index) in content.rightList" :key="index" :class="{is_hot:item.hot}">
            <a href="" class="hot_title" v-if="item.hot">{{item.title}}</a>
            <span class="date" :class="{is_block:item.hot}">{{item.date}}</span>
            <a href="" class="content" :class="{is_text:item.hot}">{{item.content}}</a>
        </li>
      </ul>
      <a href="xxx" class="more">了解更多</a>      
    </el-col>
  </el-row>
</template>

<script>
export default {
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
        this.content=res.data.getNewsList
        this.getContentErr=false
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
.information{
  width: 1200px;
  margin: 0 auto;
  min-height:300px;
  li{
  list-style-type: none;
}
  ul{
  margin: 0;
  padding: 0;
  height: 312px;
}
.is_block{
  display: block;
  padding: 10px 0;
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
.is_hot{
  border-bottom:1px dashed rgb(199, 199, 199);
  padding-bottom:10px; 
}
  .tabs-right{
    padding: 30px 0 30px 36px;
    .is_text{
  display: block;
  text-indent: 24px;
  line-height: 24px;
  height: 80px;
}
  }
  .tabs-left{
    padding:30px 0 30px 20px;
    .is_text{
  display: block;
  text-indent: 24px;
  line-height: 24px;
  width: 92%;
  height: 80px;
}
  }
  .tabs-left,.tabs-right{
    text-align: left;
    .more{
     display: block;
     width: 90px;
     height: 23px;
     background: url("../../assets/images/more99_zk2h.png") no-repeat;
     font-size: 13px;
     color:white;
     text-decoration: none;
     line-height: 23px;
     padding-left:5px; 
     margin:50px 0;
    }
  .hot_title{
    width: 70%;
    display: block;
    font-size: 18px;
    color:rgba(0, 0, 211, 0.753);
    font-weight: bolder;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;

  }
  .content{
    font-size: 12px;
    color:#666;
    transition:color .5s ease;
    -moz-transition:color .5s ease;
    -o-transition: color .5s ease;
    -webkit-transition:color .5s ease;
    
    &:hover{
      color:rgba(28, 28, 240, 0.863)
    }
  }
  .date{
    font-size: 12px;
    color:#888
  }
  li{
    margin-bottom: 10px;
  }
}

}

</style>
