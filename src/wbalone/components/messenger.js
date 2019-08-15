/**
 * 信使——发布/订阅通信机（负责全局通信,不需要依赖某个特殊对象）
 * 
 * Created by guoshg on 15/11/7
 * 
 * 使用：
 * 1：发布一个topic：
 *    Topic.publish('/page/load', {
 *       url: '/some/url/path' // 此处可以是任意对象,任意参数
 *    });
 * 2：订阅topic以便得到事件通知：
 *    var subscription = Topic.subscribe('/page/load', function(obj) {
 *  	// 当事件发生时,可以执行某些操作...
 *    });
 * 3：取消订阅
 *	subscription.remove(); 
 */
define([],function(){
	var Topic = (function() {
		var topics = {};
		var _subscribeOne = function(topic, listener) {
			// 如果没有创建,则创建一个topic对象
			if (!topics[topic])
				topics[topic] = {
					queue : []
				};

			// 添加监听器到队列中
			var index = topics[topic].queue.push(listener) - 1;

			// 提供移除topic的句柄(对象)
			return (function(topic, index) {
				return {
					remove : function() {
						delete topics[topic].queue[index];
					}
				}
			})(topic, index);
		};
		/**
		 * Returns internal [[Class]] property of an object
		 * __getClass(5); // => "Number" __getClass({}); // => "Object"
		 * __getClass(/foo/); // => "RegExp" __getClass(''); // => "String"
		 * __getClass(true); // => "Boolean" __getClass([]); // => "Array"
		 * __getClass(undefined); // => "Window" __getClass(Element); // =>"Constructor"
		 *
		 */
		function _getClass(object) {
			return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
		};
		return {
			subscribe : function(topic, listener) {
				if(_getClass(topic) === "String"){
					return _subscribeOne(topic, listener);
				}
				if(_getClass(topic) === "Array"){
					var res = [];
					for(var p in topic){
						if(_getClass(topic[p])=="String"){
							res.push(_subscribeOne(topic[p], listener));
						}
					}
					return res;
				}
			},
			publish : function(topic, info) {
				// 如果 topic 不存在,或者队列中没有监听器,则 return
				if (!topics[topic] || !topics[topic].queue.length)
					return;

				// 通过循环 topics 队列, 触发事件!
				var items = topics[topic].queue;
				items.forEach(function(item) {
					item(info || {});
				});
			}
		};
	})();

	window.Topic = Topic;

	return Topic;
})
