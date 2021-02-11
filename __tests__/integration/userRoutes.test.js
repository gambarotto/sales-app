import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import app from '../../src/app';
import connection from '../../src/database';
import truncate from '../truncate';

describe('User Routes', () => {
  afterEach(() => {
    connection.connection.close();
  });
  beforeEach(async (done) => {
    await connection.init();
    await truncate(connection.connection.models);
    done();
  });

  it('Create session User', async () => {
    const email = 'joao@joao.com';
    const password = '123456';
    let response = await request(app).post('/users').send({
      id: uuidv4(),
      name: 'João',
      email: email,
      password: password,
      responsability: 'manager',
    });
    response = await request(app).post('/sessions/users').send({
      email: email,
      password: password,
    });

    expect(response.body).toHaveProperty('token');
  });
  describe('Store', () => {
    it('Should create a new user', async () => {
      const email = 'joao@joao.com';
      const password = '123456';
      let response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João',
        email: email,
        password: password,
        responsability: 'manager',
      });

      expect(response.ok).toBeTruthy();
      expect(response.body).toHaveProperty('id');
    });
    it('Should try create a new user but with an existent email, return error:: email already exists', async () => {
      const email = 'joao@joao.com';
      const password = '123456';
      let response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João',
        email: email,
        password: password,
        responsability: 'manager',
      });
      response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João 2',
        email: email,
        password: password,
        responsability: 'manager',
      });

      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('Email already exists');
    });
    describe('Validations fields', () => {
      it('Should test name field, with name empty, must be return:: name is a required field ', async () => {
        const email = 'joao@joao.com';
        const password = '123456';
        let response = await request(app).post('/users').send({
          id: uuidv4(),
          name: '',
          email: email,
          password: password,
          responsability: 'manager',
        });
        expect(response.body.errors).toBe('name is a required field');
      });
      it('Should test email field, with email empty, must be return:: email is a required field ', async () => {
        const email = 'joao@joao.com';
        const password = '123456';
        let response = await request(app).post('/users').send({
          id: uuidv4(),
          name: 'João',
          email: '',
          password: password,
          responsability: 'manager',
        });
        expect(response.body.errors).toBe('email is a required field');
      });
      it('Should test password field, with less 6 caracters or empty field, must be return:: password must be at least 6 characters ', async () => {
        const email = 'joao@joao.com';
        let response = await request(app).post('/users').send({
          id: uuidv4(),
          name: 'João',
          email: email,
          password: '',
          responsability: 'manager',
        });
        expect(response.body.errors).toBe(
          'password must be at least 6 characters'
        );
        response = await request(app).post('/users').send({
          id: uuidv4(),
          name: 'João',
          email: email,
          password: '123w',
          responsability: 'manager',
        });
        expect(response.body.errors).toBe(
          'password must be at least 6 characters'
        );
      });
      it('Should test responsability field, with responsability empty, must be return:: responsability is a required field ', async () => {
        const email = 'joao@joao.com';
        const password = '123456';
        let response = await request(app).post('/users').send({
          id: uuidv4(),
          name: 'João',
          email: email,
          password: password,
          responsability: '',
        });
        expect(response.body.errors).toBe('responsability is a required field');
      });
      it('Should test responsability field, with invalid text, must be return:: Invalid responsability ', async () => {
        const email = 'joao@joao.com';
        const password = '123456';
        let response = await request(app).post('/users').send({
          id: uuidv4(),
          name: 'João',
          email: email,
          password: password,
          responsability: 'teste',
        });
        expect(response.body.errors).toBe('Invalid responsability');
      });
    });
  });
  describe('Update', () => {
    let email = 'joao@joao.com';
    let password = '123456';
    let idUser;
    let token;
    beforeEach(async () => {
      let response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João',
        email: email,
        password: password,
        responsability: 'manager',
      });
      idUser = response.body.id;
      response = await request(app).post('/sessions/users').send({
        email: email,
        password: password,
      });
      token = response.body.token;
    });
    it('Should update User and return => name: João editado', async () => {
      const response = await request(app)
        .put(`/users/${idUser}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'João editado',
          email: email,
          password: password,
          responsability: 'manager',
        });
      expect(response.ok).toBeTruthy();
      expect(response.body.name).toBe('João editado');
    });
    it('Should try update user but be return error:: Email already exists', async () => {
      const email2 = 'diego@diego.com';
      await request(app).post('/users').send({
        id: uuidv4(),
        name: 'Diego',
        email: email2,
        password: password,
        responsability: 'manager',
      });
      const response = await request(app)
        .put(`/users/${idUser}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'João editado',
          email: email2,
          password: password,
          responsability: 'manager',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('Email already exists');
    });
    it('Should try update user but be return error:: Token invalid', async () => {
      const email2 = 'diego@diego.com';
      await request(app).post('/users').send({
        id: uuidv4(),
        name: 'Diego',
        email: email2,
        password: password,
        responsability: 'manager',
      });
      const response = await request(app)
        .put(`/users/${idUser}`)
        .set('Authorization', `Bearer ${token}0`)
        .send({
          name: 'João editado',
          email: email2,
          password: password,
          responsability: 'manager',
        });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('Token invalid');
    });
    it('Should try update user but be return error:: Token not provider', async () => {
      const email2 = 'diego@diego.com';
      await request(app).post('/users').send({
        id: uuidv4(),
        name: 'Diego',
        email: email2,
        password: password,
        responsability: 'manager',
      });
      const response = await request(app).put(`/users/${idUser}`).send({
        name: 'João editado',
        email: email2,
        password: password,
        responsability: 'manager',
      });
      expect(response.ok).not.toBeTruthy();
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('Token not provider');
    });
  });
  describe('Show', () => {
    let email = 'joao@joao.com';
    let password = '123456';
    let idUser;
    let token;
    beforeEach(async () => {
      let response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João',
        email: email,
        password: password,
        responsability: 'manager',
      });
      idUser = response.body.id;
      response = await request(app).post('/sessions/users').send({
        email: email,
        password: password,
      });
      token = response.body.token;
    });
    it('Should list a user', async () => {
      const response = await request(app)
        .get(`/users/${idUser}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
    it('Should return the error:: user not found', async () => {
      const response = await request(app)
        .get(`/users/${idUser}0`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('user not found');
    });
    it('Should return the error:: Token invalid', async () => {
      const response = await request(app)
        .get(`/users/${idUser}0`)
        .set('Authorization', `Bearer ${token}0`);
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('Token invalid');
    });
    it('Should return the error:: Token not provider', async () => {
      const response = await request(app).get(`/users/${idUser}0`);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBe('Token not provider');
    });
  });
  describe('Delete', () => {
    let email = 'joao@joao.com';
    let password = '123456';
    let token;
    let idUser;
    beforeEach(async () => {
      let response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João',
        email: email,
        password: password,
        responsability: 'manager',
      });
      idUser = response.body.id;
      response = await request(app).post('/sessions/users').send({
        email: email,
        password: password,
      });
      token = response.body.token;
    });
    it('Should delete user', async () => {
      const response = await request(app)
        .delete(`/users/${idUser}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('User was deleted');
    });
    it('Should return the error:: user not found', async () => {
      const response = await request(app)
        .delete(`/users/${idUser}0`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBe('user not found');
    });
    it('Should return the error:: invalid token', async () => {
      const response = await request(app)
        .delete(`/users/${idUser}`)
        .set('Authorization', `Bearer ${token}0`);
      expect(response.statusCode).toBe(401);
      expect(response.body.errors).toBe('Token invalid');
    });
  });
  describe('Index', () => {
    let token;
    let email = 'joao@joao.com';
    let password = '123456';
    beforeEach(async () => {
      let response = await request(app).post('/users').send({
        id: uuidv4(),
        name: 'João',
        email: email,
        password: password,
        responsability: 'manager',
      });
      response = await request(app).post('/sessions/users').send({
        email: email,
        password: password,
      });
      token = response.body.token;
    });
    it('Should list all users', async () => {
      const users = await request(app)
        .get(`/users`)
        .set('Authorization', `Bearer ${token}`);
      expect(users.statusCode).toBe(200);
      expect(users.body).toHaveLength(1);
    });
    it('Should return the error::Token invalid', async () => {
      let response = await request(app)
        .get(`/users`)
        .set('Authorization', `Bearer ${token}2`);
      expect(response.statusCode).toBe(401);
      expect(response.body.errors).toBe('Token invalid');
    });
    it('Should return the error:: Token not provider', async () => {
      const response = await request(app).get(`/users`);
      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toBe('Token not provider');
    });
  });
});
