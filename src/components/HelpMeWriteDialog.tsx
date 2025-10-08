import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { helpMeWrite } from "../services/openai";

type Props = {
  open: boolean;
  onClose: () => void;
  onAccept: (text: string) => void;
  seedPrompt: string;
};

const HelpMeWriteDialog: React.FC<Props> = ({
  open,
  onClose,
  onAccept,
  seedPrompt,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const suggestion = await helpMeWrite(seedPrompt);
      setText(suggestion);
    } catch (e: any) {
      setError(e.message || "Failed to generate suggestion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="gpt-help-title"
    >
      <DialogTitle id="gpt-help-title">{t("helpMeWrite")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ my: 1 }}>
          {loading ? (
            <CircularProgress aria-label="Loading" />
          ) : (
            <TextField
              multiline
              minRows={8}
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Generated suggestion will appear here..."
              inputProps={{ "aria-label": "Generated text editor" }}
            />
          )}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              style={{ color: "crimson" }}
            >
              {error}
            </div>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={run} disabled={loading}>
          {loading ? "..." : "Generate"}
        </Button>
        <Button onClick={onClose}>{t("discard")}</Button>
        <Button
          onClick={() => onAccept(text)}
          variant="contained"
          disabled={!text}
        >
          {t("accept")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpMeWriteDialog;
