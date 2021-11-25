import React, { useEffect, useState } from "react";
import faker from "faker";
import styled from "styled-components";
import {
  CameraIcon,
  DotsHorizontalIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { Avatar } from "@material-ui/core";

function Contact() {
  const [suggestion, setSuggestion] = useState([]);
  useEffect(() => {
    const suggestion = [...Array(10)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestion(suggestion);
  }, []);
  return (
    <Container>
      <Header>
        <Left>Contacts </Left>
        <Right>
          <Cameria />
          <Search />
          <Dot />
        </Right>
      </Header>
      <List>
        {suggestion.map((profile) => (
          <Make>
            <Avatars key={profile.id} src={profile.avatar} />
            <Span>{profile.username}</Span>
          </Make>
        ))}
      </List>
    </Container>
  );
}

export default Contact;
const Container = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  max-height: 580px;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const List = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 480px;
  overflow-y: scroll;
`;

const Left = styled.div`
  color: rgba(107, 114, 128, 1);
  font-weight: 600;
`;
const Right = styled.div`
  display: flex;
`;
const Search = styled(SearchIcon)`
  height: 1.4rem;
  margin: 0 1rem;
  color: rgba(107, 114, 128, 1);
  transition: all 150ms ease-out;
  cursor: pointer;

  :hover {
    color: rgba(37, 99, 235, 1);
  }
`;
const Cameria = styled(CameraIcon)`
  height: 1.4rem;
  color: rgba(107, 114, 128, 1);
  margin: 0 1rem;
  transition: all 150ms ease-out;
  cursor: pointer;

  :hover {
    color: rgba(37, 99, 235, 1);
  }
`;
const Dot = styled(DotsHorizontalIcon)`
  height: 1.4rem;
  color: rgba(107, 114, 128, 1);
  margin: 0 1rem;
  transition: all 150ms ease-out;
  cursor: pointer;

  :hover {
    color: rgba(37, 99, 235, 1);
  }
`;

const Span = styled.div`
  font-weight: 700;
  color: rgba(107, 114, 128, 1);
  margin-left: 10px;
  transition: all 150ms ease-out;
  cursor: pointer;

  :hover {
    color: rgba(37, 99, 235, 1);
  }
`;

const Make = styled.div`
  display: flex;
  margin: 10px 0;
  align-items: center;
`;

const Avatars = styled(Avatar)`
  transition: opacity 150ms ease-out;
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
`;
