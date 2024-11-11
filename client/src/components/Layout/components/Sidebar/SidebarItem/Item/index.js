import { useLocation } from 'react-router-dom';

import Icon from '~/components/components/Icon';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Item({ data }) {
  const location = useLocation();
  const isActiveItem = location.pathname
  return (
    <Link to={data.link} className={cx('Link')}>
      <div className={cx({ Item: true, active: isActiveItem === data.link })}>
        {data.icon ? (
          <Icon path={isActiveItem === data.link ? data.icon_active :data.icon} />
        ) : (
          <div className={cx('img')}>
            <img src={data.avatar} alt={`avatar của ${data.title}`} />
          </div>
        )}
        <span>{data.title}</span>
      </div>
    </Link>
  );
}

export default Item;
