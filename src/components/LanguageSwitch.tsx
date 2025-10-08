import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useApp } from "../context/AppContext";

const LanguageSwitch: React.FC = () => {
  const { lang, setLang } = useApp();
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={lang}
      onChange={(_, v) => v && setLang(v)}
      aria-label="Language switch"
    >
      <ToggleButton value="en" aria-label="English">
        EN
      </ToggleButton>
      <ToggleButton value="ar" aria-label="Arabic">
        AR
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitch;
