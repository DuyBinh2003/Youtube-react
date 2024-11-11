import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { navContent } from './sortDatas'
import Navbar from '~/components/components/Navbar';
import ListVideo from '~/components/components/ListVideo'
import Button from '~/components/components/Button';
import { SidebarContext } from '~/components/Layout/DefaultLayout';

import styles from './Channel.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function Channel() {
  let {id} = useParams();
  const [dataChannel, setdataChannel] = useState()
  const [videos, setVideos] = useState()
  const [activeNav, setActiveNav] = useState('latest')
  const { setSidebarData } = useContext(SidebarContext)
  useEffect(() => {
    const startFetching = async () => {
      const channelJson = await axios.get(`http://localhost:5000/@${id}`)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.error(error);
      });
      const videoJson = await axios.get(`http://localhost:5000/video/channel/${id}`)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.error(error);
      });
      setdataChannel(channelJson)
      setVideos(videoJson)
    }
    startFetching()
  }, [id])
  const handleOnClick = async (index) => {
    try {
      await axios.put(`http://localhost:5000/@${id}`,{ "isSub": index })
      const json = await axios.get(`http://localhost:5000/api/sidebar`) 
      .then ((response) => {
        return response.data
      })
      .catch ((err) => {
        console.log(err)
      })
      setSidebarData(json)
      setdataChannel((prev) => ({
        ...prev,
        is_sub: index
      }))
    }
    catch (err) {
      alert(err)
    }
  }

  const handleScroll = () => {
    const navbar = document.querySelector('nav');
    const header = document.querySelector('header');
    const content = document.querySelector('#video');
    const distance = header.getBoundingClientRect().top + header.getBoundingClientRect().height;
    if (navbar) {
      if(distance <= 56) {
        navbar.style.setProperty("position", "fixed")
        navbar.style.setProperty("top", "56px")
        content.style.setProperty("padding-top", "112px")
      }else {
        navbar.style.removeProperty("position", "fixed")
        navbar.style.removeProperty("top", "56px")
        content.style.removeProperty("padding-top", "112px")
      }
    }
  };
  return (
    <>{ dataChannel && videos && 
      <div onScroll={handleScroll} className={cx('scroll', 'channel')}>
        <div className={cx('banner')}>
          <img src={dataChannel.bg_img} alt={`banner channel ${dataChannel.title}`}/>
        </div>
        <div className={cx('container')}>
          <header className={cx('header')}>
            <div className={cx('avatar')}>
              <img src={dataChannel.avatar} alt={`avatar channel ${dataChannel.title}`}/>
            </div>
            <div className={cx('header-container')}>
              <div className={cx('info')}>
                <h2>{dataChannel.name}</h2>
                <span>{`@${dataChannel.id}`}</span>
                <span>{`${dataChannel.subcribers} người đăng ký`}</span>
                <span>{`${videos.length} video`}</span>
                <p>{`Chào mừng các bạn đến với kênh ${dataChannel.name}`}</p>
                <span>Liên hệ với tôi:</span>
                <a href={dataChannel.contact} target="blank">Contact</a>
              </div>
            </div>
            <div className={cx('sub-btn')}>
              {dataChannel.is_sub ? (
                <Button horizontal={true} text='Huỷ đăng ký' type='default' onClick={() => handleOnClick(0)} />
              ) : (
                <Button horizontal={true} text='Đăng ký' type='white' onClick={() => handleOnClick(1)} />
              )}
            </div>
          </header>
          <div className={cx('content')}>
            <nav className={cx('nav')}>
              <Navbar datas={navContent} activeNav={activeNav} handleOnClick={setActiveNav} className='default' />
            </nav>
            <div className={cx('video')} id='video'>
              <ListVideo className='grid-channel-content' datas={videos} setDatas={setVideos}/>
            </div>
          </div>
        </div>
      </div>
      }
  </>
  )
  
}

export default Channel;
