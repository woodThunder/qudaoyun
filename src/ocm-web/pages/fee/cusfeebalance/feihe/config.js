function getConfig(){
    return {
        potypemeta:{
            meta:{
                marketAreaId:{
                    type: 'string',
                },
                marketAreaName:{
                    type:'string'
                },
                marketAreaCode:{
                    type:'string'
                }
            }
        },
        grid1:{
            columns:[{
                field: "marketAreaName",
                dataType: "String",
                title: "市场区域",
                sort:"4"
            }]
        },
        search1: [
            {
                type: "refer",
                key: "marketArea",
                keyfordisplay: "marketAreaName",
                label: "市场区域",
                referId: "marketAreaIdSearch",
                compid: "marketAreaCode",
                refinfo: "market",
                clientParam: {
                    "EQ_isEnable": "1"
                }
            }
        ]
    }
}