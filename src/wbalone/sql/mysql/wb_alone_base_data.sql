
-- ----------------------------
-- Records of app_user
-- ----------------------------
INSERT INTO `app_user` VALUES ('1', 'admin', '系统管理员', '691b14d79bf0fa2215f155235df5e670b64394cc', '7efbd59d9741d34f', 'admin', '1', '2016-06-28 21:26:37', null, 'tenant', '2', 'business', '13255555555', '333333', null, null, 'false', null, null, null, null, null);
INSERT INTO `app_user` VALUES ('831412fb19bd42739c20640a7be4534a', 'normaladmin', '商户管理员', '691b14d79bf0fa2215f155235df5e670b64394cc', '7efbd59d9741d34f', 'user', '1', '2016-07-15 13:57:16', null, 'tenant', '3', 'business', '13255556666', '', null, null, 'false', null, null, null, null, null);
INSERT INTO `app_user` VALUES ('c0b207800aa34fe68303d3c2d5fdaee0', 'normaluser', '普通用户', 'cbcf9a5967f141f65c5c00849610f1b9724c2e55', 'e1b0eba1e098a995', 'user', '1', '2016-06-26 23:24:04', null, 'tenant', '4', 'business', '13255555566', '', null, null, 'false', null, null, null, null, null);

-- ----------------------------
-- Records of ieop_role
-- ----------------------------
INSERT INTO `ieop_role` VALUES ('WB00001', '管理员', 'admin', '3', 'Y', '2016-05-21 16:36:55', 'tennant', 'business', 'WBRole', null, null, null, null);
INSERT INTO `ieop_role` VALUES ('WB00002', '普通角色', 'normal', '4', 'Y', '2016-05-11 16:36:55', 'tenant', 'business', 'WBRole', null, null, null, null);

