//This is an example for the api calls we won't need it later on

import React, { useState, useEffect } from 'react';
import { getAllTag } from '../../services/apiService';
import { Button, styled, Typography, Container, Card, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditCategoryModal from '../modals/EditCategoryModal';
import AddNewCategoryModal from '../modals/AddNewCategoryModal';
import { convertResponseToArray } from '../../utilities/helper';

const Wrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '50px',
  width: '80%'
}));

const ContentContainer = styled(Box)(() => ({
  marginTop: '30px',
  maxWidth: '800px',
  width: '100%',
  textAlign: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column'
}));

const MBox = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap'
}));

const MCard = styled(Card)(({ theme }) => ({
  background: theme.palette.grey[600],
  width: '300px',
  borderRadius: '35px',
  margin: '20px',
  justifyContent: 'center',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const AddNewCard = styled(Card)(({ theme }) => ({
  background: theme.palette.grey[600],
  borderRadius: '35px',
  margin: '5px',
  width: '340px'
}));

const MButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.blue,
  borderRadius: 35,
  width: '80px',
  fontSize: '14px',
  color: theme.palette.primary.main,
  padding: '7px 0px 7px 0px',
  margin: '5px',
  '&:hover, &:focus': {
    background: theme.palette.primary.blue
  }
}));

const SButton = styled(Button)(() => ({
  borderRadius: 35,
  width: '100%',
  height: '90px'
}));

export const CategoriesPage = () => {
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [updateCategories, setUpdateCategories] = useState(false);
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const response = await getAllTag();
      if (response) {
        const tagsArray = convertResponseToArray(response);
        setTags(tagsArray);
      } else {
        console.log('No data received from the server.');
      }
    } catch (err) {
      console.error('Error fetching tags:', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateCategories]);

  const handleOpenEditModal = (tag) => {
    setCategory(tag);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenAddModal(false);
    setUpdateCategories((prev) => !prev);
  };

  return (
    <Wrapper>
      <ContentContainer>
        <Typography variant="h1">{t('categories.title')}</Typography>

        <MCard>
          <MBox>
            {tags &&
              tags.map((tag) => (
                <div key={tag.tag_id}>
                  <MButton onClick={() => handleOpenEditModal(tag)}>{tag.tag_name}</MButton>
                </div>
              ))}
          </MBox>
        </MCard>
        {category !== null && (
          <EditCategoryModal open={openEditModal} onClose={handleCloseModal} tag={category} />
        )}
        <AddNewCard>
          <SButton variant="text" onClick={() => setOpenAddModal(true)}>
            <Typography variant="h2">{t('transactions.addNew')}</Typography>
          </SButton>
        </AddNewCard>

        <AddNewCategoryModal open={openAddModal} onClose={handleCloseModal} />
      </ContentContainer>
    </Wrapper>
  );
};
