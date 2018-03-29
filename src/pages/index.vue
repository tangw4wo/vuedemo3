<template>
  <div class="app_index">
      <el-row class="index_slideShow">
             <el-col><hr><p class="mainTitle">TRAVEL HOTEL</p><hr></el-col>
             <el-col><p class="subtitle">ISLAND <span>TOURISM</span></p></el-col> 
             <el-col class="title_bottom"><a href="xxx">海岛旅游</a></el-col>
             <slide-show class="slide-I" :slideList="slideList_I"></slide-show>
      </el-row>
      <el-row class="index_intro">
             <el-col><hr><p class="mainTitle">TRAVEL HOTEL</p><hr></el-col>
             <el-col><p class="subtitle">ISLAND <span>TOURISM</span></p></el-col> 
             <el-col class="title_bottom"><a href="xxx">走进我们</a></el-col>
             <el-col :span="24" class="detailsThe">
                 <el-row>
                     <el-col :span="11" class="details_lf">
                         <img src="../assets/images/about_img_n20n.jpg">
                         <span><h2>海岛旅游度假村介绍</h2><p>海岛旅游度假村位于某某省某某市某某海岛，是某某海岛接待游客旅游的渔家度假村之一，在海岛渔家度假村这里可以享受到游船观光、KTV、烧烤、篝火、棋牌、沙滩娱乐、赶海、钓鱼等无限乐趣，这里有最淳朴的海鲜菜肴、这里有最美丽的沙滩浴场、这里空气清新、这里可以享受城市喧嚣过后的宁静，这里就是某某海岛旅游度假村，某某海岛也是某某市海岛旅游的最佳选择！</p>
                         <a href="xxx">了解更多</a>
                         </span>
                     </el-col>
                     <el-col :span="11" class="details_rg">
                         <a href="xxx">
                             <div class="text_type">
                                 <p>海岛美食</p>
                                 <p>ISLAND FOOD</p>
                             </div>
                         </a>
                         <a href="xxx">
                             <div>
                                 <p>海岛传说</p>
                                 <p>ISLAND LEGEND</p>
                             </div>
                         </a>
                     </el-col>
                 </el-row>
             </el-col>
      </el-row>
      <el-row class="index_news">
            <el-col><hr><p class="mainTitle">TRAVEL HOTEL</p><hr></el-col>
            <el-col><p class="subtitle">ISLAND <span>TOURISM</span></p></el-col> 
            <tabs :newsList="tabsList"></tabs>
      </el-row>
      <el-row class="index_form">
            <el-col><p class="title_1">ACCOMMODATION MESSAGE</p></el-col>
            <el-col><p class="title_2">预订住宿</p></el-col>
            <el-col class="order_list">
                 <el-row>
                <el-col class="IV_left" :span="12">
                <el-row class="order_itemI">
                <el-col class="name" :span="6">您的姓名&nbsp;*&nbsp;&nbsp;</el-col>
                <el-col class="text" :span="18">
                    <input type="text" v-model.trim="orderList.name">
                </el-col>
                </el-row>
            <el-row class="order_itemII">
                <el-col class="name" :span="6">您的电话&nbsp;*&nbsp;&nbsp;</el-col>
                <el-col class="text" :span="18">
                    <input type="text" v-model.trim="orderList.pho">
                </el-col>
            </el-row>
            <el-row class="order_itemIII">
                <el-col class="name" :span="6">住宿人数&nbsp;*&nbsp;&nbsp;</el-col>
                <el-col class="text" :span="18">
                    <!-- <el-col>
                        <select name="num" id="num" v-model="orderList.num">
                        <option :value="item" v-for="(item,index) in 4" :key="index">{{item}}人</option>
                    </select>
                    </el-col> -->
                   
                        <new-select :maxnum="Num" @on-change="setNum"></new-select>
                 
                </el-col>
            </el-row>
            <el-row class="order_itemIV">
                <el-col class="name" :span="6">需求补充&nbsp;*&nbsp;&nbsp;</el-col>
                <el-col class="text" :span="18">
                    <textarea v-model="orderList.demand"></textarea>
                </el-col>
            </el-row>
            <el-row class="order_itemV">
                <el-col class="name" :span="6">验证码&nbsp;*&nbsp;&nbsp;</el-col>
                <el-col class="text" :span="18">
                    <input type="text" v-model.trim="orderList.check">
                </el-col>
            </el-row>
            <el-col class="btn">
                <span @click="orderListUp">提交</span>
                <span @click="reset">重设</span>
            </el-col>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col class="promptI">SERVICE HOTILINE 服务热线：400-0000-000</el-col>
                        <el-col class="prompt">
                        <span class="icon_dz"></span>
                        <span class="is_value">地址：中国·辽宁·大连·某某海岛某某组123号海岛度假渔村</span></el-col>
                        <el-col class="prompt">
                        <span class="icon_pho"></span>
                        <span class="is_value">电话：+86-411-88888X8</span>
                        </el-col>
                        <el-col class="prompt">
                        <span class="icon_yb"></span>
                        <span class="is_value">邮编：116001</span>
                        </el-col>
                        <el-col class="prompt">
                        <span class="icon_jt"></span>
                        <span class="is_value">交通：客运站乘车·皮口港乘坐XXX号滚装客船</span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row> 
            </el-col>
            <check-error :is-show="iScheckError" @on-close="changeError" :is-error="iSerrorText"></check-error>
      </el-row>
      <el-row class="index_footer">
          <el-col><hr><p class="title_1">TRAVEL HOTEL</p><hr></el-col>
            <el-col><p class="title_2">友情链接</p></el-col>
            <el-col class="link">
               <a v-for="(item,index) in linkList" :key="index" :href="item.herf" target="_blanck">{{item.name}}</a>
            </el-col>
      </el-row>
  </div>
