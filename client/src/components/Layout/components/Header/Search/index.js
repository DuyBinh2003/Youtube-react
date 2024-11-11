import Button from '~/components/components/Button';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  return (
    <div className={cx('Search')}>
      <div className={cx('search-box')}>
        <div className={cx('input-wrapper')}>
          <input placeholder="Tìm kiếm" type="text" />
          <img src="//www.gstatic.com/inputtools/images/tia.png" alt=''/>
          <div className={cx('search-button-left')}>
            <div className={cx('search-button-icon')}>
              <svg
                height="24"
                style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
                viewBox="0 0 24 24"
                width="24"
                focusable="false"
              >
                <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className={cx('search-button-right')}>
          <div className={cx('search-button-icon')}>
            <svg
              height="24"
              style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
            >
              <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path>
            </svg>
          </div>
        </div>
      </div>
      <Button
        tippy='Tìm kiếm bằng giọng nói'
        type='default'
        path="M12 3c-1.66 0-3 1.37-3 3.07v5.86c0 1.7 1.34 3.07 3 3.07s3-1.37 3-3.07V6.07C15 4.37 13.66 3 12 3zm6.5 9h-1c0 3.03-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12h-1c0 3.24 2.39 5.93 5.5 6.41V21h2v-2.59c3.11-.48 5.5-3.17 5.5-6.41z"
      />
    </div>
  );
}

export default Search;
