import Item from './Item';

import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
const cx = classNames.bind(styles);

function SidebarItem({ datas }) {
  const { title, sidebar_item } = datas;
  return (
    <div className={cx('Sidebar-item')}>
      {title && <h3 className={cx('title')}>{title}</h3>}
      {sidebar_item.map((data) => {
        return <Item key={data.link} data={data} />;
      })}
    </div>
  );
}

export default SidebarItem;
