define(["ocm_global"],function(){

    window.excelStatusTmpl = {
        params: {
            "cls": "com.yonyou.occ.cmpt.service.dto.ExcelStatusDto"
        },
        meta: {
            id: { type: 'string' },//id
            name: { type: 'string', required: true },//名称
            className: { type: 'string', required: true },//节点名称
            queryStatus: { type: 'string' },//查询状态
            queryNum: { type: 'string' },//数据条数
            exportStatus: { type: 'string', required: true },//导出状态
            exportStartTime: { type: 'string' },//导出开始时间
            exportEndTime: { type: 'string' },//导出完成时间
            filePath: { type: 'string'},//文件路径
            fileSize: { type: 'string'},//文件大小
            log: { type: 'string', required: true},// 信息
            errorMsg: { type: 'string', required: true},// 错误信息
        },
        pageSize: 20,
        //是否启用前端缓存
        // pageCache: true
    };
});
