import Category from '../models/Category';

class CategoryRepositories {
  static async findCategoryById(id) {
    const category = await Category.findByPk(id);
    return category;
  }
}
export default CategoryRepositories;
