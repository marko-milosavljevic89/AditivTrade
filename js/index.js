const details_buttons = document.querySelectorAll('.btn-details') //array sa sva 3 dugmeta koja klikom vuku clanak sa servera
const details_container = document.querySelector('#detailed-news') //div u koji se ubacuje html trenutno prikazanog clanka
details_buttons.forEach( (element, index) => {
    element.onclick = (event) => {
        
        num = event.target.dataset.num //broj clanka koji trazimo od servera, dobijen iz data atributa dugmeta
        if(window.screen.availWidth < 1200) {
            //za male ekrane, pozicija details containera se menja na osnovu toga koji clanak je trazen
            //na velikim ekranima pozicija je uvek ista zato sto su sva tri details dugmeta uvek prisutna na ekranu
        switch(num) {
            case "1":
                details_container.style.top = '80%'
                break;
            case "2":
                details_container.style.top = '180%'
                break;
            case "3":
                details_container.style.top = '220%'
                break;
        }
        }
        //get request za specifican clanak sa servera na osnovu data atributa pritisnutog dugmeta
        fetch(`http://localhost:3000/news${num}/`, {method: 'GET', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
        .then(res => res.json())
        .then(response => {
            //clanak koji stigne sa servera se ubacuje u details container
            details_container.innerHTML = `${response}`
            details_container.classList.add('is-visible') //container postaje vidljiv
            shadow_layer.classList.add('is-visible')    //prikazuje pozadinski tamni sloj
            toggle_header_clickability_index(hamburger_icon, cart_trigger, navs) //zakljucava hamburger, navigaciju, i cart
        
        })
        
    }
} )

//ova funkcija radi isto sto i toggle_header_clickability u skripta.js, samo u indexu takodje izvrsava zakljucavanje ako su detalji clanka prikazani
function toggle_header_clickability_index (hamburger, cart, nav) {

    if (details_container.classList.contains('is-visible') || checkout_container.classList.contains('is-visible') || payment_container.classList.contains('is-visible') ) {

        hamburger.onclick = () => {}
        cart.onclick = () => {}
        nav.forEach((element, index) => {
            element.style.pointerEvents = "none"
        })
        logo.style.pointerEvents = "none"

    } 
    else {

        hamburger.onclick = function(e){
            e.preventDefault();
            lateral_cart.classList.remove('speed-in');
            toggle_panel_visibility(menu_navigation, shadow_layer, document.body)
        };
        cart.onclick = function(e){
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

//identican onclick kao u skripta.js osim sto takodje gasi prikaz detalja clanaka koji samo postoje u index.html
shadow_layer.onclick = function(){
    shadow_layer.classList.remove('is-visible');
    details_container.classList.remove('is-visible')
    checkout_container.classList.remove('is-visible');
    payment_container.classList.remove('is-visible')

    toggle_header_clickability_index(hamburger_icon, cart_trigger, navs)
    menu_navigation.classList.remove('speed-in');
    document.body.classList.remove('overflow-hidden');
    lateral_cart.classList.remove('speed-in');
    
};

//logika za slider

const num_items = document.querySelectorAll(".slider-item").length //broj slika u slideru
var current = 1 //data-position slider itema koji trenutno zelimo da prikazemo
const init = () => {
    document.querySelectorAll(".slider-item").forEach((element, index) =>  {
        element.style.order = index+1; //dodaje svim slider itemima order stil koji diktira kojim redom ce se prikazati unutar parent elementa
    })
    addEvents();
}
const addEvents = () => {
    window.setInterval(gotoNext, 7000); //svakih 7 sekundi se izvrsava tranzicija slidera
    document.querySelector(".slider-container").addEventListener('transitionend', () => {
        changeOrder(); //svaki put kad se izvrsi tranzicija slidera, promeniti redosled slider itema
    });
}

const changeOrder = () => {
    //ako je poslednji item na trenutnoj pozicije, vrati se na pocetak, inace predji na sledeci item
    if(current == num_items) 
        current = 1;
    else 
        current++;
    let order = 1; //counter za vrednost koja se upisuje u style.order slider itema
    
    for(let i=current; i<=num_items; i++) {
        //loop kroz sve slider iteme od current pozicije do poslednjeg
        document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
    }
    for(let i=1; i<current; i++) {
        //loop kroz sve slider iteme od prve pozicije do current pozicije
        document.querySelector(".slider-item[data-position='" + i + "']").style.order = order;
        order++;
    }
    document.querySelector(".slider-container").classList.remove('slider-container-transition'); //gasi se tranzicija (do sledeceg ticka gotoNexta)
	document.querySelector(".slider-container").style.transform = 'translateX(0)'; //translate se setuje na 0 (do sledeceg ticka gotoNext)
}

const gotoNext = () => {
    document.querySelector(".slider-container").classList.add('slider-container-transition'); //pali se tranzicija slider containera
	document.querySelector(".slider-container").style.transform = 'translateX(-100%)'; //translate se setuje na -100% sto pomera naredni slider item na videlo
}

init(); //poziv funkcije init kada se loaduje index stranica

