import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions,
  createPromiseThunkById,
  handleAsyncActionsById,
} from "../lib/asyncUtils";

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = "posts/GET_POSTS"; // 요청 시작
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS"; // 요청 성공
const GET_POSTS_ERROR = "posts/GET_POSTS_ERROR"; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = "posts/GET_POST";
const GET_POST_SUCCESS = "posts/GET_POST_SUCCESS";
const GET_POST_ERROR = "posts/GET_POST_ERROR";

// 포스트 비우기
const CLEAR_POST = "posts/CLEAR_POST";

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

export const goHome = () => (dispatch, getState, { history }) => {
  history.push("/");
};

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(
        "posts/GET_POSTS",
        "posts",
        true
      )(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById("posts/GET_POST", "post")(state, action);
    // case CLEAR_POST:
    //   return {
    //     ...state,
    //     post: reducerUtils.initial(),
    //   };
    default:
      return state;
  }
};

export default posts;
