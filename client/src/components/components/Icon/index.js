import classNames from 'classnames/bind';
import styles from './Icon.module.scss';

const cx = classNames.bind(styles);

function Icon({ path, type }) {
  return (
    <div className={cx({icon: true, [type]: true})}>
      <svg
        height="24"
        style={{ pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }}
        viewBox="0 0 24 24"
        width="24"
        focusable="false"
      >
        <path d={path}></path>
      </svg>
    </div>
  );
}

export default Icon;
