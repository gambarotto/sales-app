import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import CategoriesValidation from '../../helpers/validations/CategoriesValidation';
import CategoryRepositories from '../repositories/CategoryRepositories';

class CategoryController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    if (!(await CategoriesValidation.store(req.body))) {
      return res.json({ error: 'Please fill all fields' });
    }
    const alreadyExists = await CategoryRepositories.findCategoryByName({
      where: { name: req.body.name },
    });
    if (alreadyExists) {
      return res.json({ error: 'Category already exists' });
    }
    const category = await CategoryRepositories.createCategory(req.body);
    return res.json(category);
  }
  async index(req, res) {
    const response = await CategoryRepositories.findAllCategories();
    return res.json(response);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    console.log('aq0');
    const category = await CategoryRepositories.findCategoryById(
      req.params.categoryId
    );
    console.log('aq');
    if (!category) {
      return res.json({ error: 'Category not found' });
    }
    const response = await CategoryRepositories.updateCategory(
      category,
      req.body
    );
    return res.json(response);
  }
  async delete(req, res) {
    const category = await CategoryRepositories.findCategoryById(
      req.params.categoryId
    );
    if (!category) {
      return res.json({ error: 'Category not found' });
    }
    const response = await CategoryRepositories.deleteCategory(category);

    return res.json(response);
  }
  async show(req, res) {
    const category = await CategoryRepositories.findCategoryById(
      req.params.categoryId
    );
    if (!category) {
      return res.json({ error: 'Category not found' });
    }
    const { id, name, description } = category;
    return res.json({ id, name, description });
  }
}
export default new CategoryController();
