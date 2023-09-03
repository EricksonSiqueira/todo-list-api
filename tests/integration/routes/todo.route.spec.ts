import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import connection from '../../../src/models/connection';
import { allTodosResponse } from '../mocks/todo.integration.mock';
import { FieldPacket, OkPacket, RowDataPacket } from 'mysql2';

chai.use(sinonChai);
chai.use(chaiHttp);

describe(`todo.route`, () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('create', () => {
    it(`when a valid body is passed should return status 201 and key id equals to inserted id`, async () => {
      const createResponse = { insertId: 4 } as OkPacket;

      sinon
        .stub(connection, 'execute')
        .resolves([createResponse, [] as FieldPacket[]]);

      const response = await chai
        .request(app)
        .post(`/todos`)
        .send({ title: 'new title', description: 'new description' });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ id: 4 });
    });

    it(`when body is empty should return status 400 and message "Invalid body"`, async () => {
      const response = await chai.request(app).post(`/todos`).send();

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Invalid body' },
      });
    });

    it(`when body is missing title should return status 400 and message "Missing fields: title"`, async () => {
      const response = await chai
        .request(app)
        .post(`/todos`)
        .send({ description: 'new description' });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Missing fields: title' },
      });
    });

    it(`when body is missing description should return status 400 and message "Missing fields: description"`, async () => {
      const response = await chai
        .request(app)
        .post(`/todos`)
        .send({ title: 'new title' });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Missing fields: description' },
      });
    });

    it(`when body has more fields than the required should return status 400 and message "Left over fields: {fields}"`, async () => {
      const response = await chai.request(app).post(`/todos`).send({
        title: 'new title',
        description: 'description',
        randomField: 1,
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Left over fields: randomField' },
      });
    });

    it(`when description value is not a string should return 400 with joi error`, async () => {
      const response = await chai.request(app).post(`/todos`).send({
        title: 'new title',
        description: 1,
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: '"description" must be a string' },
      });
    });

    it(`when title value is not a string should return 400 with joi error`, async () => {
      const response = await chai.request(app).post(`/todos`).send({
        title: 1,
        description: 'new description',
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: '"title" must be a string' },
      });
    });

    it(`when title value is a empty string should return 400 with joi error`, async () => {
      const response = await chai.request(app).post(`/todos`).send({
        title: 1,
        description: 'new description',
      });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: '"title" must be a string' },
      });
    });
  });

  describe('findAll', () => {
    it(`should return all todos returned by the database`, async () => {
      const findAllResponse = [...allTodosResponse] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .resolves([findAllResponse, [] as FieldPacket[]]);

      const response = await chai.request(app).get(`/todos`);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allTodosResponse);
    });
  });

  describe('findById', () => {
    it(`should return todo found by the database when todo exists`, async () => {
      const findResponse = [allTodosResponse[0]] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves([findResponse, [] as FieldPacket[]]);

      const response = await chai.request(app).get(`/todos/1`);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(allTodosResponse[0]);
    });

    it(`should return 404 and message "Todo not found" when no todo is found`, async () => {
      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves([[undefined], [] as FieldPacket[]]);

      const response = await chai.request(app).get(`/todos/4`);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Todo not found' },
      });
    });

    it(`when id is invalid should return status 400 and message "Id must be a positive number"`, async () => {
      const response = await chai.request(app).put(`/todos/0`).send();

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Id must be a positive number' },
      });
    });
  });

  describe('update', () => {
    it(`when todo exists and a body is passed should return status 204 and empty body`, async () => {
      const existsResponse = [{ count: 1 }] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves([existsResponse, [] as FieldPacket[]])
        .onSecondCall()
        .resolves();

      const response = await chai
        .request(app)
        .put(`/todos/1`)
        .send({ title: 'new title' });

      expect(response.status).to.be.equal(204);
      expect(response.body).to.be.empty;
    });

    it(`when todo does not exists should return status 404 and messsage "Todo not found"`, async () => {
      const existsResponse = [{ count: 0 }] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves([existsResponse, [] as FieldPacket[]])
        .onSecondCall()
        .resolves();

      const response = await chai
        .request(app)
        .put(`/todos/1`)
        .send({ title: 'new title' });

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Todo not found' },
      });
    });

    it(`when body is empty should return status 400 and message "Invalid body"`, async () => {
      const response = await chai.request(app).put(`/todos/1`).send();

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Invalid body' },
      });
    });

    it(`when id is invalid should return status 400 and message "Id must be a positive number"`, async () => {
      const response = await chai.request(app).put(`/todos/0`).send();

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Id must be a positive number' },
      });
    });

    it(`when body has invalid key should return status 400 and message "Invalid body"`, async () => {
      const response = await chai
        .request(app)
        .put(`/todos/1`)
        .send({ fake: 'key' });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Invalid body' },
      });
    });
  });

  describe('delete', () => {
    it(`when todo exists should return status 204 and empty body`, async () => {
      const existsResponse = [{ count: 1 }] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves([existsResponse, [] as FieldPacket[]])
        .onSecondCall()
        .resolves();

      const response = await chai.request(app).delete(`/todos/1`);

      expect(response.status).to.be.equal(204);
      expect(response.body).to.be.empty;
    });

    it(`when todo does not exists should return status 404 and messsage "Todo not found"`, async () => {
      const existsResponse = [{ count: 0 }] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .resolves([existsResponse, [] as FieldPacket[]]);

      const response = await chai.request(app).delete(`/todos/1`);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Todo not found' },
      });
    });

    it(`when id is invalid should return status 400 and message "Id must be a positive number"`, async () => {
      const response = await chai.request(app).delete(`/todos/0`).send();

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({
        error: { message: 'Id must be a positive number' },
      });
    });
  });
});
