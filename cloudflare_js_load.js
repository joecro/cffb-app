// Load and execute an external JS resource whose URL depends on a configuration 
// variable specific to a domain/account

CloudFlare.define(
    'facebook_buttons',
    ['facebook_buttons/config'],
    function (config) {

        // config will be an object containing any configurations that will be
        // stored by CloudFlare, specific to app + domain combo

        var el = document.getElementById(config.targetelement || "header")

        /*
        <div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" 
            data-layout="button" data-action="like" data-show-faces="true" data-share="true"></div>
        */
        var fbDiv = document.createElement("div")
            .setAttribute("data-layout","button")
            .setAttribute("class", "fb-like")
            .setAttribute("data-href","https://developers.facebook.com/docs/plugins/")
            .setAttribute("data-action","like")
            .setAttribute("data-show-faces","false")
            .setAttribute("data-share","true");

        el.appendChild(fbDiv);
        
        document.body.insertAdjacentHTML("afterEnd", "<div id='fb-root'></div>");
 
        // build the URL for your JS resource
        var url = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=" + config.appId;

        // load and execute file
        CloudFlare.require([url]);

        // if you need to execute other code after the file has been loaded, use this instead
        /*CloudFlare.require([url], function () {
            // call some function that is made availabe by the other file
            var instance = Something();
            instance.start(config.someConfigVar)
        });*/

    }
);