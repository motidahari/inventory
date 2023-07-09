import { Box, Button, ListItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon, title, onClose, link }) => {
  const location = useLocation();
  const active = location.pathname === '/' + link;

  return (
    <Link style={{ color: 'black', textDecoration: 'none' }} to={`/${link}`}>
      <ListItem
        disableGutters
        sx={{
          display: 'flex',
          mb: 0.5,
          py: 0,
          px: 2,
        }}
      >
        <Button
          onClick={onClose}
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && 'rgba(255,255,255, 0.1)',
            borderRadius: 1,
            color: active ? '#fff' : 'neutral.400',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? '#fff' : 'neutral.400',
            },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255, 0.1)',
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </ListItem>
    </Link>
  );
};

export default NavItem;
