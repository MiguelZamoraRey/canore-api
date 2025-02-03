import { Guest, IGuest } from './model';

export const createGuest = async (
  guestData: Partial<IGuest>
): Promise<IGuest> => {
  const guest = new Guest(guestData);
  return await guest.save();
};

export const getGuestById = async (guestId: string): Promise<IGuest | null> => {
  return await Guest.findById(guestId).exec();
};

export const getGuestByEmail = async (
  email: string
): Promise<IGuest | null> => {
  return await Guest.findOne({ email: email }).exec();
};

export const updateGuest = async (
  guestId: string,
  updatedData: Partial<IGuest>
): Promise<IGuest | null> => {
  return await Guest.findByIdAndUpdate(guestId, updatedData, {
    new: true
  }).exec();
};

export const deleteGuest = async (guestId: string): Promise<IGuest | null> => {
  return await Guest.findByIdAndDelete(guestId).exec();
};
