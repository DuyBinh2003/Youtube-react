
import Button from "~/components/components/Button";
import classNames from "classnames/bind";
import styles from './ListAction.module.scss'

const cx = classNames.bind(styles)

function ListAction({ list, data, setVisibleTippy }) {
    let prevList = list.filter(item => item.title.split(' ')[0] !== 'Xoá')
    let lateList = list.filter(item => item.title.split(' ')[0] === 'Xoá')
    if(data.like === 1) {
        prevList = prevList.filter(item => item.title !== 'Thêm vào danh sách yêu thích')
    }else {
        lateList = lateList.filter(item => item.title !== 'Xoá khỏi danh sách yêu thích')
    }
    if(data.download === 1) {
        prevList = prevList.filter(item => item.title !== 'Tải xuống')
    }else {
        lateList = lateList.filter(item => item.title !== 'Xoá khỏi phần tải xuống')
    }
    if(data.pos > 0 || data.pos === 'add') {
        prevList = prevList.filter(item => item.title !== 'Lưu vào danh sách xem sau')
    }else {
        lateList = lateList.filter(item => item.title !== 'Xoá khỏi danh sách xem sau')
    }
    return ( 
        <div className={cx('Wrapper')}>
            <ul>
                {prevList.map((item, index) => 
                    <li key={index}>
                        <Button 
                            path={item.icon} 
                            text={item.title} 
                            horizontal={true} 
                            noBorder={true}
                            onClick={() => {
                            setVisibleTippy(false)
                            item.onClick()
                            }}
                        />
                    </li>
                )}
            </ul>
            {lateList.length !== 0 && 
                <ul>
                    {lateList.map((item, index) => 
                        <li key={index}>
                            <Button 
                            path={item.icon} 
                            text={item.title} 
                            horizontal={true} 
                            noBorder={true}
                            onClick={() => {
                                setVisibleTippy(false)
                                item.onClick()
                            }}
                            />
                        </li>
                    )}
                </ul>
            }
            
        </div>
     );
}

export default ListAction;