//funkcija koja koristi localStorage da sacuva sadrzaj cart-a izmedju sesija i prilikom prelaska sa stranice na stranicu
function setState () {
    //setItem prima lokalno snima vrednost cart.contents u obliku JSON-a, uparenu sa kljucem 'cart-contents' na osnovu koga joj se moze pristupiti
    localStorage.setItem('cart-contents', JSON.stringify(cart.contents));
};


function getState () {

    //loadujemo vrednost iz local storage-a pod kljucem 'cart-contents'
    var saved = localStorage.getItem('cart-contents');

    //ako je u local storage-u nesto bilo registrovano kao cart-contents, if(saved) je true i funkcija vraca vrednost izvadjenu iz storage-a kao objekat
    if (saved) {
        
        return JSON.parse(saved);

    }

    //ako u local storage-u nema takvog kljuca, saved ce biti null (blok pod if-om se nece desiti), i funkcija vraca prazan array
    return [];
};

function clearState () {
    //izbacuje se item sa kljucem cart-contents iz local storage-a ako vec postoji
    localStorage.removeItem('cart-contents');
    
}

function resetState () {
    //clearuje se state iz localstorage-a, i onda se updateuje cart.contents sa novim (sada praznim) state-om
    clearState();
    cart.contents = getState();
}

cart = {
    
    
    contents: getState(), //sadrzaj carta (array objekata)
    total: 0, //ukupna cena svih proizvoda u cartu
    buyer: {}, //podaci o kupcu koji se popunjavaju prilikom checkouta
    payment: {}, //podaci o payment informacijama koje se updateuju prilikom checkouta

    update: function (proizvod) {
        //proveri da li proizvod vec postoji u cart.contents
        var found = false;
        var index;
        for(var i = 0; i < cart.contents.length; i++) {
            if (cart.contents[i].product.name == proizvod.product.name) {
            found = true;
            index = i;
            break;
            }
        }   
        //ako proizvod vec postoji u cart.contents, poveca se kolicina tog proizvoda u cartu za kolicinu navedenu u parametru       
        if (found) {

            cart.contents[index].amount += proizvod.amount;
            //ako smo pokusali da updateujemo cart sa kolicinom proizvoda 0, taj proizvod se potpuno brise iz carta
            if (proizvod.amount == 0)
            {
                cart.contents.splice(index, 1)
            }
            //posle update-a se snima stanje u local storage, obracunava total, i promene updateuju u html-u
            setState();
            cart.calculate_total();
            renderContents();
        }
        //ako proizvoda nema u cartu, dodaje se u cart, updateuje se local storage, obracunava total i updateuje html
        else {

            if (proizvod.amount == 0)
            {

                alert(`trying to add 0 of ${proizvod.product.name} to a cart that doesn't already contain ${proizvod.product.name}`)
                return
            }
            cart.contents.push(proizvod);
            setState();
            cart.calculate_total();
            renderContents();
        }
        
        

    },

    //prazni cart
    empty: function () {
        resetState();

    },

    //obracun ukupne cene svih proizvoda u cartu na osnovu kolicine
    calculate_total: function () {

        let total_price = 0
        cart.contents.forEach((element, index) => {
            total_price += parseFloat(element.product.price).toFixed(2) * parseFloat(element.amount).toFixed(2)
        });
        cart.total = total_price;

    }



}