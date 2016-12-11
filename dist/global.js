(function($) {

    /* @ global bars */
    XSWidthMax = 359;
    SWidthMax = 767;
    MWidthMax = 989;
    LWidthMax = 1199;
    currentWindowWidth = window.innerWidth || document.documentElement.clientWidth|| document.body.clientWidth;
    currentWindowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


    $(function(){
        /*
            -- @ LINKS @ --
        */
        $(document).on('click', 'a[href$=".pdf"],a.external-link',function(e){
            e.preventDefault();
            window.open($(this).attr("href"));
        });
        $(document).on('click','a.no-link, a[href="GOTOLINK"], a[href="#"]',function(e){
            e.preventDefault();
            e.stopPropagation();
        });



        /*
            -- @ FASTCLICK @ --
        */
        if(currentWindowWidth <= SWidthMax) {
            window.addEventListener('load', function() {
                new FastClick(document.body);
            }, false);
        }



        /*
            -- @ COOKIES @ --
        */
        if(!Cookies.get('ck_'))
            $('#cookies').show();

        $('#cookies a').on('click',function(e){
            if(!Cookies.get('ck_'))
                Cookies.set('ck_', 'b326b5062b2f0e69046810717534cb09', {
                    expires : 365,
                    path : '/'
                });

            if($(this).hasClass('close')){
                e.preventDefault();
                $(this).parent().slideUp('fast');
            }
        });


        /*
            -- @ MAIN MENU PHONE @ --
        */
        $('.open-menu button').on('click',function(e){
            e.preventDefault();

            if($(this).hasClass('is-active')) {
                $('html,body, .js-nav').removeClass('opened');
                $(this).removeClass('is-active');
            } else {
                $('html,body, .js-nav').addClass('opened');
                $(this).addClass('is-active');
            }
        });


        // HOMEPAGE : Demo add / remove columns
        var homeCols = function(type) {
            var
                colContainer = $('.js-home-add-colmn').parent().next(),
                colNb = colContainer.children().length,
                preCode = $('.js-home-add-colmn').parents('.wrap-feature').find('pre');

            if(type == 'add') {
                if(colNb < 12) {
                    var
                        newKlass = 'cc-bg-chuckgreen',
                        lastKlass = colContainer.find('>div:last').attr('class');

                    if(lastKlass == 'cc-bg-chuckgreen')
                        newKlass = 'cc-bg-chuckgreen-da';

                    var newCol = $('<div />',{
                        'class' : newKlass,
                        'text' : "Hello World!"
                    }).appendTo(colContainer);
                }
            } else {
                if(colNb > 1) {
                    colContainer.find('>div:last').remove();
                }
            }

            // Change markup for demo
            var markup = '<span class="token comment" spellcheck="true">&lt;!-- Grid container --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>columns<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>\n';
            for(var i=1; i <= colContainer.children().length; i++) {
                markup += '&nbsp;&nbsp;&nbsp;&nbsp;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>Hello World!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n';
            }
            markup += '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>';

            // Fill the new markup
            preCode.html(markup);
        };

        $('.js-home-add-colmn').on('click',function(e){
            e.preventDefault();
            homeCols('add');
        });

        $('.js-home-remove-colmn').on('click',function(e){
            e.preventDefault();
            homeCols();
        });


        $('.js-view-code').find('a').on('click',function(e){
            e.preventDefault();

            var wrapper = $(this).parent().prev();

            // Remove button
            $(this).fadeOut(300,function(){
                $(this).remove();

                // Animate <pre>
                if(!wrapper.hasClass('expanded'))
                    wrapper.addClass('expanded');
            });


        })

    });
})(jQuery);
