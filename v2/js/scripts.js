$(window).resize(function() {
    resizeImg();
    var height = $(".row.bordered > a:first-child").height() - 2;
    $('.row.bordered .blank').height(height);
});

$(window).load(function(){
    resizeImg();
    var height = $(".row.bordered > a:first-child").height() - 2;
    $('.row.bordered .blank').height(height);

    if($(window).width() > 768) {
        var height = $(".pros-cons > div:first-child .panel-default").height();
        $(".pros-cons > div:last-child .panel-default").height(height);
    }

    $('.navbar-toggle').click(function() {
        var button = $(this);
        if(button.hasClass('collapsed')) {
            button.find('i').addClass('fa-times').removeClass('fa-bars');
            button.find('span').text('CLOSE');
            $('header > .overlay').show();
        } else {
            button.find('i').addClass('fa-bars').removeClass('fa-times');
            button.find('span').text('MENU');
            $('header > .overlay').hide();
        }
    });

    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        $('a[data-toggle="tab"]').each(function () {
            $(this).parent('li').removeClass('active');
        });
    });

    $('#accordion .panel-title a').click(function () {
        $(this).find('.fa').toggleClass('fa-angle-up fa-angle-down');
    });

    $(".scroll-top").click(function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});


$(window).scroll(function(){
    var pos = $(window).scrollTop();
    if(pos > 82) {
        $('.overlay').css('top', 0);
    } else {
        $('.overlay').css('top', 82 - pos);
    }
});

// Bootstrap swipe
$(document).ready(function() {
    $('body').on('submit', '.ajax-form', function(){
        if ($('.form-errors').length) {
            $('.form-errors').html('').hide();
        }
        if ($('.form-success').length) {
            $('.form-success').html('').hide();
        }
        var frm = $(this);
        $('button[type="submit"]').prop('disabled', true);
        $('button[type="submit"] span').hide();
        $('button[type="submit"] i.fa-spin').removeClass('hidden');
        setTimeout(function () {
            $.ajax({
                async: false, 
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                success: function(data) {
                    var response = JSON.parse(data);
                    var status = response.status;
                    if (status === 'error' && $('.form-errors').length) {
                        $('button[type="submit"]').prop('disabled', false);
                        $('button[type="submit"] span').show();
                        $('button[type="submit"] i.fa-spin').addClass('hidden');
                        frm.parent().find('.form-errors').html(response.message).show();
                    }
                    else if (status === 'success' && $('.form-success').length) {
                        frm.parent().find('.form-success').html(response.message).show();
                        frm.remove();
                    }
                }
            });
        }, 100);
        return false;
    });
    jQuery('.more-content').on('shown.bs.collapse', function(){
    	jQuery('.more-content').not(this).closest('.padding.with-margin').find('p[data-toggle="collapse"]').trigger('click');
    	jQuery(this).closest('.padding').addClass('with-margin');
    	jQuery(this).closest('.padding').nextAll('.padding:first').addClass('full-border');
    });
    jQuery('.more-content').on('hidden.bs.collapse', function(){
    	jQuery(this).closest('.padding').removeClass('with-margin');
    	jQuery(this).closest('.padding').nextAll('.padding:first').removeClass('full-border');
    });
    jQuery('.padding .row a:not(.learnMore)').hover(function(){
        jQuery(this).closest('.padding').addClass('hovered');
    },
    function(){
        jQuery(this).closest('.padding').removeClass('hovered');
    });

});

function resizeImg() {

    var bigImg = $('img[data-resize="main-img"]').closest('.row').height() - 10/*margin*/;
    var smallImg1 = $('img[data-resize="sub-img-1"]').closest('.row').height() - $('img[data-resize="sub-img-1"]').height();
    var smallImg2 = $('img[data-resize="sub-img-2"]').closest('.row').height() - $('img[data-resize="sub-img-2"]').height();
    $('img[data-resize="sub-img-1"], img[data-resize="sub-img-2"]').height((bigImg-smallImg1-smallImg2)/2);

};