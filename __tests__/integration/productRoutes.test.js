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
  it('Should try register any action with invalid token, must return error', async () => {
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
    //let idUser;
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
      //idUser = response.body.id;
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
    it('Should register a new product with invalid id_brand, must return error', async () => {
      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto',
          cost_price: 4,
          sale_price: 15.5,
          weight: '600g',
          id_brand: 'ihrt6kjhy790',
          id_category: idCategory,
          description: 'Descrição produto',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body.errors).toBe('Brand not found');
    });
    it('Should register a new product with invalid id_category, must return error', async () => {
      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto',
          cost_price: 4,
          sale_price: 15.5,
          weight: '600g',
          id_brand: idBrand,
          id_category: 'ugrguy75rtfjhku',
          description: 'Descrição produto',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body.errors).toBe('Category not found');
    });
    it('Should register a new product with some fields empty, must return error', async () => {
      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          cost_price: 4,
          sale_price: 23,
          weight: '600g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
    });
    it('Should register a new product with fields cost_price with negative number, must return error', async () => {
      let response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          cost_price: -4,
          sale_price: 23,
          weight: '600g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('The value must be more than 0');
    });
    it('Should register a new product with fields cost_price with invalid type, must return error', async () => {
      let response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          cost_price: {},
          sale_price: 23,
          weight: '600g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe(
        'cost_price must be a `number` type, but the final value was: `NaN` (cast from the value `{}`).'
      );
    });
    it('Should register a new product with fields sale_price with negative number, must return error', async () => {
      let response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          cost_price: 4,
          sale_price: -23,
          weight: '600g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('The value must be more than 0');
    });
    it('Should register a new product with fields sale_price with invalid type, must return error', async () => {
      let response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          cost_price: 6,
          sale_price: {},
          weight: '600g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe(
        'sale_price must be a `number` type, but the final value was: `NaN` (cast from the value `{}`).'
      );
    });
  });
  describe('Index', () => {
    it('Should return a list of products', async () => {
      let email = 'joao@joao.com';
      let password = '123456';
      //let idUser;
      let token;
      let idBrand;
      let idCategory;
      let response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João',
        email: email,
        password: password,
        responsability: 'administrator',
      });
      //idUser = response.body.id;
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
          name: 'Categoria',
        });
      idCategory = response.body.id;
      await request(app)
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
      response = await request(app).get('/products');
      expect(response.ok).toBeTruthy();
      expect(response.body).toHaveLength(1);
    });
    it('Should return nothing because do not have products registred', async () => {
      const response = await request(app).get('/products');
      expect(response.ok).toBeTruthy();
      expect(response.body).toHaveLength(0);
    });
  });
  describe('update', () => {
    let email = 'joao@joao.com';
    let password = '123456';
    //let idUser;
    let token;
    let idProduct;
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
      //idUser = response.body.id;
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
      response = await request(app)
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
      idProduct = response.body.id;
    });
    it('Should update an exisistent product', async () => {
      const product = {
        name: 'Produto editado',
        cost_price: 4,
        sale_price: 17.5,
        weight: '750g',
        id_brand: idBrand,
        id_category: idCategory,
        description: 'Descrição produto editada',
      };
      const response = await request(app)
        .put(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`)
        .send(product);
      expect(response.ok).toBeTruthy();
      expect(response.body).toHaveProperty('name');
      expect(response.body.name).toBe('Produto editado');
    });
    it('Should update an product with negative cost_price, must return error', async () => {
      const response = await request(app)
        .put(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto editado',
          cost_price: -4,
          sale_price: 17.5,
          weight: '750g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto editada',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('The value must be more than 0');
    });
    it('Should update an product with invalid cost_price data, must return error', async () => {
      const response = await request(app)
        .put(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto editado',
          cost_price: {},
          sale_price: 17.5,
          weight: '750g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto editada',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
    });
    it('Should update an product with negative sale_price, must return error', async () => {
      const response = await request(app)
        .put(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto editado',
          cost_price: 4,
          sale_price: -17.5,
          weight: '750g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto editada',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('The value must be more than 0');
    });
    it('Should update an product with invalid sale_price data, must return error', async () => {
      const response = await request(app)
        .put(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto editado',
          cost_price: 4,
          sale_price: {},
          weight: '750g',
          id_brand: idBrand,
          id_category: idCategory,
          description: 'Descrição produto editada',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
    });
    it('Should update an product with invalid id_brand, must return error', async () => {
      const response = await request(app)
        .put(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto editado',
          cost_price: -4,
          sale_price: 17.5,
          weight: '750g',
          id_brand: 'uyhtfhkuhjk',
          id_category: idCategory,
          description: 'Descrição produto editada',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('Brand not found');
    });
    it('Should update an product with invalid id_category, must return error', async () => {
      const response = await request(app)
        .put(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Produto editado',
          cost_price: -4,
          sale_price: 17.5,
          weight: '750g',
          id_brand: idBrand,
          id_category: 'kioouyfrynkjtyikytr5',
          description: 'Descrição produto editada',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('Category not found');
    });
  });
  describe('delete', () => {
    let email = 'joao@joao.com';
    let password = '123456';
    //let idUser;
    let token;
    let idProduct;
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
      //idUser = response.body.id;
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
      response = await request(app)
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
      idProduct = response.body.id;
    });
    it('Should delete a product', async () => {
      const response = await request(app)
        .delete(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.ok).toBeTruthy();
      expect(response.body.message).toBe('product was deleted');
    });
    it('Should delete a product with invalid id', async () => {
      const response = await request(app)
        .delete(`/products/${idProduct}0`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.ok).not.toBeTruthy();
      expect(response.body.errors).toBe('Product not found');
    });
  });
  describe('show', () => {
    let email = 'joao@joao.com';
    let password = '123456';
    //let idUser;
    let token;
    let idProduct;
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
      //idUser = response.body.id;
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
      response = await request(app)
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
      idProduct = response.body.id;
    });
    it('Should show a product', async () => {
      const response = await request(app)
        .get(`/products/${idProduct}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.ok).toBeTruthy();
      expect(response.body).toHaveProperty('id');
    });
    it('Should delete a product with invalid id', async () => {
      const response = await request(app)
        .get(`/products/${idProduct}0`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.ok).not.toBeTruthy();
      expect(response.body.errors).toBe('product not found');
    });
  });
});
