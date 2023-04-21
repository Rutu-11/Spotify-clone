import { PaymentOtp } from "./Components/Payment/PaymentOtp";

import { Home } from "./Components/Home/home";
import { Login } from "../src/Components/Login/Log_in/login";
import { Like } from "./Components/Like/like";
import { Upgrade } from "./Components/Upgrade/upgrade";
import { Signup } from "../src/Components/Login/SignUp/SignUp";
import { Otp } from "../src/Components/Login/Log_in/Otp";
import { Routes, Route, useLocation } from "react-router-dom";
import { PrivatePayment } from "./Components/Payment/plansDetails/PrivatePayment";
import { Payment } from "./Components/Payment/payment";
import NotFound from "./Components/CommonComponents/NotFoundPage/Notfound";
import { AnimatePresence } from "framer-motion";
import { PaymentSuccess } from "./Components/Payment/PaymentSuccess";
import { SearchPage } from "./Components/Search/SearchPage";
import TwitterHeart from "./Components/CommonComponents/LikeAnimation/LikeAnimation";
import Playlist from "./Components/Playlist/Playlist";
import { Library } from "./Components/Libaray/LibarayPage";

import PlaylistDetails from "./Components/Playlist/PlaylistComponent/PlaylistDetails";
import Account from "./Components/Accounts/Accounts";
import PrivateLogin from "./Components/CommonComponents/Routes/PrivateLogin";
import LyricsData from "./Lyrics/LyricsData";
import { NotPremium } from "./Lyrics/NotPremium";
import {useEffect} from 'react'
import {gapi} from 'gapi-script'
const clientId = "619667535332-hnpndj658ttkq6p50hfn3age6f9m23uq.apps.googleusercontent.com"
function App() {
  const location = useLocation();
  // useEffect(()=>{
  //   function start(){
  //     gapi.client.init({
  //       clientId:clientId,
  //     scope:""
  //     })
  //   }
  //   gapi.load('client:auth2',start)
  // },[])
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/library" element={<Library />} /> */}
          <Route path="/like" element={<Like />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TwitterHeart />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Otp" element={<Otp />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentotp" element={<PaymentOtp />} />
            <Route path="/account" element={<Account/>}/>
          <Route path="/lyrics" element={<LyricsData />} />

          <Route path="/playlistDetails" element={<PlaylistDetails/>}/>
          <Route path="/NotPremium" element={<NotPremium/>}/>
          

          <Route
            path="/payment"
            element={
              <PrivatePayment>
                <Payment />
              </PrivatePayment>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
