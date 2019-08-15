define(['messenger','layoutDesign','userInfo'], function (Topic,layoutDesign,userInfo) {

	var init = function(){
		/**
		 *应用层-订阅
		 */


//		var mySubscriber = function( msg, data ){debugger;
//		    data.url = data.url+'?roleid=www';
//			$.ajax(data);
//		};
		var getWidgets = function( msg, data){
			var hash = window.location.hash.split("/")
			data.url = data.url+'?roleid='+window.designCode;
			$.ajax(data);
		}
		var getCatels = function( msg, data){
			var hash = window.location.hash.split("/")
			data.url = data.url+'?roleid='+window.designId;
			$.ajax(data);
		}

		var searchWidgets = function( msg, data){
			var hash = window.location.hash.split("/")
			data.url = data.url+'?roleid='+window.designCode;
			$.ajax(data);
		}


		//设计器保存订阅
//		PubSub.subscribe('designer.save', mySubscriber );

		PubSub.subscribe('designer.getWidgets', getWidgets );

		PubSub.subscribe('designer.getCatels', getCatels );

		PubSub.subscribe('designer.searchWidgets', searchWidgets );

//		
//		
//		
//		
//		//布局用户个性化
//		Topic.subscribe('layout/tpl/list', function(parm) {
//			if(parm){
//				parm.success = function(res){
//					alert("保存成功！");
//				};
//				parm.data.viewid= window.layoutid;
//				 parm.data.layoutid= window.layoutid;
//				var roleCode = cookieOperation.get('_A_P_rolecode');
//				parm.data.biz = {"rolecode": roleCode};
//			}
//		});
//		//布局设计器-widget列表-加载
//		//订阅-widget 列表
//		Topic.subscribe(["/widget/list","/widget/query"], function(parm) {
//			if(parm){
//				parm.data = parm.data || {};
//				var tname = userInfo.rolecode ;
//				var selectedItem = $(".widget-category").val();
//				if(selectedItem == "all") {
//					$.addAjaxParam({"roleid":tname, "category": "_"},parm);
//				} else {
//					$.addAjaxParam({"roleid":tname,"category":selectedItem},parm);
//				}
//			}
//		});
//
////		//订阅-设计器保存
////		Topic.subscribe('/layout/set/save', function(parm) {
////			if(parm){
////				parm.success = function(res){
////					alert("保存成功！");
////				};
////				var tname = userInfo.rolecode ;
////				parm.data.biz = {"name":tname};
//	//
////				//临时 赵宇发送设计器保存url不对，这里覆盖
////				parm.url = parm.url.replace("/page/sort/save","/layout/design/save");
////			}
////		});
//		//订阅-用户个性化保存，/page/sort/save
//		Topic.subscribe('/page/sort/save', function(parm) {
//			//..to do 
//		});



	}
	return {
		init: init
	}
});