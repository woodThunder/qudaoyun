require([],function(){
    /*global $*/
//Collapsable Panel
//    var skin = $.cookie('_A_P_skin');
//    if(skin!=null){
//        $('body').addClass(skin);
//    }
    $(document).on('click', '.panel-heading .clickable', function (e) {
        "use strict";
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }
    });
//End Collapsable Panel

//Theme Switcher
    $("head link[rel='stylesheet']").last().after("<link rel='stylesheet' href='css/switcher.css' type='text/css'>");

    var switcherHTML="";
    switcherHTML += "<div id=\"switcher\">";
    switcherHTML += "    <i class=\"fa fa-cog fa-2x toggle-btn\"><\/i>";
    switcherHTML += "    <div class=\"content\">";
    switcherHTML += "        <div class=\"inner\">";
    switcherHTML += "            <label>主题设定<\/label><br>";
    switcherHTML += "            <input id=\"fixedNav\" type=\"checkbox\" checked>";
    switcherHTML += "            <label>导航栏固定<\/label><br>";
    switcherHTML += "            <input id=\"boxed\" type=\"checkbox\" checked>";
    switcherHTML += "            <label>框布局<\/label><br><br>";
    switcherHTML += "            <label>主题皮肤<\/label><br>";
    switcherHTML += "            <div class=\"color-container\">";
    switcherHTML += "        		<span data-skin=\"pace_done\" style=\"background:#f8f8f8;\"><\/span>";
    switcherHTML += "        		<span data-skin=\"skin_blue\" style=\"background:#2494F2;\"><\/span>";
    switcherHTML += "        		<span data-skin=\"skin_green\" style=\"background:#2ecc71;\"><\/span>";
    switcherHTML += "        		<span data-skin=\"skin_red\" style=\"background:#e74c3c;\"><\/span>";
    switcherHTML += "        		<span data-skin=\"skin_purple\" style=\"background:#9b59b6;\"><\/span>";
    switcherHTML += "        		<span data-skin=\"skin_dark\" style=\"background:#34495e;\"><\/span>";
    switcherHTML += "            <\/div>";
    switcherHTML += "        <\/div>";
    switcherHTML += "    <\/div>";
    switcherHTML += "<\/div>";



    $('body').append(switcherHTML);

    $('#switcher .toggle-btn,.navbar-right li:first a').on('click', function (e) {
        "use strict";
        e.preventDefault();
        $('#switcher').toggleClass('open');
    });

    $('#combo-color').on('change', function () {
        "use strict";
        $('#dynamic-style').attr('href', $('#combo-color').val());
    });

    $('#fixedNav').on('click', function () {
        "use strict";
        var obj = $(this);
        if(obj.is(':checked')) {
            $('body').addClass('header-fixed')
        } else {
            $('body').removeClass('header-fixed');
        }
    });

    $('#boxed').on('click', function () {
        "use strict";
        var obj = $(this);
        if(obj.is(':checked')) {
            $('.content-wrapper .content').removeClass('full-width')
        } else {
            $('.content-wrapper .content').addClass('full-width');
        }
    });

    $('span[data-skin]').on('click', function () {
        "use strict";
        var obj = $(this);
        $('body').removeClass('pace_done').removeClass('skin_blue').removeClass('skin_green').removeClass('skin_red').removeClass('skin_purple').removeClass('skin_dark');
        $('body').addClass(obj.data('skin'));
        $.cookie('_A_P_skin', obj.data('skin'));
    })
//End Theme Switcher
})
