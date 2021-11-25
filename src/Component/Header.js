import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  UserGroupIcon,
  ArchiveIcon,
  CollectionIcon,
  PaperAirplaneIcon,
  BellIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { SearchIcon, HomeIcon } from "@heroicons/react/solid";
import { Avatar, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { selectModels, setmodels } from "../features/Model/modelSlice";
import {
  selectImg,
  selectName,
  setLogin,
  setLogOut,
} from "../features/User/userSlice";
import { signInWithPopup, signOut } from "@firebase/auth";
import { auth, provider } from "../firebase";
import { useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const [scrolls, setScrolls] = useState(false);
  const img = useSelector(selectImg);
  const name = useSelector(selectName);
  const scroll = window.scrollY;
  const starter = useSelector(selectModels);

  const SignIn = () => {
    signInWithPopup(auth, provider).then((res) => {
      const result = res.user;
      dispatch(
        setLogin({
          name: result.displayName,
          img: result.photoURL,
          uid: result.uid,
          email: result.email,
        })
      );
    });
  };

  useEffect(() => {
    if (scroll >= 800) {
      setScrolls(true);
    } else {
      setScrolls(false);
    }
  }, [scroll]);

  const Open = () => {
    if (starter) {
      dispatch(setmodels({ starter: false }));
    } else {
      dispatch(setmodels({ starter: true }));
    }
  };

  const Sign = () => {
    signOut(auth, (result) => {
      dispatch(setLogOut({ name: null, img: null, uid: null, email: null }));
    });
  };

  return (
    <Container show={scrolls}>
      <Wrapper>
        <ImageContainer>
          <img src="./image/logo.png" alt="" />
          <InputContainer>
            <Searchs />
            <input type="text" placeholder="Search Facebook" />
          </InputContainer>
          <IconButtons>
            <SearchIcons />
          </IconButtons>
        </ImageContainer>
        <NavMenu>
          <Home />
          <Group />
          <Archive />
          <Collection />
        </NavMenu>
        {name ? (
          <RightContainer>
            <App onClick={Sign} src={img} />
            <Plus onClick={Open} />
            <Papper />
            <Bell />
          </RightContainer>
        ) : (
          <Button onClick={SignIn}>Sign In</Button>
        )}
      </Wrapper>
    </Container>
  );
}

export default Header;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1024px) {
    max-width: 72rem;
    margin-top: 0.25rem;
    margin: 0 auto;
  }
`;
const Container = styled.div`
  width: 100vw;
  padding-bottom: 0.5rem;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  top: 0;
  z-index: 9999;
  padding: 10px;
  position: ${(props) => (props.show ? "fixed" : "sticky")};
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
    height: 2.25rem;
  }
`;

const InputContainer = styled.div`
  display: none;
  margin-left: 0.75rem;
  @media (min-width: 768px) {
    display: inline-flex;
  }
  align-items: center;
  padding: 0.75rem 0.75rem;
  background-color: rgba(209, 213, 219, 1);
  border-radius: 9999px;
  input {
    border: none;
    :focus {
      outline: none;
    }
    outline: none;
    background-color: transparent;
    color: rgba(107, 114, 128, 1);
  }
`;

const Searchs = styled(SearchIcon)`
  height: 1.25rem;
  color: rgba(107, 114, 128, 1);
  margin-right: 0.5rem;
  pointer-events: none;
`;

const IconButtons = styled(IconButton)`
  @media (min-width: 768px) {
    opacity: 1;
    display: none;
    pointer-events: none;
  }
  margin-right: 0.5rem;
`;

const SearchIcons = styled(SearchIcon)`
  height: 1.25rem;
  @media (min-width: 768px) {
    display: none;
  }
  color: rgba(107, 114, 128, 1);
`;

const NavMenu = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const Home = styled(HomeIcon)`
  height: 1.75rem;
  margin: 0 1.75rem;
  cursor: pointer;
  color: rgba(37, 99, 235, 1);
  transition: all 150ms ease-in-out;
  :hover {
    color: rgba(37, 99, 235, 1);
  }
`;

const Group = styled(UserGroupIcon)`
  height: 2rem;
  margin: 0 1.75rem;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  border: 2px solid;
  border-radius: 9999px;
  border-color: rgba(107, 114, 128, 1);
  color: rgba(107, 114, 128, 1);
  :hover {
    color: rgba(37, 99, 235, 1);
    border-color: rgba(37, 99, 235, 1);
  }
`;

const Archive = styled(ArchiveIcon)`
  height: 2rem;
  margin: 0 1.75rem;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  color: rgba(107, 114, 128, 1);
  :hover {
    color: rgba(37, 99, 235, 1);
  }
`;

const Collection = styled(CollectionIcon)`
  height: 2rem;
  margin: 0 1.75rem;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  color: rgba(107, 114, 128, 1);

  :hover {
    color: rgba(37, 99, 235, 1);
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const App = styled(Avatar)`
  height: 2rem;
  margin: 0 1.75rem;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  color: rgba(107, 114, 128, 1);
  order: 2;
  @media (max-width: 768px) {
    margin: 0 0.75rem;
  }

  :hover {
    opacity: 0.75;
  }
`;

const Plus = styled(PlusIcon)`
  height: 1.5rem;
  border: 4px solid rgba(107, 114, 128, 1) !important;
  border-radius: 9999px;
  margin: 0 1.75rem;
  color: rgba(107, 114, 128, 1);
  cursor: pointer;
  transition: all 150ms ease-in-out;
  @media (max-width: 768px) {
    margin: 0 0.75rem;
    order: 1;
  }

  :hover {
    border-color: rgba(37, 99, 235, 1) !important;
    color: rgba(37, 99, 235, 1);
  }
`;

const Papper = styled(PaperAirplaneIcon)`
  height: 1.5rem;
  margin: 0 1.75rem;
  color: rgba(107, 114, 128, 1);
  cursor: pointer;
  transition: all 150ms ease-in-out;
  transform: rotate(45deg);

  :hover {
    color: rgba(37, 99, 235, 1);
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Bell = styled(BellIcon)`
  height: 1.5rem;
  margin-right: 0 1.75rem;

  color: rgba(107, 114, 128, 1);
  cursor: pointer;
  transition: all 150ms ease-in-out;

  :hover {
    color: rgba(37, 99, 235, 1);
    transform: rotate(-45deg);
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: rgba(96, 165, 250, 1);
`;
