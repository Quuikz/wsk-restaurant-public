# wsk-restaurant aka Restauranto

Metropolia Web Sovellus Kurssi- Projekti

## Sovelluksen idea ja kohderyhmä

### Idea

Sovelluksen tarkoituksena on tarjota ravintoloille helppo tapa esitellä ruokalistojaan ja hallinnoida niitä verkossa. Ravintolat voivat luoda profiileja, lisätä ruokia, muokata hintoja ja päivittää valikoimiaan reaaliaikaisesti. Asiakkaat voivat selata ravintoloiden ruokalistoja, tehdä tilauksia, ostaa lahjakortteja sekä pitää kirjaa tilauksistaan.

### Kohderyhmä

Sovellus on suunnattu pienille ja keskisuurille ravintoloille, jotka haluavat parantaa näkyvyyttään verkossa ja tarjota asiakkailleen kätevän tavan tutustua ruokalistoihin ja tehdä tilauksia. Lisäksi sovellus palvelee asiakkaita, jotka etsivät uusia ravintoloita ja haluavat tehdä tilauksia helposti mobiililaitteillaan tai tietokoneillaan.

## Sovelluksen toiminnallisuudet

- Ravintoloiden profiilien luominen ja hallinnointi
- Ruokalistojen luominen, muokkaaminen ja päivittäminen
- Asiakkaiden tilauksien tekeminen ja hallinnointi
- Lahjakorttien ostaminen ja hallinnointi
- Käyttäjätilien luominen ja hallinnointi sekä ravintoloille että asiakkaille
- Reaaliaikaiset päivitykset ruokalistoihin ja tilauksiin
- Reaaliaikaiset lähimpien pysäkkien lähtevät tiedot
- Reaaliaikaiset säätiedot ja terassin aukiolo arvio

## Ohje testaukseen

### URL:

<https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/>

### Testikäyttäjät:

#### Admin:

    käyttäjätunnus: 'admin'
    salasana: 'password'

#### User:

    käyttäjätunnus: 'username'
    salasana: 'password'

#### Oma User:

Sisäänkirjautumisruudussa on mahdollista luoda oma käyttäjä.
Rekisteröytyminen ei sulje ikkunaa, joten käyttäjän pitää siirtyä itse sisäänkirjautumiseen.

<figure>
<img src="./documentation/register.png" alt="register window" style="width: 40%"/>
</figure>


### Pääsyoikeudet:

- Admin: Kaikki oikeudet (ravintoloiden ja käyttäjien hallinta)
- User: Rajoitetut oikeudet (vain omien tilausten ja profiilin hallinta)
- Quest: Vain lukuoikeudet (ruokalistat ja ravintolat)

### Testausohjeet:

1. Tutki sivuja ensiksi ilman kirjautumista (Quest-käyttäjä)
2. Kirjaudu sisään user-käyttäjällä ja testaa tilauksen tekeminen ja profiilin hallinta
3. Kirjaudu sisään admin-käyttäjällä ja testaa ravintoloiden ja käyttäjien hallinta
   - Admin panelii löytyy hampurilaisvalikosta
4. Testaa eri toiminnallisuudet ja varmista, että kaikki toimii odotetusti

### Näkymät

Sovelluksessa on 2 päänäkymää: ravintolasivu ja admin hallintasivu

<figure>
<img src="./documentation/nakymat.png" alt="views" style="width: 100%"/>
</figure>

Admin käyttäjällä sisäänkirjautuminen näyttää linkit admin hallintasivulle
<figure>
<img src="./documentation/admin_linkit.png" alt="links to admin dashboard" style="width: 100%"/>
</figure>


## Local kehitysympäristön pystytys

1. Varmista, että sinulla on asennettuna Node.js ja npm

2. Asenna tietokanta mariaDB paikalliselle koneellesi

   - Luonti scriptit löytyvät kansiosta: TODO// LINKKI NÄIHIN

3. Kloonaa repository paikalliselle koneellesi

4. Siirry projektin juurikansioon terminaalissa

5. Asenna tarvittavat riippuvuudet komennolla: `npm install` && `npm install --prefix client`

6. Käynnistä backend komennolla: `npm run dev`

7. Avaa uusi terminaali ikkuna ja siirry juureen

8. Siirry frontend kansioon: `cd client`

9. Asenna frontend riippuvuudet: `npm install`

10. Käynnistä frontend komennolla:`npm run dev`

11. Avaa selain ja mene osoitteeseen: <http://localhost:<>PORT> portin löydät frontend konsolista

## Wireframe ja mockup kuvat

Wireframe ja mockup kuvat löytyvät kansiosta: TODO// LINKKI NÄIHIN

## Teknologiat

- Frontend: React.js, HTML, Tailwind CSS
- Backend: Node.js, Express.js
- Tietokanta: mariaDB
- Reaaliaikaiset tiedot: Kolmannen osapuolen API:t:
  - Säätiedot: TODO// API nimi
  - Lähtevät tiedot: Digitransit / HSL API
  - Kartat: Leaflet.js
- Autentikointi: JWT (JSON Web Tokens)
- Versiohallinta: Git ja GitHub
- CI/CD: GitHub Actions
- Pilvipalvelu: Microsoft Azure

## Tiimi

- Riku Kuikka
- Topi Ahola
- Araz Mohammed
- Veijo Kasanen

```

```
