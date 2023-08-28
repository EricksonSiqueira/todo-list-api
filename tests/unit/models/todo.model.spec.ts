import { expect, use } from 'chai';
import sinon from 'sinon';
import connection from '../../../src/models/connection';
import { todoModel } from '../../../src/models';
import { createTodoMock, todoMock } from '../mocks/todo.mock';
import { FieldPacket, OkPacket, RowDataPacket } from 'mysql2';
import chaiAsPromised from 'chai-as-promised';
import { Todo } from '../../../src/types/todo';

use(chaiAsPromised);

describe('src/models/todo.model.ts', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('create', () => {
    it('when connection execute resolves and create a todo should return created todo id', async function () {
      const createResponse = { insertId: todoMock.id } as OkPacket;

      sinon
        .stub(connection, 'execute')
        .resolves([createResponse, [] as FieldPacket[]]);

      const createdTodo = await todoModel.create(createTodoMock);

      expect(createdTodo).to.be.an('number');
      expect(createdTodo).to.be.equal(todoMock.id);
    });

    it('when connection execute rejects todoModel.create should throw', () => {
      sinon.stub(connection, 'execute').rejects();

      expect(todoModel.create(createTodoMock)).to.eventually.be.rejected;
    });
  });

  describe('findAll', () => {
    it('when connection execute resolves should return a array containing all found todos', async () => {
      const findAllResponse = [todoMock, todoMock, todoMock] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .resolves([findAllResponse, [] as FieldPacket[]]);

      const todoFound = await todoModel.findAll();

      expect(todoFound).to.be.an('array');
      expect(todoFound).to.be.deep.equal([todoMock, todoMock, todoMock]);
    });

    it('when connection execute rejects todoModel.findAll should throw', () => {
      sinon.stub(connection, 'execute').rejects();

      expect(todoModel.findAll()).to.eventually.be.rejected;
    });
  });

  describe('findById', () => {
    it('when connection execute resolves and find a todo should return todo found', async () => {
      const findResponse = [todoMock] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .resolves([findResponse, [] as FieldPacket[]]);

      const todoId = 1 as Todo['id'];
      const todoFound = await todoModel.findById(todoId);

      expect(todoFound).to.be.an('object');
      expect(todoFound).to.be.deep.equal(todoMock);
    });

    it('when connection execute rejects todoModel.findById should throw', () => {
      sinon.stub(connection, 'execute').rejects();

      const todoId = 1 as Todo['id'];

      expect(todoModel.findById(todoId)).to.eventually.be.rejected;
    });
  });

  describe('exists', () => {
    it('when connection execute resolves with count as a positive number should return true', async () => {
      const findResponse = [{ count: 1 }] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .resolves([findResponse, [] as FieldPacket[]]);

      const todoId = 1 as Todo['id'];
      const todoFound = await todoModel.exists(todoId);

      expect(todoFound).to.be.true;
    });

    it('when connection execute resolves with count as 0 should return false', async () => {
      const findResponse = [{ count: 0 }] as RowDataPacket[];

      sinon
        .stub(connection, 'execute')
        .resolves([findResponse, [] as FieldPacket[]]);

      const todoId = 1 as Todo['id'];
      const todoFound = await todoModel.exists(todoId);

      expect(todoFound).to.be.false;
    });

    it('when connection execute rejects todoModel.exists should throw', () => {
      sinon.stub(connection, 'execute').rejects();

      const todoId = 1 as Todo['id'];

      expect(todoModel.exists(todoId)).to.eventually.be.rejected;
    });
  });

  describe('update', () => {
    it('when connection execute resolves should respond with no return', async () => {
      sinon.stub(connection, 'execute').resolves();

      const todoId = 1 as Todo['id'];
      const todoFound = await todoModel.update(todoId, {
        description: 'new description',
      });

      expect(todoFound).to.be.undefined;
    });

    it('when connection execute rejects todoModel.update should throw', () => {
      sinon.stub(connection, 'execute').rejects();

      const todoId = 1 as Todo['id'];

      expect(
        todoModel.update(todoId, {
          description: 'new description',
        })
      ).to.eventually.be.rejected;
    });
  });

  describe('delete', () => {
    it('when connection execute resolves should respond with no return', async () => {
      sinon.stub(connection, 'execute').resolves();

      const todoId = 1 as Todo['id'];
      const todoFound = await todoModel.delete(todoId);

      expect(todoFound).to.be.undefined;
    });

    it('when connection execute rejects todoModel.delete should throw', () => {
      sinon.stub(connection, 'execute').rejects();

      const todoId = 1 as Todo['id'];

      expect(todoModel.delete(todoId)).to.eventually.be.rejected;
    });
  });
});
