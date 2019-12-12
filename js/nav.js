document.addEventListener("DOMContentLoaded", function() {
  //activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // memuat tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // regis event listener
        document.querySelectorAll(".topnav a, .sidenav a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
            // tutup Sidenav
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // muat konten yang dipanggil
            page = event.target.getAttribute("href").substr(1);
          });
        });

      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  //get content
  var page = window.location.hash.substr(1);


  if (page == "") page = "index";
  loadPage(page);

  function loadPage(page) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 400) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Halaman tidak tersambung.</p>";
        }
      }
    };
    xhttp.open("GET", "/pages/" + page + ".html", true);
    xhttp.send();
  }
});
