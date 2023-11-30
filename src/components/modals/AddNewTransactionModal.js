import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, Alert as MuiAlert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createIncome, createExpense, getAllTag } from '../../services/apiService';

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
import { convertResponseToArray } from '../../utilities/helper';

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

const StyledSelect = styled(Select)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.blue,
  width: '100%',
  margin: '10px auto 10px auto',
  '& .MuiSelect-select': {
    padding: '10px',
    background: theme.palette.primary.main
  },
  '& .MuiSelect-icon': {
    color: theme.palette.primary.blue
  },
  '&:focus': {
    background: theme.palette.primary.main
  }
}));

const StyledMenu = styled(MenuItem)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.blue
}));

const MContent = styled(DialogContent)(() => ({
  marginTop: '20px',
  textAlign: 'left'
}));

const MDialogActions = styled(DialogActions)(() => ({
  justifyContent: 'center'
}));

const InputLine = styled(Input)(({ theme }) => ({
  padding: '10px 14px 10px 14px',
  background: theme.palette.primary.main,
  color: theme.palette.primary.blue,
  borderRadius: '5px',
  margin: '10px 0 10px 0'
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

const MBox = styled('div')(() => ({
  display: 'flex',
  marginBottom: '10px'
}));

const Text = styled('div')(() => ({
  marginLeft: '5px'
}));

const MButton = styled(Button)(({ theme, isActive }) => ({
  background: isActive ? theme.palette.primary.blue : theme.palette.primary.main,
  color: isActive ? theme.palette.primary.main : theme.palette.primary.blue,
  fontSize: '15px',
  borderRadius: 25,
  width: '49%',
  padding: '20px',
  margin: 'auto',
  border: '1px solid white',
  '&:hover, &:active': {
    background: theme.palette.primary.blue,
    color: theme.palette.primary.main
  }
}));

const AddNewExpenseModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    amount: '',
    date: '',
    desc: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTag();
        if (response.status === 404) {
          console.log('No categories found.');
          setCategories([]);
          return;
        } else if (response) {
          const tagsArray = convertResponseToArray(response);
          setCategories(tagsArray);
        } else {
          setCategories(response.data || []);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.type && formData.category && formData.amount && formData.date && formData.desc) {
      const transactionData = {
        date: formData.date,
        amount: formData.amount,
        desc: formData.desc,
        tagId: formData.category
      };

      try {
        console.log(transactionData);
        const response =
          formData.type === 'income'
            ? await createIncome(transactionData)
            : await createExpense(transactionData);

        console.log(response);
        onClose();
      } catch (err) {
        setError(err.message || t(`errors.${formData.type}Error`));
      }
    } else {
      setError(t('errors.formIncomplete'));
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleCategoryChange = (event) => {
    setFormData({
      ...formData,
      category: event.target.value
    });
  };

  const handleButtonClick = (type) => {
    setFormData({
      ...formData,
      type
    });
    setActiveButton(type);
  };

  return (
    <MDialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle variant="title">{t('newTransaction.title')}</DialogTitle>
        <MContent>
          <FormGroup>
            <MBox>
              <MButton
                onClick={() => handleButtonClick('income')}
                isActive={activeButton === 'income'}>
                <AddCircleOutlineIcon />
                <Text>{t('newTransaction.income')}</Text>
              </MButton>
              <MButton
                onClick={() => handleButtonClick('expense')}
                isActive={activeButton === 'expense'}>
                <RemoveCircleOutlineIcon />
                <Text>{t('newTransaction.expense')}</Text>
              </MButton>
            </MBox>
            <FormLabel>
              <Typography variant="h6">{t('newTransaction.category')}</Typography>
            </FormLabel>
            <StyledSelect
              value={formData.category}
              onChange={handleCategoryChange}
              style={{ width: '100%' }}>
              {categories.map((category) => (
                <StyledMenu key={category.tag_id} value={category.tag_id}>
                  {category.tag_name}
                </StyledMenu>
              ))}
            </StyledSelect>

            <FormLabel>
              <Typography variant="h6">{t('newTransaction.amount')}</Typography>
            </FormLabel>
            <InputLine
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />

            <FormLabel>
              <Typography variant="h6">{t('newTransaction.date')}</Typography>
            </FormLabel>
            <InputLine type="date" name="date" value={formData.date} onChange={handleChange} />

            <FormLabel>
              <Typography variant="h6">{t('newTransaction.description')}</Typography>
            </FormLabel>
            <InputLine type="text" name="desc" value={formData.desc} onChange={handleChange} />
          </FormGroup>
        </MContent>
        <MDialogActions>
          <StyledButton type="submit">
            <Typography variant="h6">{t('newTransaction.save')}</Typography>
          </StyledButton>
          <StyledButton onClick={onClose}>
            <Typography variant="h6">{t('common.cancel')}</Typography>
          </StyledButton>
        </MDialogActions>
      </form>

      {error && (
        <MuiAlert severity="error" sx={{ marginTop: 2 }} variant="filled">
          {error}
        </MuiAlert>
      )}
    </MDialog>
  );
};

AddNewExpenseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddNewExpenseModal;
