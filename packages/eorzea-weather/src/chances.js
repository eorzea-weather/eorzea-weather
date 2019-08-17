import {
  WEATHER_BLIZZARDS,
  WEATHER_CLEAR_SKIES,
  WEATHER_CLOUDS,
  WEATHER_DUST_STORMS,
  WEATHER_FAIR_SKIES,
  WEATHER_FOG,
  WEATHER_GALES,
  WEATHER_GLOOM,
  WEATHER_HEAT_WAVES,
  WEATHER_RAIN,
  WEATHER_SHOWERS,
  WEATHER_SNOW,
  WEATHER_THUNDER,
  WEATHER_THUNDERSTORMS,
  WEATHER_UMBRAL_STATIC,
  WEATHER_UMBRAL_WIND,
  WEATHER_WIND,
} from './weathers';

export const amhAraeng = (chance) => {
  if (chance < 45) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_CLOUDS;
  }
  if (chance < 70) {
    return WEATHER_DUST_STORMS;
  }
  if (chance < 80) {
    return WEATHER_HEAT_WAVES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const azysLla = (chance) => {
  if (chance < 35) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 70) {
    return WEATHER_CLOUDS;
  }
  return WEATHER_THUNDER;
};

export const centralShroud = (chance) => {
  if (chance < 5) {
    return WEATHER_THUNDER;
  }
  if (chance < 20) {
    return WEATHER_RAIN;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 55) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 85) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const centralThanalan = (chance) => {
  if (chance < 15) {
    return WEATHER_DUST_STORMS;
  }
  if (chance < 55) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 75) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 85) {
    return WEATHER_CLOUDS;
  }
  if (chance < 95) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const coerthasCentralHighlands = (chance) => {
  if (chance < 20) {
    return WEATHER_BLIZZARDS;
  }
  if (chance < 60) {
    return WEATHER_SNOW;
  }
  if (chance < 70) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 75) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 90) {
    return WEATHER_CLOUDS;
  }
  return WEATHER_FOG;
};

export const coerthasWesternHighlands = (chance) => {
  if (chance < 20) {
    return WEATHER_BLIZZARDS;
  }
  if (chance < 60) {
    return WEATHER_SNOW;
  }
  if (chance < 70) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 75) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 90) {
    return WEATHER_CLOUDS;
  }
  return WEATHER_FOG;
};

export const eastShroud = (chance) => {
  if (chance < 5) {
    return WEATHER_THUNDER;
  }
  if (chance < 20) {
    return WEATHER_RAIN;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 55) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 85) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const easternLaNoscea = (chance) => {
  if (chance < 5) {
    return WEATHER_FOG;
  }
  if (chance < 50) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 90) {
    return WEATHER_CLOUDS;
  }
  if (chance < 95) {
    return WEATHER_RAIN;
  }
  return WEATHER_SHOWERS;
};

export const easternThanalan = (chance) => {
  if (chance < 40) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 70) {
    return WEATHER_CLOUDS;
  }
  if (chance < 80) {
    return WEATHER_FOG;
  }
  if (chance < 85) {
    return WEATHER_RAIN;
  }
  return WEATHER_SHOWERS;
};

export const eulmore = (chance) => {
  if (chance < 10) {
    return WEATHER_GALES;
  }
  if (chance < 20) {
    return WEATHER_RAIN;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 45) {
    return WEATHER_CLOUDS;
  }
  if (chance < 85) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const eurekaAnemos = (chance) => {
  if (chance < 30) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_GALES;
  }
  if (chance < 90) {
    return WEATHER_SHOWERS;
  }
  return WEATHER_SNOW;
};

export const eurekaHydatos = (chance) => {
  if (chance < 12) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 34) {
    return WEATHER_SHOWERS;
  }
  if (chance < 56) {
    return WEATHER_GLOOM;
  }
  if (chance < 78) {
    return WEATHER_THUNDERSTORMS;
  }
  return WEATHER_SNOW;
};

export const eurekaPagos = (chance) => {
  if (chance < 10) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 28) {
    return WEATHER_FOG;
  }
  if (chance < 46) {
    return WEATHER_HEAT_WAVES;
  }
  if (chance < 64) {
    return WEATHER_SNOW;
  }
  if (chance < 82) {
    return WEATHER_THUNDER;
  }
  return WEATHER_BLIZZARDS;
};

export const eurekaPyros = (chance) => {
  if (chance < 10) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 28) {
    return WEATHER_HEAT_WAVES;
  }
  if (chance < 46) {
    return WEATHER_THUNDER;
  }
  if (chance < 64) {
    return WEATHER_BLIZZARDS;
  }
  if (chance < 82) {
    return WEATHER_UMBRAL_WIND;
  }
  return WEATHER_SNOW;
};

