import Vue from 'vue'
import Router from "vue-router"
import indexPage from "../pages/index"
import informationPage from "../pages/base/information"
import strategyPage from "../pages/base/strategy"
import aboutPage from "../pages/about.vue"
import islandPage from "../pages/IslandScenery"
import newsPage from "../pages/news"
import zxPage from "../pages/base/zx"
import glPage from "../pages/base/gl"
import msPage from "../pages/ms"
Vue.use(Router)
export default new Router({
      mode:'history',
      routes:[
        {
          path:"/",
          component:indexPage,
          redirect:'/information',
          children:[
            {
              path:"information",
              component:informationPage
            },
            {
              path:"strategy",
              component:strategyPage
            }
         
          ]
        },
        {
          path:"/about",
          component:aboutPage
        },
        {
          path:'/island',
          component:islandPage
        },
        {
          path:'/news',
          redirect:'/news/zx',
          component:newsPage,
          children:[
            {
              path:'zx',
              component:zxPage
            },
            {
              path:'gl',
              component:glPage
            }
          ]
        },
        
      ]
  })