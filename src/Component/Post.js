import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Posts from "./Posts";

function Post() {
  const [suggestion, setSuggestion] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "post"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSuggestion(snapshot.docs);
      }
    );
  }, []);

  return (
    <Wrapper>
      {suggestion.map((profile) => (
        <Posts
          key={profile?.id}
          name={profile?.data().username}
          img={profile?.data().Image}
          avatar={profile?.data().profile}
          caption={profile?.data().caption}
          id={profile.id}
        />
      ))}
    </Wrapper>
  );
}

export default Post;

const Wrapper = styled.div``;
