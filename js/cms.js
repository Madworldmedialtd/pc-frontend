$(document).ready(function(){
    
    // reload modal content
    $(document).on('hidden.bs.modal', function (e) {
        $(e.target).removeData('bs.modal');
    });
    
    $('body').on('submit', '.ajax-form', function(){
        //$('html, body').animate({ scrollTop: 0 }, 'slow');
        
        if ($('.form-errors').length) {
            $('.form-errors').html('');
        }
        
        if ($('.form-success').length) {
            $('.form-success').html('');
        }
        var frm = $(this);
        $.ajax({
            async: false, 
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function(data) {
                var response = JSON.parse(data);
                var status = response.status;
                if (frm.data().hasOwnProperty('container')) {
                    var container = frm.data('container');
                    $(container).html(response.html);
                    //frm.remove();
                }
                else if (status === 'error' && $('.form-errors').length) {
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                    frm.parent().find('.form-errors').html(response.html);
                }
                else if (status === 'success') {
                    if (response.redirect) {
                        if (response.hash) {
                            window.location.hash = response.hash;
                            window.location.href = response.redirect;
                            location.reload();
                        }
                        else {
                            window.location = response.redirect;
                        }
                    }
                    else if ($('.form-success').length) {
                        frm.parent().find('.form-success').html(response.html);
                        $('html, body').animate({ scrollTop: 0 }, 'slow');
                    }
                }
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
        return false;
    });
    
});