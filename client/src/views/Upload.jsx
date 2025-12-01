import React, { useState } from 'react';
import {useNavigate} from 'react-router';
//import { postMedia, postFile } from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/apiHooks';


const Upload = () => {

  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();
  //const location = useLocation();

  const [file, setFile ] = useState(null);

  


   const handleFileChange = (evt) => {
     if (evt.target.files) {
         console.log(evt.target.files[0]);
         // TODO: set the file to state
         setFile(evt.target.files[0]);


     }
 };


  const doUpload = async () => {
     try {
        // TODO: call postFile function (see below)
        // TODO: call postMedia function (see below)
        const token = localStorage.getItem('token');

        const fileResponse = await postFile(file, token);
        const fileData = fileResponse.data;
        await postMedia(fileData, inputs, token);
         
         // TODO: redirect to Home
         navigate('/');
     } catch (e) {
         console.log(e.message);
     }
 };



 const { inputs, handleInputChange, handleSubmit } = useForm(doUpload, {
    title: '',
    description: ''
  });

  return (
    <>
    <h1>Upload</h1>
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor='title'>Title</label>
        <input 
          name='title'
          type='text'
          id='title'
          onChange={ handleInputChange }
          />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea
            name='description'
            rows={5}
            id='description'
            onChange={ handleInputChange }>
        </textarea>
      </div>
      <div>
        <label htmlFor='file'>File</label>
        <input
            name='file'
            type='file'
            id='file'
            accept='image/*, video/*'
            onChange={ handleFileChange }
            />
      </div>
      <img 
          src={
              file ? URL.createObjectURL(file) : 'https://placehold.co/200?text=Choose+image'
          }
          alt='preview'
          width='200'
          />
          <button
              type='submit'
              disabled={file && inputs.title.length > 3 ? false 
                                                        : true}>Upload</button>
    </form>
    </>
  );
};

export default Upload;