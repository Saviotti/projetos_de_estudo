import { ServiceResponse, ServiceMessage } from '../Interfaces/serviceResponse';
import IMatchesModel from '../Interfaces/IMatchesModel';
import MatcheModel from '../modelClasses/funcMatches';
import IMatches from '../Interfaces/IMatches';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatcheModel(),
  ) {}

  public async findAll(): Promise<IMatches[]> {
    const data = await this.matchesModel.findAll();
    return data;
  }

  public async findAllInProgressMatches(bool: boolean): Promise<IMatches[]> {
    const matches = (await this.matchesModel.findAll()).filter((match) =>
      match.inProgress === bool);
    return matches;
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const finishIdMatches = await this.matchesModel.finishMatches(id);

    return { status: 200, data: { message: finishIdMatches } };
  }
}
