import { v4 as uuidv4 } from 'uuid';
import Brand from '../models/Brand';
import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import BrandsValidation from '../../helpers/validations/BrandsValidation';

class BrandController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const { name, description } = req.body;
    if (!(await BrandsValidation.store(name, description))) {
      return res.json({ error: 'Please fill all fields' });
    }
    const brand = await Brand.create({ id: uuidv4(), name, description });

    return res.json({
      id: brand.id,
      name: brand.name,
      description: brand.description,
    });
  }
  async index(req, res) {
    const brands = await Brand.findAll({
      attributes: ['id', 'name', 'description'],
    });
    return res.json(brands);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const brand = await Brand.findByPk(req.params.brandId);
    const { id, name, description } = await brand.update(req.body);

    return res.json({ id, name, description });
  }
  async delete(req, res) {
    const brand = await Brand.findByPk(req.params.brandId);
    if (!brand) {
      return res.json({ error: 'Brand not found' });
    }
    await brand.destroy();

    return res.json({ message: 'The Brand was deleted' });
  }
  async show(req, res) {
    const brand = await Brand.findByPk(req.params.brandId);
    if (!brand) {
      return res.json({ error: 'Brand not found' });
    }
    const { id, name, description } = brand;
    return res.json({ id, name, description });
  }
}
export default new BrandController();
