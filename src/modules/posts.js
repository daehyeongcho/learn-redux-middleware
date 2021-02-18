import * as postsAPI from "../api/posts";
import {
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
  createPromiseSaga,
  createPromiseSagaById,
} from "../lib/asyncUtils";
import { getContext, takeEvery } from "redux-saga/effects";

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = "posts/GET_POSTS"; // 요청 시작
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS"; // 요청 성공
const GET_POSTS_ERROR = "posts/GET_POSTS_ERROR"; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = "posts/GET_POST";
const GET_POST_SUCCESS = "posts/GET_POST_SUCCESS";
const GET_POST_ERROR = "posts/GET_POST_ERROR";

const GO_HOME = "posts/GO_HOME";

export const getPosts = () => ({ type: GET_POSTS });
// payload는 패러미터 용도, meta는 리듀서에서 id를 알기 위한 용도
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });
export const goHome = () => ({ type: GO_HOME });

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);
function* goHomeSaga() {
  const history = yield getContext("history");
  history.push("/");
}

// 사가들을 합치기
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_HOME, goHomeSaga);
}

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
