/**
 * Created by wanghongxiang on 16/7/15.
 */
'use strict';

define(function (require, module, exports) {
    /**
     * 引入样式
     */
    var css = require('css!./upload.css');

    /**
     *
     * @param options {groupname:'groupname',filepath:'filepath',url:true}
     * @param callback
     */
    function loadUpload(callback) {
        var $ = jQuery,
            $list = $('#thelist'),
            state = 'pending',
            uploader,
            file,
            upLoadObj = {};
        var uploader = WebUploader.create({

            // swf文件路径
            // swf: 'webuploader/dist/Uploader.swf',

            // 文件接收服务端。
            server: 'http://123.103.9.205:8090/filesrv/file/upload',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id: '#picker',
                //innerHTML:"选择文件",
                multiple: true
            },
            //调整图片上传的属性
            thumb: {
                width: 40,
                height: 50,

                // 图片质量，只有type为`image/jpeg`的时候才有效。
                quality: 100,

                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: true,

                // 是否允许裁剪。
                crop: true,
                // 否则强制转换成指定的类型。
                type: 'image/jpeg'
            },
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false
        });
        // 当有文件被添加进队列的时候
        uploader.on('fileQueued', function (file) {

            $list.append('<li class="col-md-5" id="' + file.id + '" class="item">' + '<div class="content">' + '<span class="info">' + file.name + '</span>' + '<div class="state bar">' + Math.floor(file.size / 1024) + ' KB' + '<span class="state"></span>' + '</div>' + '</div>' + '<span class="glyphicon glyphicon-remove-circle"></span>' + '</li>');

            //增加缩略图
            uploader.makeThumb(file, function (error, ret) {
                var $li = $("#" + file.id);
                if (error) {
                    if (file.ext === 'xls' || file.ext === 'xlsx') {
                        $('<img width=' + uploader.options.thumb.width + ' height=' + uploader.options.thumb.height + ' alt="" src="/hrcloud/static/img/staff/excel.png" />').insertBefore($li.find('.content'));
                    } else if (file.ext === 'docx' || file.ext === 'doc') {
                        $('<img width=' + uploader.options.thumb.width + ' height=' + uploader.options.thumb.height + ' alt="" src="/hrcloud/static/img/staff/word.png" />').insertBefore($li.find('.content'));
                    } else if (file.ext === 'pdf') {
                        $('<img width=' + uploader.options.thumb.width + ' height=' + uploader.options.thumb.height + ' alt="" src="/hrcloud/static/img/staff/pdf.png" />').insertBefore($li.find('.content'));
                    } else {
                        $li.text('预览错误');
                    }
                } else {
                    $('<img alt="" src="' + ret + '" />').insertBefore($li.find('.content'));
                }
            });

            //增加进度条
            uploader.md5File(file)
                // 及时显示进度
                .progress(function (percentage) {
                    console.log('Percentage:', percentage);
                })
                // 完成
                .then(function (val) {
                    console.log('md5 result:', val);
                });

            //添加hover事件
            $list.find('li').hover(function () {
                $(this).find('.glyphicon').css('display', 'block');
            }, function () {
                $(this).find('.glyphicon').css('display', 'none');
            });

            //删除
            $('#thelist').on('click', '.glyphicon', function (e) {
                console.log($(this));
                var fileId = $(this).parent('li').attr('id');
                var currentFile = uploader.getFile(fileId);
                uploader.removeFile(currentFile);
                $(this).parent('li').remove();
            });
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress .progress-bar');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<div class="progress progress-striped active">' + '<div class="progress-bar" role="progressbar" style="width: 0%">' + '</div>' + '</div>');
                $li.find('div.state').append($percent);
            }

            $li.find('span.state').text('上传中');

            $percent.css('width', percentage * 100 + '%');
        });

        uploader.on('uploadSuccess', function (file) {
            $('#' + file.id).find('span.state').text('已上传');
        });

        uploader.on('uploadError', function (file) {
            $('#' + file.id).find('span.state').text('上传出错');
        });
        //uploader.on('uploadAccept', function (file, ret) {
        //    //var data = ret.data;
        //    if((typeof callback).toLowerCase() ==='function')callback();
        //});
        uploader.on('uploadComplete', function (file) {
            //$( '#'+file.id ).find('.progress').fadeOut();
        });
        return function () {
            upLoadObj['uploader'] = uploader;
            upLoadObj['state'] = state;
            upLoadObj['setParam'] = function (options) {
                //添加代码，根据file属性 对formdata重新赋值
                this.uploader.options.formData = {
                    groupname: options.groupname || 'attend',
                    url: options.url || true,
                    filepath: options.filepath || '',
                    permission: 'read'
                };
            };
            //取消li的hover事件!!!!慎用!!!!
            upLoadObj['cancelLiHover'] = function(ul){
                $(ul+' li').hover = function(){
                    return false;
                }();
            };
            /**
             * 创建代码片段
             * @param data 图片信息 包含key值  filename  filesize
             * @returns {DocumentFragment}
             */
            upLoadObj['createHTMLFrag'] = function(data){
                //创建代码片段
                var docfrag = document.createDocumentFragment();
                var dataList = data;
                dataList.forEach(function(e) {
                    var li = document.createElement("li");
                    li.classList = 'col-md-5';
                    li.id = 'WU_FILE_'+new Date().getTime()*Math.random();
                    var matchWord = e.filename.slice(-4).toLowerCase();
                    var str = '';
                    if(matchWord==='.xml'||matchWord==='xlsx'){
                        str+= '<img width="40" height="50" alt="" src="/hrcloud/static/img/staff/excel.png">';
                    }else if(matchWord==='.doc'||matchWord==='docx'){
                        str+='<img width="40" height="50" alt="" src="/hrcloud/static/img/staff/word.png">';
                    }else if(matchWord==='.pdf'){
                        str+='<img width="40" height="50" alt="" src="/hrcloud/static/img/staff/pdf.png">';
                    }else {
                        str+='<img width="40" height="50" alt="" src="">';
                    }
                    str+='<div class="content">';
                    str+='<span class="info">'+e.filename+'</span>';
                    str+='<div class="state bar">'+(Number(e.filesize)).toFixed(2)/1024+' KB<span class="state"></span></div></div>';
                    str+='<span class="glyphicon glyphicon-remove-circle" style="display: none;"></span>';
                    $(li).append(str);
                    docfrag.appendChild(li);
                });
                return docfrag;
            };

            upLoadObj['setCallback'] = function(callback){
                upLoadObj['uploader'].on('uploadAccept', function (file, ret) {
                    if((typeof callback).toLowerCase() ==='function')callback();
                });
            };
            return upLoadObj;
        }();
    }
    return loadUpload;
});