-- ----------------------------
-- Records of pt_layout
-- ----------------------------
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<div class=\"row-fluid\">\r\n				<Widget gadgetURL=\"/apworkbench/gadgets/MyAuthAfterRoleMgrWidget.xml?id=MyAuthAfterRoleMgrWidget&amp;lid=after_rolemgrwidget\" id=\"MyAuthAfterRoleMgrWidget\"></Widget>\r\n			</div>\r\n		</div>\r\n	</aside>\r\n	\r\n</div>', 'after_rolemgrwidget', 'auth_after_rolemgrwidget', 'auth_after_rolemgrwidget', '2015-11-27 14:42:38', '', '', '', 'cnzc65be', '', '2015-11-27 14:42:38', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div class=\"bgsome\">\r\n\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<div class=\"row-fluid\">\r\n				<Widget gadgetURL=\"/apworkbench/gadgets/MyAuthAfterRoleMgr.xml?id=MyAuthAfterRoleMgr&amp;lid=auth_after_rolemgr\" id=\"MyAuthAfterRoleMgr\"></Widget>\r\n			</div>\r\n		</div>\r\n	</aside>\r\n	\r\n</div>', 'auth_after_rolemgr', 'auth_after_rolemgr', 'auth_after_rolemgr', '2015-11-27 14:42:38', '', '', '', 'cnzc65be', '', '2015-11-27 14:42:38', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<div class=\"row-fluid\">\r\n				<Widget gadgetURL=\"/apworkbench/gadgets/manager/system/addApp.xml?id=addApp&amp;lid=systemapp\" id=\"addApp\"></Widget>\r\n			</div>\r\n		</div>\r\n	</aside>\r\n</div>', 'dsfasxxadfsfsafeeee', 'systemapp', 'systemapp', '2015-12-16 16:04:48', '', '', '', 'cnzc65be', '', '2015-12-16 16:04:48', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/menuMgr/menuMgr.xml?id=menuMgr&amp;lid=menuMgr\" id=\"menuMgr\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'menuMgr', 'menuMgr', 'menuMgr', '2016-01-26 16:32:48', '', '', '', 'cnzc65be', '', '2016-01-26 16:32:48', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget gadgetURL=\"/apworkbench/gadgets/appmgr/appmgr.xml?id=myappmgr&amp;lid=myappmgr\" id=\"myappmgr\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'myappmgr', 'myappmgr', 'myappmgr', '2016-01-26 16:32:48', '', '', '', 'cnzc65be', '', '2016-01-26 16:32:48', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/permission/tenant.xml?id=permissionTenant&amp;lid=permissionTenant\" id=\"permissionTenant\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'permissionTenant', 'permissionTenant', 'permissionTenant', '2016-01-28 10:27:18', '', '', '', 'cnzc65be', '', '2016-01-28 10:27:18', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/permission/user.xml?id=permissionUser&amp;lid=permissionUser\" id=\"permissionUser\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'permissionUser', 'permissionUser', 'permissionUser', '2016-01-28 10:27:28', '', '', '', 'cnzc65be', '', '2016-01-28 10:27:28', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/permission/userInfo.xml?id=permissionUserInfo&amp;lid=permissionUserInfo\" id=\"permissionUserInfo\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'permissionUserInfo', 'permissionUserInfo', 'permissionUserInfo', '2016-01-28 10:27:18', '', '', '', 'cnzc65be', '', '2016-01-28 10:27:18', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div class=\"col-md-12 ui-grid\" id=\"widgetbox1\">\r\n<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/index/home.xml?id=home&amp;lid=puhome\" id=\"home\"></Widget>\r\n</div>', 'puhome', 'puhome', 'puhome', '2016-01-28 10:27:18', '', '', '', 'cnzc65be', '', '2016-01-28 10:27:18', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div class=\"content-wrapper roleapplist\">\r\n	<Widget gadgetURL=\"/apworkbench/gadgets/Myapplist.xml?id=Myapplist&amp;lid=roleapplication\" id=\"Myapplist\"></Widget>\r\n</div>', 'roleapplication', 'roleapplication', 'roleapplication', '2015-11-23 13:16:57', '', '', '', 'cnzc65be', '', '2015-11-23 13:16:57', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget gadgetURL=\"/apworkbench/gadgets/permission/roleManage.xml?id=roleManage&amp;lid=roleManage\" id=\"roleManage\"></Widget>\r\n		</div>\r\n	</aside>', 'roleManage', 'roleManage', 'roleManage', '2016-03-01 21:17:27', '', '', '', 'cnzc65be', '', '2016-03-01 21:17:27', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n		<Widget gadgetURL=\"/apworkbench/gadgets/permission/appAuth.xml?id=appAuth&amp;lid=rolemgr\" id=\"appAuth\"></Widget>\r\n	</div>\r\n	</aside>\r\n</div>', 'rolemgr', 'rolemgr', 'rolemgr', '2015-11-23 13:16:49', '', '', '', 'cnzc65be', '', '2015-11-23 13:16:49', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget gadgetURL=\"/apworkbench/gadgets/MyRoleDeskDesign.xml?id=MyRoleDeskDesign&amp;lid=rolemgrdesign\" id=\"MyRoleDeskDesign\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'rolemgrdesign', 'rolemgrdesign', 'rolemgrdesign', '2015-11-23 13:16:49', '', '', '', 'cnzc65be', '', '2015-11-23 13:16:49', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget gadgetURL=\"/apworkbench/gadgets/permission/widgetAuth.xml?id=widgetAuth&amp;lid=rolemgrwidget\"\r\n				id=\"widgetAuth\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'rolemgrwidget', 'rolemgrwidget', 'rolemgrwidget', '2015-11-23 13:16:49', '', '', '', 'cnzc65be', '', '2015-11-23 13:16:49', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/manager/structure/structure.xml?id=structure&amp;lid=structure\"\r\n				id=\"structure\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'structure', 'structure', 'structure', '2016-01-06 09:44:28', '', '', '', 'cnzc65be', '', '2016-01-06 09:44:28', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div class=\"col-md-12 ui-grid\" id=\"widgetbox1\">\r\n	<Widget	gadgetURL=\"/apworkbench/gadgets/index/supplyhome.xml?id=supplyhome&amp;lid=supplyhome\" id=\"supplyhome\"></Widget>\r\n</div>', 'supplyhome', 'supplyhome', 'supplyhome', '2016-01-12 13:32:23', '', '', '', 'cnzc65be', '', '2016-01-12 13:32:23', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div class=\"content-wrapper roleapplist\">\r\n	<Widget gadgetURL=\"/apworkbench/gadgets/sysmenuapplist.xml?id=sysmenuapplist&amp;lid=sysmgr\" id=\"sysmenuapplist\"></Widget>\r\n</div>', 'sysmgr', 'sysmgr', 'sysmgr', '2015-11-23 13:16:57', '', '', '', 'cnzc65be', '', '2015-11-23 13:16:57', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/permission/app.xml?id=permissionTenant&amp;lid=tenantApp\"\r\n				id=\"permissionTenant\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'tenantApp', 'tenantApp', 'tenantApp', '2016-01-28 10:27:18', '', '', '', 'cnzc65be', '', '2016-01-28 10:27:18', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div>\r\n	<aside class=\"content-wrapper sidebarLeft rolemgrright\">\r\n		<div class=\"content container-fluid sidebarRight\">\r\n			<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/permission/auth.xml?id=permissionTenant&amp;lid=tenantAuth\"\r\n				id=\"permissionTenant\"></Widget>\r\n		</div>\r\n	</aside>\r\n</div>', 'tenantAuth', 'tenantAuth', 'tenantAuth', '2016-01-28 10:27:18', '', '', '', 'cnzc65be', '', '2016-01-28 10:27:18', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div class=\"content-wrapper widgetlist-wrap\">\r\n	<Widget gadgetURL=\"/apworkbench/gadgets/widgetlist.xml?id=widgetlist&amp;lid=widgetlist\" id=\"widgetlist\"></Widget>\r\n</div>', 'widgetlist', 'widgetlist', 'widgetlist', '2015-11-27 14:28:35', '', '', '', 'cnzc65be', '', '2015-11-27 14:28:35', '', '', 'workbench1', null, null);
INSERT INTO `pt_layout` VALUES ('wbdefault', '<div class=\"col-md-12 ui-grid\" id=\"widgetbox1\">\r\n<Widget\r\n				gadgetURL=\"/apworkbench/gadgets/icop/layout/xmdtlayout.xml?id=xmdtlayout&amp;lid=xmdt\"\r\n				id=\"xmdtlayout\"></Widget>\r\n</div>', 'xmdt', 'xmdt', 'xmdt', '2016-01-12 13:32:23', '', '', '', 'cnzc65be', '', '2016-01-12 13:32:23', '', '', 'workbench1', null, null);

