import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  styled,
  Input,
  Alert as MuiAlert
} from '@mui/material';
import { updateTag, deleteTag } from '../../services/apiService';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '35px',
    background: theme.palette.primary.blue,
    color: 'white',
    padding: '20px',
    width: '280px'
  }
}));

const Title = styled(DialogTitle)(() => ({
  margin: 'auto',
  fontSize: '25px',
  fontWeight: 200,
  cursor: 'default'
}));

const MTextField = styled(Input)(({ theme }) => ({
  background: theme.palette.primary.blue,
  fontSize: '25px',
  fontWeight: 200,
  cursor: 'default'
}));

const MActions = styled(DialogActions)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
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

const EditCategoryModal = ({ tag, open, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(tag.tag_name);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (tag) {
      setEditedName(tag.tag_name);
    }
  }, [tag]);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    if (tag) {
      const tagData = {
        tagName: editedName
      };
      updateTag(tagData)
        .then((res) => {
          console.log(res);
          setEditMode(false);
          onClose();
        })
        .catch((err) => {
          setError(err.message || t('errors.categoryError'));
        });
    }
  };

  const handleDelete = () => {
    if (tag.tag_id) {
      deleteTag(tag)
        .then((res) => {
          console.log(res);
          onClose();
        })
        .catch((err) => {
          setError(err.message || t('errors.categoryDelete'));
        });
    }
  };

  if (!tag) {
    return null;
  }

  return (
    <CustomDialog open={open} onClose={onClose}>
      {editMode ? (
        <Title>
          <MTextField
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Title>
      ) : (
        <Title>{tag.tag_name}</Title>
      )}

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
    </CustomDialog>
  );
};

EditCategoryModal.propTypes = {
  tag: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditCategoryModal;
