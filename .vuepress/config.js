module.exports = {
    title: '前端知识整理',
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        displayAllHeaders: true,
        sidebar: [
            {
                title: 'JavaScript', // 必要的
                path: '/javascript/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 0, // 可选的, 默认值是 1
                children: [
                    {
                        title: 'ES2015',
                        path: '/javascript/es2015/',
                    },
                ],
            },
            {
                title: 'HTTP',
                path: '/http/',
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 0,
                children: [
                    {
                        title: 'HTTP缓存',
                        path: '/http/http-cache',
                    },
                ],
            },
        ],
        lastUpdated: 'Last Updated',
        smoothScroll: true,
        // sidebar: 'auto'
    },
};
