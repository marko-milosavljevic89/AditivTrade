//importuju se express, filesystem i cors biblioteke

const express = require('express')
const fs = require('fs');

const cors = require('cors');

//app je nas express server

const app = express()

//broj porta koji cemo koristiti
const port = 3000

//metodom use vezujemo cors za nas express server
app.use(cors({
    origin: '*'
}));

//ucitavamo JSON koji sadrzi podatke o proizvodima putem filesystem-a
let rawdata = fs.readFileSync('./productinfo.json');
//pretvaramo ucitane podatke u javascript objekat parse metodom
let productinfo = JSON.parse(rawdata);


//news1, news2 i news3 sadrze content za detaljniji prikaz svake od vesti na glavnoj stranici
//svaki clanak je dostupan na zasebnoj adresi
let news1 = JSON.stringify(`<div class="special-container"><h1>Novosti iz industrije</h1><br></br>
<p>U beogradskom hotelu “Holiday Inn” se, pod pokrivetljstvom firme KUK, svake godine održava seminar u kojem učestvuju svi veći proizvođači iz mesne industrije. </p>
<p>Kao značajan uvoznik belgijske firme Cosuera, Aditiv Trade aktivno učestvuje na pomenutom skupu i snabdeva domaće tržište Couserinim proizvodima. </p>
<p>Na ovogodišnjem seminaru posebnu pažnju su privukli proizvodi mesnih belančevina u prahu i belančevina kolagena, poreklom iz Španije. U distribuciji i preradih istih i Aditiv Trade je uzeo učešća, vodjen svojim timom iskusnih tehnologa.</p>
<p> Jedna od novina na tržištu jeste sve veće prisustvo kineskih dobavljača, koji su se svojom ponudom mešavine gotovih proizvoda i sirovina pozicionarli tik uz Evropsku uniju.</p>

<p>Priliku da promovišu svoje nove proizvode u Beogradu su iskoristile mnoge značajne kompanije poput: Viskofan i Seamsa (Španija), Cosuera (Belgija), ADM (SAD) i mnogi drugi.   </p>
<p>Medju domaćim dobavljačima posebno mesto pripalo je kompaniji Soja protein iz Bečeja i Hočevar - proizvodjaču kolagena.   Konačno, zahvaljujući brzom tehnološkom napretku, uvozna ponuda iz Evropske unije je raznolika, te su domaćim proizvodjačima na raspolaganju skrobovi izuzetnog kvaliteta, brojne vrste biljnih vlakana i belančevine mesa u prahu.</p></div>`);

let news2 = JSON.stringify(`<div class="special-container"><h1>Tehnolog</h1><br></br>
<p>Ideja koja nas pokreće jeste snabdevanje domaćeg tržišta najkvalitetnijim sastojcima i inovacijama u mesnoj industriji.</p>
<p>U cilju proširenja našeg dinamičnog tima, trenutno smo u potrazi za prehrambenim tehnologom koji deli naše vrednosti.</p><br />

<p>Prethodno iskustvo u mesnoj industriji nije neophodno, ali od svog budućeg kolege očekujemo:</p><br />

<p>• posvećenost i proaktivan pristup,</p> 
<p>• stručnost i preciznost u radu,</p> 
<p>• želju za usavršavanjem i savladavanjem novih tehnologija.</p><br></br>

<p>Ukoliko ste zainteresovani, pošaljite nam svoju biografiju na našu email adresu, sa naznakom za koju poziciju se prijavljujete.</p></div>`);


let news3 = JSON.stringify(`<div class="special-container"><h1>Komercijalista</h1><br></br>
<p>Kao dinamična kompanija sa značajnim prisustvom na lokalnom tržištu, posvećeni smo snabdevanju klijenata proizvodima najboljeg kvaliteta.</p> 

<p>U cilju proširenja našeg tima, trenutno smo u potrazi za komercijalistom koji deli naše vrednosti.</p><br />

<p>Veštine i osobine koje očekujemo od našeg budućeg kolege su:</p><br />

<p>• poznavanje lokalnog tržišta,</p>
<p>• odlične pregovaračke sposobnosti,</p>
<p>• stručnost i preciznost u radu,</p>
<p>• proaktivan pristup.</p><br></br>

Ukoliko ste zainteresovani, pošaljite nam svoju biografiju na našu email adresu, sa naznakom za koju poziciju se prijavljujete.</p></div>`);

//default adresa za get requestove
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//adresa za get requestove za spisak proizvoda
app.get('/data/', (req, res) => {
    //saljemo JSON sa spiskom proizvoda
    res.send(productinfo);
})

app.get('/news1/', (req, res) => {
    res.send(news1)
})

app.get('/news2/', (req, res) => {
  res.send(news2)
})

app.get('/news3/', (req, res) => {
  res.send(news3)
})

//server osluskuje na localhostu, na portu 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})