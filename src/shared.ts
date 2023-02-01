import { Injector, Logger, settings } from "replugged";
import { Config } from "./types";

export const inject = new Injector();

export const config = await settings.init<Config>("com.partur.Emojify", {
  replace: false,
  replaceChance: 50,
  append: true,
  appendChance: 50,
  emoji: "😼",
});

export const logger = new Logger("Plugin", "Emojify");
