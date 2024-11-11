import ListVideo from '~/components/components/ListVideo';

import classNames from 'classnames/bind';
import styles from './MoreVideo.module.scss';
import Playlist from './Playlist';
const cx = classNames.bind(styles);

function MoreVideo({ playlist = null, datas, setDatas }) {
  return (
    <div className={cx('more-video')}>
      {playlist && <Playlist datas={playlist.datas} title={playlist.title} index={playlist.start}/>}
      <ListVideo className="flex-content" datas={datas} setDatas={setDatas}/>
    </div>
  );
}

export default MoreVideo;
