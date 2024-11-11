import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

import Button from '~/components/components/Button';
import classNames from "classnames/bind";
import styles from './UserComment.module.scss'

const cx = classNames.bind(styles)

function UserComment({ id, defaultText, setDatas, like, cancelAction }) {
    const [text, setText] = useState(defaultText)
    const [activeSubBtn, setActiveSubBtn] = useState(false)
    const handleAddComment = async () => {
        const datas = {
            channel: 'user',
            comment: text,
        }
        await axios.post(`http://localhost:5000/comments/${id}`, datas)
        .then(response => {
            console.log('Phản hồi từ máy chủ:', response.data);
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
        setDatas(prev => {
            const maxId = prev.reduce((max, obj) => (obj.id > max ? obj.id : max), -Infinity)
            const newComment = {
                ...datas,
                like: 0,
                id: maxId + 1,
                avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg'
            }
            const newArr = [newComment ,...prev]
            return newArr
        });
        setActiveSubBtn(false)
        setText('')
    }
    const handleChangeComment = async () => {
        await axios.put(`http://localhost:5000/comments/${id}`, 
            {
                comment: text,
                like:like
            }
        )
        .then(response => {
            console.log('Phản hồi từ máy chủ:', response.data);
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
        setDatas(prev => {
            const newArr = [...prev]
            newArr.map(item => {
                if(item.id === id) item.comment = text
            })
            return newArr
        });
        cancelAction()
    }
    return ( 
        <div className={cx('user-comment')}>
            <Link className={cx('avatar')} to='/@account'>
                <img alt='avatar' src='https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien-600x600.jpg' />
            </Link>      
            <div className={cx('input-wrapper')}>
                <input 
                    type='text' 
                    value={text}
                    placeholder='Viết bình luận...'
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => {setActiveSubBtn(true)}}
                />
                {activeSubBtn &&
                    <div className={cx('input-btn')}>
                        <Button 
                            text='Huỷ' 
                            onClick={defaultText 
                                ? cancelAction 
                                : () => {
                                    setActiveSubBtn(false)
                                    setText('')
                            }}
                        />
                        <Button 
                            text={defaultText ? 'Lưu' : 'Bình luận'} 
                            type='sub-cmt' 
                            disable={text === defaultText} 
                            onClick={defaultText ? handleChangeComment : handleAddComment}
                        />
                    </div>
                }
            </div>
        </div>
     );
}

export default UserComment;