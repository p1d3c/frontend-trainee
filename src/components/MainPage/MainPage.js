import {sortByTime} from '../../utils/utils';
import Loader from '../Loader/Loader';
import News from '../News/News';
import './MainPage.css';

function MainPage(props) {
  const {news, handleUpdateNews} = props;

  return (
    <div className='main'>
      {news.length < 99 ? (
        ''
      ) : (
        <button type='button' className='main__button' onClick={handleUpdateNews}>
          Reload
        </button>
      )}
      <div className='news-list'>
        {news.length >= 100 ? (
          news
            .sort((a, b) => {
              return sortByTime(a, b);
            })
            .map((item) => {
              return <News item={item} key={item.id} />;
            })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default MainPage;
