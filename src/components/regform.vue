<template>
    <div>
        <div class="regform-wrap" v-if="!resErr">
            <div class="regTitle">注册会员</div> 
            <div class="reg-phone">
                <div class="country-phone-covers" :class="{isErr:!userstatus.phone && isphoerr}">
                    <span class="phone-region" @click="openPhoneList">{{user.region}}<span class="arrowo"></span></span>
                    <input type="text" class="user-phone"
                    @blur="errstatus('pho')" 
                    placeholder="手机号" maxlength="12" v-model.trim="user.phone">
                </div>
                <div class="err">{{phoneerr}}</div>
            </div>
            <div class="country-phone-list" v-if="phonelist">
                   <span class="phone-list-title">请选择区号</span>
                   <span class="phone-list-close" @click="closePhoneList">X</span>
                   <div class="phone-list-warning" v-if="list===''" :class="{phone_list_loading:listerr===''}">{{listerr}}</div>
                   <ul class="list-item-cover">
                       <li v-for="(item,index) in list" :key=index class="country-phone-list-item" @click="getRegion(item.phone)">
                           <div class="item-covers">
                               <span class="item-country">{{item.country}}</span>
                               <span class="item-phone">{{item.phone}}</span>
                           </div>
                       </li>
                   </ul>
                </div>
            <drag @users-live="checkuserstatus" @drag-refresh="refresh" v-if="!dragrefresh"></drag>
            <div class="refresh-loading" v-if="dragrefresh"></div>
            <div class="reg-password" v-if="userstatus.status">
                <input type="password" class="user-password" maxlength="20" placeholder="请输入密码，最少10位数" v-model.lazy.trim="user.pw" @blur="errstatus('pw')" :class="{isErr:!userstatus.pw && ispwerr}">
                <input type="password" class="againpassword" maxlength="20" placeholder="再一次输入密码" v-model.lazy.trim="againpw" :class="{isErr:!userstatus.pw && againpwerr}" @blur="errstatus('apw')">
                <div class="err">{{pwerr}}</div>
            </div>
            <div class="reg-btn">
                <input type="button" disabled value="注册" ref="regbtn" @click="subRegform" :class="{btnactive:setDisa}"> 
            </div>
        </div>
        <div class="regjump" v-if="resErr">
            注册成功，正在跳转...
        </div>
    </div>
</template>
<script>
import {eventBus} from "../eventBus"
import drag from '../components/drag'
export default {
    components: {    
         drag,
    },
    data(){
        return{
            //添加注册按钮样式
            setDisa:false,
            //判断密码验证状态
            ispwerr:false,
            //判断手机号码验证状态
            isphoerr:false,
            //所有项目的状态
            userstatus:{phone:false,status:false,pw:false},
            //再一次输入密码内容
            againpw:'',
            //再一次输入密码错误状态
            againpwerr:false,
            //用户账号密码信息
            user:{phone:'',pw:'',region:'+86'},
            //刷新组件的显示控制
            dragrefresh:false,
            //手机区号列表显示
            phonelist:false,
            //等待服务器响应过程
            loadingProcedure:false,
            //服务器响应结果
            resErr:false,
            resErrText:'',
            //区号框控制
            list:'',
            listerr:'',
      }
    },
    computed:{
        phoneerr(){
            if(this.user.phone==='' && !this.isphoerr){
                this.resErrText=''
                this.userstatus.phone=false
                return;
            }
            if(this.user.phone==='' && this.isphoerr){
                this.resErrText=''
                this.userstatus.phone=false
                return '请输入您的手机号码'
            }
            if(!/^1[3-8][\d]{9}$/.test(this.user.phone)){
                this.resErrText=''
                this.isphoerr=true
                this.userstatus.phone=false
                return '请填写正确的手机号码'
            }
            if(!this.resErr && this.resErrText!==''){
                this.isphoerr=true
                this.userstatus.phone=false
                return this.resErrText
            }
            this.isphoerr=false;
            this.userstatus.phone=true
            this.regbtnShow()
        },
        pwerr(){
            if(this.user.pw==='' && !this.ispwerr){
                this.userstatus.pw=false;
                this.againpwerr=false;
                return;
            }
            if(this.user.pw==='' && this.ispwerr){
                this.userstatus.pw=false;
                return '请填写您的密码'
            }
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{10,15}$/.test(this.user.pw)){
                this.ispwerr=true;
                this.againpwerr=false;
                this.userstatus.pw=false;
                return '密码不能只包含数字或字母，且不能包含特殊字符'
            }else{
                this.ispwerr=false;
            }
            if(this.againpw==='' && !this.againpwerr){
                this.userstatus.pw=false;
                return;
            }
            if(this.user.pw===this.againpw){
                this.regbtnShow()
                this.againpwerr=false
                this.userstatus.pw=true;
            }else{
                this.againpwerr=true
                this.userstatus.pw=false;
                return '两次输入的密码不一致'
            }
        }
    },
    methods: {
        getRegion(item){
            this.user.region=item
            this.closePhoneList()
        }
        ,        
        openPhoneList(){
            this.phonelist=true
            if(this.list===''){
                this.getPhoneList()
            }
        },
        closePhoneList(){
            this.phonelist=false
        },
        getPhoneList(){
            this.$axios.get('api/phonelist').then((res)=>{
                this.list=res.data.phoneList
            }).catch((err)=>{
                if (process.env.NODE_ENV !== 'production') {
                    console.log(err)
                }
                this.listerr="获取列表失败，请关闭重试"
            })
        }
        ,
        subRegform(){
            this.loadingProcedure=true;
            this.$axios.post('api/user/reg',JSON.stringify(this.user)).then((res)=>{
                this.loadingProcedure=false;
                let data = res.data
                if(!data.err){
                    this.resErr=true;
                }else{
                    this.resErrText=data.text
                }
            }).catch((err)=>{
                if (process.env.NODE_ENV !== 'production') {
                 console.log(err)
                }
            })
        }
        ,
        refresh(){
            this.dragrefresh=true;
            //改成向服务器请求回调
            setTimeout(()=>{
                this.dragrefresh=false
            },1000)
        },
        regbtnShow(){
          for(let i in this.userstatus){
              if(!this.userstatus[i]){
                  this.$refs.regbtn.disabled=true
                  this.setDisa=false
                  return false;
              }
              
          }
          this.$refs.regbtn.disabled=false
          this.setDisa=true
        },
        errstatus(err){
            if(err==='pho'){
              this.isphoerr=true            
            }
            if(err==='pw'){
              //当密码已经通过验证就不在继续执行
              if(!this.ispwerr && this.user.pw!==''){
                  return;
              }
              this.ispwerr=true     
            }
            if(err==='apw'){
              if(!this.ispwerr && this.user.pw!==''){
                  this.againpwerr=true;              
              }
              if(!this.ispwerr && this.user.pw===''){
                    this.ispwerr=true
              }
            }
            
        },
        checkuserstatus(){
            this.userstatus.status=true;
            this.isphoerr=true
            this.regbtnShow()
        },
    },
    watch:{
        resErr(val,oldval){
            setTimeout(()=>{
                this.$emit('closeReg',this.user.phone)
            },3000)
        }
    }
}
</script>

