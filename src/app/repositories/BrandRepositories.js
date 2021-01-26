import Brand from '../models/Brand';

class BrandRepositories {
  static async findBrandById(id) {
    const brand = await Brand.findByPk(id);
    return brand;
  }
}
export default BrandRepositories;
