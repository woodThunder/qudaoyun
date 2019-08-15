var mockConfigs = require("../mock.config");
module.exports = {
    publishConfig: {
        command: "mvn",
        repositoryId: "ecmp-Snapshots",
        repositoryURL: "http://maven.yonyou.com/nexus/content/repositories/ecmp-Snapshots/",
        artifactId: "ocm-portal-static",
        groupId: "com.yonyou.ec",
        version: "0.0.1-SNAPSHOT"
    },
    serverConfig: {
        serverport: 80,
        context: "/", //当前应用对应的上下文
        isProxyFirst: true, // isProxyFirst : 是否后端代理优先     //true -> 优先使用代理服务器数据，false -> 使用本地模拟数据
        staticFilePath: "src", //监听的静态文件目录,可以是路径字符串,也可以是路径数组
        proxyList: [{
            host: "http://172.20.11.88:80",
            context: "/wbalone"
        }, {
            host: "http://172.20.11.88:80",
            context: "/iuap-saas-filesystem-service"
        }, {
            host: "http://172.20.11.88:80",
            context: "/iuap-saas-billcode-service"
        }, {
            host: "http://172.20.11.88:80",
            context: "/iuap-saas-message-center"
        }, {
            host: "http://172.20.11.88:80",
            context: "/iuap-saas-dispatch-service"
        }, {
            host: "http://172.20.11.88:80",
            context: "/iuap-saas-busilog-service"
        }, {
            host: "http://172.20.11.88:80",
            context: "/iuap_qy"
        }, {
            host: "http://172.20.11.88:80",
            context: "/ubpm-web-process-center2"
        }, {
            host: "http://172.20.11.88:80",
            context: "/ubpm-webserver-process-center2"
        }, {
            host: "http://172.20.11.88:80",
            context: "/ubpm-web-rest"
        }, {
            host: "http://172.20.11.88:80",
            context: "/iuap-licenseserver"
        }, {
            host: "http://172.20.11.88:80",
            context: "/uui"
        }, {
            // host: "http://172.20.11.88:80",
            host: "http://10.11.112.25:16000", //明月
            context: "/uitemplate_web"
        }, {
            // host: "http://172.20.11.88:80",
            host: "http://10.11.112.25:15000", //明月
            // host: 'http://10.11.112.24:8769', //庭苇
            context: "/"
        }],
        // 代理服务器列表
        proxyIgnore: [], //代理忽略的URL列表
        mockList: mockConfigs //模拟请求列表
    }
};