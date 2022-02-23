import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

function Story({ name }) {
  const img = "/image/avatar.webp";
  return (
    <Container show={img}>
      <Wrapper>
        <Avatars src={img} />
        <Name>{name}</Name>
      </Wrapper>
    </Container>
  );
}

export default Story;

const Container = styled.div`
  width: 10rem;
  height: 13rem;
  margin-top: 1rem;
  margin: 0 1.25rem;
  background-image: ${(props) => `url(${props.show})`};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 1.25rem;
  cursor: pointer;
  transition: 150ms ease-out;

  :hover {
    opacity: 0.75;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Avatars = styled(Avatar)`
  img {
    border: 4px solid #408eed;
    border-radius: 9999px;
  }
  margin: 0.5rem;
`;

const Name = styled.div`
  width: 6rem;
  line-height: 1rem;
  font-size: 0.75rem;
  padding: 0.5rem;
  color: white;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