-- ----------------------------
-- Records of pt_layout_template
-- ----------------------------
INSERT INTO `pt_layout_template` VALUES ('column4-8', '两列4-8', '<div class=\"row\"><div class=\"col-md-4 ui-grid\" id=\"widgetbox1\"></div><div class=\"col-md-8 ui-grid\" id=\"widgetbox2\">col-md-8</div></div>', '12122t33j', null, null, 'tenant', null, null);
INSERT INTO `pt_layout_template` VALUES ('column6-6', '两列6-6', '<div class=\"row\"><div class=\"col-md-6 ui-grid\" id=\"widgetbox1\"></div><div class=\"col-md-6 ui-grid\" id=\"widgetbox2\">col-md-6</div></div>', '1212qweq4', null, null, 'tenant', null, null);
INSERT INTO `pt_layout_template` VALUES ('column12', '一列12', '<div class=\"col-md-12 ui-grid\" id=\"widgetbox1\"></div>', '121312332', null, null, 'tenant', null, null);
INSERT INTO `pt_layout_template` VALUES ('column8-4', '两列8-4', '<div class=\"row\"><div class=\"col-md-8 ui-grid\" id=\"widgetbox1\"></div><div class=\"col-md-4 ui-grid\" id=\"widgetbox2\">col-md-4</div></div>', '12wwq656', null, null, 'tenant', null, null);
INSERT INTO `pt_layout_template` VALUES ('column4-4-4', '三列4-4-4', '<div class=\"row\"><div class=\"col-md-4 ui-grid\" id=\"widgetbox1\"></div><div class=\"col-md-4 ui-grid\" id=\"widgetbox2\">col-md-4</div><div class=\"col-md-4 ui-grid\" id=\"widgetbox3\">col-md-4</div></div>', '1qweqweq', null, null, 'tenant', null, null);
INSERT INTO `pt_layout_template` VALUES ('row2-column2-home', '二行二列-首页', '<div class=\"row\"><div class=\"col-md-6\"><div><div class=\"col-md-6 ui-grid\" id=\"widgetbox1\"></div><div class=\"col-md-6 ui-grid\" id=\"widgetbox2\"></div></div><div><div class=\"col-md-12 ui-grid\" id=\"widgetbox3\"></div></div></div><div class=\"col-md-6\"><div><div class=\"col-md-6 ui-grid\" id=\"widgetbox4\"></div><div class=\"col-md-6 ui-grid\" id=\"widgetbox5\"></div></div><div><div class=\"col-md-12 ui-grid\" id=\"widgetbox6\"></div></div></div></div>', 'pt00000000000000000001', null, null, 'tenant', null, null);

