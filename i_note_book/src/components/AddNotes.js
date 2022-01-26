import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal, Button, Col, Row, Space, Affix, Input } from "antd";

export const AddNotes = (props) => {
  //noteContext
  const context = useContext(noteContext);

  //adding Note Function using context
  const { addNotes } = context;
  const notesInitial = { title: "", description: "", tags: "" };
  const [notes, setNotes] = useState(notesInitial);

  //modal isAvailable
  const [isModalVisible, setIsModalVisible] = useState(false);

  //modal functionality
  const showModal = () => {
    setIsModalVisible(true);
  };

  //loading on sending data
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    addNotes(notes);
    setTimeout(()=>{
      setConfirmLoading(false);
      setIsModalVisible(false);
    },500)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //adding notes value
  const changeHandler = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  //modal content
  const modalContent = (
    <>
      <Input
        placeholder="Put Atleast 5 Characters"
        allowClear
        onChange={changeHandler}
        name="title"
      />
      <Input
        placeholder="Put Atleast 5 Characters"
        allowClear
        onChange={changeHandler}
        name="description"
      />
      <Input
        placeholder="Optional"
        allowClear
        onChange={changeHandler}
        name="tags"
      />
    </>
  );

  return (
    <>
      <Row type="flex" align="middle">
        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Affix offsetTop={15}>
              <PlusCircleOutlined
                type="primary"
                onClick={showModal}
                style={{
                  color: "#48CFAD",
                  fontSize: "3.5em",
                  cursor: "pointer"
                }}
              />
            </Affix>
          </div>
        </Col>
      </Row>
      {/* Open Modal */}
      <Modal
        title="Your Note"
        visible={isModalVisible}
        okText={"Add Note"}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        destroyOnClose={true}
      >
        <Space direction="vertical">{modalContent}</Space>
      </Modal>
    </>

    // <Row >
    //   <Col
    //     span={24}
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center"
    //     }}
    //   >
    //     <PlusCircleOutlined
    //       style={{ color: "#48CFAD", fontSize: "3.5em", cursor: "pointer" }}
    //     />
    //   </Col>
    // </Row>
    // <div>
    //   <div className="mb-3">
    //     <h4 className="my-4">Add Your Notes</h4>
    //     <label className="form-label">Note</label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="formGroupExampleInput"
    //       placeholder="At least five characters"

    //       name="title"
    //       onChange={(e) => changeHandler(e)}
    //     />
    //   </div>
    //   <div className="mb-3">
    //     <label className="form-label">Description</label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="formGroupExampleInput"
    //       placeholder="At least five characters"
    //       name="description"
    //       onChange={(e) => changeHandler(e)}
    //     />
    //   </div>
    //   <div className="mb-3">
    //     <label className="form-label">Tags</label>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="formGroupExampleInput2"
    //       placeholder="add tags for conventions"
    //       name="tags"
    //       onChange={(e) => changeHandler(e)}
    //     />
    //     <button
    //       className="btn btn-primary my-4"
    //       onClick={() => {
    //         addNotes(notes);
    //       }}
    //       disabled={notes.title.length < 5 || notes.description.length < 5}
    //     >
    //       Add your notes
    //     </button>
    //   </div>
    // </div>
  );
};
