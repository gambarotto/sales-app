import * as yup from 'yup';
import Category from '../../app/models/Category';
import Brand from '../../app/models/Brand';

const optionsBrand = {
  name: 'verify-category-in-db',
  test: async function (value) {
    const brand = await Brand.findByPk(value);
    if (!brand) {
      return false;
    }
    return true;
  },
  message: 'Brand not found ',
  exclusive: true,
};
const optionsCategory = {
  name: 'verify-category-in-db',
  test: async function (value) {
    const category = await Category.findByPk(value);
    if (!category) {
      return false;
    }
    return true;
  },
  message: 'Category not found ',
  exclusive: true,
};

class ProductsValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required('Name is required'),
      description: yup.string().required('Description is required'),
      cost_price: yup
        .number()
        .positive('The value must be more than 0')
        .required('Cost Price is required'),
      sale_price: yup
        .number()
        .positive('The value must be more than 0')
        .required('Sale Price is required'),
      weight: yup.string(),
      id_brand: yup.string().required('Brand is required').test(optionsBrand),
      id_category: yup
        .string()
        .required('Category is required')
        .test(optionsCategory),
    });

    try {
      const response = await schema.validate({
        name: data.name,
        description: data.description,
        cost_price: data.cost_price,
        sale_price: data.sale_price,
        weight: data.weight,
        id_brand: data.id_brand,
        id_category: data.id_category,
      });
      return response;
    } catch (err) {
      return { errors: err.errors[0] };
    }
  }
  static string(data) {
    const schema = yup.string();
    try {
      const response = schema.validate(data);
      return response;
    } catch (err) {
      return { errors: err.errors[0] };
    }
  }
  static number(data) {
    const schema = yup.number().positive('The value must be more than 0');
    try {
      const response = schema.validate(data);
      return response;
    } catch (err) {
      return { errors: err.errors[0] };
    }
  }
  static brand(data) {
    const schema = yup.string().test(optionsBrand);
    try {
      const response = schema.validate(data);
      return response;
    } catch (err) {
      return { errors: err.errors[0] };
    }
  }
  static category(data) {
    const schema = yup.string().test(optionsCategory);
    try {
      const response = schema.validate(data);
      return response;
    } catch (err) {
      return { errors: err.errors[0] };
    }
  }
}
export default ProductsValidation;
