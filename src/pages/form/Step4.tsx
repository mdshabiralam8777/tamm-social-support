import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Chip,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

const Step4: React.FC = () => {
  const { t } = useTranslation();
  const { control, setValue, watch } = useFormContext();

  const documentCategories = [
    {
      id: "nationalId",
      label: t("form.step4.nationalId"),
      description: t("form.step4.nationalIdDesc"),
      required: true,
    },
    {
      id: "proofOfAddress",
      label: t("form.step4.proofOfAddress"),
      description: t("form.step4.proofOfAddressDesc"),
      required: true,
    },
    {
      id: "incomeProof",
      label: t("form.step4.incomeProof"),
      description: t("form.step4.incomeProofDesc"),
      required: false,
    },
    {
      id: "additionalDocuments",
      label: t("form.step4.additionalDocuments"),
      description: t("form.step4.additionalDocumentsDesc"),
      required: false,
    },
  ];

  const handleFileUpload = (
    documentType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // File validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (file.size > maxSize) {
      alert(t("form.step4.fileTooLarge"));
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert(t("form.step4.invalidFileType"));
      return;
    }

    // Create file object
    const currentDocs = watch(`documents.${documentType}`) || [];
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    };

    setValue(`documents.${documentType}`, [...currentDocs, newFile], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleFileRemove = (documentType: string, index: number) => {
    const currentDocs = watch(`documents.${documentType}`) || [];
    const updatedDocs = currentDocs.filter((_: any, i: number) => i !== index);
    setValue(`documents.${documentType}`, updatedDocs, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" }, mb: 2 }}
      >
        {t("form.step4.title")}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, fontSize: { xs: "0.875rem", sm: "1rem" } }}
      >
        {t("form.step4.description")}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        {t("form.step4.fileRequirements")}
      </Alert>

      <Grid container spacing={3}>
        {documentCategories.map((category) => (
          <Grid size={{ xs: 12, md: 6 }} key={category.id}>
            <Controller
              name={`documents.${category.id}`}
              control={control}
              defaultValue={[]}
              render={({ field, fieldState }) => {
                const uploadedFiles = watch(`documents.${category.id}`) || [];

                return (
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      borderLeft: category.required ? "4px solid" : "none",
                      borderColor: category.required
                        ? "primary.main"
                        : "transparent",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ flexGrow: 1, fontWeight: 600 }}
                      >
                        {category.label}
                      </Typography>
                      {category.required && (
                        <Chip
                          label={t("form.step4.required")}
                          size="small"
                          color="primary"
                        />
                      )}
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontSize: { xs: "0.813rem", sm: "0.875rem" },
                      }}
                    >
                      {category.description}
                    </Typography>

                    {/* Upload Button */}
                    <Box sx={{ mb: 2 }}>
                      <input
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        id={`upload-${category.id}`}
                        type="file"
                        onChange={(e) => handleFileUpload(category.id, e)}
                      />
                      <label htmlFor={`upload-${category.id}`}>
                        <Box
                          sx={{
                            border: "2px dashed",
                            borderColor: fieldState.error
                              ? "error.main"
                              : "divider",
                            borderRadius: 1,
                            p: 2,
                            textAlign: "center",
                            cursor: "pointer",
                            "&:hover": {
                              bgcolor: "action.hover",
                              borderColor: "primary.main",
                            },
                            transition: "all 0.2s",
                          }}
                        >
                          <UploadFileIcon
                            sx={{ fontSize: 40, color: "action.active", mb: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {t("form.step4.clickToUpload")}
                          </Typography>
                        </Box>
                      </label>
                    </Box>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <List dense>
                        {uploadedFiles.map(
                          (file: UploadedFile, index: number) => (
                            <ListItem
                              key={index}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() =>
                                    handleFileRemove(category.id, index)
                                  }
                                  size="small"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              }
                              sx={{
                                bgcolor: "action.hover",
                                borderRadius: 1,
                                mb: 1,
                              }}
                            >
                              <ListItemIcon>
                                <DescriptionIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary={file.name}
                                secondary={formatFileSize(file.size)}
                                primaryTypographyProps={{
                                  sx: {
                                    fontSize: {
                                      xs: "0.813rem",
                                      sm: "0.875rem",
                                    },
                                  },
                                }}
                                secondaryTypographyProps={{
                                  sx: {
                                    fontSize: { xs: "0.75rem", sm: "0.813rem" },
                                  },
                                }}
                              />
                            </ListItem>
                          )
                        )}
                      </List>
                    )}

                    {fieldState.error && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 1, display: "block" }}
                      >
                        {fieldState.error.message}
                      </Typography>
                    )}
                  </Paper>
                );
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Step4;
