import { styled } from '@mui/material';

export const LayoutContainer = styled('div')(() => ({
  height: `calc(100%)`,
  overflow: 'auto'
}));

export const ImageWave = styled('img')(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 0
}));

export const LowerLeftWave = styled(ImageWave)(({ size }) => ({
  bottom: 0,
  left: 0,
  width: size || '100px',
  height: size || '100px',
  zIndex: -1
}));

export const UpperRightWave = styled(ImageWave)(({ size }) => ({
  top: 0,
  right: 0,
  width: size || '100px',
  height: size || '100px',
  transform: 'rotate(180deg)',
  zIndex: -1
}));
