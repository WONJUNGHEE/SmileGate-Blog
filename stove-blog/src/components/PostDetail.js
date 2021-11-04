import styled from "styled-components";
import EditPost from "./EditPost";
import axios from "axios";
import React, { useState } from "react";
import Comment from "./Comment";

const PostDetail = (data) => {
  const [ContentData, setContentData] = useState(data.location.state);
  const [inputs, setInputs] = useState({
    subject: ContentData.subject,
    content: ContentData.content,
  });
  const editPost = async () => {
    await axios
      .post("http://localhost:3001/content/edit", {
        subject: inputs.subject,
        content: inputs.content,
        no: ContentData.no,
      })
      .then((el) => {
        console.log(el.data[1]);
        setContentData({
          ...ContentData,
          subject: el.data[1].subject,
          content: el.data[1].content,
        });
      });
    setInputs({ subject: ContentData.subject, content: ContentData.content });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const del = async () => {
    await axios
      .get(`http://localhost:3001/content/delete/${ContentData.no}`)
      .then(() => {
        alert("삭제 되었습니다.");
        window.location.href = "/";
      });
    setInputs({ subject: ContentData.subject, content: ContentData.content });
  };

  return (
    <>
      <Wrapper>
        <PostTitle>{ContentData.subject}</PostTitle>
        <PostDate>
          작성 시간 : {ContentData.signdate.slice(0, 10)}{" "}
          {ContentData.signdate.slice(11, 16)}
        </PostDate>
        <HrLine />
        <PostContent>{ContentData.content}</PostContent>
        <BntWrapper>
          <BlogButton onClick={del}>삭제</BlogButton>
          <EditPost
            onChange={onChange}
            data={inputs}
            init={setInputs}
            postEdit={editPost}
          />
        </BntWrapper>
        <Comment data={ContentData.no} />
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  padding: 30px;
`;
const HrLine = styled.hr`
  margin: -1 px 0 px 0 px;
  height: 1 px;
  background-color: rgb(224, 224, 224);
`;
const PostTitle = styled.h1``;
const PostContent = styled.div`
  font-size: large;
`;
const PostDate = styled.div`
  color: gray;
`;
const BntWrapper = styled.div``;
const BlogButton = styled.button`
  background: gray;
  color: whitesmoke;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  float: right;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  margin-bottom: 50px;
  &:hover {
    background: orange;
    color: black;
  }

  &:active {
    background: red;
  }
`;
export default PostDetail;
