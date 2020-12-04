import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Grid, Tooltip, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Visibility as VisibilityIcon, Delete as DeleteIcon, MenuBook as MenuBookIcon, Edit as EditIcon } from '@material-ui/icons';
import { SnackBar, BookDetails } from 'components';
import { setDeletedBook } from 'redux/actions';
import { deleteBook } from 'services';
import { IBook, IBooks } from 'models';
import './styles.css';

interface BookListProps {
  books: IBooks;
  userId: string;
}

function BookList(props: BookListProps) {
  const { books, userId } = props;
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [snack, setSnack] = useState({ open: false, type: '', message: '' });
  const [showDetails, setShowDetails] = useState({ open: false, book: {} });

  const handleDeleteBook = async (id: string) => {

    try {
      const response = await deleteBook(id);
      if (response.data) {
        dispatch(setDeletedBook(id));
        setSnack({ open: true, type: 'success', message: 'Livro excluído com sucesso' });
      }
    } catch (error) {
      setSnack({ open: true, type: 'error', message: error });
    }

  }

  const handleEditBook = (id: string) => {

    push(`/edit/${id}`);

  }

  return (
    <Grid container spacing={2} justify='center' >
      {showDetails && <BookDetails open={showDetails.open} book={showDetails.book} onClose={setShowDetails} />}
      {books && books.map((book: IBook) => {
        return (
          <Grid item key={book.id}>
            <Card
              classes={{
                root: 'card-root',
              }}
            >
              <CardHeader
                classes={{
                  root: 'card-header-root',
                  title: 'card-header-title',
                  subheader: 'card-header-subheader',
                  action: 'card-header-action',
                }}
                action={
                  <>
                    <Tooltip title='Excluir livro' placement='bottom'>
                      <IconButton aria-label='delete' onClick={() => handleDeleteBook(String(book.id))}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Editar livro' placement='bottom'>
                      <IconButton aria-label='edit' onClick={() => handleEditBook(String(book.id))}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
                title={book.title}
                subheader={book.author}
              />
              <CardContent
                classes={{
                  root: 'card-content-root',
                }}
              >
                <img src={book.image_url} className='media' alt='' />
              </CardContent>
              <CardActions
                classes={{
                  root: 'card-actions',
                }}
                disableSpacing
              >
                <Tooltip title='Mais Informações' placement='bottom'>
                  <IconButton onClick={() => setShowDetails({ open: true, book })}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
      {
        snack.open &&
        < SnackBar open={snack.open} type={snack.type} message={snack.message} onClose={setSnack} />
      }
    </Grid>
  )
}

export default connect()(BookList);
