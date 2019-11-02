import { IConfig, IPlugin } from 'umi-types';
// @ts-ignore
import slash from 'slash2';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
    },
  ]
];

export default {
  plugins,
  hash: true,
  targets: {
    ie: 10,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/login',
      component: '../layouts/UserLayout',
      name: '登陆',
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      name: '首页',
      routes: [
        {
          path: '/test',
          component: '../pages/Container',
          name: '类目管理',
          icon: 'profile',
          value: 'http://localhost:5000/#/test/console/categorymanage?userinfo=isSingle'
        },
        {
          path: '/test1',
          component: '../pages/Container',
          name: '指标管理',
          icon: 'profile',
          value: 'http://localhost:5000/#/test/console/indexmanage'
        },
        {
          path: '/test2',
          component: '../pages/Container',
          name: '维度管理',
          icon: 'profile',
          value: 'http://localhost:5000/#/test/console/dimension'
        },
        {
          path: '/test3',
          component: '../pages/Container',
          name: '项目管理',
          icon: 'profile',
          value: 'http://localhost:5000/#/test/console/projectmanage'
        }
      ],
    },
  ],
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `bonc-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  proxy: {
    '/api': {
      target: 'http://172.16.17.14:8888',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  }
} as IConfig;
