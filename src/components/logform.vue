<template>
  <div>
      <div class="logform-content" v-if="!userLogin">
        <label for="log-username">用户名：</label>
        <input type="text" class="log-username" id="log-username"
        @keydown.enter="changecolor"  
         v-focus="isfocus" v-model="user.name">
        <label for="log-password">密码：</label>
        <input type="password" class="log-password" id="log-password" v-model="user.password" @keydown.enter="changecolor">
        <button class="log-btn" 
        @mousedown="changecolor" 
        @mouseup="changecolor" 
        :class="{iscolor:color}"
        >登陆</button>
        <div class="logform-error">{{error_text}}</div>
        <div class="helper">
            <a href="">密码不正确？</a>
            <a href="#" @click.prevent="gotoReg">没有账号？</a>
        </div>
      </div>
      <div class="log-succeed" :class="{isloding}" v-if="userLogin">
        <div class="succeedText" v-if="!isloding">恭喜您 登陆成功！</div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        isfocus:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            error_text:'',
            color:false,
            user:{
                name:'',
                password:''
            },
            userLogin:false,
            isloding:true
        }
    },
    methods:{
        gotoReg(){
            this.$emit('jumpReg')
        },
        checkUser(){
            this.$axios.post('api/user/login',JSON.stringify(this.user)).then((res)=>{
                if(res.data.status){
                    this.error_text=''
                    this.isloding=false
                    for(let i in this.user){
                        this.user[i]=''
                    }
                    this.$emit('log-succeed',res.data.username)
                    // setTimeout(()=>{
                    //     this.$emit('log-succeed',res.data.username)
                    // },3000)
                }else{
                    this.userLogin=false
                    this.error_text=res.data.errtext
                    this.user.password=''
                }
            }).catch((err)=>{
                this.userLogin=false
                this.error_text="请求失败，请重试"
                this.user.password=''
                if (process.env.NODE_ENV !== 'production') {
                    console.log(err)
                }
            })        },
        changecolor(){
            if(!event.keyCode){
                this.color=!this.color
            }
            if(this.color){
                return
            }
            if(this.user.name==='' || this.user.name===null){
                this.error_text='账号不能为空'
                return
            }
            if(this.user.password==='' ||this.user.password===null){
                this.error_text='密码不能为空'
                return
            }
            this.checkUser()
            this.userLogin=true
        }
    },
    //自定义指令，根据传递的数据，被绑定元素插入父节点时调用，触发方法
    directives: {
    focus: {
        inserted: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
},
}
</script>

<style lang="less" scoped>
.iscolor{
    background: rgb(96, 69, 216)!important
}
.isloding{
    background: url('../assets/5-121204193R5-50.gif') no-repeat center;
}
.log-succeed{
    width: 100%;
    height:300px;
    padding: 50px 30px 0 30px;
    .succeedText{
    text-align: center;
    font-size:20px;
    line-height: 200px;
    color:rgb(4, 201, 4)
    }
}
.logform-content{
    width: 100%;
    height:300px;
    padding: 50px 30px 0 30px;
    label{
        display:block;
        margin: 10px 0;
    }
    input{
        color:#666;
        font-size: 13px;
        padding-left:5px;
        width:50%;
        height: 25px;
        line-height: 20px;
        outline:none;
        &:focus{
            border:.05rem solid #409EFF
        }
    }
    .logform-error{
        width: 50%;
        height: 25px;
        margin-top: 10px; 
        font-size:13px;
        color:red    }
    .log-btn{
        width: 80px;
        height: 40px;
        display: block;
        margin-top:20px;
        background: rgba(76, 76, 228, 0.87);
        color:white;
        border-radius: 5px;
        border:0;
        outline: 0;
        cursor: pointer;
    }
    .helper{
        a{
            color:#666;
            font-size: 12px;
            transition:color .5s ease;
            -moz-transition: color .5s ease;
            -o-transition: color .5s ease;
            -webkit-transition: color .5s ease;
            &:hover{
                color:rgb(52, 52, 212)
            }
        }
        a:last-child{
            margin-left:10px;
        }
    }
}
</style>
