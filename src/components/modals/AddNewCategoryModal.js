import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createTag } from '../../services/apiService';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert as MuiAlert
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

const MDialogActions = styled(DialogActions)(() => ({
  justifyContent: 'center'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '35px',
  border: `1px solid ${theme.palette.grey[300]}`,
  width: '30%',
  fontSize: '12px',
  '&:hover': {
    background: 'none'
  }
}));

const AddNewCategoryModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: ''
  });

  const handleSubmit = () => {
    if (formData.name) {
      const tagData = {
        tagName: formData.name
      };
      createTag(tagData)
        .then((res) => {
          console.log(res);
          onClose();
        })
        .catch((err) => {
          setError(err.message || t('errors.categoryError'));
        });
    }
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
          <InputLine type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormGroup>
      </MContent>
      <MDialogActions>
        <StyledButton onClick={handleSubmit}>
          <Typography variant="h6">{t('newCategory.save')}</Typography>
        </StyledButton>
        <StyledButton onClick={onClose}>
          <Typography variant="h6">{t('common.cancel')}</Typography>
        </StyledButton>
      </MDialogActions>

      {error && (
        <MuiAlert severity="error" sx={{ marginTop: 2 }} variant="filled">
          {error}
        </MuiAlert>
      )}
    </MDialog>
  );
};

AddNewCategoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddNewCategoryModal;
