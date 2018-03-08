function done(data) {
    //console.log(data.responseText);
    let got = JSON.parse(data.responseText);
    got = filterDead(got);
    got = sortByName(got);
    createView(got);
}


function xhr(method, url, done) {
    //új xmlhttp request létrehozása
    let xmlHTTP = new XMLHttpRequest();
    //eseményfigyelő létrehozása, ha megváltozik a request állapota, akkor fusson le a függvény
    xmlHTTP.onreadystatechange = function () {
        if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
            done(xmlHTTP)

        }
    }
    xmlHTTP.open(method, url);
    xmlHTTP.send();
}

xhr('GET', '/json/characters.json', done);
//referenciaként átadjuk a done-t és nem meghívjuk ezért nem kell a ();


//halottak kiszűrése

function filterDead(data) { //done függvénnyel kell majd dolgoznia
    //nem tartalmazza azokat akik halottak

    let living = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].dead !== 'true') {
            living.push(data[i]);
        }
    }
    //console.log(data);
    return living;

}

function sortByName(data) {
    data.sort(function (a, b) {
        if (a.name > b.name) {
            return -1;
        }
        if (a.name < b.name) {
            return 1;
        }
        return 0;
    });
    return data;
}

function showCharacterData(data, i) { //így kell szűrni
    document.querySelector('.info').innerHTML =
        `<h1 class="info-title">Game of Thrones</h1>
                  <img class="info-image" src="/${data[i].picture}" alt="${data[i].name}">
                  <h2 class="info-name">${data[i].name}</h2>
                  <img class="info-house" src="/assets/houses/${data[i].house}.png" alt="${data[i].house}">
                  <p class="info-text">${data[i].bio}</p>`;

}


function createView(data) { //betöltjük a képeket a nevekkel a honlapra
    for (let i = 0; i < data.length; i++) {

        let div = document.createElement('div');
        div.className = 'character';
        let img = document.createElement('img');
        // img.setAttribute(src, '/elérési útvonal');
        img.src = '/' + data[i].portrait;
        img.alt = data[i].name;
        img.addEventListener('click', function () {
            showCharacterData(data, i);
        })
        let pTag = document.createElement('p');
        pTag.textContent = data[i].name;
        div.appendChild(img);
        div.appendChild(pTag);
        document.getElementsByClassName('left')[0].appendChild(div);

        // így is lehet

        /* for(var i = 0; i < data.length; i++){
             let character = `<div class="character">
                              <img onclick="${showCharacterData(i)}" src="/${data[i].portrait}"alt="${data[i].name}">
                              <p>${data[i].name}</p>
                              </div>`;
                              document.getElementByClassName('left')[0].innerHTML += character; */
    }

}