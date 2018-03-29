<template>
  <div class="app">
    <my-dialog :isShow="isLogShow"  @dialog-close="setDialogShow('isLogShow')"><logform :isfocus="isLogShow" @log-succeed="logchange" @jumpReg="gotoreg"></logform></my-dialog>
    <my-dialog :isShow="isRegShow"  @dialog-close="setDialogShow('isRegShow')"><regform @closeReg="regchange"></regform></my-dialog>
    <div class="app_head">
      <el-row class="head-inner">
        <el-col class="head_title">
          <span>欢迎访问海岛旅游度假渔家官方网站!</span>
          <span class="logReg" v-if="!logstatus">
            <p @click="dialogShow('log')">登陆</p>
            <p @click="dialogShow('reg')">注册</p>
          </span>
          <span class="userList" v-if="logstatus">
            <p>欢迎你!，<span class="username">{{userName}}</span></p>
            <p>|</p>
            <p class="closeLog" @click="LogOut">退出</p>
          </span>
        </el-col>
        <el-col class="logo" :span="10">
          <router-link :to="{path:'/information'}"  style="outline:none">
          <img src="../assets/logo.jpg" alt="logo" @click="Navrefresh">
          </router-link>
          </el-col>
        <el-col class="call" :span="4" :push="10">400-000-0000</el-col>
      </el-row>
      <div class="app_nav">
        <nav-bar :navlist="navList"  v-if="!navBarRefresh"></nav-bar>
      </div>
      <div class="search">
          <el-row class="search-inner">
             <el-col class="detalis" :span="6">这里的<span>海</span></el-col>
               <el-col class="search-bar" :span="18">
                    <div class="item">
                       <input type="text">
                       <button></button>
                  </div>
                   <ul>
                       <li class="top-search" @click="setSearch">住宿环境</li>
                       <li class="top-search" @click="setSearch">旅游攻略</li>
                   </ul>
               </el-col>
          </el-row>
          <div class="booking">
              <p>在这片海域</p>
              <p>我们提供<span>100+</span>以上的房间</p>
              <p>在这片海域</p>
              <p>我们提供赶海、日出、海浴、篝火、</p>
              <p>午餐、晚餐</p>
              <a href="xxx"></a>
          </div>
      </div>
      </div>
      <el-row class="app_content">
        <router-view></router-view>
      </el-row>
      <el-row class="app_footer">
        <el-col class="a">XXXXXX@xx.x.xx</el-col>
      </el-row>
  </div>
</template>
<script>
import navBar from "../components/navBar"
import dialog from "../components/dialog"
import logform from "../components/logform"
import regform from "../components/regform"
import {eventBus} from "../eventBus"
export default {
  components: {
    navBar,
    myDialog:dialog,
    logform,
    regform
  },
  data(){
    return{
      navList:[{value:"网站首页",src:"/"},{value:"关于我们",src:"/about"},{value:"海岛景色",src:"/island"},{value:"住宿环境",src:"/c"},
      {value:"海岛特产",src:"/d"},{value:"海岛美食",src:"/ms"},{value:"新闻中心",src:'/news'},{value:"预定客房",src:"/g"},
      {value:"联系我们",src:"/h"}],
      isLogShow:false,
      isRegShow:false,
      navBarRefresh:false,
      logstatus:false,
      userName:''
    }
  },
  methods:{
      LogOut(){
        //向服务器请求，清除掉对应的sessionid，不记录登陆状态
        this.$axios.post("/user/logOut").then((res)=>{
          if(res.data){
            this.logstatus=false;
            this.userName=''
          }
        }).catch((err)=>{
          if (process.env.NODE_ENV !== 'production') {
             console.log(err)
        }
         
        })
      },
      logchange(data){
        this.logstatus=true;
        this.userName=data
        setTimeout(()=>{
           this.setDialogShow('isLogShow')
        },3000)
      },
      regchange(data){
        this.logstatus=true;
        this.userName=data
        this.setDialogShow('isRegShow')
      },
      Navrefresh(){
        this.navBarRefresh=true;
        setTimeout(()=>{
          this.navBarRefresh=false
        },0)
      },
      gotoreg(){
        this.isLogShow=false;
        this.isRegShow=true;
      },
      setSearch(){
        let content = event.target.innerText
        this.test=content
      },
      dialogShow(value){
        if(value==='log'){
          this.isLogShow=true
        }else{
          this.isRegShow=true
        }
        
      },
      setDialogShow(attr){
        this[attr]=false;
      }
  },
  mounted(){
    //从服务器获取用户登陆状态
     this.$axios.post("api/user/Status").then((res)=>{
        if(res.data.loginStatus){
          this.logstatus=true
          this.userName=res.data.username
        }
    }).catch((err)=>{
      if (process.env.NODE_ENV !== 'production') {
             console.log(err)
        }
    })
  },
}
</script>

