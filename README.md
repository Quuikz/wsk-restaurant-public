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

## Ohje

##

### 1. Tietokanta

1.

### Kuvien lataaminen formdatalla

Katso esimerkki lomakkeen käytöstä tiedostosta: tests/upload-form.html

### API

tests/api-tests -kansio sisältää esimerkit API:n käytöstä.

Sisäänkirjautuminen toimii kovakoodatulla käyttäjällä:

    ### login with default user
    POST http://localhost:3000/api/auth/login
    Content-Type: application/json

    {
    "username": "user",
    "password": "password"
    }

Palauttaa:

    {
    "user": {
        "user_id": "user_id",
        "name": "name",
        "username": "user",
        "email": "email",
        "role": "role"
        },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl9pZCIsIm5hbWUiOiJuYW1lIiwidXNlcm5hbWUiOiJ1c2VyIiwiZW1haWwiOiJlbWFpbCIsInJvbGUiOiJyb2xlIiwiaWF0IjoxNzYzNDAzMTA1LCJleHAiOjE3NjM0ODk1MDV9.W5YBTobcQhtws91nnhwkqJeywsUzbK6s8PqLCYcB5PQ"
    }

### Tietokantasuunnitelma

<figure>
<img src="./documentation/database_diagram_v6.png" alt="database_diagram_v1" />
<figcaption>Tietokanta versio 6, luotu MySQL Workbenchin avulla.
</figcaption>
</figure>
