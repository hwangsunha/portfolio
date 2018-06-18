scrolling = {

    bindings: function() {

        select.window.on("scroll",function(){
            // scrolling.headerHandler();
            scrolling.fixedHeaderHandler();
            scrolling.fadeHeaderText();
        });

    },

    fadeHeaderText: function() {

        var windowTop = select.window.scrollTop(),
            textOpacity = Math.round((1 -(windowTop * 0.006)) * 100) / 100;
            
        // Check text opacity and animte it
        if(textOpacity >= -1){
           select.heading.css("opacity",textOpacity); 
        }

    },

    fixedHeaderHandler: function() {

        // Vars
        var windowTop = select.window.scrollTop(),
            headerFixPoint = 75;

        if(windowTop > headerFixPoint){

            // Scrolled past the logo
            select.headerFixed.addClass("scrolled");
            select.nav.addClass("scrolled");

        }else{

            // Not scrolled past the logo
            select.headerFixed.removeClass("scrolled");
            select.nav.removeClass("scrolled");

        }

    },

    scrollTop: function() {

        // Scroll to the top
        select.htmlBody.animate({ scrollTop: 0 }, global.speed, global.ease);

    }

};

// UI object

ui = {

    bindings: function() {

        select.almiLogo.on(events.click,ui.almiGifHandler);
        select.almiGif.on(events.click,ui.almiGifHandler);

    },

    almiGifHandler: function(){

        if(select.almiGif.hasClass("is-visible") && select.html.hasClass("almi-is-visible") && select.almiGifWrapper.hasClass("is-visible")){

            select.almiGif.removeClass("is-visible");
            select.html.removeClass("almi-is-visible");

            setTimeout(function(){
                select.almiGifWrapper.removeClass("is-visible");
            },500);

        }else{

            select.almiGif.addClass("is-visible");
            select.almiGifWrapper.addClass("is-visible");
            select.html.addClass("almi-is-visible");

        }


    },
    

    almiGifHide: function() {

        select.almiGif.removeClass("is-visible");

        setTimeout(function(){
            select.html.removeClass("almi-is-visible");
            select.almiGifWrapper.removeClass("is-visible");
        },500);
        

    },

    almiGifSizeHandler: function() {

        var windowHeight = select.window.height();

        select.almiGif.height(windowHeight);

    }

};

nav = {

    bindings: function() {
        select.btnMenu.on(events.click, function(){nav.menuHandler("open");});
        select.btnMenuClose.on(events.click, function(){nav.menuHandler("close");});
    },

    menuHandler: function(state){

        // If its open, do this stuff
        if(state === "open"){
            select.nav.fadeIn(global.speed).removeClass("is-closed").addClass("is-open");
        }
        // If its not, close it
        else if(state === "close"){
            // Hide almi gif
            ui.almiGifHide();
            select.nav.delay(500).fadeOut(global.speed).removeClass("is-open").addClass("is-closed");
        }

    }

};

