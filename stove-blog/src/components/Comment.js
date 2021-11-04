import styled from "styled-components";
import React, { useState, useEffect } from "react";

import axios from "axios";
const Comment = (data) => {
  const [comment, setComment] = useState([]);
  const [inputs, setInputs] = useState({
    name: "",
    comment: "",
    password: "",
  });
  const getComment = async () => {
    await axios.get(`http://localhost:3001/comment/${data.data}`).then((el) => {
      setComment(el.data);
    });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const commentCreate = async () => {
    await axios
      .post("http://localhost:3001/commentcreate", {
        name: inputs.name,
        comment: inputs.comment,
        password: inputs.password,
        no: data.data,
      })
      .then(() => {
        alert("댓글작성 완료하였습니다.");
        setInputs({ name: "", comment: "", password: "" });
        getComment();
      });
  };
  const commentDel = async (e) => {
    await axios
      .get(`http://localhost:3001/comment/delete/${e.target.id}`)
      .then(() => {
        alert("삭제 되었습니다.");
        getComment();
      });
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <Wrapper>
      <CommentTitle>댓글</CommentTitle>
      <HrLine />
      {comment.map((com) => {
        return (
          <div key={com.no}>
            <CommentDel onClick={commentDel} id={com.no}>
              ❌
            </CommentDel>
            <PostTitle>{com.name}</PostTitle>
            <PostContent>{com.comment}</PostContent>
            <PostDate>
              {com.signdate.slice(0, 10)} {com.signdate.slice(11, 16)}
            </PostDate>

            <HrLine />
          </div>
        );
      })}
      <InputWrapper>
        <div>
          <Title>댓글 작성하기</Title>
          <NamePassword
            name="name"
            placeholder="이름"
            type="text"
            onChange={onChange}
          />
          <NamePassword
            name="password"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            onChange={onChange}
          />
        </div>
        <div>
          <CommentInput
            name="comment"
            placeholder="댓글을 입력해주세요."
            type="text"
            onChange={onChange}
          />
        </div>
        <BlogButton onClick={commentCreate}>댓글 남기기</BlogButton>
      </InputWrapper>
    </Wrapper>
  );
};

const CommentTitle = styled.h2``;
const CommentDel = styled.div`
  float: right;
`;
const HrLine = styled.hr`
  margin: -1 px 0 px 0 px;
  height: 1 px;
  background-color: rgb(224, 224, 224);
`;
const PostTitle = styled.div`
  font-size: 20px;
`;
const PostContent = styled.div`
  font-size: large;
  padding: 10px 0px;
`;
const PostDate = styled.div`
  font-size: 5px;
  color: gray;
`;
const Title = styled.h3`
  margin: 5px;
`;
const CommentInput = styled.textarea`
  padding: 10px;
  margin: 5px;
  width: 40rem;
  height: 100px;
`;
const NamePassword = styled.input`
  width: 20rem;
  height: 30px;
  margin: 5px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
`;

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
  width: 120px;
  height: 40px;

  &:hover {
    background: orange;
    color: black;
  }

  &:active {
    background: red;
  }
`;
export default Comment;
