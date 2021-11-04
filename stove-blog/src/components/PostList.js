import styled from "styled-components";
import CreatePost from "./CreatePost";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "./Post";

const PostList = () => {
  const [ContentData, setContentData] = useState([]);
  const GetContent = async () => {
    await axios
      .get("http://localhost:3001/content")
      .then((el) => setContentData(el.data));
  };
  const [inputs, setInputs] = useState({
    subject: "",
    content: "",
  });
  useEffect(() => {
    GetContent();
  }, []);
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  console.log(inputs);
  const create = async () => {
    if (inputs.content === "" || inputs.subject === "") {
      alert("제목과 내용을 다시 작성해 주세요");
    } else {
      await axios
        .post("http://localhost:3001/postcreate", {
          subject: inputs.subject,
          content: inputs.content,
        })
        .then(() => {
          GetContent();
        })
        .catch(() => {
          alert("게시물 작성이 실패 하였습니다.");
        });
      setInputs({
        subject: "",
        content: "",
      });
    }
  };
  return (
    <Wrapper>
      <CreateBtn>
        <CreatePost onChange={onChange} createPost={create} />
      </CreateBtn>
      <div>
        {ContentData.map((el) => {
          return Post(el);
        })}
      </div>
    </Wrapper>
  );
};
const CreateBtn = styled.div`
  margin: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PostList;