-- ----------------------------
-- Records of pt_widget_category
-- ----------------------------
INSERT INTO `pt_widget_category` VALUES ('workbench', 'QQE123212432411', '工作台', '', 'Y', '1', '', '3EVTJlzU', null, null);

-- ----------------------------
-- Records of wb_app_apps
-- ----------------------------
INSERT INTO `wb_app_apps` VALUES ('8fbbaea1767d48d38bc47f397555ec30', 'default', '', '2', '274833475802f3ccc5a75cedcac6f239', 'apworkbench/default.html', '', '默认首页', 'icon-C-home', '', 'index', '', 'tenant', 'url', '0', 'workbench', '');

-- ----------------------------
-- Records of wb_app_groups
-- ----------------------------
INSERT INTO `wb_app_groups` VALUES ('2', '销售 ', '2', '274833475802f3ccc5a75cedcac6f239', 'tenant');
INSERT INTO `wb_app_groups` VALUES ('3', '基本档案', '3', '274833475802f3ccc5a75cedcac6f239', 'tenant');
INSERT INTO `wb_app_groups` VALUES ('5', '其他 ', '5', '274833475802f3ccc5a75cedcac6f239', 'tenant');
INSERT INTO `wb_app_groups` VALUES ('6', '采购', '6', '274833475802f3ccc5a75cedcac6f239', 'tenant');
INSERT INTO `wb_app_groups` VALUES ('9', '系统配置', '9', '274833475802f3ccc5a75cedcac6f239', 'tenant');

-- ----------------------------
-- Records of wb_app_menu
-- ----------------------------
INSERT INTO `wb_app_menu` VALUES ('M0000000000001', '0', '0', 'Y', 'Y', 'Y', '0', '0', '0', '0', '2016-06-28 21:28:21', '0', 'tenant', '0', 'business', null, null);
INSERT INTO `wb_app_menu` VALUES ('4949dc034c70483d97853c2ffc64c664', 'index', 'appIcon icon-C-home', 'Y', 'Y', 'N', 'M0000000000001', null, 'index', '0', '2016-07-23 14:01:07', '首页', 'tenant', '3', 'business', null, null);
INSERT INTO `wb_app_menu` VALUES ('bddfdecc66b2401ca36d9a0a8caaf795', 'roleapplication', 'appIcon icon-C-photo', 'Y', 'Y', 'N', 'M0000000000001', null, '#roleapplication', '2', '2016-08-01 11:09:55', '应用中心', 'tenant', '0', 'business', null, null);

-- ----------------------------
-- Records of wb_areas
-- ----------------------------
INSERT INTO `wb_areas` VALUES ('274833475802f3ccc5a75cedcac6f239', 'workbench', '工作台', 'Y', '1', 'tenant');

