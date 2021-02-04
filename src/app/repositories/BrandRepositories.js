import { v4 as uuidv4 } from 'uuid';
import Brand from '../models/Brand';
import { consoleError } from '../../helpers/errors/errors';

class BrandRepositories {
  static async createBrand(data) {
    try {
      const { id, name, description } = await Brand.create({
        id: uuidv4(),
        ...data,
      });
      return { id, name, description };
    } catch (errors) {
      consoleError('BrandRepositories', 'createBrand', errors);
      return { errors: 'Error while creating brand' };
    }
  }
  static async findBrandById(id) {
    try {
      const brand = await Brand.findByPk(id);
      if (!brand) return { errors: 'Brand not found' };
      return brand;
    } catch (errors) {
      consoleError('BrandRepositories', 'findBrandById', errors);
      return { errors: 'Error while fetching brand' };
    }
  }
  static async findAllBrands() {
    try {
      const brands = await Brand.findAll({
        attributes: ['id', 'name', 'description'],
      });
      return brands;
    } catch (errors) {
      consoleError('BrandRepositories', 'findAllBrands', errors);
      return { errors: 'Error while fetching brands' };
    }
  }
  static async updateBrand(brand, data) {
    try {
      const { id, name, description } = await brand.update(data);
      return { id, name, description };
    } catch (errors) {
      consoleError('BrandRepositories', 'updateBrand', errors);
      return { errors: 'Error while updating brand' };
    }
  }
  static async deleteBrand(id) {
    try {
      const brand = await Brand.findByPk(id);
      if (!brand) {
        return { errors: 'Brand not found' };
      }
      await brand.destroy();
      return { message: 'The Brand was deleted' };
    } catch (errors) {
      consoleError('BrandRepositories', 'findAllBrands', errors);
      return { errors: 'Error while delete brand' };
    }
  }
}
export default BrandRepositories;
