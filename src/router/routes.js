export default [
    // 文件上传
    {
        path: '/',
        name: 'Home',
        component: () => import("@/views/Home")
    },

    // 自定义滚动条
    {
        path: '/scrollTemplate',
        name: 'ScrollTemplate',
        component: () => import("@/views/ScrollTemplate")
    },

    // 高阶组件 
    {
        path: '/higherOrderCom',
        name: 'HigherOrderCom',
        component: () => import("@/views/HigherOrderCom")
    },

]