<style lang="less">
@bg:rgba(3, 3, 3, 0.39);
@TextColor:rgb(255, 196, 0);
*{
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
a{
  text-decoration: none;
}
a,p,span,li{
 font-family: "微软雅黑";
}
.titleStyle{
    margin: 0;
    color:#666;
    font-size:12px
}
.app{
  margin: 0 auto;
  width: 1297px;
  position: relative;
}
.head-inner{
  width: 90%;
  margin: 5px auto;
  .head_title{
  span{
    .titleStyle
  }
  }
  .logReg{
    float: right;
   p{
     .titleStyle;
     opacity: .6;
     display: inline-block;
     line-height: 20px;
     margin-left:10px;
     cursor: pointer;
     transition:opacity .5s ease;
     -moz-transition: opacity .5s ease;
     -o-transition: opacity .5s ease;
     -webkit-transition: opacity .5s ease;
     &:hover{
       opacity: 1;
     }
   }
  }
  .userList{
     float: right;
   p{
     .titleStyle;
     opacity: .6;
     display: inline-block;
     line-height: 20px;
     margin-left:10px;
     cursor: pointer;
     transition:opacity .5s ease;
     -moz-transition: opacity .5s ease;
     -o-transition: opacity .5s ease;
     -webkit-transition: opacity .5s ease;
     &:hover{
       opacity: 1;
     }
   }
  }
  .logo{
    margin-top: 10px;
  }
  .call{
    height: 100px;
    line-height: 100px;
    font-size:20px;
    font-weight: bold;
    color:#29568d;
    text-align: right;
    background: url(../assets/images/icon01_gza6.png) no-repeat 25px center;
  }
}
.search{
    height: 500px;
    background: url("../assets/images/banner01_wibj.jpg") no-repeat;
    background-size:100% 100%;
    position: relative;
    .booking{
        width: 24%;
        height: 45%;
        background:@bg;
        position:absolute;
        top:120px;
        right: 150px;
        padding:0 0 0 15px;
        p{
            color:white;
            font-weight: 500;
            margin: 12px 0;
            span{
                color:@TextColor;
            }
        }
        a{
            display: inline-block;
            width: 95%;   
            height: 50px;
            background: url("../assets/images/create_hg5b.png");
            background-size:100% 100%;
        }
    }
    .search-inner{
        width:30%;
        height: 95px;
        background:@bg;
        position:absolute;
        top:180px;
        left:345px;
        .detalis{
            font-size: 20px;
            font-weight:bolder;
            color:white; 
            display: inline-block;
            height: 100%;
            margin: 0;
            padding-left:8px;
            line-height: 95px;
            background: rgba(0, 0, 0, 0.192);
            span{
            color:@TextColor;
        }
        }
        .search-bar{
            height: 100%;
            display:inline-block;
            text-align: center;
            .item{
                width: 85.82%;
                height: 28px;
                margin: 20px 0 10px 20px;
            }
            input{
                width:81.56%;
                height:28px;
                border:0;
                outline: 0;
                float: left;
                padding: 5px;
            }
            button{
                float:left;
                outline: 0;
                width:18.42%;
                height: 28px;
                border:0;
                cursor: pointer;
                background:url(../assets/images/bg0.jpg) no-repeat;
            }
            ul{
                margin: 0 0 0 20px;
                padding: 0;
                width: 212.45px;
            }
            .top-search{
                float:left;
                list-style-type: none;
                margin-right: 10px;
                color:white;
                font-size: 14px;
                cursor: pointer;
                &:hover{
                  text-decoration: underline
                }
            }
        }
    }
}
.app_footer{
  height: 100px;
  background:black;
  text-align: center;
  line-height: 100px;
  .a{
    color:white;
    font-size: 12px
  }
}
</style>
