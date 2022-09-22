import './NewsPage.css';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getData} from '../../utils/Api';
import {getDate} from '../../utils/utils';
import Comment from '../Comment/Comment';

function NewsPage() {
  const [selectedNews, setSelectedNews] = useState({});
  const [comments, setComments] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const time = getDate(selectedNews.time);

  const handleGoBack = () => {
    navigate('/news');
    clearInterval(handleUpdateComments);
  };

  //   res.kids.forEach((item) => {
  //     getData(item).then((res) => {
  //       setComments((prev) => [res, ...prev]);
  //     });
  //   });

  const handleUpdateComments = () => {
    getData(params.id)
      .then((res) => {
        setSelectedNews((prev) => res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(params.id)
      .then((res) => {
        setSelectedNews(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!selectedNews.kids) {
      return;
    }

    const updatedComments = selectedNews.kids.map((item) => {
      return getData(item);
    });

    Promise.all(updatedComments)
      .then((res) => {
        setComments((prev) => res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedNews]);

  useEffect(() => {
    const interval = setInterval(handleUpdateComments, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='detail'>
      <button type='button' className='detail__back' onClick={handleGoBack}>
        Go back
      </button>
      <button type='button' className='detail__reload' onClick={handleUpdateComments}>
        Reload
      </button>
      <h2 className='detail__title'>{selectedNews.title}</h2>
      <h3 className='detail__author'>Author: {selectedNews.by}</h3>
      <a className='detail__link' href={selectedNews.url} target='_blank' rel='noreferrer'>
        {selectedNews.url}
      </a>
      <span className='detail__time'>{time}</span>
      <span className='detail__descendants'>Comments count: {selectedNews.descendants}</span>
      <div className='detail__comments'>
        {comments.map((item) => {
          return <Comment commentData={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

export default NewsPage;
