import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled, FormLabel, Input, FormGroup } from '@mui/material';

// Styles
const MDialog = styled(Dialog)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  '& .MuiDialog-paper': {
    borderRadius: '35px',
    background: theme.palette.primary.blue,
    color: 'white',
    padding: '20px',
    width: '350px'
  }
}));

const MContent = styled(DialogContent)(() => ({
  marginTop: '20px',
  textAlign: 'left'
}));

const InputLine = styled(Input)(({ theme }) => ({
  padding: '10px 14px 10px 14px',
  background: theme.palette.primary.main,
  color: theme.palette.primary.blue,
  borderRadius: '5px',
  margin: '10px 0 10px 0'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.blue,
  border: '1px solid white',
  borderRadius: 25,
  width: '50%',
  padding: '7px 0px 7px 0px',
  margin: 'auto',
  '&:hover': {
    background: theme.palette.primary.blue
  }
}));

const AddNewCategoryModal = ({ open, onClose }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: ''
  });

  const handleSubmit = () => {
    event.preventDefault();

    if (formData.name) {
      axios
        .post('http://localhost:5001/tags', {
          name: formData.name
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    onClose();
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <MDialog open={open} onClose={onClose}>
      <DialogTitle variant="title">{t('newCategory.title')}</DialogTitle>
      <MContent>
        <FormGroup>
          <FormLabel>
            <Typography variant="h6">{t('newCategory.name')} </Typography>
          </FormLabel>
          <InputLine type="text" onClick={handleChange} />
        </FormGroup>
      </MContent>
      <DialogActions>
        <StyledButton onClick={handleSubmit}>
          <Typography variant="h6">{t('newCategory.save')}</Typography>
        </StyledButton>
      </DialogActions>
    </MDialog>
  );
};

AddNewCategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddNewCategoryModal;
