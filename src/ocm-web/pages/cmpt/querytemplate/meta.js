define(["ocm_global"],function(){

    window.SearchTmpl = {
        params: {
            "cls": "com.yonyou.occ.cmpt.service.dto.SearchTmplDto"
        },
        meta: {
            id:{type: 'string'},//id
            code:{type: 'string',required:true},//编码
            name: {type: 'string',required:true},//名称
            isEnable: {type: 'string', required: true}, //启用状态
            isDefault: {type: 'string', required: true},//是否默认
            menuId: {type: 'string', required: true},//菜单id
            menuCode: {type: 'string', required: true},
            menuName: {type: 'string', required: true},
            creator:{type: 'string'},
            creationTime:{type: 'datetime'},
            modifier:{type: 'string'},
            modifiedTime:{type: 'datetime'}
        },
        pageSize: 20,
        //是否启用前端缓存
        // pageCache: true
    };

    window.SearchTmplItem = {
        params: {
            "cls": "com.yonyou.occ.cmpt.service.dto.SearchTmplItemDto"
        },
        meta: {
            id:{type: 'string'},//idp
            conditionCode: {type: 'string', required: true},
            conditionName: {type: 'string', required: true},
            displayOrder: {type: 'string', required: true},
            searchTmplId: {type: 'string', required: true},
            isVisible: {type: 'integer', required: true,default:1}, //启用状态
        },
        pageSize: 10,
    };

    window.ItemRef = {
        meta: {
            menuref: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['menu']),
                "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
                'refparam':'{"EQ_isEnable":"Y"}'
            },
            roleref: {
                type: 'string',
                "refmodel": JSON.stringify(refinfo['role']),
                "refcfg":'{"ctx":"/uitemplate_web","isMultiSelectedEnabled":false}',
                'refparam':'{"EQ_isActive":"Y"}'
            }
        }
    },
    window.Rolemeta = {
        params: {
            "cls": "com.yonyou.occ.base.service.dto.RoleDto"
        },
        meta: {
            id:{type: 'string'},//id
            roleName:{type: 'string'},//名称
            parentTreeId:{type: 'string'},//名称
        },
    };
});
