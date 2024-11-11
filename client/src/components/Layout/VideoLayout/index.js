import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import classNames from 'classnames/bind';
import styles from './VideoLayout.module.scss';

const cx = classNames.bind(styles);

const SidebarContext = createContext()
function VideoLayout({children}) {
  const [isActive, setIsActive] = useState(false);
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

  const handleOnClick = () => { 
    setIsActive(!isActive);
  };
  return (
    <SidebarContext.Provider value={{setSidebarData}}>
      <div onClick={() => setIsActive(false)} className={cx({ modal: true, active: isActive })}></div>
      <div className={cx({ modalSidebar: true, active: isActive })}>
        {sidebarData && <Sidebar classname="defaultSidebar" datas={sidebarData}/>}
      </div>
      <div>
        <Header toggleSidebarOnClick={handleOnClick} />
        <div className={cx( 'container')}>{children}</div>
      </div>
    </SidebarContext.Provider>
  );
}

export  { VideoLayout, SidebarContext } ;
