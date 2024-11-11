import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Icon from '../Icon';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ 
    type = false, 
    size = false,
    path = false, 
    text = false, 
    square = false, 
    disable = false, 
    tippy = false,
    noBorder = false,
    onClick = () => {alert('chưa hoàn thành')}
  }) {
  onClick = disable ? null : onClick
  const className = {
    Button: true,
    text: text && !path,
    icon: path && !text,
    textAndIcon: path && text,
    square: square,
    noBorder: noBorder,
    disable: disable,
    [type]: true,
    [size]: size,
  }
  const jsx = (
    <div onClick={onClick} className={cx(className)}>
      {path && <Icon path={path} type={type} />}
      <span>{text}</span>
    </div>
  )
  return (
   <>
    {tippy ? (
      <Tippy 
      content={tippy}
     >
      {jsx}
   </Tippy>
    ) : (jsx)}
   </>
  );
}

export default Button;
