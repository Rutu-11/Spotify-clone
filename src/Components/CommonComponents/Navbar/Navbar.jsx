import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  Button,
  Spacer,
  IconButton,
  Image,
  Heading,
  Text,
  Fade,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  transition,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  
} from "@chakra-ui/react";
import { useDisclosure ,useColorModeValue} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  ExternalLinkIcon,
  EditIcon,
  SearchIcon,
  AddIcon,

} from "@chakra-ui/icons";

import { FaPowerOff, FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayListAction from "../../../Redux/SpotifyPlayList/PlayListAction";
import { HiOutlineHome } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { BiLibrary } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useColorMode } from '@chakra-ui/react' 
function Navbar({ bgColor }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const btnRef = React.useRef();

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  
  const getSongBySearch = (e) => {
    const key = e.code;
    if (key == "Enter") {
      dispatch(PlayListAction(search));
    }
  };
  const {name, email, picture} = JSON.parse(localStorage.getItem("userDetail"))|| {}
  const flag = localStorage.getItem("flag") || false;
console.log(name,email,picture,"888")
  const SearchFlag = localStorage.getItem("SearchFlag");

  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('#ffff', '#000000')
  const color = useColorModeValue('white', '#b3b3b3')

  function  downloadApp () {
    const link = document.createElement("a");
    link.download = "spotifyAppDownload.exe";
    link.href = `https://github.com/AnandRP2030/Spotify-clone/raw/master/src/Components/CommonComponents/Sidebar/assets/spotifyAppDownload.exe`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("called");
  };

  // function logout(){
  //   const {email} = localStorage.getItem('userDetail')
  //   localStorage.removeItem("userDetail")
  //   fetch("https://clumsy-toad-hose.cyclic.app/logout", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({email}),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       // localStorage.removeItem("userDetail");
  //       // localStorage.removeItem("flag");
  //       navigate("/");
  //       dispatch({type:"LOGOUT_USER"})
        
       
  //     });
  // }
  function logout(){
    const { email, user_id } = localStorage.getItem('userDetail');
    localStorage.removeItem("userDetail");
    localStorage.removeItem("flag");
    localStorage.removeItem("token");
    navigate("/");
    fetch("https://clumsy-toad-hose.cyclic.app/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, user_id }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({type:"LOGOUT_USER"});
       
      });
  }

  return (
    <>
      <Flex
        className={styles.navbarContainer}
        justify="space-between"
        bg={"#000000"}
        padding="7px 30px"
        position="fixed"
        top="0px"
        left={["80px", "80px", "175px", "175px", "175px", "175px"]}
        right={"0"}
      >
       
        {/* //! pagination buttons */}
        <Box display={["none", "none", "none", "flex", "flex"]}>
          <IconButton
            color={"#7a7a7a"}
            cursor="not-allowed"
            bg={"#090909"}
            mr="10px"
            r={"white"}
            aria-label="Search database"
            size="lg"
            variant={"unstyled"}
            icon={<ChevronLeftIcon boxSize={8} />}
          />
          <IconButton
            color={"#7a7a7a"}
            cursor="not-allowed"
            bg={"#090909"}
            mr="10px"
            r={"white"}
            aria-label="Search database"
            size="lg"
            variant={"unstyled"}
            icon={<ChevronRightIcon boxSize={8} />}
          />
        </Box>

        {/* //! search section */}
        {SearchFlag != null ? (
          <Box>
            <InputGroup>
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyUp={getSongBySearch}
                htmlSize={25}
                width="auto"
                borderRadius="50px"
                bg={"white"}
                height={["33px", "33px", "33px", "33px", "37px", "38px"]}
                focusBorderColor="black.400"
                placeholder="What do you want to listen to?"
                onClick={() => {
                  navigate("/search");
                }}
                _placeholder={{ opacity: 1, color: "gray.500" }}
              />
              <InputLeftElement>
                <SearchIcon boxSize={"20px"} color={"#000000"} />
              </InputLeftElement>
            </InputGroup>
          </Box>
        ) : null}
        <Spacer />


        {name != null ? (
          <>
            <Link to="/upgrade">
              <Button
                className={styles.navButtons}
                variant={"unstyled"}
                bg="blackAlpha.100"
                m={"0 20px"}
                borderRadius="25px"
                w="95px"
                border={"1px solid white"}
                display={["none", "none", "none", "flex", "flex"]}
              >
                Upgrade
              </Button>
            </Link>

             {/* //! vertical Divider  */}

             <Divider
                orientation="vertical"
                m={"0 20px"}
                fontSize="25px"
                w={"auto"}
                display={["none", "none", "none", "flex", "flex"]}
              />


            <Flex
           
              justify={"space-between"}
              align={"center"}
              bg="black"
              borderRadius="25px"
              h={"45px"}
              w={"xsm"}
            >
              <Image className={styles.image}
                borderRadius="full"
                boxSize="40px"
                src={flag ? picture :`https://tse2.mm.bing.net/th?id=OIP.Z306v3XdxhOaxBFGfHku7wHaHw&pid=Api&P=0`}
                alt={name}            
                onMouseOver={onToggle}
                onMouseOut={onToggle}
                onClick={onOpen}
                mr="15px"
                _hover={{boxSize:"41px"}}
              />
              <Text
                variant={"unstyled"}
                bg={"blackAlpha.200"}
                mr={1}
                display={["none", "none", "flex", "flex", "flex"]}
              >
                {name}
              </Text>

              <Box>
                {/* //! menubutton */}
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        as={IconButton}
                        borderRadius="25px"
                        bg="blackAlpha.900"
                        color="white"
                        variant={"unstyled"}
                        aria-label="Options"
                        icon={
                          isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />
                        }
                      />
                      
                      <MenuList w="xsm" bg={"black"}>

                      <MenuItem
                          icon={<ExternalLinkIcon boxSize={5} />}
                          bg="black"
                          onClick={()=>{navigate('/account')}}
                        >
                          {" "}
                          Account
                        </MenuItem>
                        
                      <MenuItem icon={<EditIcon boxSize={5} />} bg="black">
                          {" "}
                          Profile
                        </MenuItem>

                      <MenuItem
                          icon={<HiOutlineHome size={21} />}
                          bg="black"
                          onClick={()=>{navigate('/')}}
                        >
                          Home
                        </MenuItem>

                        <MenuItem
                          icon={<IoSearchOutline size={21} />}
                          bg="black"
                          onClick={()=>{navigate('/search')}}
                        >
                          Search
                        </MenuItem>

                        <MenuItem
                          icon={<AddIcon boxSize={5} />}
                          bg="black"
                          onClick={()=>{navigate('/playlist')}}
                        >
                          Create Playlist
                        </MenuItem>
                        <MenuItem
                          icon={<AiFillHeart fontSize={21} />}
                          bg="black"
                          onClick={()=>{navigate('/like')}}
                        >
                          {" "}
                          Liked Songs
                        </MenuItem>
                        <MenuItem
                          icon={<ExternalLinkIcon boxSize={5} />}
                          bg="black"
                          onClick={()=>{navigate('/upgrade')}}
                        >
                          {" "}
                          Upgrade to Premium
                        </MenuItem>
                       
                        {/* <MenuItem
                          icon={<ExternalLinkIcon boxSize={5} />}
                          bg="black"
                        >
                          {" "}
                          Settings
                        </MenuItem> */}
                        <MenuDivider />
                        <MenuItem
                          icon={<FaPowerOff size={18} />}
                          bg="black"
                          onClick={() => {
                            logout();
                          }}
                        >
                          Log out
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </Box>
              <Fade in={isOpen} mt="50px" mr="80px">
                <Button
                  bg="blackAlpha.900"
                  color="white"
                  mt={"100px"}
                  ml="-110px"
                >
                  {name}
                </Button>
              </Fade>
            </Flex>
          </>
        ) : (
          <>
            {/* //! navbar section */}
            <Flex align={"center"} alignItems="center">
              <Link to={"/upgrade"}>
                <Button
                  className={styles.navButtons}
                  variant={"unstyled"}
                  bg="#090909"
                  m={"0 8px"}
                  borderRadius="25px"
                  w="90px"
                  display={["none", "none", "none", "flex", "flex"]}
                >
                  Premium
                </Button>
              </Link>

              <a target={'_blank'} href="https://medium.com/@rutujadhekolkar97/spotify-clone-using-react-js-and-chakra-ui-ca9f0dfee88f"   >
                <Button
                  className={styles.navButtons}
                  variant={"unstyled"}
                  bg="#090909"
                  m={"0 8px"}
                  borderRadius="25px"
                  w="90px"
                  display={["none", "none", "none", "flex", "flex"]}
                >
                  Support
                </Button>
              </a>

              <Link to={""}>
                <Button
                  className={styles.navButtons}
                  variant={"unstyled"}
                  bg="#090909"
                  m={"0 8px"}
                  borderRadius="25px"
                  w="95px"
                  display={["none", "none", "none", "flex", "flex"]}
                  onClick={() => {downloadApp()}}
                >
                  Download
                </Button>
              </Link>

              {/* //! vertical Divider  */}

              <Divider
                orientation="vertical"
                m={"0 20px"}
                fontSize="25px"
                w={"auto"}
                display={["none", "none", "none", "flex", "flex"]}
              />

              <Link to={"/signup"}>
                <Button
                  className={styles.navButtons}
                  variant={"unstyled"}
                  bg="#090909"
                  m={"0 8px"}
                  borderRadius="25px"
                  w="90px"
                  display={["none", "none", "none", "flex", "flex"]}
                >
                  Sign Up
                </Button>
              </Link>

              <Link to={"/login"}>
                <Button
                  className={styles.login}
                  variant={"unstyled"}
                  bg="#ffffff"
                  color={"#000000"}
                  borderRadius="25px"
                  w="90px"
                  display={["none", "none", "none", "flex", "flex"]}
                >
                  Log In
                </Button>
              </Link>
            </Flex>
          </>
        )}
      </Flex>
      
    </>
  );
}

export default Navbar;
