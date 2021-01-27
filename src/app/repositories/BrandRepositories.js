import { v4 as uuidv4 } from 'uuid';
import Brand from '../models/Brand';

class BrandRepositories {
  static async createBrand(data) {
    const { id, name, description } = await Brand.create({
      id: uuidv4(),
      ...data,
    });
    return { id, name, description };
  }
  static async findBrandById(id) {
    const brand = await Brand.findByPk(id);
    return brand;
  }
  static async findAllBrands() {
    const brands = await Brand.findAll({
      attributes: ['id', 'name', 'description'],
    });
    return brands;
  }
  static async updateBrand(brand, data) {
    const { id, name, description } = await brand.update(data);
    return { id, name, description };
  }
  static async deleteBrand(id) {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return { error: 'Brand not found' };
    }
    await brand.destroy();
    return { message: 'The Brand was deleted' };
  }
}
export default BrandRepositories;
