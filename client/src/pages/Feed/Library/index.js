import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import LibraryItem from './LibraryItem';
import Button from '~/components/components/Button';
import classNames from 'classnames/bind';
import styles from './Library.module.scss';

const cx = classNames.bind(styles);

function Library() {
  const titleItem = {
    history: {
      icon: 'M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z',
      title: 'Video đã xem',
      to: 'feed/history'
    },
    playlist: {
      icon: 'M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z',
      title: 'Xem sau',
      to: 'feed/playlist'
    },
    like: {
      icon: 'M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z',
      title: 'Video đã thích',
      to: 'feed/like'
    },
    clip: {
      icon: 'M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z',
      title: 'Đoạn video của bạn',
      to: 'feed/clips'
    },
  }
  const [historyVideo, setHistoryVideo] = useState([])
  const [playlistVideo, setPlaylistVideo] = useState([])
  const [likeVideo, setLikeVideo] = useState([])
  useEffect(() => {
    const startFetching = async () => {
      const historyVideoJson = await axios.get(`http://localhost:5000/video/history`)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.error(error);
      });
      const playlistVideoJson = await axios.get(`http://localhost:5000/video/playlist`)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.error(error);
      });
      const likeVideoJson = await axios.get(`http://localhost:5000/video/like`)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.error(error);
      });
      setHistoryVideo(historyVideoJson)
      setPlaylistVideo(playlistVideoJson)
      setLikeVideo(likeVideoJson)
    }
    startFetching()
  }, [])
  return (
    <div className={cx('library-page')}>
      <div className={cx('wrapper', 'scroll')}>
        <header>
          <div className={cx('img')}>
            <img src='https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg' alt=''/>
          </div>
          <div className={cx('info')}>
            <h4>UserName</h4>
            <Link to='/channel/user'>
              <span>@Useid</span>
              <span>Xem kênh</span>
            </Link>
            <div className={cx('btn')}>
              <Button 
                path='M4 20h14v1H3V6h1v14zM6 3v15h15V3H6zm2.02 14c.36-2.13 1.93-4.1 5.48-4.1s5.12 1.97 5.48 4.1H8.02zM11 8.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0zm3.21 3.43A3.507 3.507 0 0017 8.5C17 6.57 15.43 5 13.5 5S10 6.57 10 8.5c0 1.69 1.2 3.1 2.79 3.43-3.48.26-5.4 2.42-5.78 5.07H7V4h13v13h-.01c-.38-2.65-2.31-4.81-5.78-5.07z'
                text='Chuyển đổi tài khoản'
                type='default'
                onClick={() => {alert('chưa hoàn thành')}}
              />
              <Button 
                path='M12 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05 0 5.71-3.83 9.77-9.6 9.77C6.48 22 2 17.52 2 12S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.97-1.49-3.85-1.49-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22H12z'
                text='Tài khoản Google'
                type='default'
                onClick={() => {alert('chưa hoàn thành')}}
              />  
            </div>
          </div>
        </header>
        <LibraryItem datas={historyVideo} setDatas={setHistoryVideo} title={titleItem.history}/>
        <LibraryItem datas={playlistVideo} setDatas={setPlaylistVideo} title={titleItem.playlist}/>
        <LibraryItem datas={likeVideo} setDatas={setLikeVideo} title={titleItem.like}/>
        <LibraryItem datas={[]} title={titleItem.clip}/>
      </div>
    </div>
  )
}

export default Library;
