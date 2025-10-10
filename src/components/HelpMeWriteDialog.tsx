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
  Box,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { helpMeWrite } from "../services/openai";

type Props = {
  open: boolean;
  onClose: () => void;
  onAccept: (text: string) => void;
  seedPrompt: string;
  placeholderText: string;
};

const HelpMeWriteDialog: React.FC<Props> = ({
  open,
  placeholderText,
  onClose,
  onAccept,
  seedPrompt,
}) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const lang = (i18n.language as "en" | "ar") || "en";
      const suggestion = await helpMeWrite(seedPrompt, lang, text);
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

      <DialogContent dividers>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "250px",
              gap: 2,
            }}
          >
            <CircularProgress size={48} aria-label="Loading" />
            <Typography variant="body1" color="text.secondary">
              {t("processing")}
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2} sx={{ my: 1 }}>
            <TextField
              multiline
              minRows={8}
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                placeholderText || "Generated suggestion will appear here..."
              }
              inputProps={{ "aria-label": "Generated text editor" }}
            />
            {error && (
              <Typography
                role="alert"
                aria-live="assertive"
                sx={{ color: "crimson" }}
              >
                {error}
              </Typography>
            )}
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={run} disabled={loading}>
          {loading ? "..." : t("helpMeWrite")}
        </Button>
        <Button onClick={onClose} disabled={loading}>
          {t("discard")}
        </Button>
        <Button
          onClick={() => onAccept(text)}
          variant="contained"
          disabled={!text || loading}
        >
          {t("accept")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpMeWriteDialog;
