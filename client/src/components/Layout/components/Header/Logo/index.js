import Button from '~/components/components/Button';

import classNames from 'classnames/bind';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Logo({ toggleSidebarOnClick }) {
  return (
    <div className={cx('Logo')}>
      <Button onClick={toggleSidebarOnClick} path="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" />
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/YouTube_dark_logo_2017.svg/1280px-YouTube_dark_logo_2017.svg.png" />
        <span>VN</span>
      </Link>
    </div>
  );
}

export default Logo;
