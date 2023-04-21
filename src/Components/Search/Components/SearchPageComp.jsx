import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Grid,
  Divider,
  Skeleton,
  Collapse,
  Button,
} from "@chakra-ui/react";
import style from "./SearchPageComp.module.css";
import CardCom from "../../CommonComponents/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import PlayListAction from "../../../Redux/SpotifyPlayList/PlayListAction";
import SearchCard from "../../CommonComponents/SearchCard/SearchCard";

let colors = [
  "#2a3e5f",
  "#e13300",
  "#7f59d3",
  "#8ac24a",
  "#e91d63",
  "#ff9f00",
  "#0468aa",
  "#67a96a",
  "#fb641b",
  "#795448",
  "#ff5656",
  "#317e8b",
];

let names = [
  "Inspirational",
  "Devotional",
  "Taylor Swift",
  "Lata Mangeshkar",
  "Kishor Kumar",
  "Shreya Ghoshal",
  "Malayalam",
  "Neha Kakkar",
  "Arjit Singh",
  "Badshah",
  "A.R. Rahman",
  "Pritam",
];
let imageUrl = [
  "https://e-cdns-images.dzcdn.net/images/cover/6ec620d4f40e42115afefa8f0bffcc8e/1000x1000-000000-80-0-0.jpg",

  "https://e-cdns-images.dzcdn.net/images/cover/6499ebb53113e3c892f379a10998f7f0/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/cover/a98df7a584f8a3f50d4bb312bdbc44ff/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/cover/32b1dd7a97164ba140791834d70f7d4f/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/cover/4e8548d869896d1261f0212820b38e01/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/cover/294c32de03377edae31cd8bb094aab80/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/cover/c7cb0fc0a8858d7b4175ffde1125704d/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/cover/475cefb68c19c8e7dbf7f9b45b589fff/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/artist/f9bebdebb6db8441a126b5f2fb0c85d4/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/cover/af04edb2042b705632a9e144d86dba7a/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/artist/bd34315ef977a62a9e28c1ab19bb8ac4/1000x1000-000000-80-0-0.jpg",
  "https://e-cdns-images.dzcdn.net/images/artist/d4914ccd414067cd5e2c108867079a85/1000x1000-000000-80-0-0.jpg",
];

function SearchPageComp({ artist, heading, setPlaySong }) {
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  

  const data = useSelector((store) => {
    return store.playListReducer.songs;
  });

  useEffect(() => {
    dispatch(PlayListAction(""));
  }, [useSelector, dispatch, artist]);

  // console.log("data", data);
  return (
    <Box className={style.SpotifyPlaylist} pb="140px">
      {/* //! first Container made for search results */}
      {data?.length > 0 ?<Flex
        justify={"space-between"}
        mt={["42px", "42px", "42px", "60px", "60px"]}
      >
        <Heading>Recent searches</Heading>
        <Button
          variant={"unstyled"}
          color={"#fff"}
          size="sm"
          onClick={handleToggle}
          mt="1rem"
        >
          Show {show ? "Less" : "More"}
        </Button>
      </Flex>:null}

      {data?.length > 0 ? <Collapse startingHeight={290} in={show}>
        <Grid
          className={style.listContainer}
          flexWrap="wrap"
          gridTemplateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(5, 1fr)",
            "repeat(5, 1fr)",
          ]}
          gap="20px"
        >
          {data?.length > 0
            ? data.map((ele, ind) => {
                return <CardCom prop={ele} setPlaySong={setPlaySong} />;
              })
            : null}
        </Grid>
      </Collapse>
:null}

  {/* //! SEcond Container made for search feeds*/}
      <Flex
        justify={"space-between"}
        mt={["42px", "42px", "42px", "60px", "60px"]}
      >
        <Heading>Browse all</Heading>
      </Flex>

      <Grid
        className={style.SearchlistContainer}
        flexWrap="wrap"
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap="20px"
      >
        {colors.map((color, ind) => {
          return (
            <Box
              onClick={() => {
                dispatch(PlayListAction(names[ind]));
                window.scrollTo({
                  top: -50,
                  left: 100,
                  behavior: 'smooth'
                });
              }}
            >
              <SearchCard
                color={color}
                name={names[ind]}
                imageUrl={imageUrl[ind]}
              />
            </Box>
          );
        })}
      </Grid>

      <Divider mt={"50px"} mb={"50px"} />
    </Box>
  );
}

export default SearchPageComp;
