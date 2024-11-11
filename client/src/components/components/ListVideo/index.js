import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

import Video from './Video';

import styles from './ListVideo.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ListVideo({ datas, setDatas, className, handleDragOn }) {
  const videoClassName = {
    Video: true,
    isHorizontal: className.includes('flex-content') ? true : false,
    bigSize: className.includes('big-size'),
    noDataChannel: className === 'grid-channel-content' || className === 'grid-download-content' ? true : false,
    isIndex: className.includes('index') ? true : false,
    isMove: className.includes('move') ? true : false,
    playlist: className.includes('playlist') ? true : false
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    const oldIndex = result.source.index
    const newIndex = result.destination.index
    axios.put('http://localhost:5000/video/swapPos',
     {
      oldIndex: datas[oldIndex].pos,
      newIndex: datas[newIndex].pos
     })
    setDatas(prev => {
      return reorder(prev, oldIndex, newIndex)
    })
  };
  const jsx = datas && datas.map((data, index) => 
    <Video 
      key={data.id} 
      data={data} 
      setDatas={setDatas}
      className={videoClassName} 
      index={index} 
    />)
  return (
    <div className={cx(className)}>
      {className.includes('move')
        ? <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="ROOT" type='GROUP'>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {datas.map((data, index) => {
                    return (
                    <Draggable draggableId={data.id} key={data.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}  
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Video 
                            key={data.id} 
                            data={data} 
                            setDatas={setDatas}
                            className={videoClassName} 
                            index={index} 
                          />
                        </div>
                      )}
                    </Draggable>
                  )})}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        : jsx
      }
    </div>
  );
}

export default ListVideo;
