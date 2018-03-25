<template>
  <el-row class="Island">
      <el-col class="Island-title">
        <p class="left">海<span>岛景色&nbsp;ABOUT&nbsp;</span>US</p>
        <p class="right"><span>宁静、纯净、质朴，带给您永恒的</span>回忆！</p>
      </el-col>
      <el-col class="img-show">
        <el-row>
            <el-col v-for="(item,index) in imgList" :key="index" class="img-item">
                <img :src="item.src">
                <a href="xxx">海岛景色{{index}}</a>
            </el-col>
        </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {
    data(){
        return{
            imgList:[
                {src:require('../assets/pic/hdjs5.jpg')},
                {src:require('../assets/pic/hdjs4.jpg')},
                {src:require('../assets/pic/hdjs3.jpg')},
                {src:require('../assets/pic/hdjs2.jpg')},
                {src:require('../assets/pic/hdjs1.jpg')},
                {src:require('../assets/pic/hdjs.jpg')}
                ]
        }
    }
}
</script>

<style lang="less" scoped>
li{
    list-style-type:none;
}
@mc:rgb(173, 5, 5);
@rc:rgb(145, 41, 41);
@img_a:rgb(170, 29, 29);
.Island{
    .Island-title{
            height: 280px;
            background: url('../assets/images/channel1title_5kw9.png') no-repeat center 40%;
            position: relative;
            span{
                border-bottom: 1px solid @mc;
            }
            p{
                margin: 0;
            }
            .left{
                position: absolute;
                left:31.5%;
                top:33%;
                font-size: 25px;
                color:@mc;
                font-weight:bolder;
            }
            .right{
                position: absolute;
                left:54%;
                top:50%;
                font-size: 14px;
                color:@rc;
            }
         }
}
.img-show{
   padding: 0 0 30px 50px;
}
.img-item{
    margin:20px 30px;
    text-align: center;
    width: 27.5%;
    img{
        width: 100%;
        height: 100%;
        &:hover+a{
            opacity: .5;
        }
    }
    a{
        display: block;
        padding: 10px;
        font-size: 13px;
        color:@img_a;
        font-weight: bold;
        transition:opacity .5s ease;
        -moz-transition:opacity .5s ease;
        -o-transition: opacity .5s ease;
        -webkit-transition:opacity .5s ease;
        &:hover{
            opacity: .5
        }
    }
}
</style>
