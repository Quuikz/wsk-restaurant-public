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

### URL

<https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/>

### Testikäyttäjät

#### Admin

- Käyttäjätunnus: admin
- Salasana: password

#### User

- Käyttäjätunnus: user
- Salasana: password

### Pääsy oikeudet

- Admin: Kaikki oikeudet (ravintoloiden ja käyttäjien hallinta)
- User: Rajoitetut oikeudet (vain omien tilausten ja profiilin hallinta)
- Quest: Vain lukuoikeudet (ruokalistat ja ravintolat)

### Testausohjeet

1. Tutki sivuja ensiksi ilman kirjautumista (Quest-käyttäjä)
2. Kirjaudu sisään user-käyttäjällä ja testaa tilauksen tekeminen ja profiilin hallinta
3. Kirjaudu sisään admin-käyttäjällä ja testaa ravintoloiden ja käyttäjien hallinta
   - Admin panelii löytyy hampurilaisvalikosta
4. Testaa eri toiminnallisuudet ja varmista, että kaikki toimii odotetusti

## Local kehitysympäristön pystytys

1. Varmista, että sinulla on asennettuna Node.js ja npm

2. Asenna tietokanta mariaDB paikalliselle koneellesi

   - Luonti scriptit löytyvät kansiosta: TODO// LINKKI NÄIHIN
   - Luo tietokanta ja taulut suorittamalla scriptit mariaDB:ssä
     - Create-database-v6.sql
       -Pelkkä tietokanta ja taulut
     - Create-database-v6_with_mockdata.sql
       -Tietokanta, taulut ja mock dataa testaukseen

3. Kloonaa repository paikalliselle koneellesi

4. Siirry projektin juurikansioon terminaalissa

5. Juuressa sijaitsee .env.sample tiedosto, kopioi se nimellä .env ja täytä tarvittavat ympäristömuuttujat
   #database
   DB_HOST=localhost
   DB_USER=appuser
   DB_PASSWORD=password
   DB_NAME=wsk_restaurant

   #server host
   SERVER_HOST=localhost
   SERVER_PORT=VALITSEMA PORTTI

   #JSON web token
   JWT_SECRET= OMA SALAINEN AVAIN

   #API KEYS
   #Digi Transit
   HSL_API_KEY= OMA API AVAIN

6. Asenna tarvittavat riippuvuudet komennolla: `npm install` && `npm install --prefix client`

7. Käynnistä backend komennolla: `npm run dev`

8. Avaa uusi terminaali ikkuna ja siirry juureen

9. Siirry frontend kansioon: `cd client`

10. Asenna frontend riippuvuudet: `npm install`

11. Käynnistä frontend komennolla:`npm run dev`

12. Avaa selain ja mene osoitteeseen: <http://localhost:PORT> portin löydät frontend konsolista

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
