import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { convertResponseToArray } from '../../utilities/helper';
import {
  updateIncome,
  updateExpense,
  getAllTag,
  deleteExpense,
  deleteIncome
} from '../../services/apiService';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Select,
  MenuItem,
  Alert as MuiAlert,
  styled,
  FormLabel,
  Input,
  FormGroup
} from '@mui/material';

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

const MActions = styled(DialogActions)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const InputLine = styled(Input)(({ theme, editMode }) => ({
  padding: '10px 14px 10px 14px',
  background: editMode ? theme.palette.primary.blue : theme.palette.primary.main,
  color: editMode ? theme.palette.primary.main : theme.palette.primary.blue,
  borderRadius: '5px',
  margin: '10px 0 10px 0',
  ...(editMode && {
    fontSize: '25px',
    fontWeight: 200,
    cursor: 'default'
  })
}));

const MBox = styled('div')(() => ({
  display: 'flex',
  marginBottom: '10px'
}));

const Text = styled('div')(() => ({
  marginLeft: '5px'
}));

const MButton = styled(Button)(({ theme }) => ({
  borderRadius: '35px',
  border: `1px solid ${theme.palette.grey[300]}`,
  width: '30%',
  fontSize: '12px',
  '&:hover': {
    background: 'none'
  }
}));

const EditTransactionModal = ({ transaction, open, onClose }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isExpense, setIsExpense] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    amount: '',
    date: '',
    desc: ''
  });

  const getTransactionType = (transaction) => {
    if (transaction.expense_amount !== undefined) {
      setIsExpense(true);
    } else {
      setIsExpense(false);
    }
  };

  useEffect(() => {
    if (transaction !== undefined) {
      const updateFormData = (transaction) => {
        getTransactionType(transaction);

        const updatedFormData = {
          type: isExpense ? 'expense' : 'income',
          category: isExpense ? transaction.tag_id : transaction.income_id,
          amount: isExpense ? transaction.expense_amount : transaction.income_amount,
          date: isExpense ? transaction.expense_date : transaction.income_date,
          desc: isExpense ? transaction.expense_description : transaction.income_description
        };

        setFormData(updatedFormData);
      };
      updateFormData();
    }
  }, [transaction, isExpense]);

  const handleSave = () => {
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
        updateIncome(transactionData)
          .then((res) => {
            console.log(res);
            onClose();
          })
          .catch((err) => {
            setError(err.message || t('errors.incomesError'));
          });
      } else {
        updateExpense(transactionData)
          .then((res) => {
            console.log(res);
            onClose();
          })
          .catch((err) => {
            setError(err.message || t('errors.expensesError'));
          });
      }
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

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleButtonClick = (type) => {
    setFormData({
      ...formData,
      type
    });
  };

  const handleDelete = () => {
    if (transaction.transaction_id) {
      if (formData.type === 'income') {
        deleteIncome(transaction)
          .then((res) => {
            console.log(res);
            onClose();
          })
          .catch((err) => {
            setError(err.message || t('errors.incomeDelete'));
          });
      } else {
        deleteExpense(transaction)
          .then((res) => {
            console.log(res);
            onClose();
          })
          .catch((err) => {
            setError(err.message || t('errors.expenseDelete'));
          });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTag();
        if (response) {
          const categoriesArray = convertResponseToArray(response);
          setCategories(categoriesArray);
        } else {
          console.log('No data received from the server.');
        }
      } catch (err) {
        console.error('Error fetching tags:', err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <MDialog open={open} onClose={onClose}>
      <DialogTitle variant="title">{t('newTransaction.editTransactionTitle')}</DialogTitle>
      <MContent>
        <FormGroup>
          <MBox>
            <MButton
              onClick={() => handleButtonClick('income')}
              isActive={transaction.type === 'income'}>
              <AddCircleOutlineIcon />
              <Text>{t('newTransaction.income')}</Text>
            </MButton>
            <MButton
              onClick={() => handleButtonClick('expense')}
              isActive={transaction.type === 'expense'}>
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
            {categories &&
              categories.map((category) => (
                <StyledMenu key={category.tag_id} value={category.tag_id}>
                  {category.tag_name}
                </StyledMenu>
              ))}
          </StyledSelect>

          <FormLabel>
            <Typography variant="h6">{t('newTransaction.amount')} </Typography>
          </FormLabel>
          <InputLine
            type="number"
            value={editMode ? formData.amount : transaction.amount}
            onChange={handleChange}
            editMode={editMode}
          />
          <FormLabel>
            <Typography variant="h6">{t('newTransaction.date')} </Typography>
          </FormLabel>
          <InputLine
            type="date"
            value={editMode ? formData.date : transaction.date}
            onChange={handleChange}
            editMode={editMode}
          />
          <FormLabel>
            <Typography variant="h6">{t('newTransaction.description')} </Typography>
          </FormLabel>
          <InputLine
            type="text"
            value={editMode ? formData.description : transaction.description}
            onChange={handleChange}
            editMode={editMode}
          />
        </FormGroup>
      </MContent>
      <MActions>
        <MButton onClick={editMode ? handleSave : handleToggleEditMode}>
          {editMode ? t('common.save') : t('common.edit')}
        </MButton>
        <MButton onClick={handleDelete}>{t('common.delete')}</MButton>
        <MButton onClick={onClose}>{t('common.cancel')}</MButton>
      </MActions>

      {error && (
        <MuiAlert severity="error" sx={{ marginTop: 2 }} variant="filled">
          {error}
        </MuiAlert>
      )}
    </MDialog>
  );
};

EditTransactionModal.propTypes = {
  transaction: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditTransactionModal;
