import * as yup from 'yup';
import { consoleError } from '../errors/errors';
import BrandRepositories from '../../app/repositories/BrandRepositories';
import CategoryRepositories from '../../app/repositories/CategoryRepositories';

const optionsBrand = {
  name: 'verify-brand-in-db',
  test: async function (value) {
    const brand = await BrandRepositories.findBrandById(value);
    if (brand.errors) {
      return false;
    }
    return true;
  },
  message: 'Brand not found',
  exclusive: true,
};
const optionsCategory = {
  name: 'verify-category-in-db',
  test: async function (value) {
    const category = await CategoryRepositories.findCategoryById(value);
    if (category.errors) {
      return false;
    }
    return true;
  },
  message: 'Category not found',
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
    } catch (errors) {
      consoleError('ProductsValidation', 'store', errors);
      return { errors: errors.errors[0] };
    }
  }
  static async update(product, data) {
    const schema = yup.object().shape({
      name: yup.string().required().default(product.name),
      description: yup.string().required().default(product.description),
      cost_price: yup
        .number()
        .positive('The value must be more than 0')
        .required()
        .default(product.cost_price),
      sale_price: yup
        .number()
        .positive('The value must be more than 0')
        .required()
        .default(product.sale_price),
      weight: yup.string().default(product.weight),
    });
    const brandSchema = yup
      .string()
      .required()
      .test(optionsBrand)
      .default(product.id_brand);
    const categorySchema = yup
      .string()
      .required()
      .test(optionsCategory)
      .default(product.id_category);
    if (data.id_brand && data.id_brand !== product.id_brand) {
      try {
        await brandSchema.validate(data.id_brand);
      } catch (errors) {
        consoleError('ProductsValidation', 'update:id_category', errors);
        return { errors: errors.errors[0] };
      }
    }
    if (data.id_category && data.id_category !== product.id_category) {
      try {
        await categorySchema.validate(data.id_category);
      } catch (errors) {
        consoleError('ProductsValidation', 'update:id_category', errors);
        return { errors: errors.errors[0] };
      }
    }
    try {
      await schema.validate(data);
      return data;
    } catch (errors) {
      consoleError('ProductsValidation', 'store', errors);
      return { errors: errors.errors[0] };
    }
  }
}
export default ProductsValidation;
