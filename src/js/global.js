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
        $(document).on('submit','.documentation form',function(e){
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
                $('html,body').removeClass('opened');
                $(this).removeClass('is-active');
            } else {
                $('html,body').addClass('opened');
                $(this).addClass('is-active');
            }
        });

        // Sub-menu in pages
        $(document).on('click', '.phone-menu a',function(e){
            e.preventDefault();

            if($('.menu-summary').hasClass('shown')) {
                $('html,body').removeClass('menu-summary-opened');
                $('.menu-summary').removeClass('shown')
            } else {
                $('html,body').addClass('menu-summary-opened');
                $('.menu-summary').addClass('shown')
            }
        });
        $(document).on('click', '.menu-summary.shown a',function(e){
            $('html,body').removeClass('menu-summary-opened');
            $('.menu-summary').removeClass('shown');
        });


        // HOMEPAGE : Demo add / remove columns
        var homeCols = function(type) {
            var
                colContainer = $('.js-home-column').parent().next(),
                colNb = colContainer.children().length,
                preCode = $('.js-home-column').parents('.wrap-feature').find('pre');

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
        $('.js-home-column').on('click',function(e){
            e.preventDefault();
            $(this).data('action') == 'add' ? homeCols('add') : homeCols();
        });

        // GRANIM
        var granimInstance = new Granim({
            element: '.anim-bg',
            direction: 'radial',
            opacity: [1, 1],
            isPausedWhenNotInView: true,
            states : {
                "default-state": {
                    gradients: [
                        ['#35d7be', '#2fc0aa'],
                        ['#9D50BB', '#6E48AA']
                    ],
                    transitionSpeed: 5000
                }
            }
        });

        // View Code
        $('.js-view-code').find('a').on('click',function(e){
            e.preventDefault();
            var wrapper = $(this).parent().prev();

            // Remove button
            $(this).remove();


            // Animate <pre>
            if(!wrapper.hasClass('expanded'))
                wrapper.addClass('expanded');
        })
        $('pre.collapsed').on('click',function(e){
            e.preventDefault();
            $(this).next().find('a').trigger('click');
        });


        // Affix + ScrollSpy
        if(currentWindowWidth > MWidthMax) {
            $('#left-navbar').affix({
                offset: {
                    top: 264
                }
            });
        }

        // Buttons loading exemple
        $('button.js-loading-exemple').on('click',function(e){
            var target = $(this);

            target.toggleClass('cc-loading cc-bg-red cc-bg-primary js-loading-exemple');

            setTimeout(function(){
                target
                    .html('<i class="far fa-handshake icon-left"></i> Done, thanks!')
                    .toggleClass('cc-disabled cc-loading cc-bg-red cc-bg-green')
            },2500);
        });


        // Back to top
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 50)
                $('.backtotop').addClass('shown');
            else
                $('.backtotop').removeClass('shown');
        });

    });
})(jQuery);
