import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import CategoriesValidation from '../../helpers/validations/CategoryValidation';
import CategoryRepositories from '../repositories/CategoryRepositories';
import CategoriyValidation from '../../helpers/validations/CategoryValidation';

class CategoryController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res
        .status(401)
        .json({ errors: 'You do not have privileges for do this' });
    }
    const resValidation = await CategoriyValidation.store(req.body);
    if (resValidation.errors) {
      return res.status(400).json(resValidation);
    }
    const category = await CategoryRepositories.createCategory(resValidation);
    return res.status(category.errors ? 400 : 200).json(category);
  }
  async index(req, res) {
    const response = await CategoryRepositories.findAllCategories();
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const category = await CategoryRepositories.findCategoryById(
      req.params.categoryId
    );
    if (category.errors) {
      return res.status(400).json(category);
    }
    const response = await CategoryRepositories.updateCategory(
      category,
      req.body
    );
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async delete(req, res) {
    const response = await CategoryRepositories.deleteCategory(
      req.params.categoryId
    );
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async show(req, res) {
    const category = await CategoryRepositories.findCategoryById(
      req.params.categoryId
    );
    if (category.errors) {
      return res.status(400).json(category);
    }
    const { id, name, description } = category;
    return res.json({ id, name, description });
  }
}
export default new CategoryController();
