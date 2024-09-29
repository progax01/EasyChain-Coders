import axios from "axios";
import * as utils from "../utils";

export const TG_BOT_TOKEN = utils.getEnvVar(`TG_BOT_TOKEN`);
export const TG_CHAT_ID = utils.getEnvVar(`TG_CHAT_ID`);

export const TG_BASE_URL = `https://api.telegram.org/bot${TG_BOT_TOKEN}`;

export const sendTelegramMessage = async (text: string) => {
  const url = `/sendMessage`;
  await axios.post(`${TG_BASE_URL}${url}`, {
    chat_id: TG_CHAT_ID,
    text: utils.sanitizeTelegramText(text),
    parse_mode: `HTML`,
    disable_web_page_preview: true,
  });
};
