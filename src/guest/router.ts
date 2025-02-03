import { Router } from 'express';
import {
  getAGuestById,
  createNewGuest,
  updateCreatedGuest,
  getAGuestByEmail
} from '@/guest/controller';
import { Express } from 'express-serve-static-core';

const router = Router();

const guestRouter = (app: Express) => {
  router.get('/:id', getAGuestById);
  router.post('/email', getAGuestByEmail);
  router.post('/', createNewGuest);
  router.post('/update/:id', updateCreatedGuest);
  app.use('/guest', router);
};

export default guestRouter;
