import { webpack } from "replugged";
import { config, inject, logger } from "./shared";
import { random } from "./util";

export async function start(): Promise<void> {
  const sendMessage = await webpack.waitForModule<{
    sendMessage: (channelId: string, msg: { content: string }) => void;
  }>(webpack.filters.byProps("sendMessage"));

  if (!sendMessage) {
    logger.error("Failed to find module");
    return;
  }

  inject.before(sendMessage, "sendMessage", ([, msg]) => {
    const emoji = config.get("emoji");

    if (config.get("replace")) {
      const spacesCount = msg.content.split(" ").length - 1;
      const randoms = random(spacesCount);
      const chance = (1 - config.get("replaceChance")! / 100) * 255;

      msg.content = msg.content
        .trim()
        .split(" ")
        .map((val, i) => (randoms[i] > chance ? `${val} ${emoji}` : val))
        .join(" ");
    }

    if (config.get("append")) {
      if (
        Math.random() > 1 - config.get("appendChance")! / 100 &&
        !msg.content.split(" ").at(-1)?.startsWith("<:")
      ) {
        msg.content += ` ${emoji}`;
      }
    }
  });
}

export function stop(): void {
  inject.uninjectAll();
}

export { Settings } from "./Settings";
