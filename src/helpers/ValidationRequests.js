import * as yup from 'yup';
import Category from '../app/models/Category';
import Brand from '../app/models/Brand';

export class ValidationUser {
  static async store(name, email, password, responsability) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      responsability: yup.string().required(),
    });

    const response = await schema.isValid({
      name,
      email,
      password,
      responsability,
    });
    return response;
  }
  static async email(email) {
    const schema = yup
      .object()
      .shape({ email: yup.string().email().required() });
    const response = await schema.isValid({ email });
    return response;
  }
  static async password(password) {
    const schema = yup
      .object()
      .shape({ email: yup.string().min(6).required() });
    const response = await schema.isValid({ password });
    return response;
  }
  static async responsability(responsability) {
    const schema = yup.string().matches(/(administrator|manager|employee)/, {
      excludeEmptyString: true,
    });
    const response = await schema.isValid({ responsability });
    return response;
  }
}

export class ValidationBrands {
  static async store(name, description) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    });

    const response = await schema.isValid({
      name,
      description,
    });
    return response;
  }
}

export class ValidationCategories {
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

export class ValidationProducts {
  static async store(data) {
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
}
