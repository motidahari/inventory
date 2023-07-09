import { Box, Container } from '@mui/material';

const PageContainer = ({ children }) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
    }}
  >
    <Container maxWidth={false}>{children}</Container>
  </Box>
);

export default PageContainer;