-- ----------------------------
-- Records of wb_label
-- ----------------------------
INSERT INTO `wb_label` VALUES ('L001', '2016-06-16 21:18:36', 'rolemgr', '系统管理员', null, null, 'sysperson', '1');
INSERT INTO `wb_label` VALUES ('L002', '2016-06-16 21:18:53', 'rolemgr', '商户管理员', null, null, 'buiperson', '1');
INSERT INTO `wb_label` VALUES ('L003', '2016-06-16 21:18:53', 'normalrole', '商户级普通角色', '', '', 'buiperson', '1');
INSERT INTO `wb_label` VALUES ('L005', '2016-06-16 21:18:53', 'widget', '系统级小部件', '', '', 'syssource', '1');
INSERT INTO `wb_label` VALUES ('L006', '2016-06-16 21:18:53', 'app', '系统级小应用', '', '', 'syssource', '1');
INSERT INTO `wb_label` VALUES ('L007', '2016-07-22 11:34:42', 'app', '商户级小应用', null, null, 'buisource', '1');
INSERT INTO `wb_label` VALUES ('L008', '2016-07-22 11:33:42', 'widget', '商户级小部件', null, null, 'buisource', '1');
INSERT INTO `wb_label` VALUES ('L009', '2016-06-16 21:18:36', 'menu', '系统级菜单', '', '', 'syssource', '1');
INSERT INTO `wb_label` VALUES ('L010', '2016-06-16 21:18:36', 'menu', '商户级菜单', '', '', 'buisource', '1');
INSERT INTO `wb_label` VALUES ('L011', '2016-06-16 21:18:36', 'common', '公共资源', '', '', 'commonsource', '1');

-- ----------------------------
-- Records of wb_label_relation
-- ----------------------------
INSERT INTO `wb_label_relation` VALUES ('03f6aae2439440a69b6f6058352e26f2', 'common', 'messageCenter', '2016-08-01 16:14:38', null, null, null, 'a307573f801b48a585e90cc0899db16b', '1');
INSERT INTO `wb_label_relation` VALUES ('09b5806120794f10befbd27de94c9a63', 'common', '666', '2016-07-16 16:17:48', null, null, null, 'e060c53ab9d84b04a6f22760d518d75f', '1');
INSERT INTO `wb_label_relation` VALUES ('1111111111', 'common', 'index', '2016-07-16 14:22:08', null, null, '', '8fbbaea1767d48d38bc47f397555ec30', '1');
INSERT INTO `wb_label_relation` VALUES ('1aa7bffa7a9b4856aa35fce2fbdc7b93', 'common', 'SfhHS73jXmv2n5g4Rt5v6x', '2016-08-01 16:36:30', 'tenant', null, null, 'myMsg', '2');
INSERT INTO `wb_label_relation` VALUES ('49c47fc5cd6f44caa589a02abd506729', 'common', '33333', '2016-08-01 10:26:50', null, null, null, '07e2d68b8b9649a69cbc284a462dc6e9', '1');
INSERT INTO `wb_label_relation` VALUES ('5fb330ebdd5d4f47987131e0bafa609f', 'common', 'taskCenter', '2016-08-01 14:25:06', null, null, null, 'b9152720a3154439ad7d8323dac90b09', '1');
INSERT INTO `wb_label_relation` VALUES ('96db7dc612a14e45a9c4dc9a6a674942', 'common', '11', '2016-07-28 09:42:17', null, null, null, '3dc67aec5dfc43f8ad7e417f27ff96f0', '1');
INSERT INTO `wb_label_relation` VALUES ('c1d4e583e0464116a23a16e235eaa30e', 'common', '6661', '2016-07-16 16:18:15', null, null, null, 'd72f1b4f10974e20aba83a075d5b4932', '1');
INSERT INTO `wb_label_relation` VALUES ('e05765a60d7e46248a4aba90e0a464a0', 'common', 'roleapplication', '2016-08-01 10:29:43', null, null, null, 'd3e97a77812943fdbf23eea88cc4175e', '1');

