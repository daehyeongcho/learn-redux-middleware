import React, { useEffect } from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { getPost, goHome } from "../modules/posts";

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(
    (state) => state.posts.post[postId]
  ) || {
    loading: false,
    data: null,
    error: null,
  }; // 아예 데이터가 존재하지 않을 때가 있으므로, 비구조화 할당이 오류가 나지 않도록;
  const dispatch = useDispatch();

  // cleanup함수: useEffect에서 반환하는 함수
  useEffect(() => {
    if (data) return; // 포스트가 존재하면 아예 요청을 하지 않음
    dispatch(getPost(postId));
  }, [postId, dispatch, data]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return (
    <>
      <button onClick={() => dispatch(goHome())}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
};
export default PostContainer;
