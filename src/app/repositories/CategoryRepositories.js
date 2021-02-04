import { v4 as uuidv4 } from 'uuid';
import { consoleError } from '../../helpers/errors/errors';
import Category from '../models/Category';

class CategoryRepositories {
  static async createCategory(data) {
    try {
      const { id, name } = await Category.create({
        id: uuidv4(),
        name: data,
      });
      return { id, name };
    } catch (errors) {
      consoleError('CategoryRepositories', 'createCategory', errors);
      return { errors: 'Error while create category' };
    }
  }
  static async findCategoryById(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) return { errors: 'Category not found' };
      return category;
    } catch (errors) {
      consoleError('CategoryRepositories', 'findCategoryById', errors);
      return { errors: 'Error while fetching category' };
    }
  }
  static async findCategoryByName(name) {
    try {
      const category = await Category.findOne({ where: { name: name } });
      return category;
    } catch (errors) {
      consoleError('CategoryRepositories', 'findCategoryByName', errors);
      return { errors: 'Error while fetching category' };
    }
  }
  static async findAllCategories() {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'name'],
      });
      if (!categories) return { errors: 'There is no categories registred' };
      return categories;
    } catch (errors) {
      consoleError('CategoryRepositories', 'findAllCategories', errors);
      return { errors: 'Error while fetching categories' };
    }
  }
  static async updateCategory(category, data) {
    try {
      const { id, name } = await category.update(data);
      return { id, name };
    } catch (errors) {
      consoleError('CategoryRepositories', 'updateCategory', errors);
      return { errors: 'Error while updating category' };
    }
  }
  static async deleteCategory(id) {
    try {
      const category = await Category.findByPk(id);
      await category.destroy();
      return { message: 'The Brand was deleted' };
    } catch (errors) {
      consoleError('CategoryRepositories', 'deleteCategory', errors);
      return { errors: 'Error while deleting category' };
    }
  }
}
export default CategoryRepositories;
