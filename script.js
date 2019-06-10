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
      document.getElementById("width").value = (h-6) * 2;
      document.getElementById("width1").value = document.getElementById("width").value - 3;
      document.getElementById("height2").value = document.getElementById("height").value;
    }
    function getHeight1() {
      var x = document.getElementById("height1").value;
      x = parseInt(x) +3;
      document.getElementById("width2").value = x;
    }
    function getHeight2() {
      document.getElementById("height").value = document.getElementById("height2").value;
    }
    function getWidth() {
      var w = document.getElementById("width").value;
      document.getElementById("height").value = (w/2) + 6;
      getHeight();
    }
    function getWidth1() {
      document.getElementById("width").value = parseInt(document.getElementById("width1").value) + 3;
    }
    function getWidth2() {
      document.getElementById("width1").value = parseInt(document.getElementById("width2").value) - 3;
    }