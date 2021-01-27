import { v4 as uuidv4 } from 'uuid';
import Category from '../models/Category';

class CategoryRepositories {
  static async createCategory(data) {
    const { id, name } = await Category.create({
      id: uuidv4(),
      ...data,
    });
    return { id, name };
  }
  static async findCategoryById(id) {
    const category = await Category.findByPk(id);
    return category;
  }
  static async findCategoryByName(name) {
    const category = await Category.findOne({ where: name });
    return category;
  }
  static async findAllCategories() {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name'],
      });
      return categories;
    } catch (error) {
      return { error };
    }
  }
  static async updateCategory(category, data) {
    try {
      const { id, name } = await category.update(data);
      return { id, name };
    } catch (error) {
      return { error };
    }
  }
  static async deleteCategory(category) {
    try {
      await category.destroy();
      return { message: 'The Brand was deleted' };
    } catch (error) {
      return { error };
    }
  }
}
export default CategoryRepositories;