</template>

<script>
import slideShow from "../components/slideShow"
import checkError from "../components/checkError"
import tabs from "../components/tabs"
import newSelect from "../components/select"
export default {
    components: {
        slideShow,
        checkError,
        tabs,
        newSelect
    },
    data(){
        return{
            slideList_I:[{name:"海岛景色",img:require("../assets/pic/img0.png"),herf:"xxx"},
            {name:"住宿环境",img:require("../assets/pic/img1.png"),herf:"xxx"},
            {name:"海岛特产",img:require("../assets/pic/img2.png"),herf:"xxx"},
            {name:"4",img:require("../assets/pic/img2.png"),herf:"xxx"}],
            tabs_activeIndex:0,
            linkList:[{name:"百度旅游",herf:"https://www.baidu.com/"},{name:"途牛旅游网",herf:"https://www.tuniu.com/"},{name:"携程旅游网",herf:"https://www.ctrip.com/"},{name:"腾讯旅游",herf:"http://ly.qq.com//"},{name:"网易旅游",herf:"http://travel.163.com/"},{name:"新浪旅游",herf:"http://travel.sina.com.cn/"},{name:"去哪儿旅游网",herf:"https://www.qunar.com/"},{name:"艺龙旅游网",herf:"http://www.elong.com"},{name:"驴妈妈旅游网",herf:"http://www.lvmama.com/"},{name:"百度旅游",herf:"https://www.baidu.com/"},{name:"途牛旅游网",herf:"https://www.tuniu.com/"},{name:"携程旅游网",herf:"https://www.ctrip.com/"},{name:"百度旅游",herf:"https://www.baidu.com/"}],
            orderList:{name:'',pho:'',num:'1',demand:'',check:''},
            iScheckError:false,
            iSerrorText:{error:false,text:''},
            tabsList:[{value:'渔家资讯',src:'information'},{value:'旅游攻略',src:'strategy'}],
            Num:4
        }
    },
    methods:{
        tabs_change(index){
            this.tabs_activeIndex = index;
        },
        setNum(num){
            this.orderList.num=num
        }
        ,
        reset(){
           for(let i in this.orderList){
               if(this.orderList[i]===this.orderList.num){
                   this.orderList[i]='1'
               }else{
                   this.orderList[i]=''
               }
           }
         }
       ,
        orderListUp(){
            if(this.orderList.name ===''){
                this.iScheckError=true;
                this.iSerrorText.text='带有*号的内容不能为空！'
                return false;
            }
            if(!/^[\u4e00-\u9fa5]{2,4}$/.test(this.orderList.name)){
                this.iScheckError=true;
                this.iSerrorText.text='姓名格式错误，请输入2-4个汉字字符!'
                return false;
            }
            if(!/^1[3-8][\d]{9}$|^08\d{2}\d{8}/.test(this.orderList.pho)){
                this.iScheckError=true;
                this.iSerrorText.text='号码格式错误，请输入手机号码或者座机号码!'
                return false;
            }
            if(!/^[\u4e00-\u9fa5]{10,300}$/.test(this.orderList.demand)){
                this.iScheckError=true;
                this.iSerrorText.text='请至少输入10个汉字字符！'      
                return false;
            }
            this.postData();
        },
        postData(){
            this.$axios.post('api/orderList',JSON.stringify(this.orderList))
            .then((res)=>{
            this.iScheckError=true;
            this.iSerrorText.text=res.data
            this.iSerrorText.error=true;
            for(let i in this.orderList){
                if(this.orderList[i] === this.orderList.num){
                    this.orderList[i]='1'
                }else{
                    this.orderList[i]=''
                }
                
            }
            })
            .catch((err)=>{
            if (process.env.NODE_ENV !== 'production') {
                console.log(err)
                }
            })
        }
        ,
        changeError(){
           this.iScheckError=false; 
           this.iSerrorText.error=false;
        }
        }
    }

