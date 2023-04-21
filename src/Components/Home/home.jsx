import {useState} from 'react';
import Navbar from "../CommonComponents/Navbar/Navbar";
import Sidebar from "../CommonComponents/Sidebar/sidebar";
import {  Box ,Button} from "@chakra-ui/react";
import styles from "./home.module.css";
import Preview from "./HomeComponents/Preview";
import SpotifyPlaylist from "./HomeComponents/SpotifyPlaylist";
import AnimatedPages from "../../AinmatedPages";
import SuggestedArtists from './HomeComponents/SuggestedArtists';
import SpotifyAudioPlayer from "../CommonComponents/AudioPlayer/SpotifyAudioPlayer";
import { useColorMode, useColorModeValue } from '@chakra-ui/react' 

const Home = () => {
  const [playSong, setPlaySong] = useState({
    songUrl: "",
    playSong: false,
    img: "",
    songName: "",
    singer: "",
  });
 
  return (
    <>
    <AnimatedPages>
      <Box ml={["80px","80px" ,"196px","196px","196px","196px"]} mb="60px" className={styles.homeContainer}>
      
        <Navbar bgColor="black" />
        <AnimatedPages>
        <SpotifyPlaylist artist={'Shreya Ghoshal'} heading={"Shreya Ghoshal"} setPlaySong={setPlaySong}/>
        <SuggestedArtists setPlaySong={setPlaySong}/>
        
        <SpotifyPlaylist artist={'Badshah'} heading={"Badshah"} setPlaySong={setPlaySong} />
        
        <SpotifyPlaylist artist={'Pritam'} heading={"Pritam"} setPlaySong={setPlaySong} />
        </AnimatedPages>
        <Sidebar />
        
      </Box>
      {playSong.playSong ? <SpotifyAudioPlayer song={playSong} /> : <Preview />}
       </AnimatedPages>
       </>
  );
};

export { Home };
