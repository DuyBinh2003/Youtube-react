import { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tippy from '@tippyjs/react/headless';


import PopperWrapper from '../../PopperWrapper';
import reducer from './videoReducer';
import ListAction from './ListAction/ListAction';
import Button from '../../Button';
import Icon from '../../Icon';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
const cx = classNames.bind(styles);

function  Video({ data, setDatas, className, index }) {
  const listAction = [
    {
      title: 'Thêm vào danh sách chờ',
      icon: 'M21 16h-7v-1h7v1zm0-5H9v1h12v-1zm0-4H3v1h18V7zm-11 8-7-4v8l7-4z',
      onClick: () => {alert('chưa làm')}
    },
    {
      title: 'Lưu vào danh sách xem sau',
      icon: 'M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z',
      onClick: () => {
        dispatch({ type: 'playlist' })
      }
    },
    {
      title: 'Xoá khỏi danh sách xem sau',
      icon: 'M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z',
      onClick: () => {
        dispatch({ type: 'unplaylist' })
      }
    },
    {
      title: 'Lưu vào danh sách phát',
      icon: 'M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z',
      onClick: () => {alert('chưa làm')}
    },
    {
      title: 'Tải xuống',
      icon: 'M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z',
      onClick: () => {
        dispatch({ type: 'download',})
      }
    },
    {
      title: 'Xoá khỏi phần tải xuống',
      icon: 'M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z',
      onClick: () => {
        dispatch({ type: 'undownload' })
      }
    },
    {
      title: 'Chia sẻ',
      icon: 'M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z',
      onClick: () => {alert('chưa làm')}
    },
    {
      title: 'Thêm vào danh sách yêu thích',
      icon: 'M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z',
      onClick: () => {
        dispatch({ type: 'like' })
      }
    },
    {
      title: 'Xoá khỏi danh sách yêu thích',
      icon: 'M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z',
      onClick: () => {
        dispatch({ type: 'unlike' })
      }
    }
  ]
  const [state, dispatch] = useReducer(reducer, data)
  const [visibleTippy, setVisibleTippy] = useState(false)
  const [channel, setChannel] = useState({});
  const {isIndex} = className
  const {isMove} = className
  // get channel data
  useEffect(() => {
    const idChannel = state.id_channel
    const getData = async (link) => {
      const json = await axios.get(link) 
      .then ((response) => {
        return response.data
      })
      .catch ((err) => {
        console.log(err)
      });
      setChannel(json);
    };
    getData(`http://localhost:5000/@${idChannel}`);
  }, []);
  // handle change data
  useEffect(() => {
    const handleAction = async () => {
      await axios.put(`http://localhost:5000/video/watch/${state.id}`, 
      { 
        plPos: state.pos,
        like: state.like,
        download: state.download,
      })
      setDatas(prev => {
        const newArr = prev.slice()
        newArr[index] = state
        return newArr
      })
    }
    if(state !== data) {
      handleAction()
    }
  },[state])
  const jsx = (
    <Link to={'/watch/' + state.id} className={cx(className)}>
      <div className={cx('background')}>
        <img src={state.img} alt="" />
        <span>{state.long}</span>
      </div>
      <div className={cx('info')}>
        <Tippy
          interactive
          visible={visibleTippy}
          placement='bottom-start'
          render={(attrs) => (
            <div 
              className={cx('menu')} 
              tabIndex='-1' 
              onClick={(e) => {e.preventDefault()}}
              {...attrs}
            >
              <PopperWrapper>
                <ListAction list={listAction} data={state} setVisibleTippy={setVisibleTippy} />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx({btn: true, active: visibleTippy})}
          >
            <Button
              size='size-s'
              path="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
              onClick={(e) => {
                e.preventDefault()
                setVisibleTippy(!visibleTippy)
              }}
            />
          </div>
        </Tippy>
        <Link className={cx('info-img')} to={`/channel/${channel.id}`}>
          <img src={channel.avatar} alt="" />
        </Link>
        <div className={cx('info-title')}>
          <div className={cx('title')}>
            <h6>{state.title}</h6>
          </div>
          <div>
            <Link to={`/channel/${channel.id}`}>
              <p>{channel.name}</p>
            </Link>
            <span>{state.view + ' lượt xem'}</span>
            <span>{state.launch + ' trước'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
  return (
    <>
      {channel && (
        isIndex || isMove ?
          <div className={cx('wrapper')}>
              {
                isIndex 
                ? <div className={cx('prev-number')}>
                    <h4>{index + 1}</h4>
                  </div>
                : <div className={cx('prev-icon')}>
                    <Icon path='M21 10H3V9h18v1Zm0 4H3v1h18v-1Z'/>
                  </div>
              }
            {jsx}
          </div>
          : jsx
      )}
    </>
  );
}

export default Video;
