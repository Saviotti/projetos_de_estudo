import * as sinon from 'sinon';
import * as chai from 'chai';
import allMatches from '../Mocks/match.mock';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do endpoint matches de back-end', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Testa o retorno dos times que estão jogando com o /GET', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(allMatches as any);

    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(allMatches);
  });
})
