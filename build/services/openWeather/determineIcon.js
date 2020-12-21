"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherIcon = void 0;
function weatherIcon(weatherId) {
    if (weatherId === 800)
        return `Cer curat ${":sun_with_face:" /* CER_CURAT */}`;
    if (weatherId >= 200 && weatherId <= 232)
        return `Furtuna ${":thunder_cloud_rain:" /* FURTUNA */}`;
    else if (weatherId >= 300 && weatherId <= 321)
        return `Burnita ${":cloud_rain:" /* BURNITA */}`;
    else if (weatherId >= 500 && weatherId <= 531)
        return `Ploaie ${":cloud_rain:" /* PLOAIE */}`;
    else if (weatherId >= 600 && weatherId <= 622)
        return `Zapada ${":cloud_snow:" /* ZAPADA */}`;
    else if (weatherId >= 701 && weatherId <= 781)
        return `Ceata ${":foggy:" /* CEATA */}`;
    else if (weatherId >= 801 && weatherId <= 804)
        return `Innorat ${":white_sun_cloud:" /* INNORAT */}`;
    else
        return ":man_shrugging:" /* NU_STIU */;
}
exports.weatherIcon = weatherIcon;