</script>

<style lang="less" scoped>
.borderRadius(@w){
    border-radius: @w;
    -moz-border-radius:@w;
    -webkit-border-radius:@w;
}
@footerC:rgb(168, 0, 0);
.is_prompt(@c:14px){
    color:#fff;
    text-align: left;
    font-size: @c;
    padding-bottom:30px; 
   
}
.icon_style(@c,@h){
    display: inline-block;
    width: 35px;
    height: @h;
    background: url(@c) no-repeat;
}
.icon_dz{
    .icon_style("../assets/images/dizhi_8bei.png",31px)
}
.icon_pho{
    .icon_style("../assets/images/dianhua_ahpb.png",35px)
}
.icon_yb{
    .icon_style("../assets/images/youbian_svmz.png",35px)
}
.icon_jt{
    .icon_style("../assets/images/jiaotong_fkqq.png",35px)
}
.search{
    height: 500px;
    background: url("../assets/images/banner01_wibj.jpg") no-repeat;
    background-size:100% 100%;
    position: relative;
    .booking{
        width: 21.5%;
        height: 45%;
        background:rgba(3, 3, 3, 0.39);
        position:absolute;
        top:120px;
        right: 150px;
        padding:0 0 0 15px;
        p{
            color:white;
            font-weight: 500;
            margin: 12px 0;
            span{
                color:rgb(255, 196, 0);
            }
        }
        a{
            display: block;
            width: 259px;
            height: 55px;
            background: url("../assets/images/create_hg5b.png")
        
        }
    }
    .search-inner{
        width:30%;
        height: 95px;
        background:rgba(3, 3, 3, 0.39);
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
            color:rgb(255, 196, 0);
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
            li{
                float:left;
                list-style-type: none;
                margin-right: 10px;
                color:white;
                font-size: 14px;
            }
        }
    }
}
.background(@c){
    background: @c no-repeat;
    background-size:100% 100%;
}
.index_style(@height,@url,@tc,@a_color,@a_bc){
    height: @height;
    background:@url no-repeat;
    background-size:100% 100%;
    text-align: center;
    padding-top:40px;
    .slide-I{
        margin-top:80px;
    }
    hr{
        width:5%;
        display: inline-block;
    }
    .mainTitle{
        display: inline-block;
        font-size:25px;
        color:@tc;
        margin:0 8px;
    }
        
    .subtitle{
        margin: 8px 0;
        color:rgb(168, 0, 0);
        font-weight: bold;
        span{
            color:#555
        }
    }
    .title_bottom{
        a{
        color:@a_color;
        display:block;
        width: 25%;
        height: 50px;
        line-height: 50px;
        border:1px solid @a_bc;
        margin: 0 auto;
        }

    }
 }
