import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Grid,
  Skeleton,
  Collapse,
  Button,
} from "@chakra-ui/react";
import style from "./SpotifyPlaylist.module.css";
import CardCom from "../../CommonComponents/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import PlayListAction from "../../../Redux/SpotifyPlayList/PlayListAction";

function SpotifyPlaylist({ artist, heading, setPlaySong }) {
  const dispatch = useDispatch();
  // const [data, setData] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  const data = useSelector((store) => {
    return store.playListReducer.songs;
  });

  useEffect(() => {
    dispatch(PlayListAction(artist));
  }, [useSelector, dispatch, artist]);


  // const songlist = useSelector((store) => {
  //   return store.playListReducer.songs;
  // });
  // const getSongs=(artist)=>{
  //   dispatch(PlayListAction(artist));
  //   setData(songlist)
    // fetch(`https://clumsy-toad-hose.cyclic.app/search?q=${artist}`)
    // .then((response) => {
    //   return response.json();
    // })
    // .then((response) => {
    //   setData(response.data);
      
    // })
    // .catch((e) => {
    //   console.log(e.message);
    // });
  // }
 

  // useEffect(() => {
  //   dispatch(PlayListAction(artist));
  //   setData(songlist)
  //   console.log('homeata',data)
  //   // getSongs(artist);
  // }, [useSelector, dispatch, artist]);



  return data?.length > 0 ? (
    <Box className={style.SpotifyPlaylist} mb="-40px">

      <Flex
        justify={"space-between"}
        mt={["42px", "42px", "42px", "60px", "60px"]}
      >
        <Heading>More like {heading}</Heading>
        <Button
          variant={"unstyled"}
          color={"#fff"}
          size="sm"
          onClick={handleToggle}
          mt="1rem"
        >
          Show {show ? "Less" : "More"}
        </Button>
      </Flex>
      <Collapse startingHeight={250} in={show}>
        <Grid
          className={style.listContainer}
          flexWrap="wrap"
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(5, 1fr)",
            "repeat(6, 1fr)",
          ]}
          gap="20px"
        >
          {data.map((ele, index) => {
            return <CardCom key={index} prop={ele} setPlaySong={setPlaySong} />;
          })}
        </Grid>
      </Collapse>
    </Box>
  ) : (
    // ! Skeleton to display before page load
    <Grid
      flexWrap="wrap"
      gridTemplateColumns={[
        "repeat(2, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
        "repeat(6, 1fr)",
        "repeat(6, 1fr)",
      ]}
      gap="20px"
      bg="#121212"
    >
      {[...new Array(20)].map((ele, index) => {
        return (
          <Box key={index}>
            <Skeleton height="300px" startColor="#000000" endColor="#434343" />
          </Box>
        );
      })}
    </Grid>
  );
}

export default SpotifyPlaylist;
