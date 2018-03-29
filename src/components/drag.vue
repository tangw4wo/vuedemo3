<template>
  <div class="drag">
      <div class="drag-bg"  style="width:0" ref="bg" :class="{bgDrag:dragover}"></div>
      <div class="drag-text" 
      :class="{textchangeS:checkstatus && !dragstatus,isloading:dragloading,textchangerr:errText,drag_text_lg:!checkstatus}"
      @click="refresh">{{dragText}}</div>
      <div class="drag-handler" @mousedown="dragstart" ref="handler" style="left:0" :class="{handlerDrag:dragover}"></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //判断是否开始拖动
            mousemovestatus:false,
            //当前的x坐标
            beginClientX:0,
            //最大拖动距离
            maxwidth:240,
            //当前的拖动距离
            nowWidth:0,
            //判断拖动完成状态
            checkstatus:false,
            //拖动文字提示
            dragText:'请按住滑块，拖动到最右边',
            //等待服务器回应状态
            dragloading:false,
            //服务器回应状态
            dragstatus:false,
            istest:false
        }
    },
    computed:{
        errText(){
            if(this.checkstatus && this.dragstatus){
                return true
            }
            return false 
        },
        dragover(){
            if(!this.mousemovestatus && this.nowWidth<this.maxwidth){
                return true
            }else{
                return false
            }
        },
    },
    methods:{
        refresh(){
            if(!this.dragstatus){
                return
            }
            this.$emit('drag-refresh')
        },
        dragstart(event){
             if(this.checkstatus){
                return;
            }
            this.mousemovestatus=true;
            this.beginClientX=event.clientX
        },
        succeed(){
            this.checkstatus=true;
            this.mousemovestatus=false;
            this.dragloading=true;
            this.$axios.get('api/user/reg/check').then((res)=>{
                if(res.data==='ok'){
                this.dragText="验证通过"
                this.dragloading=false;
                this.$emit('users-live')
                }else{
                this.dragloading=false;
                this.dragstatus=true
                this.dragText="发生错误，请点击刷新"    
                }
            }).catch((err)=>{
                this.dragloading=false;
                this.dragstatus=true
                this.dragText="发生错误，请点击刷新"
                if (process.env.NODE_ENV !== 'production') {
                        console.log(err)
                }
            })
        },
    },
    mounted () {
        let handler = this.$refs.handler
        let bg = this.$refs.bg
        document.addEventListener("mousemove",(event)=>{
            if(this.checkstatus){
                return;
            }
           if(this.mousemovestatus){
               let width=event.clientX-this.beginClientX
               this.nowWidth=width;
               if(width>0 && width<this.maxwidth){
                  handler.style.left=width+'px'
                  bg.style.width=width+'px'
               }else if(width>this.maxwidth){
                  handler.style.left=this.maxwidth+'px' 
                  bg.style.width=this.maxwidth+'px'
                  this.dragText=''
                  this.succeed();
               }else if(width<0){
                   handler.style.left=0+'px'
                   bg.style.width=0+'px'  
               }
           }
        })
        document.addEventListener("mouseup",()=>{
             if(this.checkstatus){
                return;
            }
            this.mousemovestatus=false;
            setTimeout(()=>{
                if(this.nowWidth<this.maxwidth){
                handler.style.left=0+'px'
                bg.style.width=0+'px'
            }
            },0)

        })
    }
}
</script>

<style lang="less" scoped>
    .isloading{
        background: url('../assets/5-121204193R5-50.gif') no-repeat center center;
        background-size:20px 20px;
    }
    .handlerDrag{
        transition:left 1s ease;
        -moz-transition: left 1s ease;
        -o-transition: left 1s ease;
        -webkit-transition: left 1s ease;
    }
    .bgDrag{
         transition:width 1s ease;
         -moz-transition: width 1s ease;
        -o-transition: width 1s ease;
        -webkit-transition: width 1s ease;
    }
    .textchangeS{
        color:white;
        right: 45%!important;
     
    }
    .textchangerr{
        color:white;
        right: 30%!important;
        &:hover{
            color:rgb(209, 179, 179)
        }
    }
        .drag{
            position: relative;
            height: 30px;
            cursor: pointer;
            user-select: none;
        .drag-handler{    
            width:35px;
            height: 30px;
            border: 1px #999 solid;
            background: url("../assets/arrow-double-right.png") no-repeat center center;
            background-size:15px;
            position: absolute;
            z-index: 20;
            background-color: white;
        
            }
            .drag-text{
                position: absolute;
                margin: 0;
                top:0;
                right: 65px;
                font-size: 12px;
                z-index: 10;
                height: 30px;
                line-height: 30px;
                min-width:30px;
                transition:color 2s ease;
                color:white
            }
            .drag_text_lg{
                -webkit-text-fill-color: transparent;
                background-image:  -webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
                background-size: 200%,100%;
                -webkit-background-clip: text;
                -webkit-animation: word 2s linear infinite ;
            }
             @keyframes word {
             0%{background-position: 0 0}
             100%{background-position: -200% 0}
         }

            .drag-bg{
                position: absolute;
                height: 30px;
                background:#7ac23c;
                z-index: 5;
            }
}
</style>
