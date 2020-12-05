import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { SnackBar, DragonList, Header, SearchBar } from 'components';
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
  const [filteredDragons, setFilteredDragons] = useState<IDragons>([]);
  const [querySearch, setQuerySearch] = useState('');
  const [snack, setSnack] = useState({ open: false, type: '', message: '' });

  const order=(response:any)=>{
    console.log("order")
   return response.sort((a:any, b:any) => {
       return (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase())
    }) 
  }

  const getAllDragons = useCallback(async () => {
    try {
      const responseDragons = await getDragons();
      if (responseDragons.data) { 
       const dragonOrder:IDragons = order(responseDragons.data);
        dispatch(setAllDragons(dragonOrder));
        setFilteredDragons(dragonOrder);
       
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
        <DragonList
          dragons={filteredDragons}
          userId={userId}      
        />       
      </div>    
      <div className="create-button">
          <Link to="/create" className="create-button" >Add a book</Link>
        </div>

      {/* <Tooltip title='Adicionar livro' placement='bottom'>
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
      </Tooltip> */}
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
