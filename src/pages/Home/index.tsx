import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Fab, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { SnackBar, DragonList, Header, SearchBar , Card} from 'components';
import { getDragons, getUserIdStorage } from 'services';
import { setAllDragons } from 'redux/actions';
import { IDragons, IDragon } from 'models';
import './styles.css';

interface HomeProps {
  dragons: IDragons;
}

function Home(props: HomeProps) {
  const { dragons } = props;
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [filteredBooks, setFilteredDragons] = useState<IDragons>([]);
  const [querySearch, setQuerySearch] = useState('');
  const [snack, setSnack] = useState({ open: false, type: '', message: '' });

  const getAllDragons = useCallback(async () => {
    try {
      const responseDragons = await getDragons();
      if (responseDragons.data) {
        console.log("responseDragons.data",responseDragons.data)
        dispatch(setAllDragons(responseDragons.data));
        setFilteredDragons(responseDragons.data);
       
        const user_id = await getUserIdStorage();
        setUserId(String(user_id));
      }
    } catch (error) {
      setSnack({ open: true, type: 'error', message: error });
    }
  }, [dispatch]);

  useEffect(() => {
    const results = dragons.filter((dragon: IDragon) =>
      dragon.name.toLowerCase().includes(querySearch.toLowerCase()) ||
      dragon.type.toLowerCase().includes(querySearch.toLowerCase())
    );
    setFilteredDragons(results);
  }, [querySearch, dragons]);

  useEffect(() => {
    getAllDragons();
  }, [getAllDragons]);

  const handleSearch = useCallback((e) => {
    setQuerySearch(e.target.value);
  }, []);

  return (
    <div id='page-home' data-testid='home'>
      <Header right
        search={
          <SearchBar onChange={handleSearch} />
        }
      />
      <div className='content'>
        {/* <DragonList
          dragons={filteredBooks}
          userId={userId}      
        /> */}
        <Card/>
      </div>
      <Tooltip title='Adicionar livro' placement='bottom'>
        <Fab
          color='primary'
          aria-label='add'
          classes={{
            root: 'fab',
          }}
          onClick={() => push('/create')}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      {
        snack.open &&
        < SnackBar
          open={snack.open}
          type={snack.type}
          message={snack.message}
          onClose={setSnack}
        />
      }
    </div >
  )
}

const mapStateToProps = ({ dragons}: { dragons: IDragons }) => ({
  dragons,
});

export default connect(mapStateToProps)(Home);