export const gridania = (chance) => {
  if (chance < 5) {
    return WEATHER_RAIN;
  }
  if (chance < 20) {
    return WEATHER_RAIN;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 55) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 85) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const idyllshire = (chance) => {
  if (chance < 10) {
    return WEATHER_CLOUDS;
  }
  if (chance < 20) {
    return WEATHER_FOG;
  }
  if (chance < 30) {
    return WEATHER_RAIN;
  }
  if (chance < 40) {
    return WEATHER_SHOWERS;
  }
  if (chance < 70) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const ilMheg = (chance) => {
  if (chance < 10) {
    return WEATHER_RAIN;
  }
  if (chance < 20) {
    return WEATHER_FOG;
  }
  if (chance < 35) {
    return WEATHER_CLOUDS;
  }
  if (chance < 45) {
    return WEATHER_THUNDERSTORMS;
  }
  if (chance < 60) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const ishgard = (chance) => {
  if (chance < 60) {
    return WEATHER_SNOW;
  }
  if (chance < 70) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 75) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 90) {
    return WEATHER_CLOUDS;
  }
  return WEATHER_FOG;
};

export const kholusia = (chance) => {
  if (chance < 10) {
    return WEATHER_GALES;
  }
  if (chance < 20) {
    return WEATHER_RAIN;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 45) {
    return WEATHER_CLOUDS;
  }
  if (chance < 85) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const kugane = (chance) => {
  if (chance < 10) {
    return WEATHER_RAIN;
  }
  if (chance < 20) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 80) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const lakeland = (chance) => {
  if (chance < 20) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 75) {
    return WEATHER_CLOUDS;
  }
  if (chance < 85) {
    return WEATHER_FOG;
  }
  if (chance < 95) {
    return WEATHER_RAIN;
  }
  return WEATHER_THUNDERSTORMS;
};

export const limsaLominsa = (chance) => {
  if (chance < 20) {
    return WEATHER_CLOUDS;
  }
  if (chance < 50) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 90) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const lowerLaNoscea = (chance) => {
  if (chance < 20) {
    return WEATHER_CLOUDS;
  }
  if (chance < 50) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 70) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_WIND;
  }
  if (chance < 90) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const middleLaNoscea = (chance) => {
  if (chance < 20) {
    return WEATHER_CLOUDS;
  }
  if (chance < 50) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 70) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_WIND;
  }
  if (chance < 90) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const mist = (chance) => {
  if (chance < 20) {
    return WEATHER_CLOUDS;
  }
  if (chance < 50) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 70) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 90) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const morDhona = (chance) => {
  if (chance < 15) {
    return WEATHER_CLOUDS;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 60) {
    return WEATHER_GLOOM;
  }
  if (chance < 75) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const northShroud = (chance) => {
  if (chance < 5) {
    return WEATHER_FOG;
  }
  if (chance < 10) {
    return WEATHER_SHOWERS;
  }
  if (chance < 25) {
    return WEATHER_RAIN;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 70) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const northernThanalan = (chance) => {
  if (chance < 5) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 20) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 50) {
    return WEATHER_CLOUDS;
  }
  return WEATHER_FOG;
};

export const outerLaNoscea = (chance) => {
  if (chance < 30) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 50) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 70) {
    return WEATHER_CLOUDS;
  }
  if (chance < 85) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const rhalgrsReach = (chance) => {
  if (chance < 15) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_CLOUDS;
  }
  if (chance < 90) {
    return WEATHER_FOG;
  }
  return WEATHER_THUNDER;
};

export const shirogane = (chance) => {
  if (chance < 10) {
    return WEATHER_RAIN;
  }
  if (chance < 20) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 80) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const southShroud = (chance) => {
  if (chance < 5) {
    return WEATHER_FOG;
  }
  if (chance < 10) {
    return WEATHER_THUNDERSTORMS;
  }
  if (chance < 25) {
    return WEATHER_THUNDER;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 70) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const southernThanalan = (chance) => {
  if (chance < 20) {
    return WEATHER_HEAT_WAVES;
  }
  if (chance < 60) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 90) {
    return WEATHER_CLOUDS;
  }
  return WEATHER_FOG;
};

export const theAzimSteppe = (chance) => {
  if (chance < 5) {
    return WEATHER_GALES;
  }
  if (chance < 10) {
    return WEATHER_WIND;
  }
  if (chance < 17) {
    return WEATHER_RAIN;
  }
  if (chance < 25) {
    return WEATHER_FOG;
  }
  if (chance < 35) {
    return WEATHER_CLOUDS;
  }
  if (chance < 75) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const theChurningMists = (chance) => {
  if (chance < 10) {
    return WEATHER_CLOUDS;
  }
  if (chance < 20) {
    return WEATHER_GALES;
  }
  if (chance < 40) {
    return WEATHER_UMBRAL_STATIC;
  }
  if (chance < 70) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const theCrystarium = (chance) => {
  if (chance < 20) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 75) {
    return WEATHER_CLOUDS;
  }
  if (chance < 85) {
    return WEATHER_FOG;
  }
  if (chance < 95) {
    return WEATHER_RAIN;
  }
  return WEATHER_THUNDERSTORMS;
};

export const theDiadem = (chance) => {
  if (chance < 30) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FOG;
  }
  if (chance < 90) {
    return WEATHER_WIND;
  }
  return WEATHER_UMBRAL_WIND;
};

