import { styled } from '@mui/material';
import backgroundImage from '../../assets/background.png';

export const LayoutContainer = styled('div')(() => ({
  height: `calc(100%)`,
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}));
