import { Request, Response, Router } from 'express';
import LeaderboarderController from '../Controllers/LeaderboardController';

const leaderBoard = new LeaderboarderController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoard.getAll(req, res),
);

export default router;
