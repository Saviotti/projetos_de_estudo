import { Request, Response } from 'express';
import MatchesService from '../Services/MatchesService';

export default class MatchesController {
  constructor(
    private matchService = new MatchesService(),
  ) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const value = inProgress === 'true';
      const data = await this.matchService.findAllInProgressMatches(value);
      return res.status(200).json(data);
    }
    const matches = await this.matchService.findAll();
    return res.status(200).json(matches);
  }
}
