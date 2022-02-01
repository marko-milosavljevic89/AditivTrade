
//fetch-om saljemo get request za podatke o proizvodima na server
fetch('http://localhost:3000/data/', {method: 'GET', headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}})
.then(response => response.json()) //odgovor ocitavamo kao objekat
.then(res => {  //od objekta se putem nestovanih for each naredbi dinamicki pravi html za products stranicu
    container_div = document.querySelector('#product_container')

    

    res.forEach((element0, index0) => {

        accord0 = document.createElement('div')
        accord0.classList.add('accordion')
        accord0.innerHTML = `
            <h3 class="products-h3"><strong>${Object.keys(element0)[0]}</strong></h3>
        `;
        container_div.appendChild(accord0)
        panel0 = document.createElement('div')
        panel0.classList.add('panel')
        
        element0[Object.keys(element0)[0]].forEach((element1, index1) => {

            accord1 = document.createElement('div')
            accord1.classList.add('accordion')
            accord1.innerHTML = `
                <h3 class="products-h3"><strong>${Object.keys(element1)[0]}</strong></h3>
            `;
            panel0.appendChild(accord1)
            panel1 = document.createElement('div')
            panel1.classList.add('panel')

            element1[Object.keys(element1)[0]].forEach((element2, index2) => {

                product = document.createElement('div')
                product.innerHTML = `
                <div class="product_attributes" data-name=${element2.name}>
                    <h4 class="products-h4">${element2.label}</h4>
                    <p id="paragraph">${element2.price} din/${element2.unit}</p>
                    
                    <button class="to_order" data-name=${element2.name} data-price=${element2.price} data-unit=${element2.unit} data-increment=${element2.increment}>Poruči</button>
                </div>
                `
                panel1.appendChild(product)
            })
            panel0.appendChild(panel1)

        })
        container_div.appendChild(panel0)     
                
    } )


    //selectuju se svi elementi klase accordion
    //svaki accordion je u html-u uparen sa jednim panelom koji je vidljiv samo kada je accordion aktivan
    var coll = document.getElementsByClassName("accordion");
  
    
    //svim accordionima se dodeljuje onclick koji ih aktivira/deaktivira putem css klase    
    for (i = 0; i < coll.length; i++) {

      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

      });
    }

    //svim to_order dugmicima se dodeljuje onclick koji kupi informacije o proizvodu vezanom za dato dugme i dodaje taj proizvod u cart
    //kolicine istog proizvoda se dodaju jedan po jedan svakim klikom
    const into_cart = document.querySelectorAll(".to_order").forEach((element, index) =>  {
        element.onclick=( (e) => {   
    
            proizvod = e.target.dataset.name
            etiketa = String(document.querySelector(`div[data-name=` + `${proizvod}` + `]>h4`).innerHTML)
            kolicina = parseInt(1)
            cena = parseFloat(e.target.dataset.price).toFixed(2)
            jedinica = e.target.dataset.unit
            korak = e.target.dataset.increment
    
    
            
            cart.update({ product: { label: etiketa, name: proizvod, price: parseFloat(cena).toFixed(2), unit: jedinica, increment: korak }, amount: kolicina });

    
         } );
    })
});