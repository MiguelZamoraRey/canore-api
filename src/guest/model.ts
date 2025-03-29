import { DAY_TO_COME, GUEST_STATUS } from '@/utils/generalTypes';
import { model, Schema } from 'mongoose';

interface IGuest {
  _id: string;
  email: string;
  completeName: string;
  confirmAssistance: boolean;
  hasIntolerances: boolean;
  intolerances: string;
  firstDay: DAY_TO_COME;
  favoriteSong: string;
  interestedInTransport: boolean;
  hasCompanion: boolean;
  companionCompleteName: string;
  companionHasIntolerances: boolean;
  companionIntolerances: string;
  childNames: string;
  hasChilds: boolean;
  status: GUEST_STATUS;
}

const GuestSchema: Schema = new Schema(
  {
    email: { type: String },
    completeName: { type: String },
    confirmAssistance: { type: Boolean },
    hasIntolerances: { type: Boolean },
    intolerances: { type: String },
    firstDay: { type: String },
    favoriteSong: { type: String },
    interestedInTransport: { type: Boolean },
    hasCompanion: { type: Boolean },
    companionCompleteName: { type: String },
    companionHasIntolerances: { type: Boolean },
    companionIntolerances: { type: String },
    childNames: { type: String },
    hasChilds: { type: Boolean },
    status: { type: String }
  },
  {
    timestamps: true
  }
);

const Guest = model<IGuest>('Guest', GuestSchema);

export { IGuest, Guest };
