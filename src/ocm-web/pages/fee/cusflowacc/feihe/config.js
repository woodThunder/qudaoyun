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
                sort:"6"
            }]
        },
        search1: [
            {
                type: "refer",
                key: "balance--marketArea",
                keyfordisplay: "marketAreaName",
                label: "市场区域",
                referId: "marketAreaIdSearch",
                compid: "marketAreaCode",
                refinfo: "market",
                clientParam: {
                    "EQ_isEnable": "1",
                    "AUTH_refdim": "balance.marketArea"
                }
            }
        ]
    }
}