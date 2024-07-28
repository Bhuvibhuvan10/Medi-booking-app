import React from 'react';
import {faqs} from '../../assets/data/faq'
import FaqCard from './FaqCard';
const FaqList = () => {
  return (
  <ul className='mt-[38px]'>{faqs.map((item,index)=><FaqCard item={item} key={index}/>)}</ul>
  );
}

export default FaqList;
