import { v4 as uuidv4 } from 'uuid';
import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import BrandsValidation from '../../helpers/validations/BrandsValidation';
import BrandRepositories from '../repositories/BrandRepositories';

class BrandController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const { name, description } = req.body;
    if (!(await BrandsValidation.store(name, description))) {
      return res.json({ error: 'Please fill all fields' });
    }
    const brand = await BrandRepositories.createBrand({
      id: uuidv4(),
      ...req.body,
    });

    return res.json(brand);
  }
  async index(req, res) {
    try {
      const brands = await BrandRepositories.findAllBrands();
      return res.json(brands);
    } catch (error) {
      return { error };
    }
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const brand = await BrandRepositories.findBrandById(req.params.brandId);
    if (!brand) {
      return res.json({ error: 'Brand not found' });
    }
    const brandUpdated = await BrandRepositories.updateBrand(brand, req.body);

    return res.json(brandUpdated);
  }
  async delete(req, res) {
    const response = await BrandRepositories.deleteBrand(req.params.brandId);
    return res.json(response);
  }
  async show(req, res) {
    const brand = await BrandRepositories.findBrandById(req.params.brandId);
    if (!brand) {
      return res.json({ error: 'Brand not found' });
    }
    const { id, name, description } = brand;
    return res.json({ id, name, description });
  }
}
export default new BrandController();
