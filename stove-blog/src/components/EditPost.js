import React, { useState } from "react";
import Modal from "./Modal/Modal";
import styled from "styled-components";
const EditPost = (props) => {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)

  const [modalOpen, setModalOpen] = useState(false);
  const { onChange, postEdit } = props;
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const postChange = () => {
    postEdit();
    closeModal();
  };

  return (
    <>
      <BlogButton onClick={openModal}>수정</BlogButton>
      <Modal open={modalOpen} close={closeModal} header="Post Edit">
        <div className="input_data">
          <label>제목</label>
          <input
            name="subject"
            type="text"
            value={props.data.subject}
            onChange={onChange}
          />
          <label>내용</label>
          <ContentInput
            name="content"
            type="text"
            onChange={onChange}
            value={props.data.content}
          />
          <button onClick={postChange}>변경</button>
        </div>
      </Modal>
    </>
  );
};
const ContentInput = styled.textarea`
  padding: 10px;
  margin: 5px;
  width: 300px;
  height: 300px;
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
  &:hover {
    background: orange;
    color: black;
  }

  &:active {
    background: red;
  }
`;
export default EditPost;
