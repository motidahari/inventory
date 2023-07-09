import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ModalContainer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 10,
  boxShadow: 24,
}));

export const ModalSubmitBtn = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: "15px",
}));

export const AuthContainer = styled(Box)(() => ({
  marginTop: "75px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const PageHeaderContainer = styled(Box)(() => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  margin: "-8px",
}));

export const DashboardLayoutRoot = styled("div")(({ theme, user }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 80,
  minHeight: "100vh",
  background: "#F9FAFC",
  [theme.breakpoints.up("md")]: {
    paddingLeft: user ? 256 : 0,
  },
}));