page = {

    pageLoad: function(section,project) {

        // Scroll to top
        scrolling.scrollTop();
        
        // Fade out content
        select.pjaxContainer.delay(300).fadeOut(global.speed);

        // Fade out the header
        select.header.addClass("hide");

        // Begin pulsing
        setTimeout(function(){

            select.logoLoader.addClass("anim-pulse");

        },global.speed);

        // Page info
        var currentLink = select.nav.find("[data-section='" + section + "']");

        // Update nav
        select.nav.find(".active").removeClass("active");
        currentLink.addClass("active");

        // Check if project
        if(project !== undefined){
            select.body.attr("class",project);
        }else{
            select.body.attr("class",section);
        }

    },

    pageLoaded: function() {

        // Close the menu
        setTimeout(function(){
            nav.menuHandler("close");
            // Remove loader class
            select.dotLoader.removeClass("anim-pulse");
            select.logoLoader.removeClass("anim-pulse");
        },400);

        // Show header
        setTimeout(function(){
            select.header.removeClass("hide");
        },800);

        // Show the content
        select.pjaxContainer.delay(800).fadeIn(global.speed);

        // Make sure links in AJAX content are modifiied
        // for touch
        touch.modifyAjaxLinks();

    },

    pageLoadFromHistory: function(section,project) {

        // Update page title
        // page.pageUpdatePageTitle(title);
        // console.log(window.history.state.title);

        // Check if project
        if(project !== undefined){
            select.body.attr("class",section + " " + project);
        }else{
            select.body.attr("class",section);
        }

        // Page info
        var currentLink = select.nav.find("[data-section='" + section + "']");

        // Update nav
        select.nav.find(".active").removeClass("active");
        currentLink.addClass("active");


    },

    pageUpdatePageTitle: function(title) {

        // Change the page title
        document.title = title;
 
    },

    popStateHandler: function() {

        // Get the URL history from history object
        var pageUrl = window.history.state.url,
            pageTitle = window.history.state.title,
            pageHeading = window.history.state.fragment;

        // Check if its null
        if(pageUrl){

            var pageParent = pageUrl.split("/"),
                pageProject = pageUrl.substring(pageUrl.lastIndexOf('/') + 1);

            if(pageParent.indexOf('studio') >= 0){

                page.pageLoadFromHistory('studio');

            }else if(pageParent.indexOf('contact') >= 0){

                page.pageLoadFromHistory('contact');

            }else if(pageParent.indexOf('journal') >= 0){

                page.pageLoadFromHistory('journal');

            }else if(pageParent.indexOf('portfolio')) {

                page.pageLoadFromHistory('portfolio',pageProject);

            }

            // Update page title
            page.pageUpdatePageTitle(pageTitle);

            // Update page heading
            select.heading.html(pageHeading);    

        }

        // console.log("pjax fragment: " + window.history.state.fragment);
        // console.log(window.history.state);
        // console.log("page heading: " + pageHeading);

    }

};

pjax = {

    bindings: function() {

        select.document.on(events.click, ".fancy-url", function(event) {

            // Prevent default href
            event.preventDefault();

            // Stop propagation
            event.stopPropagation();

            // Get the URL
            var url = $(this).attr("href"),
                urlTouch = $(this).data("url"),
                section = $(this).data("section"),
                project = $(this).data("project");


            // Not current section
            if(!$(this).hasClass("active") || $(this).hasClass("nav-link") && section === "portfolio" || $(this).hasClass("nav-link") && section === "journal" ){

                // Add loading animation for projects
                if($(this).hasClass("project-grid-link") || $(this).hasClass("project-link")){

                    // Update active class
                    page.pageLoad(section,project);

                // Main pages
                }else{

                    // Update active class
                    page.pageLoad(section);

                    // Add loading animation
                    $(this).find(select.dotLoader).addClass("anim-pulse");

                }

                
                if($(this).hasClass("yh-logo-fixed")){

                    // Overwrite url for logo
                    url = urlTouch;

                }
                
                // Wait for animations to finish before
                // loading content
                setTimeout(function(){

                    if(Modernizr.touch){

                        // Touch Ajax event �� href is removed
                        // url being pulled from data-url
                        $.pjax({
                            url: urlTouch,
                            container: select.pjaxContainer,
                            contentType: "application/json",
                            dataType: "text"
                        });

                    }else{

                        // Load ajax content �� normal stuff
                        $.pjax({
                            url: url,
                            container: select.pjaxContainer,
                            contentType: "application/json",
                            dataType: "text"
                        });

                    }

                },1000);

            }

            // Stop everything
            return false;
            
        });

        $(document).on('pjax:complete', function() {

            page.pageLoaded();

        });

        // $(document).on('pjax:start', function(){
        //     console.log("start");
        // });

        $(document).on('pjax:success', function(data){

            // Vars
            var newHeading = $(data.target).children().find(".page-heading").html(),
                projectImageSelector = $(data.target).children().find(".project-image");

            // Update heading
            select.heading.html(newHeading);

            // Make the url pretty for analytics
            var prettyUrl = location.href.split(location.host)[1];

            // console.log("pretty url: " + prettyUrl);

            // Track the pageview with analytics
            ga('send', {
              'hitType': 'pageview',
              'page': prettyUrl,
              'title': window.history.state.title
            });

            // Swap image src on loaded project images
            images.imageSrcHandler(projectImageSelector);

            // Update the heading in history object
            window.history.state.fragment = newHeading;

            // Update pushstate to include heading in fragment
            window.history.replaceState(window.history.state, window.history.state.title, window.history.state.url);

            // console.log(window.history.state);
            // console.log(window.history.state.fragment);
            
        });

        $(document).on('pjax:timeout', function(event) {
            // Prevent default timeout redirection behavior
            event.preventDefault();
        });

    }

};

