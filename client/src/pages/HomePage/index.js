import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '~/components/components/Navbar';
import ListVideo from '~/components/components/ListVideo';

import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
const cx = classNames.bind(styles);

function HomePage() {
  const [activeNav, setActiveNav] = useState('all')
  const [videos, setVideos] = useState();
  const navbarDatas = [
    {
      title: "Tất cả",
      type: "all"
    },
    {
      title: "Thể thao",
      type: "sport"
    },
    {
      title: "Gaming",
      type: "gaming"
    },
    {
      title: "Vlog",
      type: "vlog"
    },
    {
      title: "Âm nhạc",
      type: "music"
    },
    {
      title: "Phim",
      type: "film"
    }
  ]
  useEffect(() => {
    const FetchingVideos = async (link) => {
      const json = await axios.get(link) 
      .then ((response) => {
        return response.data
      })
      .catch ((err) => {
        console.log(err)
      })
      setVideos(json);
    };
    FetchingVideos(`http://localhost:5000/video/${activeNav}`);
  }, [activeNav]);
  return (
    <div className={cx('HomePage')}>
      <nav>
        {navbarDatas && 
          <Navbar 
            datas={navbarDatas} 
            activeNav={activeNav} 
            handleOnClick={setActiveNav} 
            className='default'
          />}
      </nav>
      <div className={cx('content', 'scroll')}>
        { videos &&
          <ListVideo className="grid-content" datas={videos} setDatas={setVideos}/>
        }
      </div>
    </div>
  );
}

export default HomePage;