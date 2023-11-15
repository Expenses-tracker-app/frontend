import { styled } from '@mui/material';
import purpleWaveImage from '../../assets/wave.png'; // Replace with the actual path to your wave image

export const LayoutContainer = styled('div')(() => ({
  height: `calc(100%)`,
  backgroundColor: 'black',
  overflow: 'auto'
}));

export const ImageWave = styled('div')(() => ({
  position: 'absolute',
  background: `url(${purpleWaveImage})`, // Use the wave image as the background
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}));

export const LowerLeftWave = styled(ImageWave)(({ size }) => ({
  bottom: 0,
  left: 0,
  width: size || '100px',
  height: size || '100px'
}));

export const UpperRightWave = styled(ImageWave)(({ size }) => ({
  top: 0,
  right: 0,
  width: size || '100px',
  height: size || '100px',
  transform: 'rotate(180deg)'
}));
