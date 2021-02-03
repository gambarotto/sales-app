import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import BrandsValidation from '../../helpers/validations/BrandsValidation';
import BrandRepositories from '../repositories/BrandRepositories';

class BrandController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const responseValidation = await BrandsValidation.store(req.body);
    if (responseValidation.errors) {
      return res.status(400).json(responseValidation);
    }
    const brand = await BrandRepositories.createBrand(responseValidation);

    return res.status(brand.errors ? 400 : 200).json(brand);
  }
  async index(req, res) {
    const brands = await BrandRepositories.findAllBrands();
    return res.status(brands.errors ? 400 : 200).json(brands);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const brand = await BrandRepositories.findBrandById(req.params.brandId);
    if (brand.errors) {
      return res.status(400).json(brand);
    }
    const brandUpdated = await BrandRepositories.updateBrand(brand, req.body);

    return res.status(brandUpdated.errors ? 400 : 200).json(brandUpdated);
  }
  async delete(req, res) {
    const response = await BrandRepositories.deleteBrand(req.params.brandId);
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async show(req, res) {
    const brand = await BrandRepositories.findBrandById(req.params.brandId);
    return res.status(brand.errors ? 400 : 200).json(brand);
  }
}
export default new BrandController();
