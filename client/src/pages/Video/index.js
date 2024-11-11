import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

import Content from './Content';
import MoreVideo from './MoreVideo';

import classNames from 'classnames/bind';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video() {
  const location = useLocation();
  const playlist = {
    datas: location.state?.playlist,
    title: location.state?.title,
    start: location.state?.start
  }
  const { videoId } = useParams();
  const [video, setVideo] = useState();
  const [moreVideo, setMoreVideo] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const videoData = await axios.get(`http://localhost:5000/video/watch/${videoId}`) 
      .then ((response) => {
        return response.data
      })
      .catch ((err) => {
        console.log(err)
      })
      setVideo(videoData)
      const moreVideoData = await axios.get(`http://localhost:5000/video/random`) 
      .then ((response) => {
        return response.data
      })
      .catch ((err) => {
        console.log(err)
      })
      setMoreVideo(moreVideoData);
    };
    fetchData();
  }, [videoId]);
  return (
    <div className={cx('container', 'scroll')}>
        {video && <Content videoId={videoId} setDatas={setVideo} datas={video} />}
        {moreVideo && playlist.datas
          ? <MoreVideo playlist={playlist} datas={moreVideo} setDatas={setMoreVideo}/>
          : <MoreVideo datas={moreVideo} setDatas={setMoreVideo}/>
        }
    </div>
  );
}

export default Video;
