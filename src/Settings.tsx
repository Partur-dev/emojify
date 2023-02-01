import type { FC } from "react";
import { components, util } from "replugged";
import { config } from "./shared";

const { SwitchItem, Slider, TextInput, Text } = components;
const { useSetting } = util;

export const Settings: FC = () => {
  return (
    <div>
      <SwitchItem {...useSetting(config, "replace")}>Replace</SwitchItem>
      <Slider
        {...util.useSetting(config, "replaceChance")}
        defaultValue={50}
        onMarkerRender={(e: number) => {
          return `${e}%`;
        }}
        disabled={!config.get("replace")}
      />

      <SwitchItem {...useSetting(config, "append")}>Append</SwitchItem>
      <Slider
        {...util.useSetting(config, "appendChance")}
        defaultValue={50}
        onMarkerRender={(e: number) => {
          return `${e}%`;
        }}
        disabled={!config.get("append")}
      />

      <Text>Emoji</Text>
      <TextInput {...util.useSetting(config, "emoji")} />
    </div>
  );
};
