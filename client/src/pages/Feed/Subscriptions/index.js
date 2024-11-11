import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '~/components/components/Button';
import ListVideo from '~/components/components/ListVideo';

import classNames from 'classnames/bind';
import styles from './Subscriptions.module.scss';

const cx = classNames.bind(styles);

function Subscriptions() {
  const [datas, setDatas] = useState([]);
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
    FetchingVideos('http://localhost:5000/feed/subscriptions');
  }, []);
  return (
    <div className={cx({ SubscriptionsPage: true, scroll: true })}>
      <div className={cx('nav')}>
        <span>Mới nhất</span>
        <div>
          <Link to="/feed/channels" className={cx('nav-link')}>
            Quản lý
          </Link>
          <Button
            path={'M2,4h6v7H2V4z M2,20h6v-7H2V20z M9,11h6V4H9V11z M9,20h6v-7H9V20z M16,4v7h6V4H16z M16,20h6v-7h-6V20z'}
          />
          <Button path={'M20 8H9V7h11v1zm0 3H9v1h11v-1zm0 4H9v1h11v-1zM7 7H4v1h3V7zm0 4H4v1h3v-1zm0 4H4v1h3v-1z'} />
        </div>
      </div>
      <div className={cx('content')}>
        <ListVideo datas={datas} setDatas={setDatas} className="grid-content" />
      </div>
    </div>
  );
}

export default Subscriptions;
