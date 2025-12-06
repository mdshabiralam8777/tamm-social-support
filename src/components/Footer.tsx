import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { label: t("footer.services.agriculture"), href: "#" },
      { label: t("footer.services.housing"), href: "#" },
      { label: t("footer.services.identity"), href: "#" },
      { label: t("footer.services.police"), href: "#" },
      { label: t("footer.services.transport"), href: "#" },
      { label: t("footer.services.work"), href: "#" },
    ],
    quickLinks: [
      { label: t("footer.quickLinks.about"), href: "#" },
      { label: t("footer.quickLinks.contactUs"), href: "#" },
      { label: t("footer.quickLinks.faq"), href: "#" },
      { label: t("footer.quickLinks.feedback"), href: "#" },
      { label: t("footer.quickLinks.sitemap"), href: "#" },
    ],
    legal: [
      { label: t("footer.legal.terms"), href: "#" },
      { label: t("footer.legal.privacy"), href: "#" },
      { label: t("footer.legal.accessibility"), href: "#" },
      { label: t("footer.legal.disclaimer"), href: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: <FacebookIcon />,
      href: "https://www.facebook.com/TAMM.AbuDhabi/",
      label: "Facebook",
    },
    {
      icon: <TwitterIcon />,
      href: "https://twitter.com/AbuDhabi_TAMM",
      label: "Twitter",
    },
    {
      icon: <InstagramIcon />,
      href: "https://www.instagram.com/abudhabi_tamm/?hl=en",
      label: "Instagram",
    },
    // {
    //   icon: <YouTubeIcon />,
    //   href: "https://www.youtube.com/c/TammAbuDhabi",
    //   label: "YouTube",
    // },
    {
      icon: <LinkedInIcon />,
      href: "https://www.linkedin.com/company/abu-dhabi-tamm/",
      label: "LinkedIn",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a1a1a",
        color: "#fff",
        pt: { xs: 4, md: 6 },
        pb: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
              }}
            >
              {t("brand")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.7,
                fontSize: { xs: "0.85rem", md: "0.875rem" },
              }}
            >
              {t("footer.description")}
            </Typography>

            {/* Social Media Links */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "#fff",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Services Links */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              {t("footer.servicesTitle")}
            </Typography>
            <Box
              component="nav"
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {footerLinks.services.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    "&:hover": {
                      color: "#fff",
                    },
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 4, md: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              {t("footer.quickLinksTitle")}
            </Typography>
            <Box
              component="nav"
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {footerLinks.quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    "&:hover": {
                      color: "#fff",
                    },
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 2,
                fontSize: { xs: "0.95rem", md: "1rem" },
              }}
            >
              {t("footer.legalTitle")}
            </Typography>
            <Box
              component="nav"
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              {footerLinks.legal.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    "&:hover": {
                      color: "#fff",
                    },
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            mt: { xs: 3, md: 4 },
            pt: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: { xs: "0.75rem", md: "0.813rem" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="https://www.abudhabi.ae"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: { xs: "0.75rem", md: "0.813rem" },
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              {t("footer.abuDhabiGov")}
            </Link>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.3)",
                fontSize: { xs: "0.75rem", md: "0.813rem" },
              }}
            >
              |
            </Typography>
            <Link
              href="https://u.ae"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: { xs: "0.75rem", md: "0.813rem" },
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              {t("footer.uaeGov")}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
