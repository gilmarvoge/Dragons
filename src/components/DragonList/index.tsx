import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Grid, Tooltip, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core';
import { Visibility as VisibilityIcon, Delete as DeleteIcon, MenuBook as MenuBookIcon, Edit as EditIcon } from '@material-ui/icons';
import { SnackBar, DragonDetails } from 'components';
import { setDeletedDragon } from 'redux/actions';
import { deleteDragon } from 'services';
import { IDragon, IDragons } from 'models';
import './styles.css';

interface BookListProps {
  dragons: IDragons;
  userId: string;
}

function DragonList(props: BookListProps) {
  const { dragons, userId } = props;
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [snack, setSnack] = useState({ open: false, type: '', message: '' });
  const [showDetails, setShowDetails] = useState({ open: false, dragon: {} });

  const handleDeleteDragon = async (id: string) => {

    try {
      const response = await deleteDragon(id);
      if (response.data) {
        dispatch(setDeletedDragon(id));
        setSnack({ open: true, type: 'success', message: 'Livro excluído com sucesso' });
      }
    } catch (error) {
      setSnack({ open: true, type: 'error', message: error });
    }

  }

  const handleEditDragon = (id: string) => {

    push(`/edit/${id}`);

  }

  return (
    <Grid container spacing={2} justify='center' >
      {showDetails && <DragonDetails open={showDetails.open} dragon={showDetails.dragon} onClose={setShowDetails} />}
      {dragons && dragons.map((dragon: IDragon) => {
        return (
          <Grid item key={dragon.id}>
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
                      <IconButton aria-label='delete' onClick={() => handleDeleteDragon(String(dragon.id))}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Editar livro' placement='bottom'>
                      <IconButton aria-label='edit' onClick={() => handleEditDragon(String(dragon.id))}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
                title={dragon.name}
                subheader={dragon.type}
              />
              <CardContent
                classes={{
                  root: 'card-content-root',
                }}
              >
               
              </CardContent>
              <CardActions
                classes={{
                  root: 'card-actions',
                }}
                disableSpacing
              >
                <Tooltip title='Mais Informações' placement='bottom'>
                  <IconButton onClick={() => setShowDetails({ open: true, dragon })}>
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

export default connect()(DragonList);
