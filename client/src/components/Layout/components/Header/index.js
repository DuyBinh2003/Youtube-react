import Logo from './Logo';
import Search from './Search';
import Account from './Account';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ toggleSidebarOnClick }) {
  return (
    <div className={cx('Header')}>
      <Logo toggleSidebarOnClick={toggleSidebarOnClick} />
      <Search />
      <Account />
    </div>
  );
}
export default Header;
