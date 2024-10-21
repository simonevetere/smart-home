angular.module('RoomControl', ['ngMaterial'])

.controller('AppCtrl', function($scope) { 
});

// Supponendo che la libreria qrcode.js esporti una funzione `qrcode`
new QRCode(document.getElementById("qrcode"), {
  text: window.location.href,
  render: 'canvas',
  width: 100,
  height: 100,
  image: {
    hide: false,
    src: 'watermark.png', // Immagine del watermark
    x: 0,
    y: 0,
    width: 100,
    height: 100
  }
});

var savedLanguage = localStorage.getItem('selectedLanguage');
var savedVoice = localStorage.getItem('selectedVoice');

// Load the saved language and voice on page load
window.onload = function() {
  var savedLanguage = localStorage.getItem('selectedLanguage');
  var savedVoice = localStorage.getItem('selectedVoice');
  if (savedLanguage  == null || savedVoice == null) {
    window.location.href='/settings'
  }
};

/* start code for round slider */
var minTemperature = 20;
var maxTemperature = 26;
var interval = 0.5;
var currentTemperature = 21;
var setTemperature = 23;
var state = 1;

//init slider
var sliderDiv = $("#slider");

var slider = sliderDiv.roundSlider({
    value: setTemperature,
    step: interval,
    circleShape: "pie",
    startAngle: 315,
    radius: 80,
    width: 14,
    handleSize: "+16",
    handleShape: "dot",
    sliderType: "min-range",
    min: minTemperature,
    max: maxTemperature,
    tooltipFormat: tooltip,
    editableTooltip: false,
    mouseScrollAction: true,
    change: update,
    drag: update,
    create: function() {
      insertGradient();
    }
});

function setSetTemperature(val) {
  sliderData.setValue(val);
}

function getSetTemperature() {
  return sliderData.getValue();
}

function setCurrentTemperature(val) {
  currentTemperature = parseFloat(val).toFixed(1);
  tooltip.find(".currentTemperature").html(currentTemperature + "°C");
}

function setState(val) {
  state = val;
  if (state == 1) {
    tooltip.find(".state").html('<span class="heating"><i class="fa fa-fire"></i></span>');
  } else if (state == -1) {
    tooltip.find(".state").html('<span class="cooling"><i class="fa fa-snowflake-o"></i></span>');
  } else {
    tooltip.find(".state").html('<span class="neutral"><i class="fa fa-fire"></i></span>');
  }
}

function setTooltipPosition(marginTop, marginLeft) {
  tooltip.css(
      {"margin-top": marginTop,
       "margin-left": marginLeft}
   );
}

function insertGradient() {
  $('<div class="rs-gradient" />').insertBefore($('.rs-tooltip'));
}

function update(args) {
  setTemperature = args.value;
  setBackgroundColor(setTemperature);
}

function setBackgroundColor(val) {
  var val = -230 + parseInt(val * 7.5);
    $('.rs-gradient').css({
      background: 'hsl(' +  val + ', 100%, 57%)'
    });
}

function tooltip(args) {
  var setTemperature = args.value;
  //var currentTemperature = currentTemperature;
  var html = '<div class="setTemperature"><span>' + setTemperature.toFixed(1) + '°C</span></div>';
  html += '<div class="currentTemperature"><span>' + currentTemperature.toFixed(1) + '°C</span></div>';
  if (state == 1) {
    html += '<div class="state"><span class="heating"><i class="fa fa-fire"></i></span></div>';
  } else if (state == -1) {
    html += '<div class="state"><span class="cooling"><i class="fa fa-snowflake-o"></i></span></div>';
  } else {
    html += '<div class="state"><span class="neutral"><i class="fa fa-fire"></i></span></div>';
  }                  
  
  return html;
}

//slider startup
var sliderData;
var tooltip;

$(function() {
  //setting vars needed for data manipulation
  tooltip = sliderDiv.find(".rs-tooltip-text");
  sliderData = sliderDiv.data("roundSlider");
  //initial tooltip position and backgroundColor fix
  setTooltipPosition(-56,-48);
  setBackgroundColor(setTemperature);
});
/* end code for round slider */