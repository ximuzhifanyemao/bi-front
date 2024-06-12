export default [
  {
    name: '登陆',
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/', redirect: '/add_chart' },
  { path: '/intro', name: '项目简介', icon: 'table', component: './intro' },
  { path: '/add_chart', name: '智能分析(同步)', icon: 'barChart', component: './AddChart' },
  {
    path: '/add_chart_async',
    name: '智能分析(异步)',
    icon: 'barChart',
    component: './AddChartAsync',
  },
  { path: '/my_chart', name: '我的图表', icon: 'table', component: './MyChart' },
  { path: '/image_analysis', name: '图片分析', icon: 'table', component: './image_analysis' },

  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员页面',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
