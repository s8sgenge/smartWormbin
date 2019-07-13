const xlabels = [];
const yhumidity = [];
const ytemperature = [];
const ymoisture = [];

async function chartIt() {
  await getData();
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xlabels,
      datasets: [{
        label: 'Humidity %',
        data: yhumidity,
        backgroundColor: "rgba(105, 190, 148,0.4)"
      }, {
        label: 'Temperature °C',
        data: ytemperature,
        backgroundColor: "rgba(105, 190, 148,0.4)"
      }, {
        label: 'Moisture g/m3',
        data: ymoisture,
        backgroundColor: "rgba(105, 190, 148,0.4)"
      }]
    }
  });
}

async function getData() {
  const response = await fetch('data/smartWormbin.csv');
  const data = await response.text();
  
  let humidity = 0;
  let temperature = 0;

  const table = data.split('\n');
  table.shift();
  table.forEach(row => {
    const columns = row.split(',');
    const timestamp = columns[0];
    xlabels.push(timestamp);
     humidity = columns[1];
    yhumidity.push(humidity);
     temperature = columns[2];
    ytemperature.push(temperature);
     moisture = columns[3];
    ymoisture.push((moisture/20));
  });
  if (humidity > 85) {
    drowningWorm();
  }
  if (humidity < 55) {
    dryingWorm();
  }
  if (temperature > 25) {
    boilingWorm();
  }
  if (temperature < 15) {
    freezingWorm();
  }
  if(temperature >= 15 && temperature <= 25 && humidity <=85 && humidity >= 60){
    document.getElementById("bottom").src="";
}
}

$('document').ready(function () {
  var typed = new Typed('#typed', {
    strings: ["IoT Smart Wormbin."],
    typeSpeed: 80,
    callback: function () {
      $(".typed-cursor").hide();
    }
  });
});


$(document).ready(function () {
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#index']").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  $(window).scroll(function () {
    $(".slideanim").each(function () {
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
      if (pos < winTop + 600) {
        $(this).addClass("slide");
      }
    });
  });
})

function getHeight() {
  var h = document.getElementById("height").value;
  document.getElementById("width").value = (h - 6) * 2;
  document.getElementById("width1").value = document.getElementById("width").value - 3;
  document.getElementById("height2").value = document.getElementById("height").value;
}
function getHeight1() {
  var x = document.getElementById("height1").value;
  x = parseInt(x) + 3;
  document.getElementById("width2").value = x;
}
function getHeight2() {
  document.getElementById("height").value = document.getElementById("height2").value;
}
function getWidth() {
  var w = document.getElementById("width").value;
  document.getElementById("height").value = (w / 2) + 6;
  getHeight();
}
function getWidth1() {
  document.getElementById("width").value = parseInt(document.getElementById("width1").value) + 3;
}
function getWidth2() {
  document.getElementById("width1").value = parseInt(document.getElementById("width2").value) - 3;
}

function boilingWorm(){
  let audio = new Audio('audio/scream.mp3');
  audio.volume = 0.3;
  audio.play();
  document.getElementById("bottom").src="fire.png";
}

function drowningWorm(){
  let audio = new Audio('audio/bubbling.mp3');
  audio.volume = 0.2;
  audio.play();
  document.getElementById("bottom").src="water.png";
}

function freezingWorm(){
  let audio = new Audio('audio/sneeze.mp3');
  audio.volume = 0.2;
  audio.play();
  document.getElementById("bottom").src="snow.png";
}

function dryingWorm(){
  let audio = new Audio('audio/cough.mp3');
  audio.volume = 0.2;
  audio.play();
  document.getElementById("bottom").src="cactus.png";
}
