import { Request, Response, Router } from 'express';
import userValidation from '../Middlewares/usersValidation';
import UsersController from '../Controllers/UsersController';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  userValidation.emailAndPasswordValidation,
  userValidation.emailValidation,
  userValidation.passwordValidation,
  (req: Request, res: Response) => usersController.login(req, res),
);

router.get(
  '/role',
  userValidation.tokenValitation,
  (req: Request, res: Response) => usersController.getRole(req, res),
);

export default router;
