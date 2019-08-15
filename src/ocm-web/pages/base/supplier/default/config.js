function getEvents() {
    return {
        search_before: function () {
            console.log('before search');
        },
        search_after: function () {
            console.log('after search');
        },
        test: function () {
            console.log('ext test');
        }
    }
}

function getConfig() {
    return {
        button1: [{
            key: "test",
            label: "测试",
            iconCls: "icon-tingyong",
            click: "test"
        }]
    }
}