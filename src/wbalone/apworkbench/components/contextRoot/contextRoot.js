define(function () {
	var _root = ''
	return {
		get : function() {
			return window.baseUrl;
			/* 实现太丑陋，之后需要portal配合修改
			var root;

			if (typeof _root == 'function') {
				root = _root();
			} else {
				root = _root;
			}

			if (typeof root == 'string') {
				return root;
			}
			else {
				return '';
			}
			*/
		},
		set : function(root) {
			window.baseUrl = root;
			// _root = root;
			return this;
		}
	}
})