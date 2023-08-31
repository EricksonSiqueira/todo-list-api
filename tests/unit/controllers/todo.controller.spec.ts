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

describe('src/controllers/todo.controller.ts', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('when todoService.create returns a object with status and data status should be equals to the receive and json should be a object with received id', async () => {
      const req = {
        body: createTodoMock,
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = { status: 201, data: { id: todoMock.id } };

      sinon.stub(todoService, 'create').resolves(createServiceResponse);

      await todoController.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: todoMock.id });
    });

    it('when todoService.create returns a object with status and error status should be equals to the receive and json should be a object with error.message with received error message', async () => {
      const req = {
        body: createTodoMock,
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = {
        status: 400,
        error: 'Error message',
      };

      sinon.stub(todoService, 'create').resolves(createServiceResponse);

      await todoController.create(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        error: { message: 'Error message' },
      });
    });

    it('when todoService.create rejects todoModel.create should throw', () => {
      const req = {
        body: createTodoMock,
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      sinon.stub(todoService, 'create').rejects();

      expect(todoController.create(req, res)).to.eventually.be.rejected;
    });
  });

  describe('findAll', () => {
    it('when todoService.findAll returns a object with status and data status should be equals to the receive and json should be a array of todos', async () => {
      const req = {} as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = {
        status: 200,
        data: [todoMock, todoMock, todoMock],
      };

      sinon.stub(todoService, 'findAll').resolves(createServiceResponse);

      await todoController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([todoMock, todoMock, todoMock]);
    });

    it('when todoService.findAll rejects todoModel.findAll should throw', () => {
      const req = {
        body: createTodoMock,
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      sinon.stub(todoService, 'findAll').rejects();

      expect(todoController.findAll(req, res)).to.eventually.be.rejected;
    });
  });

  describe('findById', () => {
    it('when todoService.findById returns a object with status and data status should be equals to the receive and json should be a todo', async () => {
      const req = {
        params: { id: '1' } as Request['params'],
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = {
        status: 200,
        data: todoMock,
      };

      sinon.stub(todoService, 'findById').resolves(createServiceResponse);

      await todoController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(todoMock);
    });

    it('when todoService.findById returns a error key, status should be equals to the received and json should be error.message as "Todo not found"', async () => {
      const req = {
        params: { id: '1' } as Request['params'],
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = {
        status: 404,
        error: 'Todo not found',
      };

      sinon.stub(todoService, 'findById').resolves(createServiceResponse);

      await todoController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        error: { message: 'Todo not found' },
      });
    });

    it('when todoService.findById rejects todoModel.findById should throw', () => {
      const req = {
        body: createTodoMock,
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      sinon.stub(todoService, 'findById').rejects();

      expect(todoController.findById(req, res)).to.eventually.be.rejected;
    });
  });

  describe('update', () => {
    it('when todoService.update return has no error key should return status 204 and empty json', async () => {
      const req = {
        params: { id: '1' } as Request['params'],
        body: createTodoMock,
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = {
        status: 204,
        message: 'Todo updated',
      };

      sinon.stub(todoService, 'update').resolves(createServiceResponse);

      await todoController.update(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('when todoService.update return has error key should return status received and and json with error.message as message received', async () => {
      const req = {
        params: { id: '1' } as Request['params'],
        body: createTodoMock,
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = {
        status: 404,
        error: 'Todo not found',
      };

      sinon.stub(todoService, 'update').resolves(createServiceResponse);

      await todoController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        error: { message: 'Todo not found' },
      });
    });

    it('when todoService.update rejects todoModel.update should throw', () => {
      const req = {
        params: { id: '1' } as Request['params'],
        body: createTodoMock,
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      sinon.stub(todoService, 'update').rejects();

      expect(todoController.update(req, res)).to.eventually.be.rejected;
    });
  });

  describe('delete', () => {
    it('when todoService.delete return has no error key should return status 204 and empty json', async () => {
      const req = {
        params: { id: '1' } as Request['params'],
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = {
        status: 204,
        message: 'Todo updated',
      };

      sinon.stub(todoService, 'delete').resolves(createServiceResponse);

      await todoController.delete(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('when todoService.delete has error key should return status received and and json with error.message as message received', async () => {
      const req = {
        params: { id: '1' } as Request['params'],
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      const createServiceResponse = {
        status: 404,
        error: 'Todo not found',
      };

      sinon.stub(todoService, 'delete').resolves(createServiceResponse);

      await todoController.delete(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        error: { message: 'Todo not found' },
      });
    });

    it('when todoService.delete rejects todoModel.delete should throw', () => {
      const req = {
        params: { id: '1' } as Request['params'],
      } as Request;

      const res = {
        status: sinon.stub().returnsThis() as Response['status'],
        json: sinon.stub().returnsThis() as Response['json'],
      } as Response;

      sinon.stub(todoService, 'delete').rejects();

      expect(todoController.delete(req, res)).to.eventually.be.rejected;
    });
  });
});
