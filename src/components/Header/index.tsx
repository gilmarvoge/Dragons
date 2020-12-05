import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { logoff } from 'services/auth';
import logo from '../../assets/logo.svg';
import './styles.css';

interface HeaderProps {
  right?: Boolean,
  left?: Boolean,
  search?: React.ReactNode;
}

function Header(props: HeaderProps) {
  const { search, right, left } = props;
  let { push } = useHistory();

  const signOut = () => {
    logoff();
    push('/login');
  }

  return (
    <div id='page-header'>
      <header data-testid='header'>
        <div className='header-logo'>
          <div className='header-actions-start'>
            {left &&
              <span >
                <FiArrowLeft className='icons' onClick={() => push('/')} />
              </span>
            }
          </div>
          <div className='header-logo-title'>
            <img src={logo} alt='Dragons' />
            <span className='span'>
              Dragons
            </span>
          </div>
        </div>
        <div className='header-search'>
          {search}
        </div>
        <div className='header-actions-end'>
          {right &&
            <span >
              <FiLogOut className='icons' onClick={signOut} />
            </span>
          }
        </div>
      </header>
    </div>
  )
}

export default Header;



