//selekcija elemenata iz html dokumenta

var menu_navigation = document.querySelector('#main-nav'),
cart_trigger = document.querySelector('#cd-cart-trigger'),
cart_counter = document.querySelector('#cart-counter'),
hamburger_icon = document.querySelector('#cd-hamburger-menu'),
lateral_cart = document.querySelector('#cd-cart'),
shadow_layer = document.querySelector('#cd-shadow-layer'),

checkout_container = document.querySelector("#checkout-container"),
checkout_btn = document.querySelector(".checkout-btn"),
navs = document.querySelectorAll('.nav-link'),
logo = document.querySelector('#logo-link'),

payment_container = document.querySelector("#payment-container"),
payment_btn = document.querySelector('#payment-btn'),
nacin_placanja = document.querySelector('#nacin-placanja'),
kartica = document.querySelector('#kartica'),
forder_btn = document.querySelector('#forder-btn');


//dodela onclick za hamburger, cart dugme i pozadinski tamni sloj koji se prikazuje dok je neki dijalog otvoren
hamburger_icon.onclick = function(e){
    //toggle-uje vidljivost hamburger menija uz animaciju, vidljivost pozadinskog sloja i overflow na body-ju
    e.preventDefault();
    lateral_cart.classList.remove('speed-in');
    toggle_panel_visibility(menu_navigation, shadow_layer, document.body)
};

cart_trigger.onclick = function(e){
    //toggle-uje vidljivost cart menija uz animaciju, vidljivost pozadinskog sloja i overflow na body-ju
    e.preventDefault();    
    menu_navigation.classList.remove('speed-in');
    toggle_panel_visibility(lateral_cart, shadow_layer, document.body)
};

shadow_layer.onclick = function(){
    //klikom na pozadinski sloj gasimo sam sloj kao i sve otvorene dijaloge, unlockujemo navigaciju i cart dugme

    shadow_layer.classList.remove('is-visible');    
    checkout_container.classList.remove('is-visible');
    payment_container.classList.remove('is-visible')
    toggle_header_clickability(hamburger_icon, cart_trigger, navs)
    menu_navigation.classList.remove('speed-in');
    document.body.classList.remove('overflow-hidden');
    lateral_cart.classList.remove('speed-in');
    
};

//spisak svih inputa u dijalozima vezanih za checkout 

//svaki input se prilikom promene testira za validnost prema logicnom pravilu, nevalidni inputi dobiju crveni okvir

var ime = document.querySelector('#fname')
ime.onchange = () => {
    if (!/^[a-zA-Z]+$/.test(ime.value)) {

        ime.classList.add('invalid')
    }
    if (/^[a-zA-Z]+$/.test(ime.value)) {
        ime.classList.remove('invalid')
    }
}

var prezime = document.querySelector('#lname')
prezime.onchange = () => {
    if (!/^[a-zA-Z]+$/.test(prezime.value)) {

        prezime.classList.add('invalid')
    }
    if (/^[a-zA-Z]+$/.test(prezime.value)) {
        prezime.classList.remove('invalid')
    }
}

var mail = document.querySelector('#email')
mail.onchange = () => {
    if (!/\S+@\S+\.\S+/.test(mail.value)){
        mail.classList.add('invalid')
    }
    if (/\S+@\S+\.\S+/.test(mail.value)){
        mail.classList.remove('invalid')
    }
}

var drzava = document.querySelector('#state')
drzava.onchange = () => {
    if (!/^[a-zA-Z]+$/.test(drzava.value)) {
        drzava.classList.add('invalid')
    }
    if (/^[a-zA-Z]+$/.test(drzava.value)) {
        drzava.classList.remove('invalid')
    }
}

var adresa = document.querySelector('#adr')
adresa.onchange = () => {
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(adresa.value)) {
        adresa.classList.add('invalid')
    }
    if (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(adresa.value)) {
        adresa.classList.remove('invalid')
    }
}

var grad = document.querySelector('#city')
grad.onchange = () => {
    if (!/^[a-zA-Z]+$/.test(grad.value)) {
        grad.classList.add('invalid')
    }
    if (/^[a-zA-Z]+$/.test(grad.value)) {
        grad.classList.remove('invalid')
    }
}

var post = document.querySelector('#zip')
post.onchange = () => {
    if (!/^[0-9]+$/.test(post.value)) {
        post.classList.add('invalid')
    }
    if (/^[0-9]+$/.test(post.value)) {
        post.classList.remove('invalid')
    }
}

//spisak elemenata koji predstavljaju opcije za kreditne kartice
//izabrana kartica dobija crveni okvir

var ccvisa = document.querySelector('#ccvisa')
var ccamex = document.querySelector('#ccamex')
var ccmaster = document.querySelector('#ccmaster')
var ccdiscover = document.querySelector('#ccdiscover')

