# wsk-restaurant
Metropolia Web Sovellus Kurssi- Projekti

<br>

## Ohje

### 1. Tietokanta

1. Luo tietokanta manuaalisesti. Luo tietokantaan käyttäjä jolla kaikki oikeudet.

2. Luo tietokannan taulut scriptillä: database/create-database-v6.sql (Käytä uusinta versionumeroa.)
Muista antaa ohjelmalle pääsy tietokantaan. Aseta käyttäjätunnus ja tietokanta .env -tiedostolla.

3. Täytä tietokannan taulut scriptillä: mock_data_v6.sql

4. Aseta tietokannan tiedot .env tiedostoon.

<br>

### Kuvien lataaminen formdatalla

Katso esimerkki lomakkeen käytöstä tiedostosta: tests/upload-form.html

<br>

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




<br><br>
### Tietokantasuunnitelma

<figure>
<img src="./documentation/database_diagram_v6.png" alt="database_diagram_v1" />
<figcaption>Tietokanta versio 6, luotu MySQL Workbenchin avulla.
</figcaption>
</figure>