.index_slideShow{
    .index_style(730px,url("../assets/images/bg_7z1z.png"),#999,#777,black);
}
.index_intro{
    .index_style(700px,url("../assets/images/bg2_jfkf.jpg"),white,white,white);
    
    .detailsThe{
        margin-top:80px;
        .details_lf{
            height: 380px;
            margin-left: 50px;
            img{
                float:left;
                width: 35%;
                height: 100%;
            }
            span{
                float:left;
                height: 100%;
                background: rgba(3, 3, 3, 0.575);
                width: 65%;
                text-align: left;
                h2{
                    color:rgb(207, 205, 205);
                    font-size: 20px;
                    font-weight: 500;
                    height: 23px;
                    padding-left: 16px;
                    margin: 50px 0 10px 0;
                }
                p{
                    color:rgb(207, 205, 205);
                    line-height: 25px;
                    font-size: 13px;
                    margin: 0;
                    padding: 20px 16px;
                }
                a{
                    display: block;
                    width: 90px;
                    height: 23px;
                    background: url("../assets/images/more99_zk2h.png") no-repeat;
                    font-size: 13px;
                    color:white;
                    text-decoration: none;
                    line-height: 23px;
                    padding-left:5px; 
                    margin:20px 0 0 16px;
                }
            }
            
        }
    .details_rg{
            height: 380px;
            a{
                width: 50%;
                height: 100%;
                float:left;
                position: relative;
                
            }
            .text_type(@c){
    div{
        position: absolute;
        left:27.5%;
        bottom: 5px;
    }
    p{
        font-size: 20px;
        color:@c;
        margin: 8px 0;
 }
 }
    a:first-of-type{
                background: url("../assets/pic/zjwm_img0.jpg");
                .text_type(#fff)

            }
    a:last-of-type{
                background: url("../assets/pic/zjwm_img1.jpg");
                .text_type(rgb(156, 6, 6))
            }
        }
    }
}
.index_news{
     .index_style(650px,url("../assets/images/bg1_yzc1.jpg"),#999,#777,black);
}
.index_form{
    height: 530px;
    background: url("../assets/images/bg4_dmya.jpg");
    background-size:100% 100%;
    text-align: center;
    padding-top:50px;
    .error_check{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.473);
   
    }
    .title_1{
        display: inline-block;
        font-size:25px;
        font-weight: bold;
        color:#fff;
        margin:0
    }
        
    .title_2{
        margin: 15px 0;
        color:#fff;
        font-weight: bold;
        font-size:25px;
        
    }
    .order_list{
        padding-top:40px;
    }
    .btn{
        span{
        width: 15%;
        display: inline-block;
        background: #fff;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        color:rgb(177, 8, 8);
        cursor: pointer;
        }
    }
    .order_item{
        margin-bottom:10px; 
        .name{
            color:#fff;
            line-height: 30px;
            text-align: right;
        }
        .text{
            text-align: left;
            input{
            width: 85%;
            height: 30px;
            border:0;
            .borderRadius(3px);
            outline: 0;
            padding: 0 5px;
            }   
        }
    }
    .order_itemI{
       .order_item;
    }
    .order_itemII{
        .order_item;
    }
    .order_itemIII{
        margin-bottom:10px;
        .name{
            color:#fff;
            line-height: 30px;
            text-align: right;
        }
        .text{
            text-align: left;
            select{
                width: 35%;
                border: 0;
                outline: 0;
                height: 30px;
            }
    }
    }
    .order_itemIV{
        margin-bottom:10px;
        .name{
            color:#fff;
            line-height: 120px;
            text-align: right;
        }
        .text{
            text-align: left;
            textarea{
                width: 85%;
                height: 120px;
                //禁止textarea框拉伸
                resize:none; 
                -moz-resize:none; 
                .borderRadius(3px);
                padding: 10px 5px;
                outline: none;
                //ie
                border: 0px;



            }
    }
    }
    .order_itemV{
        margin-bottom:10px; 
        .name{
            color:#fff;
            line-height: 30px;
            text-align: right;
        }
        .text{
            text-align: left;
            input{
            width: 23%;
            height: 30px;
            border:0;
            .borderRadius(3px);
            outline: 0;
            padding: 0 5px;
         } 
        }
    }
    .promptI{
        .is_prompt(20px);
        line-height: 30px;
    }
    .prompt{
        .is_prompt();
        line-height: 32px;
        span{
            float: left;   
        }
    }
}
.index_footer{
    height: 200px;
    text-align: center;
    padding-top:40px;
     hr{
        width:5%;
        display: inline-block;
    }
    .title_1{
        display: inline-block;
        font-size:25px;
        color:#999;
        margin:0 8px;
    }
        
    .title_2{
        margin: 8px 0;
        color:@footerC;
        font-weight: bold;
    }
    .link{
        padding:10px 0 0 70px;
        a{
            float: left;
            font-size: 13px;
            color:#777;
            width: 80px;
            margin: 5px 10px;
            transition:color .5s ease;
            -moz-transition:color .5s ease;
            -o-transition: color .5s ease;
            -webkit-transition:color .5s ease;
            &:hover{
                color:#444
            }
        }
    }
}

</style>
