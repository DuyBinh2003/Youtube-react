import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
const cx = classNames.bind(styles);

function Navbar({ datas, handleOnClick, activeNav, className }) {
  const handleEffectNav = (activeNav) => {
    
  }
  return (
    <div className={cx('Navbar')}>
      <div className={cx('nav-container')}>
        {datas &&
          datas.map((data, index) => (
            <div
              className={cx({
                'nav-item': true,
                [className]: true,
                active: data.type === activeNav,
              })}
              key={index}
              onClick={() => {

                handleOnClick(data.type)
              }}
            >
              {data.title}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Navbar;
