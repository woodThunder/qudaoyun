define(['text!./metadatamanage.html', 'fmcg_common', './meta.js'],
    function (tpl, common, model) {
        'use strict'
        var baseData, events, rendertype, viewModel, dialog;
        baseData = {
          BusiEntityParent: new u.DataTable(model.options.metas.BusiEntityMeta),
          BusiEntityFieldChild: new u.DataTable(model.options.metas.BusiEntityFieldMeta),
          DefaultTpl: new u.DataTable(model.options.metas.DefaultTplMeta),  //默认模板
          TemplateType: new u.DataTable(model.options.metas.TemplateTypeMeta),  //全部可选模板类型
          TabEditParent: new u.DataTable(model.options.metas.BusiEntityMeta), //页签编辑模型
          busiObjectSrc: ko.observableArray([]),
          searchcomp: {},
          searchSource: model.options.searchs.search1,
          grid1Option: model.options.grids.grid1,
          grid2Option: model.options.grids.grid2,
          grid3Option: model.options.grids.grid3,
          baseurl: "/occ-base/base/busientitys",
          tabEditFormStatus: ko.observable(),//页签编辑表单状态  add: 新增; upd: 修改
        };
        baseData.TemplateType.setSimpleData(CONST.TEMPLATETYPE, {unSelect: true});
        model.options.searchs.search1[0].dataSource = baseData.busiObjectSrc;
        rendertype = {
            operation: common.rendertype.adddeloperation,
            enableStatusRender: function(params) {
              if(params.value === "1") { //已启用
                params.element.innerHTML = '<span class="" style="color:green">已启用</span>';
              }
              else {//未启用
                params.element.innerHTML = '<span class="" style="color:red">未启用</span>';
              }
            },
            itemTypeRender: function(params) {
              var showName = common.dataconvert.valueToName(params.value, CONST.TEMPLATEITEMTYPE);
              !showName ? showName = "" : "";
              params.element.innerHTML = showName;
            },
        };
        events = {
            //显示编辑面板
            showEditPanel: function() {
              var curRow = viewModel.BusiEntityParent.getSelectedRows()[0];
              viewModel.BusiEntityParent.setRowFocus(curRow);
              var busientity = curRow.getValue('code');
              viewModel.findById(busientity, function afterSearch(data) {
                viewModel.BusiEntityFieldChild.setSimpleData(data);
                $('.ui-list-panel').hide();
                $('.ui-bill-panel').show();
              });
            },
            //取消编辑
            cancelEdit: function() {
              $('.ui-bill-panel').hide();
              $('.ui-list-panel').show();
              viewModel.search();
            },
            //保存模板编辑器
            saveBill: function() {
              var saveData = viewModel.BusiEntityFieldChild.getSimpleData();
              $._ajax({
                type: 'post',
                url: '/fmcg-dynamic-object/dynamic/busientity-meta-datas/saves',
                contentType: 'application/json; charset:utf-8',
                data: JSON.stringify(saveData),
                success: function(data) {
                  if(data.success == "1") {
                    $('.ui-bill-panel').hide();
                    $('.ui-list-panel').show();
                    viewModel.search();
                  }
                  else {
                    toastr.error(data.msg);
                  }
                }
              });
            },
             // 操作区和表格头部固定
            fixHeight: function () {
              //表格头部尚未渲染，则稍后执行
              if($(".ui-list-panel .u-grid-header").length ===0) {
                setTimeout(viewModel.fixHeight, 0);
              }
                var $headHeight;
                if ($(".ui-list-panel-head").length > 0) {
                    $headHeight = $(".ui-list-panel-head").outerHeight(true);
                } else if ($(".ui-list-panel-head-operation").length > 0) {
                    $headHeight = $(".ui-list-panel-head-operation").outerHeight(true);
                }
                var $gridHeadWidth = $(".ui-panel-body").outerWidth(true);
                var cusH = $headHeight + "px";
                var gridHeadHeight  = $headHeight + "px";
                var headBgH = $headHeight + "px";
                $(".ui-panel-body").css({
                    "margin-top": cusH,
                    "border-top": "none",
                });
                $(".ui-list-panel-head").css({
                    "position": "fixed",
                    "top": "0",
                    "z-index": "1002",
                    "background": "#fff",
                    "padding-right": "30px",
                });
                $(".ui-list-panel .u-grid-header").eq(0).css({
                    "position": "fixed",
                    "width": $gridHeadWidth,
                    "top": gridHeadHeight,
                    "z-index": "1001",
                    "border-top": "1px solid #3CA4FB",
                });
                $(".ui-list-panel .u-grid").eq(0).css({
                    "padding-top": "47px",
                });
                $(".head-bg").css({
                    "width": "100%",
                    "position": "fixed",
                    "top": "0",
                    "height": headBgH,
                    "background": "#fff",
                    "z-index": "1000"
                });
            },
            //根据条件搜索数据(根据是否点击搜索按钮，判断是否需要重置页码)
            search: function (reindex) {
                if (reindex) {
                    viewModel.BusiEntityParent.pageIndex(0);
                }
                $('.ui-head-operation-close').trigger('click');
                var queryData = viewModel.searchcomp.getDataWithOpr();
                queryData.size = viewModel.BusiEntityParent.pageSize();
                queryData.page = viewModel.BusiEntityParent.pageIndex();
                queryData.sort = "ts,desc";
                $._ajax({
                    type: "get",
                    url: viewModel.baseurl,
                    dataType: "json",
                    data: queryData,
                    success: function (data) {
                      // var data = {
                      //   totalElements: 15,
                      //   totalPages: 2,
                      //   content: [
                      //     {
                      //         "id": "8047b532-dab9-44a6-96da-def1dd9991cb",
                      //         "dr": 0,
                      //         "ts": 1541064778608,
                      //         "creator": null,
                      //         "creationTime": 1541064778000,
                      //         "modifier": null,
                      //         "modifiedTime": null,
                      //         "persistStatus": "nrm",
                      //         "oldValue": null,
                      //         "promptMessage": null,
                      //         "code": "customer-pc-edit",
                      //         "name": "客户端pc编辑页面",
                      //         "templateType": "pc-edit",
                      //         "busiObject": "customer"
                      //     }
                      //   ]
                      // };
                      viewModel.BusiEntityParent.setSimpleData(data.content, {unSelect: true});
                      viewModel.BusiEntityParent.totalRow(data.totalElements);
                      viewModel.BusiEntityParent.totalPages(data.totalPages);
                      $(".ui-list-panel-head").removeClass("operation");
                      viewModel.fixHeight();
                    }
                });
            },
            cleanSearch: function () {
                viewModel.searchcomp.clearSearch();
            },
            //页码改变时的回调函数
            pageChange: function (index) {
                viewModel.BusiEntityParent.pageIndex(index);
                viewModel.search();
            },
            //页码改变时的回调函数
            sizeChange: function (size) {
                viewModel.BusiEntityParent.pageSize(size);
                viewModel.search(true);
            },
            handleListRowSelect: function (obj) {
                var selectedRows = obj.gridObj.dataTable.getSelectedRows();
                var $list_head = $(".ui-list-panel-head");
                // 所有行反选，则列表头部显示查询区
                if (selectedRows.length == 0) {
                    $list_head.removeClass("operation");
                }
                // 存在行选中，则列表头部显示操作区
                else {
                    $list_head.hasClass("operation") ? '' : $list_head.addClass("operation");
                }
                viewModel.fixHeight();
            },
            //删除模板
            del: function() {
              common.dialog.confirmDialog({
                  msg1: '确认删除这些项？',
                  msg2: '此操作不可逆',
                  width: '400px',
                  type: 'error',
                  onOk: function () {
                    var ids = [];
                    var selectedRows = viewModel.BusiEntityParent.getSelectedRows();
                    for(var i=0; i<selectedRows.length; i++) {
                      ids.push(selectedRows[i].getValue('id'));
                    }
                    $._ajax({
                      type: 'get',
                      url: viewModel.baseurl + '/del',
                      data: {
                        trantemplateId: ids.join(',')
                      },
                      success: function(data) {
                        if(data.success == "1") { //删除成功
                          viewModel.search();
                        }
                        else {  //删除失败
                          toastr.error(data.msg);
                        }
                      }
                    });
                  }
              });
            },
            //详情
            detail: function(rowId) {
              var curRow = viewModel.BusiEntityParent.getRowByRowId(rowId);
              var busientity = curRow.getValue('code');
              viewModel.findById(busientity, function afterSearch(data) {
                viewModel.BusiEntityFieldChild.setSimpleData(data);
                $('.ui-list-panel').hide();
                $('.ui-bill-detail').show();
              });
            },
            //详情跳转列表
            detail2list: function() {
              $('.ui-bill-detail').hide();
              $('.ui-list-panel').show();
            },
            //根据id查询完整数据
            findById: function(id, afterSearch) {
              $._ajax({
                type: 'get',
                url: '/fmcg-dynamic-object/dynamic/busientity-meta-datas',
                data: {
                  "search_EQ_busientity": id,
                  page: 0,
                  size: 999,
                },
                success: function(data) {
                  //排序：启用预置字段 => 启用扩展字段ext由小至大  => 未启用扩展字段ext由小至大
                  var enabledData = [];
                  var enabledExtData = [];
                  var noenabledExtData = [];
                  for(var i=0; i<data.content.length; i++) {
                    var rowdata = data.content[i];
                    if(rowdata.enable == "1" && rowdata.isExtend == "0") {
                      enabledData.push(rowdata);
                    }
                    else if(rowdata.enable == "1" && rowdata.isExtend == "1") {
                      enabledExtData.push(rowdata);
                    }
                    else {
                      noenabledExtData.push(rowdata);
                    }
                  }
                  function extSorter(a, b) {
                    if(a.key.indexOf('ext') === -1) {
                      return 1;
                    }
                    var aExtOrder = a.key.slice(3);
                    aExtOrder = parseInt(aExtOrder);
                    var bExtOrder = b.key.slice(3);
                    bExtOrder = parseInt(bExtOrder);
                    if(!u.isNumber(aExtOrder) || !u.isNumber(bExtOrder)) {
                      return 0;
                    }
                    return aExtOrder - bExtOrder;
                  }
                  //排序： 不符合ext命名规则的 => ext由小至大
                  enabledExtData.sort(extSorter);
                  noenabledExtData.sort(extSorter);
                  afterSearch && afterSearch(enabledData.concat(enabledExtData, noenabledExtData));
                },
              })
            },
            //显示生成初始模板对话框
            showDefaultTplDialog: function() {
              viewModel.defaultTplDialog = u.dialog({
                content: "#defaultTplDialog",
                width: "800px",
              });
              viewModel.TemplateType.setAllRowsUnSelect();
              viewModel.DefaultTpl.removeAllRows();
              var curRow = viewModel.DefaultTpl.createEmptyRow();
              viewModel.DefaultTpl.setRowFocus(curRow);
            },
            //选择/反选模板类型
            toggleTemplateType: function(selectedRow) {
              selectedRow.toggleSelect();
            },
            //确认生成模板
            confirmGenerateDefaultTpl: function() {
              var curRow = viewModel.DefaultTpl.getCurrentRow();
              var selectedTemplateType = viewModel.TemplateType.getSelectedRows();
              var templateTypes = [];
              for(var i=0; i<selectedTemplateType.length; i++) {
                templateTypes.push(selectedTemplateType[i].getValue('value'));
              }
              var requestData = {
                overwrite: "0", //如果存在相应初始模板，提示用户
                busiObject: curRow.getValue('busiObject'),
                templateType: templateTypes.join(","),
              };
              $._ajax({
                type: 'post',
                url: '/fmcg-dynamic-object/dynamic/trantemplates/default/generate-default',
                contentType: "application/json; charset:utf-8",
                data: JSON.stringify(requestData),
                success: function(data) {
                  if(data.success == "0") {
                    toastr.error(data.msg);
                  }
                  else if(data.success == "1") {
                    viewModel.defaultTplDialog.close();
                    toastr.success("初始模板生成成功");
                  }
                  else {
                    var tipMsg = "已存在如下初始模板，是否覆盖？<br>";
                    tipMsg +=  data.existedTemplate.join('<br>');
                    common.dialog.confirmDialog({
                        msg1: tipMsg,
                        msg2: '',
                        width: '400px',
                        type: 'warning',
                        onOk: function () {
                          //强制覆盖已经初始模板
                          $._ajax({
                            type: 'post',
                            url: '/fmcg-dynamic-object/dynamic/trantemplates/default/generate-default',
                            contentType: 'application/json; charset:utf-8',
                            data: JSON.stringify({
                              overwrite: "1", //强制覆盖已经初始模板
                              busiObject: curRow.getValue('busiObject'),
                              templateType: templateTypes.join(","),
                            }),
                            success: function(data2) {
                              if(data2.success == "1") {
                                viewModel.defaultTplDialog.close();
                                toastr.success("初始模板生成成功");
                              }
                              else {
                                toastr.error(data2.msg);
                              }
                            }
                          });
                        }
                    });
                  }
                },
              });
            },
            //取消生成模板
            cancelGenerateDefaultTpl: function() {
              viewModel.defaultTplDialog.close();
            },
            //新增页签
            addTab: function() {
              var curRow = viewModel.TabEditParent.createEmptyRow();
              viewModel.TabEditParent.setRowFocus(curRow);
              curRow.setValue("isMain", "0");
              curRow.setValue("entityType", "1");
              viewModel.showTabEditDialog();
              viewModel.tabEditFormStatus("add");
            },
            //修改页签
            updateTab: function() {
              var curRow = viewModel.TabEditParent.createEmptyRow();
              viewModel.TabEditParent.setRowFocus(curRow);
              var selectedRowData = viewModel.BusiEntityParent.getSelectedRows()[0].getSimpleData();
              curRow.setSimpleData(selectedRowData);
              viewModel.showTabEditDialog();
              viewModel.tabEditFormStatus("upd");
            },
            //弹出页签编辑对话框
            showTabEditDialog: function() {
              viewModel.tabEditDialog = u.dialog({
                content: "#tabEditDialog",
                width: "600px",
              });
            },
            //取消保存页签
            cancelSaveTab: function() {
              viewModel.tabEditDialog.close();
              viewModel.search();
            },
            //保存页签
            saveTab: function() {
              var saveData = viewModel.TabEditParent.getFocusRow().getSimpleData();
              var saveUrl = "";
              if(viewModel.tabEditFormStatus() === "add") {//新增保存
                saveUrl = "/occ-base/base/busientitys/save-busientity";
              }
              else {//修改保存
                saveUrl = "/occ-base/base/busientitys/update-busientity";
              }
              $._ajax({
                type: 'post',
                url: saveUrl,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(saveData),
                success: function(data) {
                  if(data.success === "1") {
                    toastr.success("保存成功");
                    viewModel.tabEditDialog.close();
                    viewModel.search(true);
                  }
                  else {
                    toastr.error("保存失败");
                  }
                },
              });
            },
            //删除页签
            delTab: function() {
              var delId = viewModel.BusiEntityParent.getSelectedRows()[0].getValue('id');
              $._ajax({
                type: 'get',
                url: '/occ-base/base/busientitys/del-busientity',
                data: {
                  id: delId
                },
                success: function(data) {
                  if(data.success === "1") {
                    toastr.success("删除页签成功");
                    viewModel.search();
                  }
                  else {
                    toastr.error("删除页签失败");
                  }
                },
              });
            },
        }

        viewModel = u.extend({}, baseData, events, common.rendertype, rendertype);

        function afterBodyRender() {
          //点击模板表体项
          $('.ui-template-body').on('click', '.ui-template-table-th', function(e) {
            var field = $(this).attr('data-field');
            var objectkey = $(this).attr('data-objectkey');
            var curRow = viewModel.BusiTemplateChilds[objectkey].getRowByField("key", field);
            viewModel.BusiTemplateChilds[objectkey].setRowFocus(curRow);
            $('.ui-template-property').hide();
            $('.ui-template-property[data-objectkey='+objectkey+']').show();
            $('.ui-template-focus').removeClass('ui-template-focus');
            $(this).addClass('ui-template-focus');
          });
        }

        function afterRender() {

            //操作区关闭 切换到查询区
            $(".ui-head-operation-close").on("click", function (e) {
                var $list_head = $(this).parents(".ui-list-panel-head");
                $list_head.removeClass("operation");
                viewModel.BusiEntityParent.setAllRowsUnSelect();
            });



        }

        function appInit(element, params) {
            ko.cleanNode(element);
            //将模板页渲染到页面上
            element.innerHTML = tpl;
            //配置模板可选业务对象
            $._ajax({
              type: 'get',
              url: '/occ-base/base/busiobjects/',
              dataType: 'json',
              data: {page: 0, size: 999},
              success: function(data) {
                viewModel.busiObjectSrc(common.dataconvert.toMap(data.content, "name", "code"));
              }
            });
            //将viewModel和页面上的元素绑定并初始化u-meta声明的组件
            viewModel.app = u.createApp({
                el: element,
                model: viewModel
            });
            afterRender();
        }

        function init(element, params) {
            appInit(element, params);
            window.vm = viewModel;
        }

        return {
            init: init
        }
    });
