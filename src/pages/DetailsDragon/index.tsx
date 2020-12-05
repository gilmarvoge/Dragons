import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { Header, Card } from 'components';
import { IDragons, IDragon } from 'models';
import './styles.css';

interface ParamTypes {
  dragonId: string
}

interface DetailsDragonProps {
  dragons: IDragons;
}

function DetailsDragon(props: DetailsDragonProps) {
  const { dragonId } = useParams<ParamTypes>();
  const { dragons } = props;
  const [dragonToEdit, setdragonToEdit] = useState<IDragon>();

  useEffect(() => {
    if (dragonId !== '') {
      const dragon = dragons.filter((dragon: IDragon) => dragon.id === dragonId);
      setdragonToEdit(dragon[0]);
    }
  }, [dragonId, dragons]);

  return (
    <div  >
      <Header left right />
      <div className='container-details' >
        <Card
          name={dragonToEdit?.name}
          type={dragonToEdit?.type}
          date={dateFormat(dragonToEdit?.createdAt, "dd/mm/yyyy")}
        >
        </Card>
      </div>
    </div>
  )
}

const mapStateToProps = ({ dragons }: { dragons: IDragons }) => ({
  dragons: dragons
});

export default connect(mapStateToProps)(DetailsDragon);
