import { STANDARD_EMOJI } from "../../constants";

export function weatherIcon(weatherId: number): string {
  if (weatherId === 800) return `Cer curat ${STANDARD_EMOJI.CER_CURAT}`;

  if (weatherId >= 200 && weatherId <= 232) return `Furtuna ${STANDARD_EMOJI.FURTUNA}`;
  else if (weatherId >= 300 && weatherId <= 321) return `Burnita ${STANDARD_EMOJI.BURNITA}`;
  else if (weatherId >= 500 && weatherId <= 531) return `Ploaie ${STANDARD_EMOJI.PLOAIE}`;
  else if (weatherId >= 600 && weatherId <= 622) return `Zapada ${STANDARD_EMOJI.ZAPADA}`;
  else if (weatherId >= 701 && weatherId <= 781) return `Ceata ${STANDARD_EMOJI.CEATA}`;
  else if (weatherId >= 801 && weatherId <= 804) return `Innorat ${STANDARD_EMOJI.INNORAT}`;
  else return STANDARD_EMOJI.NU_STIU;
}