<style lang="less" scoped>
.isErr{
    border:1px solid red!important
}
.btnactive{
      background: rgb(77, 77, 226);
      opacity: 1;
      color:white
}
.regjump{
    width: 100%;
    height:400px;
    color:#409EFF;
    font-size: 25px;
    text-align: center;
    line-height: 400px;
}
.regform-wrap{
    width: 100%;
    height:400px;
    padding: 0 130px;
    
    .regTitle{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        height: 80px;
        line-height: 80px;
        border-radius: 5px;
        color:#666;
    }
    .err{
        padding: 10px 0;
        font-size: 12px;
        color:red;
    }
    .refresh-loading{
        height: 30px;
        background: url('../assets/5-121204193R5-50.gif') no-repeat center center;

        background-size:25px 25px;
    }
   
    .country-phone-covers{
        border-radius: 5px;
        &::before,&::after{
                content:" ";
                display:block;
                clear:both;
            }
        .phone-region{
            padding-left:10px;
            width:70px;
            float: left;
            color:#666;
            line-height: 42px;
            height: 100%;
            font-size: 13px;
            cursor: pointer;
            
        }
        .arrowo{
            display: inline-block;
            border-left:5px solid transparent; 
            border-right:5px solid transparent;
            border-top: 6px solid #666;
            width: 0;
            height: 0;
            margin-top: -3px;
            margin-left: 10px;
            margin-right: -14px;
            vertical-align: middle;
        }
        .user-phone{
            float: left;
            font-size: 14px;
            border:0;
            color:#777;
            padding: 0 10px;
            height: 42px;
            line-height: 42px;
            border-radius: 5px;
            outline: 0;
        }
    }
     .reg-password{
         .user-password,.againpassword{
             width: 275px;
             outline: 0;
             border:0;
             color:#777;
             padding-left:105px;
             font-size: 13px;
             height: 42px;
             margin-top:10px;
             border-radius: 5px;
         }
     }
     .reg-btn{
         margin-top:10px;
         width: 275px;
         height: 50px;
         input{
             width: 100%;
             height: 100%;
             font-size:20px;
             border:0;
             outline: 0;
             opacity: .5;
             border-radius: 5px;
         }
     }
      .country-phone-list{
        user-select: none;
        position: absolute;
        background: white;
        max-height: 300px;
        width: 300px;
        padding: 20px 5px 0 20px;
        z-index:30;
        border-radius: 5px;
        border: 1px solid #999;
        left:23%;
        top:5%;
        font-size:13px;
        color:#444;
        .list-item-cover{
             max-height: 250px;   
             overflow:auto;
             padding: 0;
             margin: 0;
             padding-right: 10px;
        &::-webkit-scrollbar{
            width: 4px;
            height: 4px;
        }
        &::-webkit-scrollbar-track{  
            background: #f6f6f6;  
            border-radius:2px;  
        }
        &::-webkit-scrollbar-thumb{  
            border-radius:2px;  
        }
        &::-webkit-scrollbar-thumb:hover{  
            background: #999;  
        }
        &::-webkit-scrollbar-corner{  
            background: #f6f6f6;  
        }        
        }
    }
    .phone_list_loading{
        background: url('../assets/5-121204193R5-50.gif') no-repeat 120px center;
    }
    .phone-list-warning{
        font-size: 14px;
        color:#666;
        height: 50px;
        line-height: 50px;
        text-align: center
    }
     .phone-list-title{
         display: inline-block;
         margin-bottom:10px;
     }
     .phone-list-close{
         position: absolute;
         top:15px;
         right: 30px;
         color:#888;
         font-size: 16px;
         user-select: none;
         cursor: pointer;
         &:hover{
             color:black
         }
     }
     .country-phone-list-item{
         list-style-type: none;
         height: 35px;
         line-height: 35px;
         cursor: pointer;
     }
      
     .item-country{
         width: 80%;
         display: inline-block
     }
     .item-phone{
         width: 15%;
         display: inline-block;
         text-align: right
     }  
}
</style>
