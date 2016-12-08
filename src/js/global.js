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
                $('#fp-nav, #menu').removeClass('opened');
                $(this).removeClass('is-active');
            } else {
                $('#menu, #fp-nav').addClass('opened');
                $(this).addClass('is-active');
            }
        });

    });
})(jQuery);
