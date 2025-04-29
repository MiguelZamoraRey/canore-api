import { Request, Response } from 'express';
import {
  createGuest,
  getGuestByEmail,
  getGuestById,
  updateGuest
} from './repository';
import { GUEST_STATUS, RESPONSE_TYPES } from '@/utils/generalTypes';
import { validateAndNormalizeEmail } from './utils';
import { updateGuestOnGSheet } from '@/services/GSheet';

export const getAGuestById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const guest = await getGuestById(id);
  if (guest) {
    res.status(200).json({ response: RESPONSE_TYPES.OK, data: guest });
  } else {
    res.status(404).json({ response: RESPONSE_TYPES.NOT_FOUND, data: null });
  }
};

export const getAGuestByEmail = async (req: Request, res: Response) => {
  console.log('getAGuestByEmail');
  const { email } = req.body;
  const guest = await getGuestByEmail(email);
  if (guest) {
    res.status(200).json({ response: RESPONSE_TYPES.OK, data: guest });
  } else {
    res.status(404).json({ response: RESPONSE_TYPES.NOT_FOUND, data: null });
  }
};

export const createNewGuest = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(`createNewGuest ${email}}`);
  if (email) {
    const validatedEmail = validateAndNormalizeEmail(email);
    if (validatedEmail) {
      const guest = await getGuestByEmail(validatedEmail);
      if (guest) {
        console.log(`Lead with email: ${email} exists jet!`);
        res.status(200).json({ response: RESPONSE_TYPES.OK, data: guest });
      } else {
        const guest = await createGuest({
          email: validatedEmail,
          status: GUEST_STATUS.INCOMPLETE
        });
        await updateGuestOnGSheet(guest);
        res.status(201).json({ response: RESPONSE_TYPES.OK, data: guest });
      }
    } else {
      res.status(400).json({
        response: RESPONSE_TYPES.BAD_REQUEST,
        message: 'Invalid Email'
      });
    }
  } else {
    res.status(400).json({
      response: RESPONSE_TYPES.BAD_REQUEST,
      message: 'Email is a mandatory field'
    });
  }
};

export const updateCreatedGuest = async (req: Request, res: Response) => {
  const {
    email,
    completeName,
    confirmAssistance,
    hasIntolerances,
    intolerances,
    firstDay,
    favoriteSong,
    interestedInTransport,
    hasCompanion,
    companionCompleteName,
    companionHasIntolerances,
    companionIntolerances,
    childNames,
    hasChilds,
    status
  } = req.body;

  const id = req.params.id;

  console.log(`updateCreatedGuest ${email},
    completeName: ${completeName} .
    confirmAssistance: ${confirmAssistance} .
    hasIntolerances: ${hasIntolerances} .
    intolerances: ${intolerances} .
    firstDay: ${firstDay} .
    favoriteSong: ${favoriteSong} .
    interestedInTransport: ${interestedInTransport} .
    hasCompanion: ${hasCompanion} .
    companionCompleteName: ${companionCompleteName} .
    companionHasIntolerances: ${companionHasIntolerances} .
    companionIntolerances: ${companionIntolerances} .
    status: ${status} .
    childNames: ${childNames}.
    hasChilds: ${hasChilds}.
    `);

  let validatedEmail = null;
  if (email) {
    validatedEmail = validateAndNormalizeEmail(email);
  }

  const updatedData = await updateGuest(id, {
    email: email,
    completeName: completeName,
    confirmAssistance: confirmAssistance,
    hasIntolerances: hasIntolerances,
    intolerances: intolerances,
    firstDay: firstDay,
    favoriteSong: favoriteSong,
    interestedInTransport: interestedInTransport,
    hasCompanion: hasCompanion,
    companionCompleteName: companionCompleteName,
    companionHasIntolerances: companionHasIntolerances,
    companionIntolerances: companionIntolerances,
    childNames: childNames,
    hasChilds: hasChilds,
    status: status
  });
  await updateGuestOnGSheet(updatedData!);
  res.status(201).json({ response: RESPONSE_TYPES.OK, data: updatedData });
};
