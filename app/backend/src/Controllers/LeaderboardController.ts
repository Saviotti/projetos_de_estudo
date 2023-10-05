import { Request, Response } from 'express';
import LeaderboarderService from '../Services/LeaderboarderService';

export default class LeaderboarderControler {
  constructor(
    private leaderboarderService = new LeaderboarderService(),
  ) {}

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboarderService.getHomeLeaderBoard();

    return res.status(status).json(data);
  }
}
