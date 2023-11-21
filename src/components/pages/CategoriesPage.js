//This is an example for the api calls we won't need it later on

import React, { useState, useEffect } from 'react';
import { getAllTag } from '../../services/apiService';
import { Button, styled, Typography, Container, Card, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditCategoryModal from '../modals/EditCategoryModal';

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
  const [error, setError] = useState('');
  const [category, setCategory] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (error) {
      setError('');
      setTags([
        { tag_id: 1, tag_name: 'School' },
        { tag_id: 2, tag_name: 'Food' },
        { tag_id: 3, tag_name: 'Sport' },
        { tag_id: 4, tag_name: 'Cloths' },
        { tag_id: 5, tag_name: 'School' },
        { tag_id: 6, tag_name: 'Food' },
        { tag_id: 7, tag_name: 'Sport' },
        { tag_id: 8, tag_name: 'Cloths' }
      ]);
    }
  }, [error]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTag();
        setTags(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (tag) => {
    setCategory(tag);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Wrapper>
      <ContentContainer>
        <Typography variant="h1">{t('categories.title')}</Typography>

        <MCard>
          <MBox>
            {tags.map((tag) => (
              <div key={tag.tag_id}>
                <MButton onClick={() => handleOpenModal(tag)}>{tag.tag_name}</MButton>
              </div>
            ))}
          </MBox>
        </MCard>
        {category !== null && (
          <EditCategoryModal open={openModal} onClose={handleCloseModal} tag={category} />
        )}
        <AddNewCard>
          <SButton variant="text" onClick={handleOpenModal}>
            <Typography variant="h2">{t('transactions.addNew')}</Typography>
          </SButton>
        </AddNewCard>
      </ContentContainer>
    </Wrapper>
  );
};
