var ChanInveUnitmeta = {
    params: {
        "cls": "com.yonyou.ocm.base.service.dto.ChanInveUnitDto"
    },
    meta: {
      id:{type: 'string'},//id
      code:{type: 'string'},//编码
      name:{type: 'string',required:true},//名称
      description:{type: 'string'},//描述
	  legalPerson:{type: 'string'},
	  credentialsTypeId:{type: 'string',required:true},
	  credentialsType	:{type: 'string',required:true},
	  credentialsNo		:{type: 'string',required:true},
	  taxRegistryNo	:{type: 'string'},
	  organizationCode	:{type: 'string'},
	  countryCode	:{type: 'string',required:true},
	  address	:{type: 'string'},
	  longitude	:{type: 'string'},
	  lattitude	:{type: 'string'},
	  zipecode:{type: 'string'},
	  bank:{type: 'string'},
	  bankAccount	:{type: 'string'},
	  businessScope:{type: 'string'},
	  unitState:{type: 'string',required:true},
	  status:{type: 'string',required:true,default:1},
	  countryId:{type: 'string'},
	  zipecode:{type: 'string'},
	  registTypeCode:{type: 'string',required:true},
	  orgnizationId:{type: 'string'},
	  isAutoEncoded:{type: 'string',default:1},
    },
    pageSize: 10,
    //是否启用前端缓存
    // pageCache: true
}
