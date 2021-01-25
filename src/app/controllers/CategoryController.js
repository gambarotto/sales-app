import { v4 as uuidv4 } from 'uuid';
import Category from '../models/Category';
import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import CategoriesValidation from '../../helpers/validations/CategoriesValidation';

class CategoryController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    if (!(await CategoriesValidation.store(req.body))) {
      return res.json({ error: 'Please fill all fields' });
    }
    const alreadyExists = await Category.findOne({
      where: { name: req.body.name },
    });
    if (alreadyExists) {
      return res.json({ error: 'Category already exists' });
    }
    const category = await Category.create({
      id: uuidv4(),
      name: req.body.name,
    });
    return res.json({
      id: category.id,
      name: category.name,
    });
  }
  async index(req, res) {
    const categories = await Category.findAll({
      attributes: ['id', 'name'],
    });
    return res.json(categories);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const category = await Category.findByPk(req.params.categoryId);
    if (!category) {
      return res.json({ error: 'Category not found' });
    }
    const { id, name } = await category.update(req.body);
    return res.json({ id, name });
  }
  async delete(req, res) {
    const category = await Category.findByPk(req.params.categoryId);
    if (!category) {
      return res.json({ error: 'Category not found' });
    }
    await category.destroy();

    return res.json({ message: 'The Category was deleted' });
  }
  async show(req, res) {
    const category = await Category.findByPk(req.params.categoryId);
    if (!category) {
      return res.json({ error: 'Category not found' });
    }
    const { id, name, description } = category;
    return res.json({ id, name, description });
  }
}
export default new CategoryController();
