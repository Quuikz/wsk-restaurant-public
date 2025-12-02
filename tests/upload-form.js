
let file = null;
const currentToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl9pZCIsIm5hbWUiOiJuYW1lIiwidXNlcm5hbWUiOiJ1c2VyIiwiZW1haWwiOiJlbWFpbCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDU5NzQ4MSwiZXhwIjoxNzY0NjgzODgxfQ.FNpsX4Dhp6w5i2nYWzQ4KWHysf0h4qlTVkxbhBrH2u4";

let inputs = {
    "id" : 222,
    "name_fi": "suomenkielinen nimi",
    "name_en": "english name",
    "description_fi": "suomalainen kuvaus tuotteelle",
    "description_en": "english description for the item",
    "cost": 0.0,
    "type": "noudettava annos/ pöytävaraus / lahjakortti ?"
}


//eventhandler for input change
const handleInputChange = (event) => {
    //event.persist();
    event.preventDefault();
    console.log(event.target.name, event.target.value);
    inputs = {
        ...inputs,
        [event.target.name]: event.target.value,
    };
};

//event handler for file change
const handleFileChange = (evt) => {
    if (evt.target.files) {
        //.files toimii vain Reactissa?
        //set the file to state
        file = evt.target.files[0];
        console.log(evt.target.files[0]);
    }
};

//eventhandler for submit
const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    console.log('submit:', inputs, file, currentToken);
    const response = await postMealTest(file,inputs,currentToken);
    document.querySelector('#response_area').innerHTML = response;
    document.querySelector('#uploaded_image')
        .setAttribute('src', 'http://localhost:3000/public/images/meals'+ response['image']);

};


const postMealTest = async (file,inputs, token) => {
    //create FormData object
    const formData = new FormData();

    //add file to FormData
    formData.append("file", file, "pic.jpg");

    //add other fields
    for (const key in inputs) {
        formData.append(key, inputs[key]);
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


