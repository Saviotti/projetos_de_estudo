import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import allTeams from '../Mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint teams de back-end', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Testa o retorno dos times com o /GET', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allTeams);
  });
  it('Testa se retorna um time com o id', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves({
      id: 1,
      name: 'Cruzeiro'
    } as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({
      id: 1,
      name: 'Cruzeiro'
    });
  })
});
