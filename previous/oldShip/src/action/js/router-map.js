/**
 * 侧边栏js
 * EQ：$('.side-btn').click(function() {
                 sideBth(this)
            })
 * @param {*} _this
 */


const sideBth = function (_this) {
    //  var sideW = $('.sr-side').width();
    //  var bodyW = $('.sr-body').width();
    
    if ($(_this).hasClass('open')) {
        $(".side-btn i").css('transform', 'rotate(180deg)');
        $(_this).css('z-index', '999');
        $(_this).removeClass('open');
        $(".sr-side-scroll").animate({
            width: "0"
        }, 500);
        $(".sr-side").animate({
            width: "0"
        }, 500);
        $(_this).animate({
            left: 0
        }, 500);
        $('.sr-zooming').animate({
            'left': "40px"
        }, 500);
        // $('.sr-body').animate({
        //     'margin-left': "-260px",
        //     'width': +bodyW + sideW + 'px'
        // }, 500);
        // $('#map').width(bodyW + sideW);
        // initMap();
        $('.fullz-z ul li').css('display', 'none');
        //  $('.zIndexZoom').each(function(i,el){
        //      $(el).hide()
        //  });
    } else {
        $(".side-btn i").css('transform', 'rotate(0deg)');
        $(_this).addClass('open');
        $(".sr-side-scroll").animate({
            width: "260px"
        }, 500);
        $(".sr-side").animate({
            width: "260px"
        }, 500);
        $(_this).animate({
            left: '260px'
        }, 500);
        
        $('.sr-zooming').animate({
            'left': "300px"
        }, 500);
        // $('.sr-body').animate({
        //     'margin-left': "0px"
        // }, 500);
        // $('.sr-body').width(bodyW);
        //$('#map').width(bodyW);
        // initMap();
        $('.fullz-z ul li').css('display', 'none');
    }
    //  });
}

/**
 * 点击提升元素其层级
 * EQ：setZIndex('.pannel_9', '.reach-popout');
 * @param parent  不提升层级的class
 * @param child   需要提升层级的class
 */

const setZIndex = function (parent, child) {
    
    /*var parZindex = Number($(parent).css('z-index'));

    $(child).css({"z-index": parZindex + 1});*/
    
    $(parent).removeClass('zIndex');
    
    $(child).addClass('zIndex');
    
};

const loggingStatusFun = function (msg) {
    
    if(msg.status == 401){
    
        window.location.href = configURL.sys + '/login.htm?returnUrl=' + encodeURIComponent(window.location.href);
        
        return false;
        
    }else{
        
        return true;
        
    }
    
}

const configUrlFun = function (_this, ids, criteria, className, flag, language) {
    
    var html = null;
    
    language == 'Zh'? html = '功能升级中': html = 'System is updating';
    
    const currIDIndex = ids.findIndex( item => item ===  criteria);
    
    if( currIDIndex == -1) {
        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">'+ html +'</span>', '信息', {
            dangerouslyUseHTMLString: true,
            showClose: false,
            callback:()=>{
                $(className).css({
                    'display': 'none'
                });
            
                if(flag){
                    
                    $(className).addClass('hide');
                    
                }
            }
        });
    }
    
    /*ids.forEach(function (e) {
        
        if(e == criteria){
            
            _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">'+ html +'</span>', '信息', {
                dangerouslyUseHTMLString: true,
                showClose: false,
                callback:()=>{
                    $(className).css({
                        'display': 'none'
                    });
                    
                    if(flag){
                        $(className).addClass('hide');
                    }
                }
            });
            
        }
        
    })*/
    
};

export {sideBth, setZIndex, loggingStatusFun, configUrlFun}
