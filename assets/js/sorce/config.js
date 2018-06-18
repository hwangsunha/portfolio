// Global object

global = {

	// Site URL
	siteUrl: 						"siteurl.com",

	// Animation
	speed: 							500,
	ease: 							"easeInOutExpo",

	// Breakpoints
	mobileMax: 						580,
	tabletMin: 						581,
	tabletMax: 						1010,
	desktopMin: 					1011,
	desktopMax: 					1300,
	desktopLargeMin: 				1301,
	desktopLargeMax: 				2000
};

// Events object

events = {
    click: "click",
    scroll: "scroll",
    mouseup: "mouseup",
    load: "load"
};

// Events redefined for touch

if(Modernizr.touch){
    events.click = "tap";
    events.mouseup = "touchend";
}

// $.pjax.defaults.scrollTo = false;

// Selector object

select = {
	document: 						$(document),
	html: 							$("html"),
	body: 							$("body"),
    htmlBody:                       $("html, body"),
	window: 						$(window),
    container:                      $(".container"),
    logoFixed:                      $(".yh-logo-fixed"),
    logo:                           $(".yh-logo"),
	nav: 							$(".nav-main"),
    navItem:                        $(".nav-main-list-item"),
    contentWrapper:                 $(".content-wrapper"),
    header:                         $(".header"),
    headerFixed:                    $(".header-fixed"),
    heading:                        $(".content-heading"),
    pageHeading:                    $(".page-heading"),
    pageTitle:                      $(".page-title"),
    dotLoader:                      $(".dot-loader"),
	pjaxContainer:   				$(".content-main"),
    pjaxContent:                    $(".section-inner"),
    btnMenu:                        $(".btn-menu"),
    btnMenuLine:                    $(".btn-menu .line"),
    btnMenuClose:                   $(".btn-menu-close"),
    projectImageList:               $(".project-image-list"),
    projectImage:                   $(".project-image"),
    footer:                         $(".footer"),
    logoLoader:                     $(".logo-loader"),
    links:                          $(".link"),
    fancyUrl:                       $(".fancy-url"),
    almiLogo:                       $(".svg-almi"),
    almiGif:                        $(".almi-gif"),
    almiGifWrapper:                 $(".almi-gif-wrapper")
};

// Device dimension object

device = {
    mobile:  		select.window.width() <= global.mobileMax,
    tablet:  		select.window.width() > global.mobileMax && select.window.width() <= global.tabletMax,
    desktop: 		select.window.width() > global.desktopMin && select.window.width() <= global.desktopMax,
    desktopLarge: 	select.window.width() > global.desktopLargeMin && select.window.width() <= global.desktopLargeMax,
    desktopMax: 	select.window.width() > global.desktopLargeMax,

    redefineObject: function() {

    	// Useful for window.resize();
	    device.mobile =  		select.window.width() <= global.mobileMax;
	    device.tablet =  		select.window.width() > global.mobileMax && select.window.width() <= global.tabletMax;
	    device.desktop = 		select.window.width() > global.desktopMin && select.window.width() <= global.desktopMax;
	    device.desktopLarge = 	select.window.width() > global.desktopLargeMin && select.window.width() <= global.desktopLargeMax;
	    device.desktopMax = 	select.window.width() > global.desktopLargeMax;

    }
};