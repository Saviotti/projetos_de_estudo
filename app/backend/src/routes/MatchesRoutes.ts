import { Request, Response, Router } from 'express';
import MatchesController from '../Controllers/MatchesController';
import userValidation from '../Middlewares/usersValidation';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.findAll(req, res),
);

router.patch(
  '/:id/finish',
  userValidation.tokenValitation,
  (req: Request, res: Response) => matchesController.findById(req, res),
);

router.patch(
  '/:id',
  userValidation.tokenValitation,
  (req: Request, res: Response) => matchesController.updateMatches(req, res),
);

router.post(
  '/',
  userValidation.tokenValitation,
  userValidation.teamsValidation,
  (req: Request, res: Response) => matchesController.createMatches(req, res),
);

export default router;
