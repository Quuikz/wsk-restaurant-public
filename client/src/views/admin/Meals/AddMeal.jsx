import {useMeal} from '../../../hooks/admin/apiHooks';
import useForm from '../../../hooks/formHooks';

const AddMeal = () => {

  const {postNewMeal} = useMeal();

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
    try {
      const result = await postNewMeal(inputs, token);
      console.log(result);
    } catch (error) {
      console.log('Error in doAddMeal', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doAddMeal,
    initValues,
  );

  return (
    <>
      <div>
        <h1>Upload New Meal</h1>
      </div>

<div>


      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name_fi">name_fi</label>
          <input
            name="name_fi"
            type="text"
            id="name_fi"
            onChange={handleInputChange}
            autoComplete="name_fi"
            value={inputs.name_fi}
          />
        </div>

        <div>
          <label htmlFor="name_en">name_en</label>
          <input
            name="name_en"
            type='text'
            id="name_en"
            onChange={handleInputChange}
            autoComplete="name_en"
            value={inputs.name_en}
          />
        </div>

        <div>
          <label htmlFor="cost">cost</label>
          <input
            name="cost"
            type='text'
            id="cost"
            onChange={handleInputChange}
            autoComplete="cost"
            value={inputs.cost}
          />
        </div>

        <div>
          <label htmlFor="description_fi">description_fi</label>
          <input
            name="description_fi"
            type='text'
            id="description_fi"
            onChange={handleInputChange}
            autoComplete="description_fi"
            value={inputs.description_fi}
          />
        </div>

        <div>
          <label htmlFor="description_en">description_en</label>
          <input
            name="description_en"
            type='text'
            id="description_en"
            onChange={handleInputChange}
            autoComplete="description_en"
            value={inputs.description_en}
          />
        </div>

        <div>
          <label htmlFor="type">type</label>
          <input
            name="type"
            type='text'
            id="type"
            onChange={handleInputChange}
            autoComplete="type"
            value={inputs.type}
          />
        </div>

        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleInputChange}
            autoComplete="file"
            value={inputs.file}
          />
        </div>

        <button type="submit">Upload</button>
      </form>
      </div>

    </>
  );
};

export default AddMeal;
