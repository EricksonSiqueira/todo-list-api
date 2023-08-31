import { expect, use } from 'chai';
import sinon from 'sinon';
import { todoModel } from '../../../src/models';
import { todoService } from '../../../src/services';
import { createTodoMock, todoMock, todoMockWithNoId } from '../mocks/todo.mock';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

describe('src/models/todo.service.ts', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('create', () => {
    it('when todoModel.create resolves a valid id should return object with status CREATED and data.id equals to model returned id', async function () {
      const createResponse = todoMock.id;

      sinon.stub(todoModel, 'create').resolves(createResponse);

      const createdTodo = await todoService.create(createTodoMock);

      expect(createdTodo).to.be.an('object');
      expect(createdTodo).to.be.deep.equal({
        status: 201,
        data: { id: todoMock.id },
      });
    });

    it('when todoService.create receives a empty string as title should return joi error', async function () {
      const createResponse = todoMock.id;

      sinon.stub(todoModel, 'create').resolves(createResponse);

      const createdTodo = await todoService.create({
        ...todoMockWithNoId,
        title: '',
      });

      expect(createdTodo).to.be.an('object');
      expect(createdTodo).to.be.deep.equal({
        status: 400,
        error: '"title" is not allowed to be empty',
      });
    });

    it('when todoService.create receives a empty string as description should return joi error', async function () {
      const createResponse = todoMock.id;

      sinon.stub(todoModel, 'create').resolves(createResponse);

      const createdTodo = await todoService.create({
        ...todoMockWithNoId,
        description: '',
      });

      expect(createdTodo).to.be.an('object');
      expect(createdTodo).to.be.deep.equal({
        status: 400,
        error: '"description" is not allowed to be empty',
      });
    });

    it('when todoModel.create rejects todoService.create should throw', () => {
      sinon.stub(todoModel, 'create').rejects();

      expect(todoService.create(createTodoMock)).to.eventually.be.rejected;
    });
  });

  describe('findAll', () => {
    it('when todoModel.findAll resolves a list of todos, this list should return object with status OK and data equals to todos received by the model', async function () {
      const findAllResponse = [todoMock, todoMock, todoMock];

      sinon.stub(todoModel, 'findAll').resolves(findAllResponse);

      const todosFound = await todoService.findAll();

      expect(todosFound).to.be.an('object');
      expect(todosFound).to.be.deep.equal({
        status: 200,
        data: [todoMock, todoMock, todoMock],
      });
    });

    it('when todoModel.create rejects todoService.create should throw', () => {
      sinon.stub(todoModel, 'findAll').rejects();

      expect(todoService.findAll()).to.eventually.be.rejected;
    });
  });

  describe('findById', () => {
    it('when todoModel.findById resolves a todo should return object with status OK and data equals to todo received by the model', async function () {
      const finByIdResponse = todoMock;

      sinon.stub(todoModel, 'findById').resolves(finByIdResponse);

      const todoFound = await todoService.findById(1);

      expect(todoFound).to.be.an('object');
      expect(todoFound).to.be.deep.equal({
        status: 200,
        data: todoMock,
      });
    });

    it('when todoModel.findById resolves a invalid value should return object with status 404 and error with value "Todo not found"', async function () {
      sinon.stub(todoModel, 'findById').resolves(undefined);

      const todoFound = await todoService.findById(-1);

      expect(todoFound).to.be.an('object');
      expect(todoFound).to.be.deep.equal({
        status: 404,
        error: 'Todo not found',
      });
    });

    it('when todoModel.create rejects todoService.create should throw', () => {
      sinon.stub(todoModel, 'findById').rejects();

      expect(todoService.findById(-1)).to.eventually.be.rejected;
    });
  });

  describe('update', () => {
    it('when todoModel.update resolves should return object with status 204 and message with value "Todo updated"', async function () {
      sinon.stub(todoModel, 'exists').resolves(true);
      sinon.stub(todoModel, 'update').resolves();

      const updatedTodo = await todoService.update(1, todoMockWithNoId);

      expect(updatedTodo).to.be.an('object');
      expect(updatedTodo).to.be.deep.equal({
        status: 204,
        message: 'Todo updated',
      });
    });

    it('when todoService.update receives title with invalid value should return object with status 400 and error value as joi error', async function () {
      sinon.stub(todoModel, 'update').resolves();
      sinon.stub(todoModel, 'exists').resolves(undefined);

      const updatedTodo = await todoService.update(1, {
        ...todoMockWithNoId,
        title: '',
      });

      expect(updatedTodo).to.be.an('object');
      expect(updatedTodo).to.be.deep.equal({
        status: 400,
        error: '"title" is not allowed to be empty',
      });
    });

    it('when todoService.update receives description with invalid value should return object with status 400 and error value as joi error', async function () {
      sinon.stub(todoModel, 'update').resolves();
      sinon.stub(todoModel, 'exists').resolves(undefined);

      const updatedTodo = await todoService.update(1, {
        ...todoMockWithNoId,
        description: '',
      });

      expect(updatedTodo).to.be.an('object');
      expect(updatedTodo).to.be.deep.equal({
        status: 400,
        error: '"description" is not allowed to be empty',
      });
    });

    it('when todoService.update receives done with invalid value should return object with status 400 and error value as joi error', async function () {
      sinon.stub(todoModel, 'update').resolves();
      sinon.stub(todoModel, 'exists').resolves(undefined);

      const updatedTodo = await todoService.update(1, {
        ...todoMockWithNoId,
        done: 10,
      });

      expect(updatedTodo).to.be.an('object');
      expect(updatedTodo).to.be.deep.equal({
        status: 400,
        error: '"done" must be one of [0, 1]',
      });
    });

    it('when todoModel.exists resolves a falsy value should return object with status 404 and error as "Todo not found"', async function () {
      sinon.stub(todoModel, 'update').resolves();
      sinon.stub(todoModel, 'exists').resolves(undefined);

      const updatedTodo = await todoService.update(1, todoMock);

      expect(updatedTodo).to.be.an('object');
      expect(updatedTodo).to.be.deep.equal({
        status: 404,
        error: 'Todo not found',
      });
    });

    it('when todoModel.create rejects todoService.create should throw', () => {
      sinon.stub(todoModel, 'update').rejects();

      expect(todoService.update(1, todoMockWithNoId)).to.eventually.be.rejected;
    });
  });

  describe('delete', () => {
    it('when todoModel.delete resolves should return object with status 204', async function () {
      sinon.stub(todoModel, 'exists').resolves(true);
      sinon.stub(todoModel, 'delete').resolves();

      const updatedTodo = await todoService.delete(1);

      expect(updatedTodo).to.be.an('object');
      expect(updatedTodo).to.be.deep.equal({
        status: 204,
      });
    });

    it('when todoModel.exists resolves a falsy value should return object with status 404 and error as "Todo not found"', async function () {
      sinon.stub(todoModel, 'delete').resolves();
      sinon.stub(todoModel, 'exists').resolves(undefined);

      const updatedTodo = await todoService.delete(1);

      expect(updatedTodo).to.be.an('object');
      expect(updatedTodo).to.be.deep.equal({
        status: 404,
        error: 'Todo not found',
      });
    });

    it('when todoModel.create rejects todoService.create should throw', () => {
      sinon.stub(todoModel, 'delete').rejects();

      expect(todoService.delete(1)).to.eventually.be.rejected;
    });
  });
});
