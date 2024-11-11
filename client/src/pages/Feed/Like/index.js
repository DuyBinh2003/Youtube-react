import { useState, useEffect } from 'react';
import axios from 'axios';

import PlayListAndLikePage from '~/pages/components/PlayListAndLikePage';

function Like() {
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
    fetchApi('http://localhost:5000/video/like')
  },[])
  const newDatas = datas.filter(data => data.like === 1)
  if(newDatas.length !== datas.length) setDatas(newDatas)
  return (
    <>
      {datas &&
        <PlayListAndLikePage datas={datas} title='Video đã thích' setDatas={setDatas}/>
      }
    </>
  );
}

export default Like;