import { steamGame } from "@consts/Interfaces/steamGames";
import { xml2json } from "xml-js";
import http from "./http";

const STEAM_PATH = `https://steamcommunity.com/id/${
  import.meta.env.VITE_STEAM_ID
}/games/?tab=all`;

const headers = {
  "Content-Type": "text/xml",
  Accept: "application/xml",
};

export const getSteamGames = async (): Promise<steamGame[]> => {
  return await http
    .get(`${STEAM_PATH}&xml=1`, { headers })
    .then((res) => formatJson(parseSteamXML(res.data)))
    .catch((reason) => {
      console.error(reason);
      throw reason;
    });
};

const parseSteamXML = (xml: string) =>
  xml2json(xml, { compact: true, spaces: 4 });

const formatJson = (json: string): steamGame[] => {
  const unformattedJson = JSON.parse(json)["gamesList"]["games"]["game"];
  const formattedGames: steamGame[] = [];
  unformattedJson?.map((curGame: any) => {
    const playTime = curGame.hasOwnProperty("hoursOnRecord")
      ? curGame["hoursOnRecord"]["_text"]
      : 0;
    formattedGames.push({
      appID: curGame["appID"]["_text"],
      logo: curGame["logo"]["_cdata"],
      name: curGame["name"]["_cdata"],
      playTime: playTime,
    });
  });

  return formattedGames;
};
