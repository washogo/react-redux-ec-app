import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOuter } from '../reduks/users/operations';
import { getUserId, getUserName } from '../reduks/users/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector)
  const username = getUserName(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button onClick={() => dispatch(signOuter())}>SIGN OUT</button>
    </div>
  )
}

export default Home;