import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { selectModels, setmodels } from "../features/Model/modelSlice";
import Zoom from "react-reveal/Zoom";
import { CameraIcon } from "@heroicons/react/outline";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { selectImg, selectName, selectUid } from "../features/User/userSlice";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

function Model() {
  const dispatch = useDispatch();
  const start = useSelector(selectModels);
  const filepicker = useRef(null);
  const [select, setSelect] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const image = useSelector(selectImg);
  const name = useSelector(selectName);
  const uid = useSelector(selectUid);

  const SubmitModel = async (e) => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "post"), {
      username: name,
      profile: image,
      caption: input,
      uid: uid,
      timestamp: serverTimestamp(),
    });

    const images = ref(storage, `post/${docRef.id}/image`);

    await uploadString(images, select, "data_url").then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(images);
      await updateDoc(doc(db, "post", docRef.id), {
        Image: downloadUrl,
      });
    });

    setLoading(false);
    setSelect(null);
    dispatch(setmodels({ starter: false }));
    setInput("");
  };

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (readerEvent) => {
        setSelect(readerEvent.target.result);
      };
    }
  };

  console.log(select);
  return (
    <Container show={start}>
      <Zoom top>
        <Wrapper>
          <Header>
            {select ? (
              <div className="container">
                <img src={select} onClick={() => setSelect(null)} alt="" />
              </div>
            ) : (
              <div className="div" onClick={() => filepicker.current.click()}>
                <Cameria />
              </div>
            )}

            <input
              type="file"
              accept=".png , .jpg, .jpeg"
              ref={filepicker}
              onChange={() => addImage}
              hidden
            />
          </Header>
          <Caption>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Captions"
            />

            <Button type="button" disabled={!select} onClick={SubmitModel}>
              {loading ? " Uploading" : " Upload pic "}
            </Button>
          </Caption>
        </Wrapper>
      </Zoom>
    </Container>
  );
}

export default Model;

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  transform: ${(props) =>
    props.show ? "translate(-0%)" : "translateY(-100%)"};
  transition: transform 150ms ease-out;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  z-index: 999;
  transition: all 300ms ease-out;
  border-radius: 20px;
  width: 400px;
`;

const Cameria = styled(CameraIcon)`
  height: 1.75rem !important;
  width: 1.5rem !important;
  color: rgba(228, 38, 38, 1);
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(1 minmax(0, 1fr));
  .div {
    padding: 10px 20px;
    margin-top: 10px;
    border-radius: 99999px;
    background-color: rgba(220, 98, 80, 1);
    cursor: pointer;
  }

  .container {
    width: 100%;
    img {
      width: 100%;
      object-fit: contain;
      cursor: pointer;
    }
  }
`;

const Caption = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-weight: bold;
  font-size: 15px;
  margin: 0 10px;
  flex: 1;
  border: none;
  padding: 10px;
  text-align: center;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 0;
  margin: 30px;
  border-radius: 20px;
  border: none;
  background-color: rgba(239, 68, 68, 1);
  color: white;
  cursor: pointer;
`;
