import { useState, useEffect } from "react";
import axios from "axios";

import ListVideo from "~/components/components/ListVideo";
import Button from "~/components/components/Button";
import classNames from "classnames/bind";
import styles from './History.module.scss'

const cx = classNames.bind(styles)

function History() {
  const className = [
    'flex-content',
    'big-size'
  ]
  const [datas, setDatas] = useState([])
  useEffect(() => {
    const fetchDatas = async () => {
      const dataJson = await axios.get('http://localhost:5000/video/history')
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        console.log(err)
      })
      setDatas(dataJson)
    }
    fetchDatas()
  }, [])
  return (
    <div className={cx('history-page')}>
      <div className={cx('wrapper', 'scroll')}>
        <h1>Nhật ký xem</h1>
        <div className={cx('container')}>
          <div className={cx('content')}>
            <ListVideo datas={datas} setDatas={setDatas} className={className}/>
          </div>
          <div className={cx('action')}>
            <div className={cx('action-wrapper')}>
              <div className={cx('input')}>
                <Button 
                  path='m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z'
                />
                <input placeholder="Tìm kiếm"/>
              </div>
              <div>
                <Button 
                  path='M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z'
                  text='Xoá tất cả nhật ký xem'
                />
              </div>
              <div>
                <Button 
                  path='M9 19H7V5h2Zm8-14h-2v14h2Z'
                  text='Tạm dưng lưu nhật ký xem'
                />
              </div>
              <div>
                <Button 
                  path='M12 9.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-1c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zM13.22 3l.55 2.2.13.51.5.18c.61.23 1.19.56 1.72.98l.4.32.5-.14 2.17-.62 1.22 2.11-1.63 1.59-.37.36.08.51c.05.32.08.64.08.98s-.03.66-.08.98l-.08.51.37.36 1.63 1.59-1.22 2.11-2.17-.62-.5-.14-.4.32c-.53.43-1.11.76-1.72.98l-.5.18-.13.51-.55 2.24h-2.44l-.55-2.2-.13-.51-.5-.18c-.6-.23-1.18-.56-1.72-.99l-.4-.32-.5.14-2.17.62-1.21-2.12 1.63-1.59.37-.36-.08-.51c-.05-.32-.08-.65-.08-.98s.03-.66.08-.98l.08-.51-.37-.36L3.6 8.56l1.22-2.11 2.17.62.5.14.4-.32c.53-.44 1.11-.77 1.72-.99l.5-.18.13-.51.54-2.21h2.44M14 2h-4l-.74 2.96c-.73.27-1.4.66-2 1.14l-2.92-.83-2 3.46 2.19 2.13c-.06.37-.09.75-.09 1.14s.03.77.09 1.14l-2.19 2.13 2 3.46 2.92-.83c.6.48 1.27.87 2 1.14L10 22h4l.74-2.96c.73-.27 1.4-.66 2-1.14l2.92.83 2-3.46-2.19-2.13c.06-.37.09-.75.09-1.14s-.03-.77-.09-1.14l2.19-2.13-2-3.46-2.92.83c-.6-.48-1.27-.87-2-1.14L14 2z'
                  text='Quản lý toàn bộ lịch sử hoạt động'
                />
              </div>
              <div className={cx('text')}>
                <p>Bình luận</p>
                <p>Bài đăng trên công cộng</p>
                <p>Trò chuyện trực tiếp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
