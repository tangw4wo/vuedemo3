<template>
   <el-row class="content">
          <el-col :span="24" class="nav">
            <ul class="nav-menu">
              <li v-for="(item,index) in navlist" :key="index" class="nav-menu-item" 
              @click="changeItem(item.src)"
              ><router-link :to="{path:item.src}" :class="{iSactive:item.src===activeIndex}" style="outline:none">{{item.value}}</router-link></li>
            </ul>
            <div class="selected" :class="change"></div>
        </el-col>
  </el-row>
</template>
<script>
export default {
    props:{
        navlist:{
            type:Array,
            default:[]
        }
    },
    data(){
        return{
             activeIndex:'/'
        }
    },
    methods:{
    changeItem(src){
      this.activeIndex=src; 
    },
  },
  computed:{
    change(){
      let src;
      let isactive = 'isactive-' 
      if(this.activeIndex === '/'){
        src = 'index'
      }else{
        src=this.activeIndex.replace(/\/+/,'')
      }
      return isactive+src
    }
  },
  watch:{
    "$route"(val,oldval){
      if(val.path==='/information' || val.path==='/strategy'){
        this.activeIndex='/'
      }else if(val.path==='/news/zx' || val.path==='/news/gl'){
        this.activeIndex='/news'
      }else{
        this.activeIndex=val.path
      }
    }
  },
  created () {
    //监听当前路由地址并且将滑块移动到相应位置
    let src =this.$route.path.match(/\/[a-zA-z]+/).pop()
    if(src==='/information' || src === '/strategy'){
          return 
    }else{
      this.activeIndex =src;
    }
  }
}
</script>
<style lang="less" scoped>
.content{
.isactive-index{
  left:4%
}
.isactive-about{
  left:14%
}
.isactive-island{
  left:24.5%
}
.isactive-c{
  left:34.6%
}
.isactive-d{
   left:44.8%
}
.isactive-ms{
   left:55%
}
.isactive-news{
   left:65.2%
}
.isactive-g{
   left:75.5%
}
.isactive-h{
   left:85.7%
}
.transition(@args){
  transition:@args;
  -moz-transition: @args;
  -o-transition: @args;
  -webkit-transition: @args;
}
.iSactive{
    color:yellow !important;
  }
  .nav{
    background:url(../assets/images/top-bg.jpg) 0% 100%;
    height: 60px;
    position: relative;
    .selected{
        width:133px;
        height: 3px;
        background: yellow;
        position: absolute;
        bottom:0;
        .transition(all 1s ease)
      }
    .nav-menu{
      width: 92%;
      height: 100%;
      margin: 0 auto;
      padding: 0;
    }
    .nav-menu-item{
      list-style-type: none;
      display:inline-block;
      width:100%/9px;
      text-align: center;
      height: 100%;
      line-height: 60px;
      outline: 0;
      a{
       
        width: 100%;
        height: 100%;
        padding:0 20px;
        display: inline-block;
        text-decoration: none;
        font-size:15px;
        color:white;
        .transition(color .5s ease);
        &:hover{
        color:rgba(255, 255, 255, 0.418);
      }
    }
    }
  }
  }
</style>
