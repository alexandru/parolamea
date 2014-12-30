/*
 * Copyright (C) 2014 Alexandru Nedelcu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/* globals jQuery, navigator */

(function($) {

  // Detect if the browser supports transitions
  $.support.transition = (function(){
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        support = (
          thisStyle.transition !== undefined ||
          thisStyle.WebkitTransition !== undefined ||
          thisStyle.MozTransition !== undefined ||
          thisStyle.MsTransition !== undefined ||
          thisStyle.OTransition !== undefined
        );
    return support;
  })();

  $.ripples = function(options) {

    // Default options
    var defaultOptions = {
      "target": ".btn:not(.btn-link), .card-image, .navbar a:not(.withoutripple), .nav-tabs a:not(.withoutripple), .withripple"
    };


    function isTouch() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }


    // Fade out the ripple and then destroy it
    function rippleOut(ripple) {

      // Unbind events from ripple
      ripple.off();

      // Start the out animation
      if ($.support.transition) {
        ripple.addClass("ripple-out");
      } else {
        ripple.animate({
          "opacity": 0
        }, 100, function() {
          ripple.trigger("transitionend");
        });
      }

      // This function is called when the transition "out" ends
      ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        ripple.remove();
      });

    }

    // Apply custom options
    options = $.extend(defaultOptions, options);


    $(document)
    .on("mousedown touchstart", options.target, function(e) {
      if (isTouch() && e.type == "mousedown") {
        return false;
      }

      var element = $(this);

      // If the ripple wrapper does not exists, create it
      if (!$(this).find(".ripple-wrapper").length) {
        $(this).append("<div class=ripple-wrapper></div>");
      }

      var wrapper = $(this).find(".ripple-wrapper");


      var wrapperOffset = wrapper.offset(),
          relX,
          relY;
      if (!isTouch()) {
        // Get the mouse position relative to the ripple wrapper
        relX = e.pageX - wrapperOffset.left;
        relY = e.pageY - wrapperOffset.top;
      } else {
        // Make sure the user is using only one finger and then get the touch position relative to the ripple wrapper
        e = e.originalEvent;
        if (e.touches.length === 1) {
          relX = e.touches[0].pageX - wrapperOffset.left;
          relY = e.touches[0].pageY - wrapperOffset.top;
        } else {
          return;
        }
      }

      // Meet the new ripple
      var ripple = $("<div></div>");

      // Add to it the ripple class
      ripple.addClass("ripple");

      // Position it in the right place
      ripple.css({"left": relX, "top": relY});

      // Set the background color of the ripple
      ripple.css({"background-color": window.getComputedStyle($(this)[0]).color});

      // Spawn it
      wrapper.append(ripple);

      // Make sure the ripple has the styles applied (ugly hack but it works)
      (function() { return window.getComputedStyle(ripple[0]).opacity; })();

      // Set the new size
      var size = (Math.max($(this).outerWidth(), $(this).outerHeight()) / ripple.outerWidth()) * 2.5;


      // Decide if use CSS transitions or jQuery transitions
      if ($.support.transition) {
        // Start the transition
        ripple.css({
          "-ms-transform": "scale(" + size + ")",
          "-moz-transform": "scale(" + size + ")",
          "-webkit-transform": "scale(" + size + ")",
          "transform": "scale(" + size + ")"
        });
        ripple.addClass("ripple-on");
        ripple.data("animating", "on");
        ripple.data("mousedown", "on");
      } else {
        // Start the transition
        ripple.animate({
          "width": Math.max($(this).outerWidth(), $(this).outerHeight()) * 2,
          "height": Math.max($(this).outerWidth(), $(this).outerHeight()) * 2,
          "margin-left": Math.max($(this).outerWidth(), $(this).outerHeight()) * -1,
          "margin-top": Math.max($(this).outerWidth(), $(this).outerHeight()) * -1,
          "opacity": 0.2
        }, 500, function() {
          ripple.trigger("transitionend");
        });
      }

      // This function is called when the transition "on" ends
      setTimeout(function() {
        ripple.data("animating", "off");
        if (ripple.data("mousedown") == "off") {
          rippleOut(ripple);
        }
      }, 500);

      // On mouseup or on mouseleave, set the mousedown flag to "off" and try to destroy the ripple
      element.on("mouseup mouseleave", function() {
        ripple.data("mousedown", "off");
        // If the transition "on" is finished then we can destroy the ripple with transition "out"
        if (ripple.data("animating") == "off") {
          rippleOut(ripple);
        }
      });

    });

  };

  $.fn.ripples = function() {
    $.ripples({"target": $(this)});
  };

})(jQuery);
