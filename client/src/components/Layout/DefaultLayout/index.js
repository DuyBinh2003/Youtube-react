import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

const SidebarContext = createContext()
function DefaultLayout({ children }) {
  const [sidebarClass, setSidebarClass] = useState('defaultSidebar');
  const [sidebarData, setSidebarData] = useState();
  const link = 'http://localhost:5000/api/sidebar';
  useEffect(() => {
    const startFetching = async (link) => {
      const json = await axios.get(link)
      .then ((response) => {
        return response.data
      }).catch ((err) => {
        console.log(err)
      })
      setSidebarData(json);
    };
    startFetching(link);
  }, []);

  const handleToggleSidebar = () => {
    if (sidebarClass === 'defaultSidebar') setSidebarClass('subSidebar');
    else setSidebarClass('defaultSidebar');
  };
  return (
    <SidebarContext.Provider value={{setSidebarData}}>
      <div>
        <Header toggleSidebarOnClick={handleToggleSidebar} />
        <div className={cx('container')}>
          {sidebarData && <Sidebar classname={cx({ [sidebarClass]: true })} datas={sidebarData}/>}
          <div className={cx('content')}>{children}</div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export {DefaultLayout, SidebarContext} ;
