import { Request, Response } from 'express';
import {
  createGuest,
  getGuestByEmail,
  getGuestById,
  updateGuest
} from './repository';

export const getAGuestById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const guest = await getGuestById(id);
  if (guest) {
    res.status(200).json({ response: 'ok', data: guest });
  } else {
    res.status(404).json({ response: 'NotFound', data: null });
  }
};

export const getAGuestByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const guest = await getGuestByEmail(email);
  if (guest) {
    res.status(200).json({ response: 'ok', data: guest });
  } else {
    res.status(404).json({ response: 'NotFound', data: null });
  }
};

export const createNewGuest = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (email) {
    const validatedEmail = validateAndNormalizeEmail(email);
    if (validatedEmail) {
      const guest = await getGuestByEmail(validatedEmail);
      if (guest) {
        res.status(200).json({ response: 'ok', data: guest });
      } else {
        const guest = await createGuest({
          email: validatedEmail,
          status: GUEST_STATUS.INCOMPLETE
        });
        res.status(201).json({ response: 'ok', data: guest });
      }
    } else {
      res
        .status(400)
        .json({ response: 'BadRequest', message: 'Invalid Email' });
    }
  } else {
    res
      .status(400)
      .json({ response: 'BadRequest', message: 'Email is a mandatory field' });
  }
};

export const updateCreatedGuest = async (req: Request, res: Response) => {
  const {
    email,
    completeName,
    confirmAssistance,
    hanIntolerances,
    intolerances,
    firstDay,
    favoriteSong,
    interestedInTransport,
    hasCompanion,
    companionCompleteName,
    companionHasIntolerances,
    companionIntolerances
  } = req.body;

  if (email) {
    const validatedEmail = validateAndNormalizeEmail(email);
    if (validatedEmail) {
      const guest = await getGuestByEmail(validatedEmail);
      if (guest) {
        await updateGuest(guest?._id.toString(), {
          email: email,
          completeName: completeName,
          confirmAssistance: confirmAssistance,
          hanIntolerances: hanIntolerances,
          intolerances: intolerances,
          firstDay: firstDay,
          favoriteSong: favoriteSong,
          interestedInTransport: interestedInTransport,
          hasCompanion: hasCompanion,
          companionCompleteName: companionCompleteName,
          companionHasIntolerances: companionHasIntolerances,
          companionIntolerances: companionIntolerances
        });
      }
    }
  } else {
    res
      .status(400)
      .json({ response: 'BadRequest', message: 'Email is a mandatory field' });
  }
};
