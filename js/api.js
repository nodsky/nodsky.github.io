var base_url = "https://api.football-data.org/v2/";

// blok kode yang akan dipanggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error: ", + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    // mengubah suatu objek menjadi Promise agar bisa di then-kan
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error: " + error);
}

function connect() {
  var connectDB = idb.open("mydatabase", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("match")) {
      var matchOS = upgradeDb.createObjectStore("match", {keyPath: 'id'});
    }
  });

  return connectDB;
}

function getData(id) {
  dbPromise = connect();

  return dbPromise.then(function(db) {
    var tx = db.transaction('match', 'readonly');
    var store = tx.objectStore('match');

    return store.get(id.toString());
  });

}

function getMatchByPlayOff() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("type");

  let loader =
  `<div class="progress">
    <div class="indeterminate"></div>
  </div>`;

  document.getElementById("match-content").innerHTML = loader;

  fetch(base_url + "competitions/2000/matches?group=" + idParam, {
    headers: { 'X-Auth-Token': '3fe901596866478e908ce10b6eb221a3' },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      var id_saved = [];
      data.matches.forEach(function(match) {
        getData(match.id).
          then(function(result) {
            if (result) {
              data.check = result;
            }
          })
      });
      return data;
    })
    .then(function(data) {
      console.log(data);
      var matchHTML = "";
      data.matches.forEach(function(match) {
        console.log(data.matches[0]);
        matchHTML += `
        <div class="card">
          <div class="card-content">
            <div class="row" style="display: flex; align-items: center; justify-content: center">
              <div class="col s3 l12">
                <p><a href="./team.html?id=${match.homeTeam.id}&type=${idParam}">${match.homeTeam.name}</a></p>
              </div>
              <div class="col s1 l12">
                <h6>${match.score.fullTime.homeTeam}</h6>
              </div>
              <div class="col s1 l12">
                <h6>-</h6>
              </div>
              <div class="col s1 l12">
                <h6>${match.score.fullTime.awayTeam}</h6>
              </div>
              <div class="col s3 l12">
                <p><a href="./team.html?id=${match.awayTeam.id}&type=${idParam}">${match.awayTeam.name}</a></p>
              </div>
            </div>
            <div class="card-action">
              <div class="col s12" style="text-align: center">
                <button type="button" class="btn btn-check modal-trigger" data-target="modal-saved" id="${match.id}" onClick="addData('${match.homeTeam.name}', '${match.score.fullTime.homeTeam}', '${match.awayTeam.name}', '${match.score.fullTime.awayTeam}', '${match.id}', '${match.group}')">Save Data</button>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById("match-content").innerHTML = matchHTML;


      var btnCheck = document.querySelectorAll(".btn-check");
      btnCheck.forEach(function(button) {
        getData(button.id).
          then(function(result) {
            if (result) {
              button.disabled = true;
              button.innerHTML = 'Data already saved!';
            }
          })
      });
    })
    .catch(error);


  }

function getTeam() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  var idMatch = urlParams.get("type");
  document.getElementById("back-to-match").href= "./match.html?type=" + idMatch

  fetch(base_url + "teams/" + idParam, {
    headers: { 'X-Auth-Token': '3fe901596866478e908ce10b6eb221a3' },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      if (data.crestUrl == null || data.crestUrl == "") {
        data.crestUrl = "./default_flag_image.png";
      }
      var teamHTML = `
      <div class="card">
        <div class="card-image">
          <img src="${data.crestUrl}">
        </div>
        <div class="card-content">
          <span class="card-title">${data.name}</span>
          <div class="section">
            <h6>Address</h6>
            <p>${data.address}</p>
          </div>
          <div class="divider"></div>

          <div class="section">
            <h6>Phone</h6>
            <p>${data.phone}</p>
          </div>
          <div class="divider"></div>

          <div class="section">
            <h6>Website</h6>
            <p>${data.website}</p>
          </div>
          <div class="divider"></div>

          <div class="section">
            <h6>Founded</h6>
            <p>${data.founded}</p>
          </div>
          <div class="divider"></div>

          <div class="section">
            <h6>Player</h6>
            <ul class="collection">
          `;

          data.squad.forEach(function(s) {
            teamHTML += `
              <li class="collection-item">${s.name}</li>
            `
          });
          teamHTML += `
           </ul>
          </div>

        </div>
      </div>
      `;
      document.getElementById("team-content").innerHTML = teamHTML;
    })
    .catch(error);
}
