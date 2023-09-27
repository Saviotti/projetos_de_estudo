import TeamsModel from '../modelClasses/TeamModel';
import ITeamsModel from '../Interfaces/ITeamsModel';
import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async findOne(id: number): Promise<ITeam | null> {
    const team = await this.teamModel.findOne(id);
    return team;
  }
}
