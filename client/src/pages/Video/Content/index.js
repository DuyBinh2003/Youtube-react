import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Comment from './Comment';
import Button from '~/components/components/Button';
import { SidebarContext } from '~/components/Layout/VideoLayout';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';

const cx = classNames.bind(styles);

function Content({ videoId, datas, setDatas }) {
  const idChannel = datas.id_channel
  const [channel, setChannel] = useState();
  const [comment, setComment] = useState();
  const { setSidebarData } = useContext(SidebarContext)
  const likeIconPath = datas.like 
  ? 'M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z' 
  : 'M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z'
  useEffect(() => {
    const fetchData = async () => {
      const channelJson = await axios.get(`http://localhost:5000/@${idChannel}`) 
      .then ((response) => {
        return response.data
      })
      .catch ((err) => {
        console.log(err)
      })
      setChannel(channelJson)
      const commentJson = await axios.get(`http://localhost:5000/comments/video/${videoId}`) 
      .then ((response) => {
        return response.data
      })
      .catch ((err) => {
        console.log(err)
      })
      setComment(commentJson)
    };
    fetchData();
  }, [videoId, idChannel]);
  const handleSubOnclick = async (index) => {
    try {
      await axios.put(`http://localhost:5000/@${channel.id}`,{ isSub: index })
      const json = await axios.get(`http://localhost:5000/api/sidebar`) 
      .then ((response) => {
        return response.data
      })
      .catch ((err) => {
        console.log(err)
      })
      setSidebarData(json)
      setChannel((prev) => ({
        ...prev,
        is_sub: index
      }))
    }
    catch (err) {
      alert(err)
    }
  }
  const handleLikeOnclick = async (index) => {
    try {
      index = index === 1 ? 0 : 1 
      console.log(index)
      await axios.put(`http://localhost:5000/video/watch/${datas.id}`,{ like: index })
      setDatas({
        ...datas,
        like: index
      })
    }
    catch (err) {
      alert(err)
    }
  }
  return (
    <div className={cx('content')}>
      {channel && comment && (
        <>
          <div className={cx('video')}>
            <iframe src={datas.src} title={datas.title}></iframe>
          </div>
          <div className={cx('info')}>
            <h3 className={cx('video-title')}>{datas.title}</h3>
            <div className={cx('channel-wrapper')}>
              <div className={cx('channel-content')}>
                <Link className={cx('info-channel')} to={`/channel/${channel.id}`}>
                  <img src={channel.avatar} alt="" />
                  <div>
                    <h4>{channel.name}</h4>
                    <span>{channel.subcribers + ' người đăng ký'}</span>
                  </div>
                </Link>
                <div className={cx('sub-btn')}>
                  {channel.is_sub ? (
                    <Button 
                      horizontal={true} 
                      text='Huỷ đăng ký' 
                      type='default' 
                      onClick={() => handleSubOnclick(0)} 
                    />
                  ) : (
                    <Button 
                      horizontal={true} 
                      text='Đăng ký' 
                      type='white' 
                      onClick={() => handleSubOnclick(1)} 
                    />
                  )}
                </div>           
              </div>
              <div className={cx('channel-btn')}>
                <Button 
                  horizontal={true}
                  onClick={() => handleLikeOnclick(datas.like)}
                  tippy="Tôi thích video này"
                  type='default' 
                  text={430 + datas.like} 
                  path={likeIconPath}
                />
                <Button 
                  horizontal={true}
                  tippy="Chia sẻ"
                  type='default' 
                  text='Chia sẻ'
                  path='M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z'
                />
                <Button 
                  horizontal={true}
                  tippy="Tải xuống"
                  type='default' 
                  text='Tải xuống' 
                  path='M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z'
                />
              </div>
            </div>
          </div>
          {comment && <Comment datas={comment} setDatas={setComment} id={datas.id}/>}
        </>
      )}
    </div>
  );
}

export default Content;