images = {

    bindings: function(){

        images.imageSrcHandler(select.projectImage);

    },

    imageSrcHandler: function(selector){

        $(selector).each(function(){

            // Vars
            var self = $(this),
                srcDesktop = self.data("src-desktop"),
                srcTablet = self.data("src-tablet"),
                srcMobile = self.data("src-mobile");

            // Swap back to original size
            if(device.desktopLarge && self.hasClass("browser") || device.desktop && self.hasClass("full") || device.desktopLarge && self.hasClass("full")){

                self.attr("src",srcDesktop);

            }

            // Tablet sizes
            if(device.desktop && self.hasClass("browser") || device.tablet && self.hasClass("browser") || device.tablet && self.hasClass("tablet") || device.tablet && self.hasClass("full")){

                self.attr("src",srcTablet);

            }

            // Mobile sizes
            if(device.mobile && self.hasClass("browser") || device.mobile && self.hasClass("tablet")){

                self.attr("src",srcMobile);

            }


        });

    }


};

utility = {

    window: {
        checkWindowSize: function(){

            // Window size classes for conditions & styling
            if (device.mobile) {
                select.html.addClass('mobile');
            } else {
                select.html.removeClass('mobile');
            }
            if (device.tablet) {
                select.html.addClass('tablet');
            } else {
                select.html.removeClass('tablet');
            }
            if (device.desktop) {
                select.html.addClass('desktop');
            } else {
                select.html.removeClass('desktop');
            }
            if (device.desktopLarge) {
                select.html.addClass('desktop-large');
            } else {
                select.html.removeClass('desktop-large');
            }
            if (device.desktopMax) {
                select.html.addClass('desktop-max');
            } else {
                select.html.removeClass('desktop-max');
            }
 
        }
    },

    checkBrowsers: function() {

        // Firefox
        Modernizr.addTest('firefox', function () {
            return !!navigator.userAgent.match(/firefox/i);
        });

        // iOS
        Modernizr.addTest('ios', function () {
            return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
        });

    },

    setContentHeight: function() {

        // Get window height
        var winHeight = select.window.height();
            // footerHeight = select.footer.outerHeight(),
            // headerHeight = select.header.outerHeight(),
            // pageHeight = winHeight - footerHeight;

        // Set min height for container so no
        // weird stuff happens when Ajax loads
        select.contentWrapper.css("minHeight", winHeight);

    },

    windowResizeHandler: function() {

        // Redefine object
        device.redefineObject();

        // Check window size
        utility.window.checkWindowSize();

        // Reset container height
        utility.setContentHeight();

        // Swap image sources
        images.imageSrcHandler(select.projectImage);

    }

};

touch = {
    
    bindings: function(){

        touch.modifyAjaxLinks();

    },

    modifyAjaxLinks: function(){

        // iOS fires "tap" event twice which breaks AJAX calls
        // this removes the href and sets data url attr
        if(Modernizr.touch){
            select.fancyUrl.each(function(){

                $(this).removeAttr("href");

            });
        }

    }

};

init = {

    everything: function(){

        // Things that do stuff
        nav.bindings();
        ui.bindings();
        pjax.bindings();
        touch.bindings();
        images.bindings();
        scrolling.bindings();
        utility.checkBrowsers();
        utility.window.checkWindowSize();
        utility.setContentHeight();
        utility.windowResizeHandler();
        scrolling.fixedHeaderHandler();
        // plugins.googleMap();
    }

};

window.onpopstate = function() {

    page.popStateHandler();

};

$(window).resize(function() {

    utility.windowResizeHandler();

});

window.onload = function(){
    
};

$(document).ready(function(){
    
    init.everything();

});

    

