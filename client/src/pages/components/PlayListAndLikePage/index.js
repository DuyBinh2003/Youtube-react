import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from "~/components/components/Button";
import ListVideo from "~/components/components/ListVideo";

import classNames from "classnames/bind";
import styles from './PlayListAndLikePage.module.scss'
const cx = classNames.bind(styles)

function PlayListAndLikePage({ datas, setDatas, title}) {
  const navigate = useNavigate()
  const handleDownloadVideos = async () => {
    await datas.map(async data => {
      await axios.put(`http://localhost:5000/video/watch/${data.id}`,
      {
        like: data.like,
        download: 1,
      })
      .then(response => {
        console.log('Phản hồi từ máy chủ:', response.data);
      })
      .catch(error => {
          console.error('Lỗi:', error);
      });
    })
  }  
  const randomNumber = (length) => {
    return Math.floor(Math.random() * length) + 1
  }
  const handlePlaylistOnclick = (index) => {
    navigate("/watch/" + datas[index].id, 
      { state: { 
        playlist: datas, 
        title: title, 
        start: index
      }});
  }
  return (
    <>
    {datas.length === 0
    ? <h3>Chưa có video</h3>
    : <div className={cx('page')}>
        <div className={cx('play-list')}>
          <Link className={cx('img')} to={`/watch/${datas[0].id}`}>
            <img src={datas[0].img} alt="" />
          </Link>
          <div className={cx('info')}>
            <h2>{title}</h2>
            <h3>Username</h3>
            <span>{datas.length} video</span>
            <span>0 lượt xem</span>
            <span>cập nhật hôm qua</span>
          </div>
          <div className={cx('btn')}>
            <Button
              tippy='Tải xuống tất cả'
              size='size-s'
              type='default'
              onClick={handleDownloadVideos} 
              path="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"
            />
            <Button
              size='size-s'
              type='default'
              onClick={() => {alert('chưa làm')}} 
              path="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
            />
          </div>
          <div className={cx('btn')}>
            <Button
              path="m7 4 12 8-12 8V4z"
              text='Phát tất cả'
              type='white'
              onClick={() => handlePlaylistOnclick(0)} 
              horizontal={true}
            />
            <Button
              path="M18.15 13.65 22 17.5l-3.85 3.85-.71-.71L20.09 18H19c-2.84 0-5.53-1.23-7.39-3.38l.76-.65C14.03 15.89 16.45 17 19 17h1.09l-2.65-2.65.71-.7zM19 7h1.09l-2.65 2.65.71.71L22 6.51l-3.85-3.85-.71.71L20.09 6H19c-3.58 0-6.86 1.95-8.57 5.09l-.73 1.34C8.16 15.25 5.21 17 2 17v1c3.58 0 6.86-1.95 8.57-5.09l.73-1.34C12.84 8.75 15.79 7 19 7zM8.59 9.98l.75-.66C7.49 7.21 4.81 6 2 6v1c2.52 0 4.92 1.09 6.59 2.98z"
              text='Trộn bài'
              type='default'
              onClick={() => handlePlaylistOnclick(randomNumber(datas.length))} 
              horizontal={true}
            />
          </div>
        </div>
        <div className={cx('content', 'scroll', 'sidebarScroll')}>
          {
            title === "Xem sau"
            ? <ListVideo datas={datas} setDatas={setDatas} className={['flex-content', 'move']} />
            : <ListVideo datas={datas} setDatas={setDatas} className={['flex-content', 'index']} />
          }
        </div>
      </div>
    }
    </>
  )
}

export default PlayListAndLikePage;