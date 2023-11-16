import React from 'react';
import { styled, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MButton = styled(Button)(() => ({
  height: '120px',
  width: '100%'
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const AddNewButton = ({ path, text }) => {
  return (
    <MButton variant="text">
      <StyledLink to={path}>
        <Typography variant="h2">{text}</Typography>
      </StyledLink>
    </MButton>
  );
};

AddNewButton.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default AddNewButton;
