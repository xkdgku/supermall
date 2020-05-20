import Vue from 'vue'
import Router from 'vue-router'


const Home = () =>
    import ('../views/home/Home')
    //home里面的详情页
const Detail = () =>
    import ('../views/detail/Detail')


const Category = () =>
    import ('../views/category/Category')
const Shopcart = () =>
    import ('../views/shopcart/Shopcart')
const Profile = () =>
    import ('../views/profile/Profile')



//1  安装插件
Vue.use(Router)

//2  创建路由对象
const routes = [{
        path: '',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/category',
        component: Category
    }, {
        path: '/profile',
        component: Profile
    }, {
        path: '/shopcart',
        component: Shopcart
    }, {
        path: '/detail/:iid',
        component: Detail
    },

]

const router = new Router({
    routes,
    mode: 'history'
})

//3  到处路由
export default router