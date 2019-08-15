define(["ocm_global"],function(){

    window.DisplayTmpl = {
        params: {
            "cls": "com.yonyou.occ.cmpt.service.dto.DisplayTmplDto"
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
            displayType: {type: 'string', required: true},
            creator:{type: 'string'},
            creationTime:{type: 'datetime'},
            modifier:{type: 'string'},
            modifiedTime:{type: 'datetime'}
        },
        pageSize: 20,
        //是否启用前端缓存
        // pageCache: true
    };

    window.DisplayTmplItem = {
        params: {
            "cls": "com.yonyou.occ.cmpt.service.dto.DisplayTmplItemDto"
        },
        meta: {
            id:{type: 'string'},//idp
            fieldCode: {type: 'string', required: true},
            fieldName: {type: 'string', required: true},
            displayOrder: {type: 'string', required: true},
            DisplayTmplId: {type: 'string', required: true},
            isVisible: {type: 'integer'},
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
    }
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
