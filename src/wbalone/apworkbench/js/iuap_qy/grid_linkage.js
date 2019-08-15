/*
element为包含grid的div，
model为需要传入的数据集，
filed_1为被联动的字段(如pk_org),
filed_2为联动的字段(如pk_dept)
*/
function linkage(element,model,filed_1,filed_2) {
	element.bind('DOMNodeInserted',function(){
		var temp2 = element.find('input');
		var index = temp2.parentsUntil('tr').parent().index();
		var jsonDept={};
		if(index >= 0 ){
			var pk = model.getRow(index).getSimpleData()[filed_1];
			if(pk != null){
				jsonDept[filed_1]=pk;
				model.setMeta(filed_2,'refparam',JSON.stringify(jsonDept));
			}
		}
	});
}