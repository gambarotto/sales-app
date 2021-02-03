import * as yup from 'yup';
//TODO miss complete
class BrandsValidation {
  static async store(data) {
    const schema = yup.object().shape({
      schedule_to: yup.date().required(),
      date_status: yup.date().required(),
    });

    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (errors) {
      return { errors: errors.errors[0] };
    }
  }
  static async update(brand, data) {
    const schema = yup.object().shape({
      schedule_to: yup.date().required(),
      date_status: yup.date().required(),
    });
    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (errors) {
      return { errors: errors.errors[0] };
    }
  }
}

export default BrandsValidation;
