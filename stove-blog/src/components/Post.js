import styled from "styled-components";
import { Link } from "react-router-dom";

const Post = (post) => {
  return (
    <Wrapper key={post.no}>
      <PostA>
        <Link
          to={{
            pathname: `/post/${post.no}`,
            state: post,
          }}
          style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
        >
          <PostTitle>{post.subject}</PostTitle>
          <PostContent>
            {post.content.length > 50
              ? post.content.slice(0, 50) + "..."
              : post.content}
          </PostContent>
          <PostTime>
            작성 시간 : {post.signdate.slice(0, 10)}{" "}
            {post.signdate.slice(11, 16)}
          </PostTime>
        </Link>
      </PostA>
      <HrLine />
    </Wrapper>
  );
};
const HrLine = styled.hr`
  margin: -1 px 0 px 0 px;
  height: 1 px;

  background-color: rgb(224, 224, 224);
`;
const Wrapper = styled.div`
  padding: 5px 0px;
`;
const PostTime = styled.div`
  color: gray;
  text-align: right;
`;

const PostTitle = styled.h2`
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

const PostContent = styled.p`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const PostA = styled.div`
  text-decoration: none;
  border: 10px;
  box-sizing: border-box;
  display: block;
  cursor: pointer;
  text-decoration: none;
  margin: 5px;
  padding: 16px;
  outline: none;
  color: rgba(0, 0, 0, 0.87);
  line-height: 16px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  background: none;
  :hover {
    background: lightgray;
  }
`;

export default Post;
