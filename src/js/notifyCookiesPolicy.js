(function($) {
    'use strict';
    var pluginName = 'notifyCookiesPolicy';

    $.notifyCookiesPolicy = function() {
        $.notifyCookiesPolicy.methods.init.apply(this, arguments);
    };

    $.notifyCookiesPolicy.methods = {
        init: function(options) {

            if ($.cookie === undefined) {
                throw 'You need jquery-cookie plugin https://github.com/carhartl/jquery-cookie';
            }

            var defaults = $.notifyCookiesPolicy.defaults;
            var settings = $.extend(true, defaults, options);
            var $cookieAdvise = createCookieAdvise(settings);

            if ($.cookie(defaults.cookieName) === undefined) {
                appendCookieAdviseToBody($cookieAdvise);
                if (settings.cookiePolicy.show) {
                    appendCookiePolicyLink($cookieAdvise, settings);
                }
                handlerEvents();
            } else {
                callbackToEnableGoogleAnalytics(settings.callbackToEnableGoogleAnalytics, $cookieAdvise);
            }
        }
    };

    function callbackToEnableGoogleAnalytics(callback, $cookieAdvise) {
        if (typeof callback === 'function') {
            callback($cookieAdvise);
        }
    }

    function appendCookieAdviseToBody($cookieAdvise) {
        $('body').append($cookieAdvise);
    }

    function createCookieAdvise(settings) {
        var $cookieAdvise = $('<div data-plugin-name = \'' + pluginName + '\'/>');
        $cookieAdvise.addClass(settings.cssClass).html(settings.defaultText);
        $cookieAdvise.data(pluginName, {
            target: $cookieAdvise,
            settings: settings
        });

        return $cookieAdvise;
    }

    function appendCookiePolicyLink($cookieAdvise, settings) {
        var $cookiePolicyLink = $('<a href=\'#\'/>').text(settings.cookiePolicy.defaultText);
        $cookiePolicyLink.on('click', function(e) {
            e.stopPropagation();

            if (typeof settings.cookiePolicy.callbackToShowCookiePolicy === 'function') {
                settings.cookiePolicy.callbackToShowCookiePolicy();
            }
        });

        $cookieAdvise.append('&nbsp;').append($cookiePolicyLink);
    }

    function accept() {
        var $cookieAdvise = $('[data-plugin-name=\'' + pluginName + '\']');
        var settings = $cookieAdvise.data(pluginName).settings;

        if ($.cookie(settings.cookieName) === null) {
            $.cookie(settings.cookieName, settings.cookieName, {
                expires: 365,
                path: '/'
            });

            var callback = settings.callbackToEnableGoogleAnalytics;
            callbackToEnableGoogleAnalytics(callback, $cookieAdvise);

            $cookieAdvise.remove();

            unhandlerEvents();
        }
    }

    function handlerEvents() {
        handlerClickOnDocument();
        handlerScrollOnWindow();
    }

    function handlerClickOnDocument() {
        $(document).click(function(e) {
            if (e.button !== undefined && e.button === 0) {
                accept();
            }
        });
    }

    function handlerScrollOnWindow() {
        $(window).scroll(function() {
            var $cookieAdvise = $('[data-plugin-name=\'' + pluginName + '\']');
            var settings = $cookieAdvise.data(pluginName).settings;
            if ($(window).scrollTop() >= settings.defaultScroll) {
                accept();
            }
        });
    }

    function unhandlerEvents() {
        $(document).off('click');
        $(window).off('scroll');
    }

    $.notifyCookiesPolicy.defaults = {
        defaultText: 'We use our own and third-party cookies to improve your experience and our services, by analysing browsing on our website.By continuing to browse, we understand that you accept their use.',
        defaultScroll: 20,
        cssClass: 'notify-cookies-policy-container',
        cookieName: 'notifyCookiesPolicy_accepted',
        callbackToEnableGoogleAnalytics: null,
        cookiePolicy: {
            show: true,
            defaultText: 'Click here for more info',
            callbackToShowCookiePolicy: null
        }
    };

})(jQuery);
