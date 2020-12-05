import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Card } from 'components';
import { setDeletedDragon } from 'redux/actions';
import { deleteDragon } from 'services';
import { IDragon, IDragons } from 'models';
import './styles.css';

interface BookListProps {
  dragons: IDragons;
  userId: string;
}

function DragonList(props: BookListProps) {
  const { dragons } = props;
  const { push } = useHistory();
  const dispatch = useDispatch();

  const handleDeleteDragon = async (id: string) => {
    try {
      const response = await deleteDragon(id);
      if (response.data) {
        dispatch(setDeletedDragon(id));
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className='grid-container'>
      {dragons && dragons.map((dragon: IDragon) => {
        return (
          <div className='grid-item' key={dragon.id}>
            <Card
              name={dragon.name}
              type={dragon.type}
              onEdit={() => push(`/edit/${dragon.id}`)}
              onDetails={() => push(`/details/${dragon.id}`)}
              onDelete={() => handleDeleteDragon(String(dragon.id))}
            >
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default connect()(DragonList);