-- ----------------------------
-- Records of wb_menu
-- ----------------------------
INSERT INTO `wb_menu` VALUES ('M0000000000001', '0', '0', '0', 'N', '0', '0', '0', '0', '0', '2016-07-05 18:47:31', '0', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('0152697308634efb8202da25236b1311', '03', '', 'Y', 'N', 'N', 'M0000000000001', '', 'http://songhlc:82/portal/purchase#/pages/order/purorder', '4', '2016-07-05 18:47:31', '云采用户管理', '3', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000008', 'application', 'icon-application', 'Y', 'Y', 'N', 'M0000000000002', '', 'systemapp', '1', '2016-07-05 18:47:31', '小应用管理', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000011', 'auth_app', 'icon-smallauthorization', 'Y', 'Y', 'N', 'M0000000000004', '', 'rolemgr', '4', '2016-07-05 18:49:04', '小应用授权', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000010', 'auth_widget', 'icon-xiaobujianshouquan', 'Y', 'Y', 'N', 'M0000000000004', '', 'rolemgrwidget', '3', '2016-07-05 18:49:01', '小部件授权', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000018', 'menu_mgr', '', 'Y', 'N', 'N', 'M0000000000002', '', 'menuMgr', '5', '2016-07-05 18:47:32', '管理员菜单', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000024', 'my_app', 'icon-menu', 'Y', 'Y', 'N', 'M0000000000002', '', 'myappmgr', '2', '2016-07-05 18:47:32', '菜单设置', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000004', 'permission', 'fa-user', 'Y', 'Y', 'Y', 'M0000000000001', '', '', '2', '2016-07-05 18:47:32', '权限管理', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000023', 'role_app', 'icon-rolemanagement', 'Y', 'Y', 'N', 'M0000000000004', '', 'roleManage', '1', '2016-07-05 18:48:16', '角色管理', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000021', 'role_workbench_application', '', 'Y', 'N', 'N', 'M0000000000005', '', '', '4', '2016-07-05 18:47:32', '角色应用模板', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000005', 'role_workbench_design', 'fa-group', 'Y', 'Y', 'Y', 'M0000000000001', '', '', '5', '2016-07-05 18:47:32', '角色工作台设计', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000012', 'role_workbench_template', 'icon-icon4', 'Y', 'Y', 'N', 'M0000000000005', '', 'rolemgrdesign', '1', '2016-07-05 18:47:32', '工作台设计', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M00000000000024', 'smail_widget', 'icon-thewidget', 'Y', 'Y', 'N', 'M0000000000002', '', '/widget', '1', '2016-07-05 18:47:32', '小部件管理', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000002', 'system', 'fa-laptop', 'Y', 'Y', 'Y', 'M0000000000001', '', '', '3', '2016-07-05 18:47:32', '系统管理', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M00000000000016', 'tenant', 'icon-company', 'N', 'N', 'N', 'M00000000000015', '', 'permissionTenant', '1', '2016-07-15 13:58:15', '公司信息', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('74f28543cf924a9fbb607f632ff5a350', 'tenantApp', 'icon-license', 'N', 'N', 'N', 'M00000000000015', '', 'tenantApp', '1', '2016-07-15 13:58:14', '许可', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('ab471acbaefc484d9fd1423b872f0777', 'tenantAuth', '', 'N', 'Y', 'N', 'M00000000000015', '', 'tenantAuth', '2', '2016-07-05 18:47:33', '应用授权', '0', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M00000000000015', 'tenantmgr', 'fa-user', 'Y', 'Y', 'Y', 'M0000000000001', '', '', '1', '2016-07-05 18:47:33', '公司设置', '1', 'tenant', 'business', '');
INSERT INTO `wb_menu` VALUES ('M0000000000022', 'user_app', 'icon-adminmanagement', 'Y', 'Y', 'N', 'M0000000000004', '', 'permissionUser', '2', '2016-07-05 18:48:51', '用户管理', '0', 'tenant', 'business', '');

