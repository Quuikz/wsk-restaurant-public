import { useState } from 'react';
import {useMeal} from '../../../hooks/admin/apiHooks';
import useForm from '../../../hooks/formHooks';

const AddMeal = () => {
  const {postNewMeal} = useMeal();

  const [file, setFile] = useState(null);

  const initValues = {
    name_fi: '',
    name_en: '',
    cost: '',
    description_en: '',
    description_fi: '',
    type: '',
    file: '',
  };

  const doAddMeal = async () => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('name_fi', inputs.name_fi);
    formData.append('name_en', inputs.name_en);
    formData.append('cost', parseFloat(inputs.cost));
    formData.append('description_fi', inputs.description_fi);
    formData.append('description_en', inputs.description_en);
    formData.append('type', inputs.type);

    if(file){
        formData.append('file', file);
    }

    try {
      const result = await postNewMeal(formData, token);
      console.log(result);
    } catch (error) {
      console.log('Error in doAddMeal', error);
    }
  };

  const handleFileChange = (evt) => {
        if (evt.target.files) {
            console.log(evt.target.files[0]);
            setFile(evt.target.files[0]);
        }
    };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doAddMeal,
    initValues,
  );

  return (
    <>
    <div className="max-w-3xl mx-auto bg-gray-300 p-8">
      <div >
        <h1 className='text-2xl font-bold mb-6'>Upload New Meal</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit} className='space-y-6'>


        {/*Menu: Image Upload */}
        <div className="flex flex-col">
        <div>
        <label htmlFor='file'>File</label>
        <input
            name='file'
            type='file'
            id='file'
            accept='image/*'
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
        </div>




          {/*Dish: Finnish name */}
          <div className="flex flex-col">
            <label htmlFor="name_fi" className="mb-2 font-medium text-gray-700">name_fi</label>
            <input
              name="name_fi"
              type="text"
              id="name_fi"
              onChange={handleInputChange}
              autoComplete="name_fi"
              value={inputs.name_fi}
              className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        
        {/*Dish: English name */}
          <div className="flex flex-col">
            <label htmlFor="name_en">name_en</label>
            <input
              name="name_en"
              type="text"
              id="name_en"
              onChange={handleInputChange}
              autoComplete="name_en"
              value={inputs.name_en}
              className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        {/*Dish: Cost */}
          <div className="flex flex-col">
            <label htmlFor="cost">cost</label>
            <input
              name="cost"
              type="text"
              id="cost"
              onChange={handleInputChange}
              autoComplete="cost"
              value={inputs.cost}
              className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        {/*Dish: Finnish description */}
          <div className="flex flex-col">
            <label htmlFor="description_fi">description_fi</label>
            <input
              name="description_fi"
              type="text"
              id="description_fi"
              onChange={handleInputChange}
              autoComplete="description_fi"
              value={inputs.description_fi}
              className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        {/*Dish: English description */}
          <div className="flex flex-col">
            <label htmlFor="description_en">description_en</label>
            <input
              name="description_en"
              type="text"
              id="description_en"
              onChange={handleInputChange}
              autoComplete="description_en"
              value={inputs.description_en}
              className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        {/*Dish: Type */}
          <div className="flex flex-col">
            <label htmlFor="type">type</label>
            <input
              name="type"
              type="text"
              id="type"
              onChange={handleInputChange}
              autoComplete="type"
              value={inputs.type}
              className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit">Upload</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default AddMeal;
