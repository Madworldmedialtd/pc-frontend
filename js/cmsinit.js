$(function() {
    
    $('.popconfirm').popConfirm({placement: 'left'});
    
    $('.multiselect').multiselect({
        buttonWidth: '100%', 
        numberDisplayed: 7
    });
    
    $('.datepicker').datepicker();
    
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        } else if (typeof module === 'object' && module.exports) {
            module.exports = factory(require('jquery'));
        } else {
            factory(window.jQuery);
        }
    }(function ($) {
        $.extend($.summernote.plugins, {
        'media': function (context) {
            var layoutInfo = context.layoutInfo;
            var $toolbar = layoutInfo.toolbar;
        
            var ui = $.summernote.ui;
        
            this.initialize = function () {
        
                var button = ui.button({
                    contents: '<i class="note-icon-picture"/>&nbsp;&nbsp;Media Library',
                    tooltip: 'Insert Media',
                    click: function () {
                        $('#modal-form').modal({
                            remote: '/admin/media/library'
                        });
                    }
                });

                this.$button = button.render();
                $toolbar.append(this.$button);
            };

                this.destroy = function () {
                    this.$button.remove();
                    this.$button = null;
                };
            }
        });
    }));
    
//    $('.markdown').markdown({
//        height: 350,
//        iconlibrary: 'fa',
//        hiddenButtons: ['cmdCode','cmdQuote'],
//        disabledButtons: ['cmdCode','cmdQuote'],
//        onShow: function(e) {
//            e.setContent(toMarkdown(e.getContent()));
//        },
//        onFocus: function(e) {
//            e.setContent(toMarkdown(e.getContent()));
//        },
//        onBlur: function(e) {
//            e.setContent(e.parseContent());
//        }
//    });
    
    
    $('.summernote').summernote(
    {
        height: 250, 
        callbacks: {
            onInit: function() {
                $('.note-insert').children().get(1).remove();
            }
        }
    });
    
    $('textarea.codemirror').codemirror({
        lineNumbers : true,
        matchBrackets : true,
        tabMode: 'indent'
    });
});