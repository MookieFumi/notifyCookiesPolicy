notifyCookiesPolicy
================

It is a jQuery plugin for reporting the use of cookies and process acceptance.

Includes only one stylesheet and one js file.

 - jquery.notifyCookiesPolicy.css 
 - jquery.notifyCookiesPolicy.js

To use it you just have to include references to previous files.

    $.notifyCookiesPolicy();

**Settings**

 - **defaultText**: 'We use our own and third-party cookies to improve
   increase your experience and our services, by analyzing browsing on
   our website.By Continuing to browse, we accept that you' understand
   their use.' 
 - **defaultScroll**: 20     
 - **cssClass**:  "notify-cookies-policy-container"
 - **cookieName**: "notifyCookiesPolicy_accepted"
 - **callbackToEnableGoogleAnalytics**: null
 - **cookiePolicy**.**show**: true 
   **cookiePolicy**.**defaultText**: "Click here for more info"
   **cookiePolicy**.**callbackToShowCookiePolicy**: null

----------

**Callbacks**

There are two callbacks in the plugin. 

 1. **callbackToEnableGoogleAnalytics**:  will be called once the user has accepted the cookies.
 2. **callbackToShowCookiePolicy**: will be called when click the link to the policy of cookies.

![enter image description here](http://webapilabclient.azurewebsites.net/capture.png)

[MookieFumi](http://www.mookiefumi.com)