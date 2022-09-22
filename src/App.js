import './App.css';
import {useEffect, useState} from 'react';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import NewsPage from './components/NewsPage/NewsPage';
import {getData, getNewsId} from './utils/Api';

function App() {
  const [news, setNews] = useState([]);
  const [newsId, setNewsId] = useState([]);
  const location = useLocation();

  const handleUpdateNews = () => {
    getNewsId()
      .then((res) => {
        res.length = 100;
        setNewsId(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const updatedNews = newsId.map((id) => {
      return getData(id);
    });
    Promise.all(updatedNews)
      .then((res) => {
        setNews((prev) => res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newsId]);

  useEffect(() => {
    if (location.pathname !== '/news' || news.length !== 0) {
      return;
    }

    let idArray = [];
    getNewsId()
      .then((res) => {
        res.length = 100;
        idArray = res;
      })
      .then(() => {
        idArray.forEach((item) => {
          getData(item).then((res) => {
            setNews((prev) => [...prev, res]);
          });
        });
      });
  }, [location.pathname, news.length]);

  useEffect(() => {
    const interval = setInterval(handleUpdateNews, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Routes>
      <Route path='/news' element={<MainPage news={news} handleUpdateNews={handleUpdateNews} />} />
      <Route path='/news/:id' element={<NewsPage />} />
      <Route path='*' element={<Navigate to='/news' replace />} />
    </Routes>
  );
}

export default App;
