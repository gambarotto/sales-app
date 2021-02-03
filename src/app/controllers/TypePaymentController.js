import TypePaymentValidation from '../../helpers/validations/TypePaymentValidation';
import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import TypePaymentsRepositories from '../repositories/TypePaymentsRepositories';

class TypePaymentController {
  async store(req, res) {
    if (!checkResponsabilityUserToken) {
      return res.status(400).json({ errors: 'You do not have permission' });
    }
    const resValidation = await TypePaymentValidation.store(req.body);
    if (resValidation.errors) {
      return res.status(400).json(resValidation);
    }
    const typePayment = await TypePaymentsRepositories.createTypePayments(
      resValidation
    );
    return res.status(typePayment.errors ? 400 : 200).json(typePayment);
  }
  async index(req, res) {
    if (!checkResponsabilityUserToken) {
      return res.status(400).json({ errors: 'You do not have permission' });
    }
    const typePayments = await TypePaymentsRepositories.findAll();
    return res.status(typePayments.errors ? 400 : 200).json(typePayments);
  }
  async update(req, res) {
    if (!checkResponsabilityUserToken) {
      return res.status(400).json({ errors: 'You do not have permission' });
    }
    const typePayment = await TypePaymentsRepositories.findByPk(
      req.params.typePaymentId
    );
    if (typePayment.errors) {
      return res.status(400).json(typePayment);
    }
    const resValidation = await TypePaymentValidation.update(req.body);
    if (resValidation.errors) {
      return res.status(400).json(resValidation);
    }
    const response = await TypePaymentsRepositories.updateTypePayment(
      typePayment,
      resValidation
    );
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async delete(req, res) {
    if (!checkResponsabilityUserToken) {
      return res.status(400).json({ errors: 'You do not have permission' });
    }
    const response = await TypePaymentsRepositories.delete(
      req.params.typePaymentId
    );
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async show(req, res) {
    if (!checkResponsabilityUserToken) {
      return res.status(400).json({ errors: 'You do not have permission' });
    }
    const response = await TypePaymentsRepositories.findByPk(
      req.params.typePaymentId
    );
    return res.status(response.errors ? 400 : 200).json(response);
  }
}
export default new TypePaymentController();
