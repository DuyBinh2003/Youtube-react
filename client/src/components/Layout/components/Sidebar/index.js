import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import Button from '~/components/components/Button';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Sidebar({ classname, datas }) {
  const {defaultSidebar, subSidebar} = datas
  const location = useLocation();
  const isActiveItem = location.pathname
  return (
    <>
      {classname === 'defaultSidebar' ? (
          <div className={cx({ [classname]: true, scroll: true, sidebarScroll: true })}>
            {defaultSidebar &&
              defaultSidebar.map((data, index) => {
                return <SidebarItem key={index} datas={data} />;
              })}
          </div>
      ) : (
        <div className={cx(classname)}>
          {subSidebar &&
            subSidebar.map((data) => {
              return (
                <Link className={cx('link')} to={data.link}>
                  {isActiveItem === data.link ? (
                    <Button key={datas.link} square={true} text={data.title} path={data.icon_active} onClick={() => {}}/>
                  ): (
                    <Button key={datas.link} square={true} text={data.title} path={data.icon} onClick={() => {}}/>
                  )}
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
}

export default Sidebar;
