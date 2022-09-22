import {useNavigate} from 'react-router-dom';
import {getDate} from '../../utils/utils';
import './News.css';

function News(props) {
  const {item} = props;

  const time = getDate(item.time);

  const navigate = useNavigate();

  return (
    <div
      className='news'
      onClick={() => {
        navigate(`/news/${item.id}`);
      }}
    >
      <h2 className='news__title'>{item.title}</h2>
      <span className='news__rating'>Rating: {item.score}</span>
      <h3 className='news__author'>Author: {item.by}</h3>
      <span className='news__time'>{time}</span>
    </div>
  );
}

export default News;
