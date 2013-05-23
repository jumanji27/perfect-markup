// perfectmarkup.js
// Unknown script for pixel perfect html/css coding
// https://github.com/nazz-nazz/perfect_markup

window.onload = function() {

var pm = {

  initialize: function(img) {

    var overlay = pm.help.ce("div");
    var overlayImg = pm.help.ce("img");

    pm.help.sa(overlay, "id", "overlay");
    document.body.appendChild(overlay);

    pm.help.sa(overlayImg, "id", "overlay_img");

    overlay.appendChild(overlayImg);

    if (pm.doDisplay() == "") {
      pm.doDisplay("none");
    }

    pm.addGlobalStyle(
      "#overlay {" +
      " display: " + pm.doDisplay() + ";" +
      " position: absolute;" +
      " top: 0;" +
      " left: 0;" +
      " width: 100%;" +
      " z-index: 99;" +
      " opacity: 0.5" +
      "}" +
      "#overlay img {" +
      " display: block;" +
      " margin: 0 auto;" +
      "}"
    );

    var keyEvent = "keypress";

    // Add hotkeys
    pm.addEvent(document, keyEvent, function (event) {

      event = event || window.event;
      var key = event.keyCode || event.which;

      // Shift + Space to show / hide overlay
      if ( event.shiftKey && (key == 32) ) {
        (pm.doDisplay() == "none") ? pm.doDisplay("block") : pm.doDisplay("none");

        if (event.preventDefault) {
          event.preventDefault();
        }

        event.returnValue = false;

        return true;
      }

      // Ctrl + Enter – resize window to size of layout
      if ( event.ctrlKey && (key == 13) ) {
        pm.help.ge("overlay").style.opacity = "1";
        (pm.doDisplay() == "none") ? pm.doDisplay("none") : pm.doDisplay("block");
      }

    });

    pm.setLayoutImage(img, overlayImg);

  },

  // Crossbrowser addEventListener
  addEvent: function(obj, event, handler) {
    if (obj.addEventListener) {
      obj.addEventListener(event, handler, false);
    }
    else {
      obj.attachEvent("on" + event, handler);
    }
  },

  addGlobalStyle: function(css) {
    var globalStyle = pm.help.ce("style");
    pm.help.sa(globalStyle, "type", "text/css");

    var cssText = document.createTextNode(css);
    globalStyle.appendChild(cssText);

    document.getElementsByTagName("head")[0].appendChild(globalStyle);
  },

  setLayoutImage: function(src, overlayImg) {

    var img = new Image();
    var overlayW, overlayH;

    pm.help.sa(overlayImg, "id", "overlay_img");

    pm.addEvent(img, "load", function () {
      overlayImg.src = src;
      overlayW = img.width;
      overlayH = img.height;
    });

    img.src = src;

  },

  doDisplay: function(val) {

    if (val) {
      overlay.style.display = val;
      window.name = val;
    }

    return window.name;

  },

  // window.name storage routine
  help: {

    ge: function(id) {
      return document.getElementById(id);
    },

    ce: function(tag) {
      return document.createElement(tag);
    },

    sa: function(el, attr, val) {
      el.setAttribute(attr, val);
    },

  }

};

pm.initialize("_dev/layout.png");

};

