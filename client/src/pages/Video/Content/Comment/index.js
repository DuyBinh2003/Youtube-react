import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '~/components/components/PopperWrapper';

import Button from '~/components/components/Button';
import UserComment from './UserComment';
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment({id, datas, setDatas }) {
    const [visibleIndex, setVisibleIndex] = useState(null)
    const [listItemChange, setListItemChange] = useState([])
    const handleLikeOnclick = async (id, like, index) => {
        await axios.put(`http://localhost:5000/comments/${id}`, {like: like})
        setDatas(prev => {
                const newArr = [...prev]
            newArr[index].like = like
            return newArr
        })
    }
    const handleDeleteComment = async (id) => {
        await axios.delete(`http://localhost:5000/comments/${id}`)
        .then(response => {
            console.log('Phản hồi từ máy chủ:', response.data);
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
        setDatas(prev => {
            const newArr = prev.filter(item => item.id !== id)
            return newArr
        });
    }
    return ( 
        <div className={cx('Comment-wrapper')}>
            <UserComment id={id} setDatas={setDatas} defaultText=''/>
            <ul className={cx('list-comment')}>
                {datas.map((cm, index) => (
                    listItemChange.includes(index) 
                    ?   <UserComment 
                            id={cm.id} 
                            setDatas={setDatas} 
                            defaultText={cm.comment} 
                            like={cm.like}
                            cancelAction={() => {
                                setListItemChange(prev => {
                                    const newArr = prev.filter(item => item !== index)
                                    return newArr
                            })}}    
                        />
                    :   <li key={index} className={cx('item')}>
                        <Link className={cx('avatar')} to={`/channel/${cm.channel}`}>
                            <img alt='avatar' src={cm.avatar} />
                        </Link>
                        <div className={cx('content')}>
                            <h5 className={cx('title')}>{`@` + cm.channel}</h5>
                            <h5>{cm.comment}</h5>
                            <div className={cx('like-btn')}>
                                {cm.like === 1
                                    ? <Button onClick={() => {handleLikeOnclick(cm.id, 0, index)}} size='size-s' 
                                        path='M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z' />
                                    : <Button onClick={() => {handleLikeOnclick(cm.id, 1, index)}} size='size-s' 
                                        path='M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z' />
                                }
                                <span>{11 + cm.like}</span>
                            </div>
                        </div>
                        <Tippy
                            interactive
                            visible={visibleIndex === index}
                            placement='bottom-start'
                            render={(attrs) => (
                                <div 
                                className={cx('menu')} 
                                tabIndex='-1' 
                                onClick={(e) => {e.preventDefault()}}
                                {...attrs}
                                >
                                    <PopperWrapper>
                                        <div className={cx('Wrapper')}>
                                            {cm.channel === 'user' 
                                            ?   <ul>
                                                    <li>
                                                        <Button 
                                                            path={'m14.06 7.6 2.34 2.34L6.34 20H4v-2.34L14.06 7.6m0-1.41L3 17.25V21h3.75L17.81 9.94l-3.75-3.75zm3.55-2.14 2.37 2.37-1.14 1.14-2.37-2.37 1.14-1.14m0-1.42-2.55 2.55 3.79 3.79 2.55-2.55-3.79-3.79z'} 
                                                            text='Chỉnh sửa' 
                                                            noBorder={true}
                                                            onClick={() => {
                                                                setListItemChange(prev => {
                                                                    const newArr = [
                                                                        ...prev,
                                                                        index
                                                                    ]
                                                                    return newArr
                                                                })
                                                                setVisibleIndex(null)
                                                            }}
                                                        />
                                                    </li>
                                                    <li>
                                                        <Button 
                                                            path={'M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z'} 
                                                            text='Xoá' 
                                                            noBorder={true}
                                                            onClick={() => {
                                                                handleDeleteComment(cm.id)
                                                                setVisibleIndex(null)
                                                            }}
                                                        />
                                                    </li>
                                                </ul>
                                            :   <ul>
                                                    <li>
                                                        <Button 
                                                            path={'m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z'} 
                                                            text='Báo vi phạm' 
                                                            noBorder={true}
                                                            onClick={() => {
                                                                alert('chưa làm')
                                                                setVisibleIndex(null)
                                                            }}
                                                        />
                                                    </li>   
                                                </ul>
                                            }
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                           <div className={cx({btn: true, active: visibleIndex === index})}
                            >
                                <Button
                                    size='size-s'
                                    path="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
                                    onClick={(e) => {
                                        setVisibleIndex(prev => {
                                            return prev === index
                                            ? null : index
                                        })
                                        e.preventDefault()
                                    }}
                                />
                            </div>
                        </Tippy>
                        
                        </li>
                ))}
            </ul>
        </div>
     );
}

export default Comment;