'use strict';

import fs from 'fs';
import {readFile} from 'fs';

const testMeal = {
    "id" : 222,
    "name_fi": "suomenkielinen nimi",
    "name_en": "english name",
    "description_fi": "suomalainen kuvaus tuotteelle",
    "description_en": "english description for the item",
    "cost": 0.0,
    "type": "noudettava annos/ pöytävaraus / lahjakortti ?"
}


const postMealTest = async (file, token) => {
    //create FormData object
    const formData = new FormData();

    //add file to FormData
    formData.append("file", file, "pic.jpg");

    //add other fields
    for (const key in testMeal) {
        formData.append(key, testMeal[key]);
    }

    const uploadApi =  "http://localhost:3000/api/meals/";
    const options = {
        method: "POST",
        headers: {
            Authorization: "Bearer "+token
        },
        body: formData,
    };

 /*   console.log("postFile:" + uploadApi + " " + options);
    console.log(options);*/
    const uploadResponse = await fetch(uploadApi, options);
    const responseBody = await uploadResponse.json()
    console.log(responseBody);
    console.log(responseBody.message);

    // return the file data.
    return responseBody;
};

//const file = new File([],"filename.png",{type: 'image/png'});

//main...
const currentToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl9pZCIsIm5hbWUiOiJuYW1lIiwidXNlcm5hbWUiOiJ1c2VyIiwiZW1haWwiOiJlbWFpbCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDU5NzQ4MSwiZXhwIjoxNzY0NjgzODgxfQ.FNpsX4Dhp6w5i2nYWzQ4KWHysf0h4qlTVkxbhBrH2u4";
fs.readFile(
    './api-tests/lautanen.jpg',
    {},
    async (err,data)=>{
        console.log(data);
        const file = new File(data,"pic.jpg",{type: 'image/jpg'});
        const response = await postMealTest(file, currentToken);
        console.log('response:',response);
    });

