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

## Ohje testaamiseen

Sisäänkirjautuminen toimii kovakoodatulla käyttäjillä:

Tavallinen käyttäjä

    käyttäjätunnus: 'username'
    salasana: 'password'

Admin käyttäjä

    käyttäjätunnus: 'admin'
    salasana: 'password'

Sisäänkirjautumisruudussa on mahdollista luoda oma käyttäjä
<figure>
<img src="./documentation/register.png" alt="register window" style="width: 40%"/>
</figure>





## Ohje asentamiseen

### 1. Tietokanta

### 2.


### 3. API

tests/api-tests -kansio sisältää esimerkit API:n käytöstä.


### Tietokantasuunnitelma

<figure>
<img src="./documentation/database_diagram_v6.png" alt="database_diagram_v1" />
<figcaption>Tietokanta versio 6, luotu MySQL Workbenchin avulla.
</figcaption>
</figure>
