import {configure} from '@reskript/settings';

export default configure(
    'vite',
    {
        featureMatrix: {
            stable: {},
            dev: {},
        },
        build: {
            appTitle: '晶核强化模拟',
        },
        devServer: {
            port: 8788,
            // TODO: 修改后端API代理的配置
            apiPrefixes: ['/api'],
            defaultProxyDomain: 'example.com',
        },
    }
);
