import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import app from '../../src/app';
import connection from '../../src/database';
import truncate from '../truncate';

describe('Product routes', () => {
  afterEach(() => {
    connection.connection.close();
  });
  beforeEach(async (done) => {
    await connection.init();
    await truncate(connection.connection.models);
    done();
  });
  it('Should try register a new product without necessary privileges, must return error', async () => {
    const email = 'joao@joao.com';
    const password = '123456';
    await request(app).post('/users').send({
      id: uuidv4(),
      name: 'João',
      email: email,
      password: password,
      responsability: 'employee',
    });
    const response = await request(app).post('/sessions/users').send({
      email: email,
      password: password,
    });
    const token = response.body.token;
    const product = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Produto',
        cost_price: 4,
        sale_price: 15.5,
        weight: '600g',
        id_brand: 'id',
        id_category: 'id',
        description: 'Descrição produto',
      });
    expect(product.body.errors).toBe('You do not have privileges for do this');
  });
  it('Should try register or any action with invalid token, must return error', async () => {
    const email = 'joao@joao.com';
    const password = '123456';
    await request(app).post('/users').send({
      id: uuidv4(),
      name: 'João',
      email: email,
      password: password,
      responsability: 'manager',
    });
    const { token } = await request(app).post('/sessions/users').send({
      email: email,
      password: password,
    });

    const product = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}0`)
      .send({
        name: 'Produto',
        cost_price: 4,
        sale_price: 15.5,
        weight: '600g',
        id_brand: 'id',
        id_category: 'id',
        description: 'Descrição produto',
      });
    expect(product.body.errors).toBe('Token invalid');
  });
  describe('Store', () => {
    let email = 'joao@joao.com';
    let password = '123456';
    let idUser;
    let token;
    let idBrand;
    let idCategory;
    beforeEach(async () => {
      let response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João',
        email: email,
        password: password,
        responsability: 'administrator',
      });
      idUser = response.body.id;
      response = await request(app).post('/sessions/users').send({
        email: email,
        password: password,
      });
      token = response.body.token;
      response = await request(app)
        .post('/brands')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Marca',
          description: 'descrição da marca',
        });
      idBrand = response.body.id;
      response = await request(app)
        .post('/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Categoria3 editada',
        });
      idCategory = response.body.id;
    });
    it('Should register a new product', async () => {
      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto',
          cost_price: 4,
          sale_price: 15.5,
          weight: '600g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto',
        });
      expect(response.body).toHaveProperty('id');
      expect(response.ok).toBeTruthy();
    });
  });
});
