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
    name: '',
    category: '',
    amount: '',
    date: '',
    desc: ''
  });

  const handleSubmit = () => {
    event.preventDefault();

    if (
      formData.type &&
      formData.name &&
      formData.category &&
      formData.amount &&
      formData.date &&
      formData.desc
    ) {
      const transactionData = {
        name: formData.name,
        date: formData.date,
        amount: formData.amount,
        desc: formData.desc,
        tagId: formData.category
      };

      if (formData.type === 'income') {
        createIncome(transactionData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(err.message || t('errors.incomeError'));
          });
      } else {
        createExpense(transactionData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(err.message || t('errors.expenseError'));
          });
      }
    }

    onClose();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAllTag();
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <MDialog open={open} onClose={onClose}>
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
            <Typography variant="h6">{t('newTransaction.amount')} </Typography>
          </FormLabel>
          <InputLine type="number" onClick={handleChange} />
          <FormLabel>
            <Typography variant="h6">{t('newTransaction.date')} </Typography>
          </FormLabel>
          <InputLine type="date" onClick={handleChange} />
          <FormLabel>
            <Typography variant="h6">{t('newTransaction.name')} </Typography>
          </FormLabel>
          <InputLine type="text" onClick={handleChange} />
          <FormLabel>
            <Typography variant="h6">{t('newTransaction.description')} </Typography>
          </FormLabel>
          <InputLine type="text" onClick={handleChange} />
        </FormGroup>
      </MContent>
      <MDialogActions>
        <StyledButton onClick={handleSubmit}>
          <Typography variant="h6">{t('newTransaction.save')}</Typography>
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

AddNewExpenseModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddNewExpenseModal;
