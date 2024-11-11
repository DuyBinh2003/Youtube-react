import { useState, useEffect } from 'react';
import axios from 'axios';

import PlayListAndLikePage from '~/pages/components/PlayListAndLikePage';

function Playlist() {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    const fetchApi = async (link) => {
      const json = await axios.get(link)
      .then ((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
      })
      setDatas(json)
    }
    fetchApi('http://localhost:5000/video/playlist')
  },[])
  const newDatas = datas.filter(data => data.pos > 0)
  if(newDatas.length !== datas.length) setDatas(newDatas)
  return (
    <>{datas &&
      <PlayListAndLikePage datas={newDatas} title='Xem sau' setDatas={setDatas}/>
    }</>
  );
}

export default Playlist;
