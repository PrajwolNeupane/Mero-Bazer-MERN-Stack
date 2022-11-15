import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryBody from '../Components/CategoryBody';
import CategoryHeader from '../Components/CategoryHeader';
import {  CategoriesData} from '../Components/data';

export default function CategoryWrapper() {

  const { title } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  useEffect(() => {
    CategoriesData.filter((val) => {
      return (val.title.toLowerCase().replace(/\s/g,"").includes(title))
    }).map((curr,_)=>{
      setData(curr)
    })
  }, [title]);

  return (
    <>
      <CategoryHeader data={data}/>
      <CategoryBody title={title}/>
    </>
  )
}
