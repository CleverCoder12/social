import React, { useEffect, useState } from "react";
import faker from "faker";
import Story from "./Story";
import styled from "styled-components";

function Stories() {
  const [stories, setStories] = useState();
  useEffect(() => {
    const suggestion = [...Array(60)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setStories(suggestion);
  }, []);

  return (
    <Wrapper>
      {stories?.map((profile) => (
        <Story key={profile?.id} img={profile?.avatar} name={profile?.name} />
      ))}
    </Wrapper>
  );
}

export default Stories;

const Wrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  margin-top: 1rem;
  width: 100%;
`;
