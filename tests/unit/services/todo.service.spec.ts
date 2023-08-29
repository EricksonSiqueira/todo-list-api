import { expect, use } from 'chai';
import sinon from 'sinon';
import { todoModel } from '../../../src/models';
import { todoService } from '../../../src/services';
import { createTodoMock, todoMock } from '../mocks/todo.mock';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

describe('src/models/todo.service.ts', () => {
  afterEach(function () {
    sinon.restore();
  });

  describe('create', () => {
    it('when todoModel.create resolves a valid id should return objetct with status CREATED and data.id equals to model returned id', async function () {
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
        ...todoMock,
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
        ...todoMock,
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
});
