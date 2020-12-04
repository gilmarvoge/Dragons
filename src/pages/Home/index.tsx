import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { Fab, Tooltip } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { SnackBar, BookList, Header, SearchBar , Card} from 'components';
import { getBooks, getUserIdStorage, getRents } from 'services';
import { setAllBooks } from 'redux/actions';
import { IBooks, IBook, IRents } from 'models';
import './styles.css';

interface HomeProps {
  books: IBooks;
}

function Home(props: HomeProps) {
  const { books } = props;
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<IBooks>([]);
  const [querySearch, setQuerySearch] = useState('');
  const [snack, setSnack] = useState({ open: false, type: '', message: '' });

  const getAllBooks = useCallback(async () => {
    try {
      const responseBooks = await getBooks();
      if (responseBooks.data) {
        dispatch(setAllBooks(responseBooks.data));
        setFilteredBooks(responseBooks.data);
       
        const user_id = await getUserIdStorage();
        setUserId(String(user_id));
      }
    } catch (error) {
      setSnack({ open: true, type: 'error', message: error });
    }
  }, [dispatch]);

  useEffect(() => {
    const results = books.filter((book: IBook) =>
      book.title.toLowerCase().includes(querySearch.toLowerCase()) ||
      book.author.toLowerCase().includes(querySearch.toLowerCase())
    );
    setFilteredBooks(results);
  }, [querySearch, books]);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

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
        {/* <BookList
          books={filteredBooks}
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

const mapStateToProps = ({ books}: { books: IBooks }) => ({
  books,
});

export default connect(mapStateToProps)(Home);
