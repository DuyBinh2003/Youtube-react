import { useNavigate } from 'react-router-dom';

import Icon from '~/components/components/Icon';
import Button from '~/components/components/Button';
import ListVideo from '~/components/components/ListVideo';
import classNames from 'classnames/bind';
import styles from './LibraryItem.module.scss';

const cx = classNames.bind(styles)
function LibraryItem({ datas, setDatas, title }) {
    const navigate = useNavigate()
    const handleNavigate = (to) => {
        navigate('/' + to)
    }
    return (  
        <div className={cx('container')}>
            
            <header>
                <div className={cx('title')}>
                    <Icon 
                        path={title.icon}
                    />
                    <h3>{title.title}</h3>
                    <span>{datas.length}</span>
                </div>
                <Button 
                    type='blue'
                    text='Xem tất cả'
                    onClick={() => {handleNavigate(title.to)}}
                />
            </header>
            {datas.length !== 0
                ? <ListVideo datas={datas} setDatas={setDatas} className= 'grid-download-content'/>
                : <h3>Bạn chưa có video nào ở phần này</h3>
            }
        </div>
    );
}

export default LibraryItem;