ccvisa.onclick = () => {
    ccvisa.classList.add('invalid')
    ccamex.classList.remove('invalid')
    ccmaster.classList.remove('invalid')
    ccdiscover.classList.remove('invalid')
}

ccamex.onclick = () => {
    ccamex.classList.add('invalid')
    ccvisa.classList.remove('invalid')
    ccmaster.classList.remove('invalid')
    ccdiscover.classList.remove('invalid')
}

ccmaster.onclick = () => {
    ccmaster.classList.add('invalid')
    ccamex.classList.remove('invalid')
    ccvisa.classList.remove('invalid')
    ccdiscover.classList.remove('invalid')
}

ccdiscover.onclick = () => {
    ccdiscover.classList.add('invalid')
    ccamex.classList.remove('invalid')
    ccmaster.classList.remove('invalid')
    ccvisa.classList.remove('invalid')
}

//spisak svih inputa u dijalozima vezanih za placanje

//svaki input se prilikom promene testira za validnost prema logicnom pravilu, nevalidni inputi dobiju crveni okvir

var cname = document.querySelector('#cname')
cname.onchange = () => {
    if (!/^[A-Za-z]|[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(cname.value)) {
        cname.classList.add('invalid-c')
    }
    if (/^[A-Za-z]|[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(cname.value)) {
        cname.classList.remove('invalid-c')
    }
}

var ccnum = document.querySelector('#ccnum')
ccnum.onchange = () => {
    if (!/^[0-9]+$/.test(ccnum.value)) {
        ccnum.classList.add('invalid-c')
    }
    if (/^[0-9]+$/.test(ccnum.value)) {
        ccnum.classList.remove('invalid-c')
    }
}

var expmonth = document.querySelector('#expmonth')
expmonth.onchange = () => {
    if (!/^[a-zA-Z]+$/.test(expmonth.value)) {
        expmonth.classList.add('invalid-c')
    }
    if (/^[a-zA-Z]+$/.test(expmonth.value)) {
        expmonth.classList.remove('invalid-c')
    }
}

var expyear = document.querySelector('#expyear')
expyear.onchange = () => {
    if (!/^[0-9]+$/.test(expyear.value)) {
        expyear.classList.add('invalid-c')
    }
    if (/^[0-9]+$/.test(expyear.value)) {
        expyear.classList.remove('invalid-c')
    }
}

var cvv = document.querySelector('#cvv')
cvv.onchange = () => {
    if (!/^[0-9]+$/.test(cvv.value)) {
        cvv.classList.add('invalid-c')
    }
    if (/^[0-9]+$/.test(cvv.value)) {
        cvv.classList.remove('invalid-c')
    }
}

//checkout dugme: ukoliko cart nije prazan, prikazuje checkout dijalog i zakljucava navigaciju i cart dugme
checkout_btn.onclick = (e) => {
    if(!cart.contents.length) {
        alert('cart is empty')
        return
    }
    toggle_checkout_visibility()
    toggle_header_clickability(hamburger_icon, cart_trigger, navs)
}


//payment dugme: ukoliko su svi inputi validni, updateuje informacije o kupcu u cartu, sakriva checkout dijalog i prikazuje payment dijalog
payment_btn.onclick = () => {

    invalid = document.querySelectorAll('.invalid')

    if (invalid.length) {
        alert(`Obavezno je uneti validne podatke u sva polja.`)
        return
    }

    cart.buyer = { fname: ime.value, lname: prezime.value, email: mail.value, state: drzava.value, address: adresa.value, city: grad.value, zip: post.value }

    toggle_checkout_visibility()
    document.body.classList.remove('overflow-hidden');
    payment_container.classList.add("is-visible")
}

//ukoliko je izabrana kreditna kartica kao nacin placanja, prikazuje inpute vezane za karticu
nacin_placanja.onchange = () => {
    if(nacin_placanja.value == 'pouzece') {
        kartica.classList.remove('is-visible')
    }
    if(nacin_placanja.value == 'kartica') {
        kartica.classList.add('is-visible')
    }
}

//dugme u payment dijalogu koje finalizuje porudzbinu
//registruje sve podatke o porudzbini, prazni cart i updateuje local storage i html
forder_btn.onclick = () => {
    if (nacin_placanja.value == 'pouzece') {
        cart.payment = { method: 'pouzece' }

        //da je sajt live ovde bi se desilo slanje podataka o narudzbini na server

        cart.empty();
        cart.buyer = {}
        cart.payment = {}

        setState();
        cart.total = parseFloat(0).toFixed(2)
        renderContents();
    }
    if (nacin_placanja.value == 'kartica') {
        cart.payment = { method: 'kartica', info: { cname: cname.value, ccnum: ccnum.value, expmonth: expmonth.value, expyear: expyear.value, cvv: cvv.value }}

        //da je sajt live ovde bi se desilo slanje podataka o narudzbini na server

        cart.empty();
        cart.buyer = {}
        cart.payment = {}
        setState();
        cart.total = parseFloat(0).toFixed(2)
        renderContents();
    }
    payment_container.classList.remove('is-visible')
    shadow_layer.onclick();
    
}

//pali i gasi vidljivost lateralnih panela sa animacijom (shopping cart i nav u hamburgeru na malim ekranima)
//paneli su po defaultu levo/desno od ekrana i imaju transition, klasa speed-in setuje right ili left property na 0 sto izaziva tranziciju 
function toggle_panel_visibility (lateral_panel, background_layer, body) {
    if (lateral_panel.classList.contains('speed-in') ) {
        lateral_panel.classList.remove('speed-in');
        body.classList.remove('overflow-hidden');
        background_layer.classList.remove('is-visible');
    }
    else {
        lateral_panel.classList.add('speed-in');
        body.classList.add('overflow-hidden');
        background_layer.classList.add('is-visible');
    }
}

//pali i gasi vidljivost checkout dijaloga u zavisnosti od toga da li je cart prisutan na ekranu


function toggle_checkout_visibility () {
    //ako je cart na ekranu, to znaci da je ova funkcija pozvana pritskom na checkout dugme, znaci checkout treba da postane vidljiv
    if (lateral_cart.classList.contains('speed-in') ) {
        lateral_cart.classList.remove('speed-in');
        document.body.classList.remove('overflow-hidden');
        checkout_container.classList.add('is-visible');
    }
    else {
        //ako cart nije na ekranu a funkcija je pozvana, to znaci da treba sakriti checkout dijalog

        document.body.classList.add('overflow-hidden');
        checkout_container.classList.remove('is-visible');
    }
}


//zakljucava/otkljucava navigaciju, cart, i hamburger u zavisnosti od toga da li su checkout/payment dijalozi vidljivi u trenutku poziva ove funkcije
function toggle_header_clickability () {

    if (checkout_container.classList.contains('is-visible') || payment_container.classList.contains('is-visible') ) {
        //ako su checkout ili payment dijalozi aktivni
        //stavlja praznu funkciju elementima koji imaju onclick, linkovima gasi pointer events da ne bi bili klikabilni
        hamburger_icon.onclick = () => {}
        cart_trigger.onclick = () => {}
        navs.forEach((element, index) => {
            element.style.pointerEvents = "none"
        })
        logo.style.pointerEvents = "none"


    } 
    else {
        //ako ni checkout ni payment dijalog nisu aktivni
        //vraca stare onclick funkcije i automatske pointer event vrednosti

        hamburger_icon.onclick = function(e){
            e.preventDefault();
            lateral_cart.classList.remove('speed-in');
            toggle_panel_visibility(menu_navigation, shadow_layer, document.body)
        };
        cart_trigger.onclick = function(e){
            e.preventDefault();    
            menu_navigation.classList.remove('speed-in');
            toggle_panel_visibility(lateral_cart, shadow_layer, document.body)

        };
        navs.forEach((element, index) => {
            element.style.pointerEvents = "auto"
        })
        logo.style.pointerEvents = "auto"
    }

}







//funkcija za onclick dugme koje brise proizvod iz carta
function removeItemFromCart(event) {
    var X = event.target
    cart.update({ product: {name: X.dataset.name }, amount: parseInt(0)})
    
}


var items = document.querySelector(".cd-cart-items"); //ul element iz carta u koji se dinamicki ubacuju proizvodi iz carta kao li elementi
var cd_cart_total = document.querySelector("div.cd-cart-total p span"); //span u kome se prikazuje ukupna vrednost proizvoda u cartu


//ova funkcija updateuje html carta na osnovu podataka iz cart_data.js
function renderContents () {
    items.innerHTML = `` //svakim pozivom ove funkcije se gazi stari html 
    cart.contents.forEach(
        //za svaki proizvod u cartu generise se list item u dokumentu i popunjava html-om na osnovu podataka iz carta, i onda dodaje u items 
        (element, index) => {
            
            item = document.createElement('li')
            item.innerHTML = `
            <span class="cd-qty">${element.amount}x</span>${element.product.label}
            <div class="cd-price">${parseFloat(element.product.price * element.amount).toFixed(2)} RSD</div>
            <a href="#0" data-name="${element.product.name}" onclick="{removeItemFromCart(event)}" class="cd-item-remove cd-img-replace"></a>
            `
            items.append(item);        

        }
    )

    cd_cart_total.innerHTML = parseFloat(cart.total).toFixed(2) //update prikaza ukupne cene u cartu
    
    //update prikaza broja proizvoda na ikonici shopping carta
    //ako nema proizvoda u cartu, ne prikazuje se broj
    cart_counter.innerHTML = cart.contents.length 
    if (cart.contents.length == 0) {
        cart_counter.classList.remove('is-visible')
    } else {
        cart_counter.classList.add('is-visible')
    }
}


renderContents(); //inicijalni update html-a kada se otvori stranica