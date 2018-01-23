import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import * as types from '@/store/types'
import Home from '@/components/Home'
import Index from '@/components/index/Index'
import Steps from '@/components/index/Steps'
import Price from '@/components/index/Price'
import Environment from '@/components/index/Environment'
import Custom from '@/components/index/Custom'
import Message from '@/components/message/Message'
import Rank from '@/components/message/Rank'
import NumStart from '@/components/numClose/NumStart'
import NumClose from '@/components/numClose/NumClose'
import Mine from '@/components/mine/Mine'
import MyChicken from '@/components/mine/myChicken'
import OrderDetail from '@/components/mine/orderDetail'
import Set from '@/components/mine/Set'
import Account from '@/components/mine/Account'
import NumServer from '@/components/mine/NumServer'
import NumOrder from '@/components/mine/NumOrder'
import Address from '@/components/mine/Address'
import Details from '@/components/index/Details'
import Order from '@/components/mine/Order'
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import ForgetPass from '@/components/login/ForgetPass'
import ResetPass from '@/components/login/ResetPass'
import JiSuc from '@/components/mine/JiSuc'
import NumSuc from '@/components/mine/numSuc'
import TelSer from '@/components/mine/TelSer'
import Add from '@/components/mine/Add'
import Edit from '@/components/mine/Edit'
import BindTel from '@/components/mine/BindTel'
import Farm from '@/components/index/Farm'
import Env from '@/components/index/Env'
import TimeOut from '@/components/out/TimeOut'
Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
            path: '/home/index',
            name: 'index',
            component: Index,
            children:[
              {
                path:'/home/index/steps',
                name:'steps',
                component:Steps
              },
              {
                path:'/home/index/price',
                name:'price',
                component:Price
              },
              {
                path:'/home/index/environment',
                name:'environment',
                component:Environment
              },
              {
                path:'/home/index/custom',
                name:'custom',
                component:Custom
              },
              {
                path:'/home/index',
                redirect:'/home/index/steps'
              }
            ]
        }, {
            path: '/home/rank',
            name: 'rank',
            component: Rank
        },{
            path: '/home/numClose',
            name: 'numClose',
            component: NumClose
        }, {
            path: '/home/mine',
            name: 'mine',
           /* meta: {
            requireAuth: true,
            },*/
            component: Mine
        },{
            path:'/home',
            redirect:'/home/index'
        }]
    },
    {
	  path: '/details',
      name: 'details',
      component: Details,
    },
    {
    path: '/order',
      name: 'order',
      component: Order,
    }, 
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
    path: '/set',
      name: 'set',
      component: Set,
    },
    {
    path: '/account',
      name: 'account',
      component: Account,
    },
    {
    path: '/myChicken',
      name: 'myChicken',
      component: MyChicken,
    },
    {
    path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail,
    },
    {
    path: '/numServer',
      name: 'numServer',
      component: NumServer,
    },
    {
    path: '/numOrder',
      name: 'numOrder',
      component: NumOrder,
    },
    {
    path: '/address',
      name: 'address',
      component: Address,
    },
    {
    path: '/jiSuc',
      name: 'jiSuc',
      component: JiSuc,
    },
    {
    path: '/numSuc',
      name: 'numSuc',
      component: NumSuc,
    },
    {
    path: '/telSer',
      name: 'telSer',
      component: TelSer,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/forgetPass',
      name: 'forgetPass',
      component: ForgetPass,
    },
    {
      path: '/resetPass',
      name: 'resetPass',
      component: ResetPass,
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/bindTel',
      name: 'bindTel',
      component: BindTel,
    },
    {
      path: '/timeOut',
      name: 'timeOut',
      component: TimeOut,
    },
    {
      path: '/farm',
      name: 'farm',
      component: Farm,
    },
    {
      path: '/env',
      name: 'env',
      component: Env,
    },
    {
      path: '/numStart',
      name: 'numStart',
      component: NumStart,
    },
    {
        path:'/',
        redirect:'/home'
    }
  ]
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}


router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})


export default router;