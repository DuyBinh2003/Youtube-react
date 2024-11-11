import { useState } from 'react';

import Button from '~/components/components/Button';
import ListVideo from '~/components/components/ListVideo';
import styles from './Playlist.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function Playlist({ datas, title, index}) {
    const [playlist, setPlaylist] = useState(datas)
    return ( 
        <div className={cx('playlist')}>
            <div className={cx('title')}>
                <div className={cx('flex', 'info')}>
                    <div>
                        <h4>{title}</h4>
                        <span>{"Username - " + (index + 1) + '/' + datas.length}</span>
                    </div>
                    <Button 
                        path='m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z'
                    />
                </div>
                <div className={cx('flex')}>
                    <div className={cx('flex')}>
                        <Button 
                            path='M21 13h1v5l-18.07.03 2.62 2.62-.71.71-3.85-3.86 3.85-3.85.71.71-2.67 2.67L21 17v-4zM3 7l17.12-.03-2.67 2.67.71.71 3.85-3.85-3.85-3.85-.71.71 2.62 2.62L2 6v5h1V7z'
                            tippy='Danh sách phát lặp'
                        />
                        <Button 
                            path='M18.15 13.65 22 17.5l-3.85 3.85-.71-.71L20.09 18H19c-2.84 0-5.53-1.23-7.39-3.38l.76-.65C14.03 15.89 16.45 17 19 17h1.09l-2.65-2.65.71-.7zM19 7h1.09l-2.65 2.65.71.71L22 6.51l-3.85-3.85-.71.71L20.09 6H19c-3.58 0-6.86 1.95-8.57 5.09l-.73 1.34C8.16 15.25 5.21 17 2 17v1c3.58 0 6.86-1.95 8.57-5.09l.73-1.34C12.84 8.75 15.79 7 19 7zM8.59 9.98l.75-.66C7.49 7.21 4.81 6 2 6v1c2.52 0 4.92 1.09 6.59 2.98z'
                            tippy='Danh sách phát ngẫu nhiên'
                        />
                    </div>
                    <Button 
                        path='M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z'
                    />
                </div>
            </div>
            <div className={cx('content', 'scroll')}>
                <ListVideo datas={playlist} setDatas={setPlaylist} className={['flex-content', 'move', 'playlist']} />
            </div>
        </div>
    )
}

export default Playlist;