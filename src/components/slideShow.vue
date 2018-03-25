<template>
  <el-col el-col class="slideShow">
          <transition-group :name="transitionName" tag="ul" mode="out-in">
          <li v-for="(item,index) in slideList" :key="index" v-if="index===activeitem[0]">
              <a :href="item.herf">
                  <img :src="item.img" :alt="item.name">
                  <p>{{item.name}}</p>
              </a>
          </li>
          </transition-group>
          <transition-group :name="transitionName" tag="ul" mode="out-in">
          <li v-for="(item,index) in slideList" :key="index" v-if="index===activeitem[1]">
              <a :href="item.herf">
                  <img :src="item.img" :alt="item.name">
                  <p>{{item.name}}</p>
              </a>
          </li>
          </transition-group>
          <transition-group :name="transitionName" tag="ul" mode="out-in">
          <li v-for="(item,index) in slideList" :key="index" v-if="index===activeitem[2]">
              <a :href="item.herf">
                  <img :src="item.img" :alt="item.name">
                  <p>{{item.name}}</p>
              </a>
          </li>
          </transition-group>
      <div class="prev" @click="change('n')"></div>
      <div class="next" @click="change('p')"></div>
  </el-col>
</template>

<script>
export default {
    props:{
    slideList:{
        type:Array,
        default:[]
    }
    },
    data(){
        return{
            activeitem:[0,1,2],
            flag:true,
            transitionName:""
        }
    },
    methods:{
         change(np){
             if(!this.flag){
                 retrun 
             }
             this.flag=!this.flag
             this.invId=setTimeout(()=>{
                 this.flag=!this.flag
                 clearTimeout(this.invId)
             },1000)
            if(np === 'n'){
                this.transitionName="left"
            this.activeitem=this.activeitem.map((item)=>{
               if(item===3){
                  return item=0
               }else{
                  return item+=1
               }
                })
            }else{
             this.transitionName="right"                   
             this.activeitem=this.activeitem.map((item)=>{
               if(item===3){
                  return item=0;
               }else{
                  return item+=1;
               }
                })   
            }

    }
}
}
</script>

<style lang="less" scoped>
.transition(@args){
    transition:@args;
    -moz-transition:@args;
    -o-transition: @args;
    -webkit-transition:@args;
}
.transform(@args){
    transform: @args;
    -moz-transform: @args;
    -ms-transform: @args;
    -o-transform: @args;
    -webkit-transform: @args;
}
.absolute{
    position: absolute;
}
.pointer{
    cursor: pointer;
}
.slideShow{
    position: relative;
    ul{
        position:relative;
        width: 22%;
        margin: 0 auto;
        padding: 0;
        display:inline-block;
        margin: 0 25px;
        height: 430px;
        overflow: hidden;
    }
    li{
        position: absolute;
        left:0;
        list-style-type: none;
        display:inline-block;
        width:100%;
        height: 430px;
    }
    .prev{
        .pointer;
        &:extend(.absolute);
        bottom:40%;
        left:80px;
        width:41px;
        height: 99px;
        background:url("../assets/pic/light_img_ws3y.png")
    }
    .next{
        .pointer;
        &:extend(.absolute);
        bottom:40%;
        right:80px;
        width:41px;
        height: 99px;
        background:url("../assets/pic/right_img_0l1z.png")
    }
    a{
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        p{  
            &:extend(.absolute);
            top:20px;
            left:20px;
            width: 90%;
            height: 60px;
            border:2px solid white;
            line-height: 60px;
            color:white;
            font-weight: bold;
            
        }
        img{
            width: 100%;
            height: 100%;
        }
    }

//right
.right-enter-active,.right-leave-active{
    .transition(all 1s ease)
   }

.right-enter{
    .transform(translateX(335px))
}
.right-leave-to{
    .transform(translateX(-335px))
}
//left
.left-enter-active,.left-leave-active{
    .transition(all 1s ease);
   }

.left-enter{
    .transform(translateX(-335px))
}
.left-leave-to{
    .transform(translateX(335px))
}

}
</style>
