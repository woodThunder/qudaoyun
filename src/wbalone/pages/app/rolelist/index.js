define(function (require, module, exports) {
  // 引入相关的功能插件或模块
  var html = require('text!./index.html')
  require('css!./index.css')
    //引入多语css组件
    require('css!../../../mutlilang.css')
  require('css!./user_showcase.css')
  require('css!./table.css')
  require('css!./roleadd.css')
  require('css!./roleedit.css')
  require('css!./paginate.css')
  require('css!./instantmsg.css')
  require('css!./save_success.css')
  require('css!./asignFun.css')
  require('css!./delete_success.css')
  require('css!./handle_success.css')
  //    require('css!./tree.css');
  require('./u-tree.js')
  require('i18n')

  // 获取url中的参数
  function getUrlParam(name) {
    var aQuery = window.location.href.split('?')// 取得Get参数
    var aGET = {}
    if (aQuery.length > 1) {
      var aBuf = aQuery[1].split('&')
      for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
        var aTmp = aBuf[i].split('=')// 分离key与Value
        aGET[aTmp[0]] = aTmp[1]
      }
    }
    return aGET[name]
  }
  initI18n();
  var viewModel = {
    searchData:new u.DataTable({
      meta: {
        roleName: {
          type: 'string'
        },
        roleCode: {
          type: 'string'
        },
        label: {
          type: 'string'
        }
      }
    }),
    initI18n:function () {
        initI18n('/appAuth/');
      initI18n('/app/rolelist/')
    },
    listData: new u.DataTable({
      meta: {
        sort: {
          type: 'string'
        },
        id: {
          type: 'string'
        },
        roleName: {
          type: 'string'
        },
        roleName2: {
          type: 'string'
        },
        roleName3: {
          type: 'string'
        },
        roleName4: {
          type: 'string'
        },
        roleName5: {
          type: 'string'
        },
        roleName6: {
          type: 'string'
        },
        roleCode: {
          type: 'string'
        },
        isActive: {
          type: 'string'
        },
        createDate: {
          type: 'string'
        },
        tenantId: {
          type: 'string'
        },
        label: {
          type: 'string'
        },
        labelName: {
          type: 'string'
        },
        remark: {
          type: 'string'
        },
        creator: {
          type: 'string'
        },
        modifyDate: {
          type: 'string'
        },
        reviser: {
          type: 'string'
        }
      }
    }),
    /* 控制模态框状态及方法*/
    modal: {
      index: ko.observable(),
      type: ko.observable(),
      title: ko.observable(''),
      save: function (a, b) {
        if (viewModel.modal.type()) {
          viewModel.addsave()
        } else {
          viewModel.editsave()
        }
      },
      cancel: function () {
        $('#editModal').modal('hide')

      }
    },
    /* 创建roleedit数据模型*/
    roleeditData: new u.DataTable({
      meta: {
        showName: {//修改roleName为showName
          required: true,
          type: 'string',
          minLength:1,
          maxLength:24,
          regExp: /^[a-zA-Z0-9\u4E00-\u9FA5_\-]+$/,
          nullMsg: $.i18n.prop('js.app.rol.0001'),
          errorMsg: $.i18n.prop('js.app.rol.0002'),
          placement: 'right',
          hasSuccess: true,
          notipFlag: true

        },
        roleCode: {
          required: true,
          type: 'string',
          minLength:1,
          maxLength:24,
          regExp: /^[A-Za-z0-9][A-Za-z0-9_-]*$/,
          errorMsg: $.i18n.prop('js.app.rol.0003'),
          nullMsg: $.i18n.prop('js.app.rol.0001'),
          placement: 'right',
          hasSuccess: true,
          notipFlag: true

        },
        roleType: {
          type: 'string'
        },
        isActive: {
          type: 'string'

        },
        remark: {
          type: 'string',
          maxLength: 30,
          notipFlag: true,
          hasSuccess: true
        }


      }
    }),
    roleTypeList:[],
    searchList:[{ 'value':'','name':$.i18n.prop('js.app.rol.0004') }],
    /* 新增角色*/
    addUser: function () {

      viewModel.modal.title($.i18n.prop('js.app.rol.0005'))
      viewModel.modal.type(true)
      viewModel.roleeditData.clear()
      viewModel.roleeditData.createEmptyRow()

      $('#editModal').modal('show')

    },
    getCode: function (labelval) {
      var code = ''
      $.each(viewModel.groupListData.getSimpleData(), function (i, item) {
        if (item.name == labelval) {
          code = item.code
          return false
        }
      })
      return code || ''
    },
    getName:function(label) {
      var name = ''
      $.each(viewModel.groupListData.getSimpleData(), function (i, item) {
        if (item.code == label) {
          name = item.name
          return false
        }
      })
      return name || ''
    },
    /* 新增角色保存*/
    addsave: function () {
      var addsaveData = viewModel.roleeditData.getSimpleData()[0]
      if(!addsaveData.roleCode) {
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg($.i18n.prop('js.app.rol.0006'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      if(!addsaveData.showName) {//roleName改为showName
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg($.i18n.prop('js.app.rol.0007'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      //默认语种样式调整
      if(!viewModel.roleeditData.getValue("roleName"+viewModel.mutlilang.sysDefaultLanguageSerial())) {
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg(viewModel.mutlilang.sysDefaultLanguageShow() + $.i18n.prop('js.app.rol.0007'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      if(!viewModel.roleeditData.getValue("roleName")) {
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg(viewModel.mutlilang.simpleChineseShow() + $.i18n.prop('js.app.rol.0007'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      if(!addsaveData.label) {
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg($.i18n.prop('js.app.rol.0008'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      addsaveData._class = 'com.yonyou.uap.wb.entity.extend.WBRole'
      var label = addsaveData.label
      addsaveData.labelName = viewModel.getName(label)
      var uri = window.baseUrl + '/roleMGT/create'
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: uri,
        data: JSON.stringify(addsaveData),
        contentType: 'application/json',
        success: function (res) {
          if (res.status === 1) {
            var userId = res.data
            addsaveData.id = userId
            viewModel.seluserData.setSimpleData(addsaveData)
            viewModel.listData.addSimpleData(addsaveData)
            $('#editModal').modal('hide')
            $('#saveModal').modal('show')
            viewModel.loadList({})
          } else {
            viewModel.hintModal.type(false)
            viewModel.hintModal.msg(res.msg)
            setTimeout(function () {
              $('#hintModal').modal('hide')
            }, 2000)
            $('#hintModal').modal('show')
          }
        }
      })
    },
    /* 编辑角色*/
    useredit: function (index, data) {
      viewModel.modal.type(false)
      viewModel.modal.title($.i18n.prop('js.app.rol.0009'))
      var selRows = viewModel.listData.getRow(index)// 获取选中的datatable.Row
      var editdata = selRows.getSimpleData()// 获取Row里头的数据
      viewModel.roleeditData.setSimpleData(editdata)// 存入useredit数据模型中
      viewModel.listData.setRowFocus(index)// 设置该行作为焦点行，为编辑保存用
      viewModel.modal.index(index)
      var uri = window.baseUrl + '/label/listByGroup'
      $.ajax({
        type: 'get',
        dataType: 'json',
        url: uri,
        data: { 'group': 'person' },
        success: function (res) {
          if (res.status === 1) {
            var data = res.data
            viewModel.groupListData.setSimpleData(data)
            var arr =[]
            for(var i=0;i<data.length;i++) {
              arr.push({ value:data[i].code, name:data[i].name })
            }
            viewModel.roleTypeList = arr
            var combo1Obj = document.getElementById('test-select')['u.Combo']
            combo1Obj.setComboData(viewModel.roleTypeList)

          }

        }
      })

        //编辑时，为showName初始化赋值
        var defaultValue = viewModel.roleeditData.getValue("roleName"+viewModel.mutlilang.currentSerial)
        viewModel.roleeditData.setValue("showName",defaultValue)

      $('#editModal').modal('show')
    },
    /* 编辑角色保存*/
    editsave: function () {
        //保存前showName赋值
        var defaultValue = viewModel.roleeditData.getValue("roleName"+viewModel.mutlilang.currentSerial)
        viewModel.mutlilang.defaultLocaleValue(defaultValue)
        viewModel.roleeditData.setValue("showName",defaultValue)

      var editsaveData = viewModel.roleeditData.getSimpleData()[0]
      if(!editsaveData.roleCode) {
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg($.i18n.prop('js.app.rol.0006'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      if(!editsaveData.showName) {//roleName改为showName
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg($.i18n.prop('js.app.rol.0007'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      //默认语种样式调整
      if(!viewModel.roleeditData.getValue("roleName"+viewModel.mutlilang.sysDefaultLanguageSerial())) {
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg(viewModel.mutlilang.sysDefaultLanguageShow() + $.i18n.prop('js.app.rol.0007'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      if(!editsaveData.label) {
        viewModel.hintModal.type(false)
        viewModel.hintModal.msg($.i18n.prop('js.app.rol.0008'))
        setTimeout(function () {
          $('#hintModal').modal('hide')
        }, 2000)
        $('#hintModal').modal('show')
        return false
      }
      var uri = window.baseUrl + '/roleMGT/update'
      editsaveData._class = 'com.yonyou.uap.wb.entity.extend.WBRole'
      var label = editsaveData.label
      editsaveData.labelName = viewModel.getName(label)
      var index = viewModel.modal.index()
      var row = viewModel.listData.getRow(index)// 获取选中的datatable.Row
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: uri,
        data: JSON.stringify(editsaveData),
        contentType: 'application/json',
        success: function (res) {
          if (res.status === 1) {
            row.setSimpleData(editsaveData)
            $('#editModal').modal('hide')
          } else {
            viewModel.hintModal.type(false)
            viewModel.hintModal.msg(res.msg)
            setTimeout(function () {
              $('#hintModal').modal('hide')
            }, 2000)
            $('#hintModal').modal('show')
          }
        }
      })

    },

    /* 角色标签列表模型*/
    groupListData: new u.DataTable({
      meta: {
        'id': {
          type: 'string'
        },
        'createDate': {
          type: 'string'
        },
        'code': {
          type: 'string'
        },
        'name': {
          type: 'string'
        },
        'tenantId': {
          type: 'string'
        },
        'system': {
          type: 'string'
        },
        'group': {
          type: 'string'
        },
        'status': {
          type: 'string'
        }
      }
    }),


    /* 被选中存储用户ID等信息*/
    seluserData: new u.DataTable({
      meta: {
        id: {
          type: 'string'
        }
      }
    }),
    /* 成功/失败提示模态框控制*/
    hintModal: {
      type: ko.observable(),
      msg: ko.observable()
    },
    /* afterAdd:function(element, index, data){
         if (element.nodeType === 1) {
         u.compMgr.updateComp(element);
         }
         },*/

    /**
         * 分配功能
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
    // 分配组织的穿梭框树形基本配置
    treeSetting: {
      data: {
        keep: {
          parent: true
        }
      },
      view: {
        showLine: false,
        selectedMulti: true,
        showIcon: false
      },
      check: {
        enable: true,
        chkStyle: 'checkbox',
        chkboxType: { 'Y': 'ps', 'N': 'ps' }
      },
      callback: {
        onClick: function (e, id, node) {
          // alert(id)
          // alert(node)
          //                    var rightInfo = node.name + '被选中';
          //                    u.showMessage({msg:rightInfo,position:"top"})
          // if (id==="tree1") {
						  var treedt = $('#'+id)[0]['u-meta'].dataTable
						  var treeA = $('#'+id)[0]['u-meta']
						  var rowId = treeA.getRowIdByIdValue(node.pId)
						  var index =treedt.getIndexByRowId(rowId)
						  treedt.addRowSelect(index)
					 // }

        }
      }
    },
    // 分配组织的穿梭框模型（待分配功能）
    groupLeftDataTable: new u.DataTable({
      meta: {
        'id': {
          'value': ''
        },
        'pid': {
          'value': ''
        },
        'appCode': {
          'value': ''
        },
        'appName': {
          'value': ''
        }
      }
    }),
    // 分配组织的穿梭框模型（已分配）
    groupRightDataTable: new u.DataTable({
      meta: {
        'id': {
          'value': ''
        },
        'pid': {
          'value': ''
        },
        'appCode': {
          'value': ''
        },
        'appName': {
          'value': ''
        }
      }
    }),
    // 分配组织穿梭框的数据


    // 分配组织右侧穿梭框的选择添加功能
    groupOneRightSelect: function () {
      var zTreeL = $('#tree1')[0]['u-meta'].tree
      var zTreeR = $('#tree2')[0]['u-meta'].tree

      var rs = viewModel.groupLeftDataTable.getSelectedRows()
      $.each(rs, function (i, item) {
        if (item.getValue('pid') == 'root') {
          //                    viewModel.groupLeftDataTable.setRowUnSelect(item.index);
          var flag = false
          $.each(viewModel.groupRightDataTable.getSimpleData(), function (ri, ritem) {
            if (item.getValue('id') === ritem.id) {// repeat
              flag = true
            }
          })
          if (!flag) {
            viewModel.groupRightDataTable.addRow(item)
          }
        } else {
          viewModel.groupRightDataTable.addRow(item)
          viewModel.groupLeftDataTable.removeRowByRowId(item.rowId)
          viewModel.leftDataCache(viewModel.groupLeftDataTable.getSimpleData())
        }
      })
      $.each(rs, function (i, item) {
        if (item.getValue('pid') == 'root') {
          var Xflag = false
          $.each(viewModel.groupLeftDataTable.getSimpleData(), function (li, litem) {
            if (item.getValue('id') === litem.pid) {// repeat
              Xflag = true
            }
          })
          if (!Xflag) {
            viewModel.groupLeftDataTable.removeRowByRowId(item.rowId)
            viewModel.leftDataCache(viewModel.groupLeftDataTable.getSimpleData())
          }
        }
      })
      viewModel.groupLeftDataTable.setAllRowsUnSelect()
      zTreeL.checkAllNodes(false)
      zTreeL.refresh()
      var TmpArray = viewModel.groupRightDataTable.getSimpleData()
      viewModel.groupRightDataTable.clear()
      viewModel.groupRightDataTable.setSimpleData(TmpArray,{ unSelect:true })
      viewModel.groupRightDataTable.setAllRowsUnSelect()
      zTreeR.checkAllNodes(false)
      zTreeR.refresh()
			 zTreeR.checkAllNodes(false)
      zTreeR.refresh()
    },
    // 分配组织左侧穿梭框的全选添加功能
    groupAllRightSelect: function () {
      var zTreeL = $('#tree1')[0]['u-meta'].tree
      var zTreeR = $('#tree2')[0]['u-meta'].tree
      var rs = viewModel.groupLeftDataTable.getAllRows()
      $.each(rs, function (i, item) {
        if (item.getValue('pid') == 'root') {
          var Xflag = false
          $.each(viewModel.groupRightDataTable.getSimpleData(), function (li, litem) {
            if (item.getValue('id') === litem.id) {// if item is repeat
              Xflag = true
            }
          })
          if (!Xflag) {
            viewModel.groupRightDataTable.addRow(item)
          }
        }else{
          viewModel.groupRightDataTable.addRow(item)
        }

      })
      viewModel.groupLeftDataTable.removeAllRows()

      var TmpArray = viewModel.groupRightDataTable.getSimpleData()
      viewModel.groupRightDataTable.clear()
      viewModel.groupRightDataTable.setSimpleData(TmpArray)
      viewModel.groupRightDataTable.setAllRowsUnSelect()
      zTreeL.checkAllNodes(false)
      zTreeL.refresh()
      zTreeR.checkAllNodes(false)
      zTreeR.refresh()
    },
    // 分配组织左侧穿梭框的全选添加功能
    groupOneLeftSelect: function () {
      var zTreeL = $('#tree1')[0]['u-meta'].tree
      var zTreeR = $('#tree2')[0]['u-meta'].tree

      var rs = viewModel.groupRightDataTable.getSelectedRows()
      $.each(rs, function (i, item) {
        if (item.getValue('pid') == 'root') {
          var flag = false
          $.each(viewModel.groupLeftDataTable.getSimpleData(), function (ri, ritem) {
            if (item.getValue('id') === ritem.id) {// repeat
              flag = true
            }
          })
          if (!flag) {
            viewModel.groupLeftDataTable.addRow(item)
          }
        } else {
          viewModel.groupLeftDataTable.addRow(item)
          viewModel.groupRightDataTable.removeRowByRowId(item.rowId)
        }
      })
      $.each(rs, function (i, item) {
        if (item.getValue('pid') == 'root') {
          var Xflag = false
          $.each(viewModel.groupRightDataTable.getSimpleData(), function (li, litem) {
            if (item.getValue('id') === litem.pid) {// repeat
              Xflag = true
            }
          })
          if (!Xflag) {
            viewModel.groupRightDataTable.removeRowByRowId(item.rowId)
          }
        }
      })
      viewModel.groupRightDataTable.setAllRowsUnSelect()
      zTreeL.checkAllNodes(false)
      zTreeL.refresh()
      var TmpArray = viewModel.groupLeftDataTable.getSimpleData()
      viewModel.groupLeftDataTable.clear()
      viewModel.groupLeftDataTable.setSimpleData(TmpArray,{ unSelect:true })
      viewModel.leftDataCache(TmpArray)
      viewModel.groupLeftDataTable.setAllRowsUnSelect()
      zTreeR.checkAllNodes(false)
      zTreeR.refresh()
			 zTreeR.checkAllNodes(false)
      zTreeR.refresh()
    },
    // 分配组织右侧穿梭框的全选添加功能
    groupAllLeftSelect: function () {
      var zTreeL = $('#tree1')[0]['u-meta'].tree
      var zTreeR = $('#tree2')[0]['u-meta'].tree
      var rs = viewModel.groupRightDataTable.getAllRows()
      $.each(rs, function (i, item) {
        if (item.getValue('pid') == 'root') {
          var Xflag = false
          $.each(viewModel.groupLeftDataTable.getSimpleData(), function (li, litem) {
            if (item.getValue('id') === litem.id) {// if item is repeat
              Xflag = true
            }
          })
          if (!Xflag) {
            viewModel.groupLeftDataTable.addRow(item)
          }
        }else{
          viewModel.groupLeftDataTable.addRow(item)
        }

      })
      viewModel.groupRightDataTable.removeAllRows()
      var TmpArray = viewModel.groupLeftDataTable.getSimpleData()
      viewModel.groupLeftDataTable.clear()
      viewModel.groupLeftDataTable.setSimpleData(TmpArray)
      viewModel.leftDataCache(TmpArray)
      viewModel.groupLeftDataTable.setAllRowsUnSelect()
      zTreeL.checkAllNodes(false)
      zTreeL.refresh()
      zTreeR.checkAllNodes(false)
      zTreeR.refresh()

    },


    saveAsign: function () {
      var uri = window.baseUrl + '/roleMGT/saveRoleApp'
      var checkedItems = []
      var RArray = viewModel.groupRightDataTable.getSimpleData()
      if (RArray.length) {
        $.each(RArray, function (index, item) {
          if (item.pid != 'root') {
            checkedItems.push({
              'id': item.id,
              'code': item.appCode
            })
          }
        })
      }
      //            var curRows = viewModel.listData.getRow(viewModel.modal.index()||'0');//获取选中的datatable.Row

      var selRow = viewModel.seluserData
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify({ 'roleCode': selRow.getValue('roleCode'), 'roleId': selRow.getValue('id'), checkedItems: checkedItems }),
        success: function (res) {
          if (res.status === 1) {
            viewModel.hintModal.type(true)
            viewModel.hintModal.msg(res.msg || $.i18n.prop('js.app.rol.0010'))

          } else {
            viewModel.hintModal.type(false)
            viewModel.hintModal.msg(res.msg || $.i18n.prop('js.app.rol.0011'))
          }
          setTimeout(function () {
            $('#hintModal').modal('hide')
          }, 2000)
          $('#hintModal').modal('show')
          $('#asignFunModal').modal('hide')
        }
      })
    },

    /**
         * 分配功能
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */

    asign: function (index, row) {
      var roleId
      var r_id = row.getSimpleData().id || ''
      var pn = viewModel.pagination.element.options.currentPage
      window.location.href = '#manage/auth_after_rolemgr?isRole=true&roleId=' + r_id + '&pn=' + pn
      /* if (typeof  row === 'object' && row.data) {
                roleId = row.getValue("id");
                viewModel.seluserData.clear();
                viewModel.seluserData.setSimpleData(row.getSimpleData());
            } else {
                index = viewModel.listData.totalRow() - 1;
                roleId = viewModel.seluserData.getValue("id");
            }
            viewModel.modal.index(index);
            var uri = window.baseUrl + '/roleMGT/appPermissionList';
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: uri,
                data: {"roleId": roleId || ""},
                success: function (res) {
                    if (res.status === 1) {
                        //初始化树菜单
                        var data = res.data;
                        viewModel.groupLeftDataTable.removeAllRows();
                        viewModel.groupLeftDataTable.setSimpleData(data.unchecked);
                        viewModel.leftDataCache(data.unchecked);
                        viewModel.groupLeftDataTable.setRowUnSelect(0); //
                        // $('#d-search').
                        if(data.unchecked){
                            for(var i in data.unchecked){
                                data.unchecked[i].label =  data.unchecked[i].appName;
                            }
                        }

                        viewModel.groupRightDataTable.removeAllRows();
                        viewModel.groupRightDataTable.setSimpleData(data.checked);
                        viewModel.groupRightDataTable.setRowUnSelect(0); //


                        $('#asignFunModal').modal('show');
                    }
                }
            })*/
    },
    createAjaxFun: function (obj, successCallback) {
      return function () {
        $('#LoadingImage').show()
        $('#emptyImage').hide()
        $('#LoadingImage').parent().find('table tbody').hide()
        $.ajax({
          type: obj.type || 'get',
          dataType: obj.dataType || 'json',
          contentType: 'application/json',
          url: obj.url,
          data: obj.data || {},
          success: function (res) {
            $('#LoadingImage').hide()
            $('#LoadingImage').parent().find('table tbody').show()
            if ((res && res.data == null) || (res.data && res.data.content.length < 1) || (res.data && res.data.length < 1)) {
              $('#emptyImage').show()
            }
            successCallback(res)
          },
          // timeout:3000,
          error: function (e) {
            if (e.status == 500 && e.responseText == 'Internal Server Error') {
              $('#emptyImage').show()
              $('#emptyImage span').html($.i18n.prop('js.app.rol.0012'))
              $('#emptyImage span').css({ 'margin-left': '-46px' })
            }
            $('#LoadingImage').hide()
          }
        })
      }()
    },


    /**
         * 删除
         * @method function
         * @param  {[type]} index [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
    delete: function (index, row, event) {
      $('#deleteModal').modal('show')
      var selRows = viewModel.listData.getRow(index)
      var selrowdata = selRows.getSimpleData()// 获取Row里头的数据
      selrowdata.index = index
      viewModel.seluserData.setSimpleData(selrowdata)
      /* u.confirmDialog({
             msg: $.i18n.prop('js.app.rol.0013'),
             title: $.i18n.prop('js.app.rol.0014'),
             onOk: function () {
             var uri = window.baseUrl + '/userMGT/delete/' + row.data.id.value;
             $.ajax({
             type: 'get',
             dataType: 'json',
             url: uri,
             data: {"id": row.data.id.value},
             success: function (res) {
             if (res.status === 1) {
             viewModel.listData.removeRow(index);
             }
             u.messageDialog({
             msg: res.msg,
             title: $.i18n.prop('js.app.rol.0015'),
             btnText: "OK"
             });
             }
             })
             },
             onCancel: function () {

             }
             });*/
    },
    deleteconfirm: function () {
      var seldata = viewModel.seluserData.getSimpleData()[0]
      var uri = window.baseUrl + '/roleMGT/delete/' + seldata.id
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: uri,
        data: { 'id': seldata.id },
        success: function (res) {
          $('#deleteModal').modal('hide')
          if (res.status === 1) {
            viewModel.listData.removeRow(seldata.index)
            viewModel.hintModal.type(true)
            viewModel.hintModal.msg(res.msg||'删除成功')
            setTimeout(function () {
              $('#hintModal').modal('hide')
            }, 2000)
            $('#hintModal').modal('show')

          } else {
            viewModel.hintModal.type(false)
            viewModel.hintModal.msg(res.msg||'删除失败')
            setTimeout(function () {
              $('#hintModal').modal('hide')
            }, 2000)
            $('#hintModal').modal('show')

          }
          $('#hintModal').modal('show')

        }
      })
    },
    /**
         * 加载表格数据
         * @method function
         * @return {[type]} [description]
         */
    loadList: function (params) {
      // 查询参数
      var options = {
        'pn': params.pn || viewModel.pagination.element.options.currentPage,
        'ps': params.ps || viewModel.pagination.element.options.pageSize,
        'sortType': params.sorttype || '',
        'search_LIKE_roleName': params.roleName || '',
        'search_LIKE_roleCode': params.roleCode || '',
        'search_EQ_label': params.roleType || ''
      }

      // 请求数据
      var obj = {
        type: 'get',
        url: window.baseUrl + '/roleMGT/listRolePage',
        data: options
      }
      var successCallback = function (res) {
        if (res.status === 1) {
          var data = res.data
          viewModel.pagination.element.update({
            totalPages: data.totalPages,
            pageSize: data.size,
            currentPage: data.number + 1,
            totalCount: data.totalElements
          })
          viewModel.listData.setSimpleData(data.content, {
            unSelect: true
          })
          viewModel.pagination.count(data.totalElements)
          setTimeout(function() {
            viewModel.initI18n()
          },300)
        } else {
          viewModel.hintModal.type(false)
          viewModel.hintModal.msg(res.msg)
          setTimeout(function () {
            $('#hintModal').modal('hide')
          }, 2000)
          $('#hintModal').modal('show')
        }
      }
      viewModel.createAjaxFun(obj, successCallback)
    },

    /**
         * 分页控件
         * @type {Object}
         */
    pagination: {
      element: null,
      // 用于控制分页控件的显示，条目大于10的时候显示控件
      count: ko.observable(0),
      init: function () {
        // 分页控件初始化
        var ele = $('#pagination')[0]
        this.element = new u.pagination({
          el: ele,
          pageList: ['5','10','15','20'],
          jumppage: true
        })
        // 分页
        this.element.on('pageChange', function (currentPage) {

          viewModel.loadList({
            pn: currentPage + 1,
            ps: viewModel.pagination.element.options.pageSize,
            'roleName': $.trim($('input#s-name').val()) ,
            'roleCode': $.trim($('input#s-loginName').val()) ,
            'roleType': $.trim($('select#s-state').val())
          })
        })
        this.element.on('sizeChange', function (siz) {
          viewModel.loadList({
            pn: 1,
            ps: siz - 0,
            'roleName': $.trim($('input#s-name').val()),
            'roleCode': $.trim($('input#s-loginName').val()),
            'roleType': $.trim($('select#s-state').val())
          })
        })
      }
    },

    /**
         * 表格方法，用于添加行后触发渲染
         * @method function
         * @param  {[type]} element [description]
         * @param  {[type]} index   [description]
         * @param  {[type]} row     [description]
         * @return {[type]}         [description]
         */
    afterAdd: function (element, index, row) {
      if (element.nodeType === 1) {
        u.compMgr.updateComp(element)
      }
    },
    dataSearchByroleType: ko.observableArray([]),
    loadRoleType: function () {
      var uri = window.baseUrl + '/label/listByGroup'
      $.ajax({
        type: 'get',
        dataType: 'json',
        url: uri,
        data: { 'group': 'person' },
        success: function (res) {
          if (res.status === 1) {
            var data = res.data
            viewModel.groupListData.setSimpleData(data)
            var arr =[]
            for(var i=0;i<data.length;i++) {
              arr.push({ value:data[i].code, name:data[i].name })
            }
            viewModel.roleTypeList = arr
            var combo1Obj = document.getElementById('test-select')['u.Combo']
            combo1Obj.setComboData(viewModel.roleTypeList)

            viewModel.searchList = [{ 'value':'','name':$.i18n.prop('js.app.rol.0004') }].concat(arr)
            var combo1Obj = document.getElementById('search_select')['u.Combo']
            combo1Obj.setComboData(viewModel.searchList)

          }
        }
      })

    },
    /**
         * 页面初始化
         * @return {[type]} [description]
         */
    pageInit: function () {

      var app = u.createApp({
        el: '.list-panel',
        model: viewModel
      })
        initI18n('/appAuth/');
        initI18n('/app/rolelist/')
        viewModel.app = app;
      viewModel.pagination.init()
      // 初次加载数据
      if (getUrlParam('pn')) {
        viewModel.loadList({ pn: getUrlParam('pn') || 1 })
      } else {
        // 初次加载数据
        viewModel.loadList({})
      }
      viewModel.loadRoleType()
      // 点击搜索按钮toggle search  panel
      $('#condionSearch').click(function () {
        $('#condition-row').slideToggle(function () {
          if ($(this).is(':hidden')) {
            $('#condionSearch .icon-arrow-down').css('display', 'inline-block')
            $('#condionSearch .icon-arrow-up').css('display', 'none')
          } else {
            $('#condionSearch .icon-arrow-down').css('display', 'none')
            $('#condionSearch .icon-arrow-up').css('display', 'inline-block')
          }
        })
      })
        //mutlilang模块初始化
        viewModel.mutlilang.init();
      // 处理搜索任务
      $('#d-search').on('keypress',function (event) {
        if (event.keyCode == 13) {
          // debugger;
          var keyword = this.value
          viewModel.showAppListBySearchKey(keyword)
        }
      })
      $('#condition-row')
        .on('keypress', 'input', function (event) {
          if (event.keyCode == 13) {
            var data = {
              pn: 1,
              'roleName':$.trim($('input#s-name').val()) ,
              'roleCode':$.trim($('input#s-loginName').val()) ,
              'roleType':$.trim($('select#s-state').val())
            }
            // todo updatelist
            viewModel.loadList(data)
          }
        })
        .on('click', '.nc-searchbtn', function () {
          var data = {
            pn: 1,
            'roleName':$.trim($('input#s-name').val()) ,
            'roleCode':$.trim($('input#s-loginName').val()) ,
            'roleType':$.trim($('select#s-state').val())
          }
          // todo updatelist
          viewModel.loadList(data)
        })

      var obj =[{
        roleName: '',
        roleCode: '',
        label: ''
      }]
      viewModel.searchData.setSimpleData(obj)
      viewModel.searchData.on('valueChange',function(event) {
        var data = viewModel.searchData.getSimpleData()[0]
        var params = {
          pn: 1,
          'roleName': data.roleName,
          'roleCode': data.roleCode,
          'roleType': data.label
        }
        viewModel.loadList(params)
      })
    },
    leftDataCache:ko.observableArray(),
    showAppListBySearchKey:function (value) {

      var appslist = viewModel.leftDataCache()||[]
      var filterList = new Array()

      if(!value.length) {
        viewModel.groupLeftDataTable.setSimpleData(appslist,{ unSelect:true })
        return
      }
      for(var i in appslist) {
        if(appslist[i].appName) {
          if(appslist[i].appName.indexOf(value)>-1) {
            filterList.push(appslist[i])
          }else {
            // console.log('no contain')
          }
        }
      }
      $('#d-search').val('').focusout()
      // viewModel.groupRightDataTable.removeAllRows();
      viewModel.groupLeftDataTable.setSimpleData(filterList,{ unSelect:true })
    },
    goback: function () {
      window.location.href = '#sysmgr'
      // window.history.go(-1);
      // return false;
    },
      //将新引入的内容适配，修改menuData为roleeditData，修改name为roleName
      mutlilang: {
          sysLocale: ko.observable(''),
          show: ko.observable(false),
          defaultLocaleValue: ko.observable(''),
          //默认语种的Show和Serial
          sysDefaultLanguageShow: ko.observable(''),
          sysDefaultLanguageSerial: ko.observable(''),
          sysDefaultLanguagePreLocale: ko.observable(''),
          simpleChineseShow: ko.observable(''),
          locale: ko.observableArray([]),
          tempSerial: "",
          currentSerial: "",
          getCurrentSerial: function (newLocaleValue) {
              var uri = '../wbalone/i18n/classification/serialId';
              var JsonData = null;
              if (newLocaleValue && newLocaleValue.length > 0) {
                  JsonData = {
                      locale: newLocaleValue
                  }
              }
              $.ajax({
                  type: 'get',
                  dataType: 'json',
                  url: uri,
                  data: JsonData,
                  async: false,
                  contentType: 'application/json',
                  success: function (res) {
                      if (res.status == 1) {
                          viewModel.mutlilang.currentSerial = res.data == "1" ? "" : res.data;
                      }
                  }
              });
          },
          getSerial: function (newLocaleValue) {
              var uri = '../wbalone/i18n/classification/serialId';
              var JsonData = null;
              if (newLocaleValue && newLocaleValue.length > 0) {
                  JsonData = {
                      locale: newLocaleValue
                  }
              }
              $.ajax({
                  type: 'get',
                  dataType: 'json',
                  url: uri,
                  data: JsonData,
                  async: false,
                  contentType: 'application/json',
                  success: function (res) {
                      if (res.status == 1) {
                          viewModel.mutlilang.tempSerial = res.data == "1" ? "" : res.data;
                      }
                  }
              });
          },
          changeDTValue: function (e) {
              viewModel.roleeditData.setValue("roleName" + viewModel.mutlilang.currentSerial, viewModel.mutlilang.defaultLocaleValue());
          },
          saveValue: function () {
              var defaultValue = viewModel.roleeditData.getValue("roleName" + viewModel.mutlilang.currentSerial);
              viewModel.mutlilang.defaultLocaleValue(defaultValue);
              viewModel.roleeditData.setValue("showName", defaultValue);
              viewModel.mutlilang.show(false);
          },
          closeMul: function () {
              viewModel.mutlilang.show(false);
          },
          showMul: function () {
              viewModel.mutlilang.show(true);
          },
          getCurrentLocales: function () {
              var cookieValue = viewModel.mutlilang.getCookie("u_locale");
              if (cookieValue == null || cookieValue.replaceAll("\"", "").length == 0) {
                  // cookieValue = "zh_CN";
                  cookieValue = viewModel.mutlilang.sysDefaultLanguagePreLocale();
              }
              viewModel.mutlilang.sysLocale(cookieValue);
              viewModel.mutlilang.getCurrentSerial(cookieValue);
          },
          getCookie: function (name) {
              var cookieValue = null;
              if (document.cookie && document.cookie != '') {
                  var cookies = document.cookie.split(';');
                  for (var i = 0; i < cookies.length; i++) {
                      var cookie = $.trim(cookies[i]);
                      // Does this cookie string begin with the name we want?
                      if (cookie.substring(0, name.length + 1) == (name + '=')) {
                          cookieValue = decodeURIComponent(cookie
                              .substring(name.length + 1));
                          break;
                      }
                  }
              }
              return cookieValue;
          },
          getLanguageList: function () {
              //TODO 调用接口
              $.ajax({
                  url: "../wbalone/i18n/classification/list",
                  type: 'get',
                  data: null,
                  dataType: 'JSON',
                  contentType: 'application/json',
                  cache: false,
                  success: function (res) {
                      if (res.status == 1) {
                          var localeArray = [];
                          for (var index = 0; index < res.data.length; index++) {

                              viewModel.mutlilang.getSerial(res.data[index].prelocale);
                              //获取默认语种
                            if(res.data[index].i18nDefault==1){
                              viewModel.mutlilang.sysDefaultLanguageShow( res.data[index].pageshow);
                              viewModel.mutlilang.sysDefaultLanguagePreLocale( res.data[index].prelocale);
                              viewModel.mutlilang.sysDefaultLanguageSerial(viewModel.mutlilang.tempSerial);
                            }
                            if(res.data[index].serialid==1){
                              viewModel.mutlilang.simpleChineseShow( res.data[index].pageshow);
                            }
                              localeArray.push({
                                  "locale": res.data[index].prelocale,
                                  "label": res.data[index].pageshow,
                                  "serial": viewModel.mutlilang.tempSerial,
                                  "value": ""
                              });
                          }
                          viewModel.mutlilang.locale(localeArray);
                          //动态的设置字段
                          for (var i = 0; i < viewModel.mutlilang.locale().length; i++) {
                              var item = viewModel.mutlilang.locale()[i]
                              viewModel.roleeditData.createField("roleName" + item.serial);
                          }
                          viewModel.roleeditData.createEmptyRow();
                          $('.input-par').each(function () {
                              var fieldStr = $(this).attr('field');
                              var umetaStr = $(this).attr('u-meta');
                              if (fieldStr) {
                                  var options = JSON.parse(umetaStr);
                                  options.field = fieldStr;
                                  $(this).attr('u-meta', JSON.stringify(options));
                                  // ko.cleanNode($(this)[0]);
                                  options['type'] = options['type'] || 'string';
                                  if (options && options['type']) {
                                      var comp = u.compMgr.createDataAdapter({
                                          el: $(this)[0],
                                          options: options,
                                          model: viewModel,
                                          app: viewModel.app
                                      });
                                      $(this)[0]['u-meta'] = comp;
                                      viewModel.app.comps.push(comp);
                                  }
                              }

                          })
                      }
                  },
              });
          },
          init: function () {
              viewModel.mutlilang.getLanguageList();
              viewModel.mutlilang.getCurrentLocales();
          }
      }
  }

  return {
    init: function (content) {
      // 插入内容
      content.innerHTML = html
        initI18n('/appAuth/');
      viewModel.pageInit()
      viewModel.initI18n()
      // 执行主逻辑
      window.headerInit($('#roleList .apptitle')[0],$.i18n.prop('js.app.rol.0016'), window.location.href.indexOf("modulefrom=sidebar")>0,function() {
        window.location.href = '#sysmgr'
      })
    }
  }
});
