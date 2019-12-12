
function connect() {
  var connectDB = idb.open("mydatabase", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("match")) {
      var matchOS = upgradeDb.createObjectStore("match", {keyPath: 'id'});
    }
  });

  return connectDB;
}

function addData(homeTeam, homeScore, awayTeam, awayScore, id, group) {
  dbPromise = connect();
  dbPromise.then(function(db) {
      var tx = db.transaction('match', 'readwrite');
      var store = tx.objectStore('match');
      var item = {
          id : id,
          homeTeam : homeTeam,
          homeScore : homeScore,
          awayTeam : awayTeam,
          awayScore : awayScore,
          group : group,
      };
      store.put(item);
      return tx.complete;
  }).then(function() {
      console.log('Buku berhasil disimpan.');
  }).catch(function() {
      console.log('Buku gagal disimpan.')
  })

  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
}



function getAllData() {
  dbPromise = connect();

  dbPromise.then(function(db) {
    var tx = db.transaction('match', 'readonly');
    var store = tx.objectStore('match');
    return store.getAll();
  }).then(function(items) {
    var matchHTML = "";
    items.forEach(function(item) {
      matchHTML += `
      <div class="card">
        <div class="card-content">
          <span class="card-title"><h5>${item.group}</h5></span>
          <div class="row" style="display: flex; align-items: center; justify-content: center">
            <div class="col s3 l12">
              <p><a href="#">${item.homeTeam}</a></p>
            </div>
            <div class="col s1 l12">
              <h6>${item.homeScore}</h6>
            </div>
            <div class="col s1 l12">
              <h6>-</h6>
            </div>
            <div class="col s1 l12">
              <h6>${item.awayScore}</h6>
            </div>
            <div class="col s3 l12">
              <p><a href="#">${item.awayTeam}</a></p>
            </div>
          </div>
          <div class="card-action">
            <div class="col s12" style="text-align: center">
              <button type="button" data-target="modal-deleted" class="btn red modal-trigger" onClick="deleteData('${item.id}')">Delete Data</button>
            </div>
          </div>
        </div>
      </div>
      `;
    });
    document.getElementById("match-content").innerHTML = matchHTML;
  })
}

function deleteData(id) {
  dbPromise = connect();
  dbPromise.then(function(db) {
    var tx = db.transaction('match', 'readwrite');
    var store = tx.objectStore('match');
    store.delete(id.toString());
    return tx.complete;
  }).then(function() {
    console.log('item deleted');
  })
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
}
