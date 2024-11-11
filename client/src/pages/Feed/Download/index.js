import { useState, useEffect } from 'react'
import axios from 'axios';

import Icon from '~/components/components/Icon';
import Button from '~/components/components/Button';
import ListVideo from '~/components/components/ListVideo';
import classNames from 'classnames/bind';
import styles from './Download.module.scss';

const cx = classNames.bind(styles);

function Download() {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    const fecthData = async (link) => {
      const json = await axios.get(link)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
      setDatas(json)
    }
    fecthData(`http://localhost:5000/video/download`)
  },[])
  const newDatas = datas.filter(data => data.download === 1)
  if(newDatas.length !== datas.length) setDatas(newDatas)
  return (
    <> 
    {datas && 
      <div className={cx('downloadPage')}>
        <div className={cx('wrapper', 'scroll')}>
          <header>
            <div className={cx('title')}>
              <Icon path={'M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z'}/>
              <h4>Nội dung tải xuống</h4>
            </div>
            <div className={cx('btn')}>
              <Button text='Cài đặt video tải xuống' horizontal={true} type='blue' />
            </div>
          </header>
          <div className={cx('container')}>
            <ListVideo datas={newDatas} setDatas={setDatas} className= 'grid-download-content'/>
          </div>
          <footer>
            <p>Bạn sẽ tiếp tục xem được nội dung đã tải xuống, miễn là thiết bị của bạn có kết nối Internet ít nhất một lần trong vòng 30 ngày.</p>
          </footer>
        </div>
      </div>
    }
    </>
  );
}

export default Download;
