import React, { useState, useEffect, useContext } from 'react';
import DateContext from '../layout/DateContext';
import { styled, Select, MenuItem, Button, Container, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getAllTag } from '../../services/apiService';
import { convertResponseToArray } from '../../utilities/helper';

const Wrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '490px',
  margin: '-5px auto -5px auto'
}));

const MLabel = styled(InputLabel)(() => ({
  margin: 'auto 10px auto 0px'
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  background: `${theme.palette.grey[600]} !important`,
  color: `${theme.palette.primary.blue} !important`,
  width: '225px',
  borderRadius: '35px',
  margin: '10px auto 10px 0px',
  '& .MuiSelect-select': {
    background: `${theme.palette.grey[600]} !important`
  },
  '& .MuiSelect-icon': {
    color: `${theme.palette.primary.blue} !important`
  }
}));

const StyledMenu = styled(MenuItem)(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  color: theme.palette.primary.blue
}));

const MButton = styled(Button)(({ theme }) => ({
  borderRadius: '35px',
  background: theme.palette.primary.blue,
  border: `1px solid ${theme.palette.primary.blue}`,
  width: '25%',
  fontSize: '15px'
}));

const ActionButtons = () => {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = useContext(DateContext);
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const { t } = useTranslation();

  const handleDateChange = () => {
    const today = new Date();
    setSelectedDate(today);
    console.log(selectedDate);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTag();
        if (response.status === 404) {
          console.log('No categories found');
          return;
        }
        const data = convertResponseToArray(response) || [];
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <MLabel>{t('menu.categories')}</MLabel>
      <StyledSelect value={selectedCategory} onChange={handleCategoryChange}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <StyledMenu key={category.tag_id} value={category.tag_id}>
              {category.tag_name}
            </StyledMenu>
          ))
        ) : (
          <StyledMenu disabled>{t('categories.noCategories')}</StyledMenu>
        )}
      </StyledSelect>
      <MButton onClick={handleDateChange}>{t('common.today')}</MButton>
    </Wrapper>
  );
};

export default ActionButtons;