export const theDravanianForelands = (chance) => {
  if (chance < 10) {
    return WEATHER_CLOUDS;
  }
  if (chance < 20) {
    return WEATHER_FOG;
  }
  if (chance < 30) {
    return WEATHER_THUNDER;
  }
  if (chance < 40) {
    return WEATHER_DUST_STORMS;
  }
  if (chance < 70) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const theDravanianHinterlands = (chance) => {
  if (chance < 10) {
    return WEATHER_CLOUDS;
  }
  if (chance < 20) {
    return WEATHER_FOG;
  }
  if (chance < 30) {
    return WEATHER_RAIN;
  }
  if (chance < 40) {
    return WEATHER_SHOWERS;
  }
  if (chance < 70) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const theFringes = (chance) => {
  if (chance < 15) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_CLOUDS;
  }
  if (chance < 90) {
    return WEATHER_FOG;
  }
  return WEATHER_THUNDER;
};

export const theGoblet = (chance) => {
  if (chance < 40) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 85) {
    return WEATHER_CLOUDS;
  }
  if (chance < 95) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const theLavenderBeds = (chance) => {
  if (chance < 5) {
    return WEATHER_CLOUDS;
  }
  if (chance < 20) {
    return WEATHER_RAIN;
  }
  if (chance < 30) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 55) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 85) {
    return WEATHER_CLEAR_SKIES;
  }
  return WEATHER_FAIR_SKIES;
};

export const theLochs = (chance) => {
  if (chance < 20) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_CLOUDS;
  }
  if (chance < 90) {
    return WEATHER_FOG;
  }
  return WEATHER_THUNDERSTORMS;
};

export const thePeaks = (chance) => {
  if (chance < 10) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 75) {
    return WEATHER_CLOUDS;
  }
  if (chance < 85) {
    return WEATHER_FOG;
  }
  if (chance < 95) {
    return WEATHER_WIND;
  }
  return WEATHER_DUST_STORMS;
};

export const theRubySea = (chance) => {
  if (chance < 10) {
    return WEATHER_THUNDER;
  }
  if (chance < 20) {
    return WEATHER_WIND;
  }
  if (chance < 35) {
    return WEATHER_CLOUDS;
  }
  if (chance < 75) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const theSeaOfClouds = (chance) => {
  if (chance < 30) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 70) {
    return WEATHER_CLOUDS;
  }
  if (chance < 80) {
    return WEATHER_FOG;
  }
  if (chance < 90) {
    return WEATHER_WIND;
  }
  return WEATHER_UMBRAL_WIND;
};

export const theTempest = (chance) => {
  if (chance < 20) {
    return WEATHER_CLOUDS;
  }
  if (chance < 80) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};

export const uldah = (chance) => {
  if (chance < 40) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 85) {
    return WEATHER_CLOUDS;
  }
  if (chance < 95) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const upperLaNoscea = (chance) => {
  if (chance < 30) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 50) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 70) {
    return WEATHER_CLOUDS;
  }
  if (chance < 80) {
    return WEATHER_FOG;
  }
  if (chance < 90) {
    return WEATHER_THUNDER;
  }
  return WEATHER_THUNDERSTORMS;
};

export const westernLaNoscea = (chance) => {
  if (chance < 10) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 80) {
    return WEATHER_CLOUDS;
  }
  if (chance < 90) {
    return WEATHER_WIND;
  }
  return WEATHER_GALES;
};

export const westernThanalan = (chance) => {
  if (chance < 40) {
    return WEATHER_CLEAR_SKIES;
  }
  if (chance < 60) {
    return WEATHER_FAIR_SKIES;
  }
  if (chance < 85) {
    return WEATHER_CLOUDS;
  }
  if (chance < 95) {
    return WEATHER_FOG;
  }
  return WEATHER_RAIN;
};

export const yanxia = (chance) => {
  if (chance < 5) {
    return WEATHER_SHOWERS;
  }
  if (chance < 15) {
    return WEATHER_RAIN;
  }
  if (chance < 25) {
    return WEATHER_FOG;
  }
  if (chance < 40) {
    return WEATHER_CLOUDS;
  }
  if (chance < 80) {
    return WEATHER_FAIR_SKIES;
  }
  return WEATHER_CLEAR_SKIES;
};
