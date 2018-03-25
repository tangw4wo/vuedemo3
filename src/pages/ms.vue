<template>
  <div>
      <ul>
          <li v-for="(item,index) in slideList" :key="index" v-if="index===activeitem[0]">
              <a :href="item.herf">
                  <img :src="item.img" :alt="item.name">
                  <p>{{item.name}}</p>
              </a>
          </li>
          </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
            slideList:[{name:"海岛景色",img:require("../assets/pic/img0.png"),herf:"xxx"},
            {name:"住宿环境",img:require("../assets/pic/img1.png"),herf:"xxx"},
            {name:"海岛特产",img:require("../assets/pic/img2.png"),herf:"xxx"},
            {name:"4",img:require("../assets/pic/img2.png"),herf:"xxx"}],
        }
    }
}
</script>

<style>

</style>
