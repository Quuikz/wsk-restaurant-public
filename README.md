# wsk-restaurant
Metropolia Web Sovellus Kurssi- Projekti


<br><br>
### Ohje

Luo tietokanta scriptillä: database/create-database-v4.sql (Käytä uusinta versionumeroa.)

Muista antaa ohjelmalle pääsy tietokantaan. Aseta käyttäjätunnus .env -tiedostolla.

<br>

### Kuvien lataaminen formdatalla

Katso esimerkki lomakkeen käytöstä tiedostosta: tests/upload-form.html

<br>

### API-testit

tests/api-tests -kansio sisältää API:n testejä. 

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
<img src="./documentation/database_diagram_v4.png" alt="database_diagram_v1" />
<figcaption>Tietokanta versio 4, luotu MySQL Workbenchin avulla.
</figcaption>
</figure>