import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { createTodoMock, todoMock } from '../mocks/todo.mock';
import { todoService } from '../../../src/services';
import { todoController } from '../../../src/controllers';
import { Request, Response } from 'express';
import sinonChai from 'sinon-chai';

use(chaiAsPromised);
use(sinonChai);

const defaultRes = {
  status: sinon.stub().returnsThis() as Response['status'],
  json: sinon.stub().returnsThis() as Response['json'],
} as Response;

describe('src/controllers/todo.controller.ts', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('when todoService.create returns a object with status and data status should be equals to the receive and json should be a object with received id', async () => {
      const req = {
        body: createTodoMock,
      } as Request;

      const createServiceResponse = { status: 201, data: { id: todoMock.id } };

      sinon.stub(todoService, 'create').resolves(createServiceResponse);

      await todoController.create(req, defaultRes);

      expect(defaultRes.status).to.have.been.calledWith(201);
      expect(defaultRes.json).to.have.been.calledWith({ id: todoMock.id });
    });

    it('when todoService.create returns a object with status and error status should be equals to the receive and json should be a object with error.message with received error message', async () => {
      const req = {
        body: createTodoMock,
      } as Request;

      const createServiceResponse = {
        status: 400,
        error: 'Error message',
      };

      sinon.stub(todoService, 'create').resolves(createServiceResponse);

      await todoController.create(req, defaultRes);

      expect(defaultRes.status).to.have.been.calledWith(400);
      expect(defaultRes.json).to.have.been.calledWith({
        error: { message: 'Error message' },
      });
    });

    it('when connection execute rejects todoModel.create should throw', () => {
      const req = {
        body: createTodoMock,
      } as Request;

      sinon.stub(todoService, 'create').rejects();

      expect(todoController.create(req, defaultRes)).to.eventually.be.rejected;
    });
  });
});
