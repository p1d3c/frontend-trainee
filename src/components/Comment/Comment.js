import {useState} from 'react';
import {getData} from '../../utils/Api';
import './Comment.css';

function Comment(props) {
  const {commentData} = props;
  const [kids, setKids] = useState([]);

  const isPointer = commentData.kids ? {cursor: 'pointer'} : {cursor: 'default'};

  const handleLoadKids = () => {
    if (!commentData.kids) {
      return;
    }

    commentData.kids.forEach((item) => {
      getData(item)
        .then((res) => {
          setKids((prev) => [...prev, res]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <>
      <div className='comment' onClick={handleLoadKids} style={isPointer}>
        {commentData.text}
      </div>
      {kids.length > 0 &&
        kids.map((item) => {
          return (
            <div className='comment-reply' key={item.id}>
              {item.text}
            </div>
          );
        })}
    </>
  );
}

export default Comment;
