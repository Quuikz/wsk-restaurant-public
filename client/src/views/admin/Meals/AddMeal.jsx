import {useMeal} from '../../../hooks/admin/apiHooks';
import useForm from '../../../hooks/formHooks';

const AddMeal = () => {

  const {postNewMeal} = useMeal();

  const initValues = {
    nameFi: '',
    nameEn: '',
    cost: '',
    descriptionEn: '',
    descriptionFi: '',
    type: '',
    file: '',
  };

  const doAddMeal = async () => {
    try {
      const result = await postNewMeal(inputs);
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

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name_fi">name_fi</label>
          <input
            name="name_fi"
            type="text"
            id="name_fi"
            onChange={handleInputChange}
            value={inputs.nameFi}
          />
        </div>

        <div>
          <label htmlFor="name_en">name_en</label>
          <textarea
            name="name_en"
            rows={5}
            id="name_en"
            onChange={handleInputChange}
            value={inputs.nameEn}
          ></textarea>
        </div>

        <div>
          <label htmlFor="cost">cost</label>
          <textarea
            name="cost"
            rows={5}
            id="cost"
            onChange={handleInputChange}
            value={inputs.cost}
          ></textarea>
        </div>

        <div>
          <label htmlFor="description_fi">description_fi</label>
          <textarea
            name="description_fi"
            rows={5}
            id="description_fi"
            onChange={handleInputChange}
            value={inputs.descriptionFi}
          ></textarea>
        </div>

        <div>
          <label htmlFor="description_en">description_en</label>
          <textarea
            name="description_en"
            rows={5}
            id="description_en"
            onChange={handleInputChange}
            value={inputs.descriptionEn}
          ></textarea>
        </div>

        <div>
          <label htmlFor="type">type</label>
          <textarea
            name="type"
            rows={5}
            id="type"
            onChange={handleInputChange}
            value={inputs.type}
          ></textarea>
        </div>

        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleInputChange}
            value={inputs.file}
          />
        </div>

        <button type="submit">Upload</button>
      </form>

      <div></div>
    </>
  );
};

export default AddMeal;
