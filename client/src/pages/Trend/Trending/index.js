import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "~/components/components/Navbar";
import ListVideo from "~/components/components/ListVideo";

import classNames from "classnames/bind";
import styles from "./Trending.module.scss";

const cx = classNames.bind(styles)

function Trending() {
    const [activeNav, setActiveNav] = useState('new')
    const [datas, setDatas] = useState([])
    const navbarDatas = [
        {
          title: "Mới nhất",
          type: "new"
        },
        {
          title: "Âm nhạc",
          type: "music"
        },
        {
          title: "Trò chơi",
          type: "gaming"
        },
        
        {
          title: "Phim ảnh",
          type: "film"
        }
      ]
    const className = [
      'flex-content',
      'big-size'
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
            setDatas(json);
          };
          FetchingVideos(`http://localhost:5000/video/${activeNav}`);
    }, [activeNav])
    return (
        <div className={cx('trending-page','scroll', 'scroll-nopadding')}>
            <div className={cx('wrapper', )}>
                <div className={cx('header')}>
                  <header>
                    <img alt="" src="https://www.youtube.com/img/trending/avatar/trending.png" />
                    <h3>Thịnh hành</h3>
                  </header>
                  <nav>
                      <Navbar 
                        datas={navbarDatas} 
                        activeNav={activeNav} 
                        handleOnClick={setActiveNav} 
                        className='border-bottom'
                        />
                  </nav>
                </div>
                <div className={cx('container')}>
                    <ListVideo 
                      datas={datas} 
                      setDatas={setDatas} 
                      className={className}
                    />
                </div>
            </div>
        </div>
    )
}

export default Trending;