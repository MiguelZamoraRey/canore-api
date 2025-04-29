import { IGuest } from '../guest/model';

const dotenv = require('dotenv');

dotenv.config();
const GSheetHook = process.env.GSHEETHOOK;

export const updateGuestOnGSheet = async (guest: IGuest) => {
  console.log(GSheetHook);
  try {
    if (GSheetHook) {
      const data = {
        _id: guest._id.toString(), // Asegúrate de incluir el campo _id
        email: guest.email ? guest.email : '-',
        completeName: guest.completeName ? guest.completeName : '-',
        confirmAssistance:
          guest.confirmAssistance && guest.confirmAssistance === true
            ? 'Sí'
            : 'No',
        hasIntolerances:
          guest.hasIntolerances && guest.hasIntolerances === true ? 'Sí' : 'No',
        intolerances: guest.intolerances ? guest.intolerances : '-',
        favoriteSong: guest.favoriteSong ? guest.favoriteSong : '-',
        interestedInTransport:
          guest.interestedInTransport && guest.interestedInTransport === true
            ? 'Sí'
            : 'No',
        hasCompanion:
          guest.hasCompanion && guest.hasCompanion === true ? 'Sí' : 'No',
        companionCompleteName: guest.companionCompleteName
          ? guest.companionCompleteName
          : '-',
        companionHasIntolerances:
          guest.companionHasIntolerances &&
          guest.companionHasIntolerances === true
            ? 'Sí'
            : 'No',
        companionIntolerances: guest.companionIntolerances
          ? guest.companionIntolerances
          : '-',
        childNames: guest.childNames ? guest.childNames : '-',
        hasChilds: guest.hasChilds && guest.hasChilds === true ? 'Sí' : 'No',
        status: guest.status ? guest.status : 'INCOMPLETE'
      };

      fetch(GSheetHook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Datos enviados correctamente: ', data);
          return 'Datos enviados correctamente';
        })
        .catch((error) => {
          console.error('Error al enviar datos:', error);
        });
    } else {
      console.error('GSheet hook not configured');
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
