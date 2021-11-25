import { Avatar, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import {
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import Moment from "react-moment";
import { selectEmail, selectImg, selectName } from "../features/User/userSlice";
import { useSelector } from "react-redux";
import { deleteObject, ref } from "@firebase/storage";

function Posts({ img, name, avatar, caption, id }) {
  const names = useSelector(selectName);
  const image = useSelector(selectImg);
  const [input, setInput] = useState(null);
  const [work, setWork] = useState([]);
  const email = useSelector(selectEmail);

  const SubmitComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "post", id, "comment"), {
      timestamp: serverTimestamp(),
      name: names,
      img: image,
      comment: input,
    });

    setInput("");
  };
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "post", id, "comment"), orderBy("timestamp", "asc")),
      (snapshot) => {
        setWork(snapshot.docs);
      }
    );
  }, [id]);

  const Delete = async () => {
    const emails = "clevertino56@gmail.com";

    if (email === emails) {
      await deleteDoc(doc(db, "post", id));

      const desertRef = ref(storage, `post/${id}/image`);
      deleteObject(desertRef)
        .then(() => {
          alert("this post has successfully been deleted");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Avatars src={avatar} />
        <span>{name}</span>

        <DotsHorizontalIcons onClick={Delete} />
      </Wrapper>
      <Post>
        <img src={img} alt="post" />
      </Post>
      <Media>
        <Left>
          <Heart />
          <Chat />
          <Paper />
        </Left>
        <Right />
      </Media>
      <Caption>
        <span>{name} </span>
        <p>{caption}</p>
      </Caption>
      <Maker>
        {work.map((snap) => (
          <Comment>
            <Avatares src={snap?.data().img} />
            <span>{snap?.data().name}</span>
            <p>{snap?.data().comment}</p>
            <Moments fromNow>{snap.data().timestamp?.toDate()}</Moments>
          </Comment>
        ))}
      </Maker>

      <Form>
        <EmojiHappyIcons />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Add an Comment"
        />
        <Buttons disabled={!input} type="button" onClick={SubmitComment}>
          Send
        </Buttons>
      </Form>
    </Container>
  );
}

export default Posts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 4px;
  max-width: 809px;
  margin: 0 auto;
  margin-top: 1.25rem;
  margin-bottom: 60px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 42px;
  @media (max-width: 769px) {
    padding: 10px 5px;
  }

  span {
    margin-left: 0.625rem;
    font-weight: bold;
    flex: 1;
    cursor: pointer;
  }
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Post = styled.div`
  img {
    width: 100%;
    object-fit: contain;
  }
`;
const DotsHorizontalIcons = styled(DotsHorizontalIcon)`
  height: 1.75rem;
  color: rgba(107, 114, 128, 1);
  margin-right: 5px;
  cursor: pointer;
`;

const Avatars = styled(Avatar)`
  cursor: pointer;
  transition: opacity 150ms ease-out;

  :hover {
    opacity: 0.75;
  }
`;

const Media = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div``;
const Right = styled(BookmarkIcon)`
  height: 1.75rem;
  color: rgba(107, 114, 128, 1);
  margin: 0 5px;
  cursor: pointer;
`;

const Heart = styled(HeartIcon)`
  height: 1.75rem;
  color: rgba(107, 114, 128, 1);
  margin: 0 5px;
  cursor: pointer;
`;

const Chat = styled(ChatIcon)`
  height: 1.75rem;
  color: rgba(107, 114, 128, 1);
  margin: 0 5px;
  cursor: pointer;
`;
const Paper = styled(PaperAirplaneIcon)`
  height: 1.75rem;
  color: rgba(107, 114, 128, 1);
  transform: rotate(45deg);
  margin: 0 5px;
  cursor: pointer;
`;

const EmojiHappyIcons = styled(EmojiHappyIcon)`
  height: 1.75rem;
  color: rgba(107, 114, 128, 1);
  margin: 0 5px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  input {
    flex: 1;
    border: none;
    border-bottom: 1px solid rgba(107, 114, 128, 1);
    color: rgba(107, 114, 128, 1);
    font-weight: 600;
    :focus {
      outline: none;
    }
  }
  margin: 5px 0;
`;

const Buttons = styled(Button)`
  color: rgba(96, 165, 250, 1) !important;
  font-weight: 700 !important;
  cursor: pointer !important;
`;

const Caption = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;

  span {
    color: black;
    font-weight: 700;
    margin-left: 5px;
  }
  p {
    margin-left: 10px;
    font-weight: 500;
    color: rgba(107, 114, 128, 1);
  }
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  max-height: 130px;
  overflow-y: auto;

  span {
    color: black;
    font-weight: 700;
    margin-left: 10px;
  }
  p {
    margin-left: 10px;
    font-weight: 700;
    font-size: 13px;
    color: rgba(107, 114, 128, 1);
    flex: 1;
  }
`;

const Moments = styled(Moment)`
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(107, 114, 128, 1);
`;

const Avatares = styled(Avatar)`
  width: 30px !important;
  height: 30px !important;
  margin-left: 10px;
`;

const Maker = styled.div`
  max-height: 140px;
  overflow-y: auto;
`;
