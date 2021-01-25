import * as yup from 'yup';

class CategoriesValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
    });
    console.log(data);
    const response = await schema.isValid({
      name: data.name,
    });
    return response;
  }
}
export default CategoriesValidation;
