import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  VStack,
  HStack,
  Heading,
  Flex,
  Divider,
  Input,
  FormLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormHelperText,
  Checkbox,
  Text,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "./GoogleButton";
import { FacebookButton } from "./FacebookButton";
import { Head } from "./Head";
import { useSelector, useDispatch } from "react-redux";
// import emailjs from '@emailjs/browser';
import { Link } from "react-router-dom";

function Signup() {
  const clientId =
    "619667535332-hnpndj658ttkq6p50hfn3age6f9m23uq.apps.googleusercontent.com";
  // -------------------useselector-----------------
  const data = useSelector((payload) => {
    return payload.SignupReducer;
  });
  console.log(data);

  const navigate = useNavigate();
  // --------------useState for form data------------
  const [list, setList] = useState([]);

  // --------------------dispatch------------
  const dispatch = useDispatch();

  const toast = useToast();
  // ------------localStorage-------------------------
  const user = JSON.parse(localStorage.getItem("userDetail")) || [];

  // ---------------------google SignUp------------------------
  const loging = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const Userdata = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        user.push(Userdata.data);
        localStorage.setItem("userDetail", JSON.stringify(user[0]));
        localStorage.setItem("flag", true);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: Userdata.data,
        });
        console.log(Userdata.data);
        navigate("/");
      } catch {
        console.log("error");
      }
    },
  });

 

  const [signUp, setSignup] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    setSignup({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signUp);
    localStorage.setItem("userDetail", JSON.stringify(signUp));
    // fetch("https://clumsy-toad-hose.cyclic.app/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(signUp),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if(res.user){
    //       localStorage.setItem("userDetail", JSON.stringify(res.user));
    //       toast({
    //         title: 'Login Successful',
    //         description: "redirected to login",
    //         status: 'success',
    //         duration: 2000,
    //         isClosable: true,
    //         position: 'top',
    //     })
        navigate("/login");
    //     console.log(res);
    //     }
    //     else{
    //       toast({
    //                 title: 'Something went wrong',
    //                 description: "User Already exists",
    //                 status: 'error',
    //                 duration: 3000,
    //                 isClosable: true,
    //                 position: 'top',
    //             })
    //     }
        
    //   });

    setSignup({
      email: "",
      password: "",
      name: "",
    });
  };

  
  // const onSuccess =(res)=>{
  //     console.log("LOGIN SUCCESS! res",res.profileObj )
  //     localStorage.setItem("userDetail", JSON.stringify(res.profileObj))

  // }
  // const onFailure =(res)=>{
  //     console.log("LOGIN FAILED! res",res)
  // }

  // ------------component------------------------
  return (
    <>
      <VStack
        w="100%"
        bgGradient="linear(to-b, #1ed760, RGBA(0, 0, 0.5, 0.9),#000000)"
      >
        <Head />
        <Flex
          display="flex"
          align="center"
          direction={["column", "column", "row"]}
          justifyContent="center"
          w="50%"
          m="auto"
          gap="20px"
          
        >
          <VStack
            h="full"
            w="68%"
            m="auto"
            display="flex"
            alignItems="center"
            justifyContent="center"
            pos="relative"
            bgGradient="linear(to-b,#000000, #1ed760)"
            zIndex="2"
            boxShadow="#1ed760 0px 19px 38px, #1ed760 0px 15px 12px"
            minWidth="380px"
          >
            <form
              style={{ width: "98%", height: "98%" }}
              onSubmit={handleSubmit}
            >
              <Flex
                w="full"
                h="100%"
                bgGradient="linear(to-b, #1ed760, RGBA(0, 0, 0.5, 0.9),#000000)"
                justify="center"
                align="center"
                mt="5px"
                mb="5px"
                zIndex="100"
                direction="column"
              >
                {/* <Heading
                                    textAlign="center"
                                    mt="20px"
                                >
                                    Sign Up
                                </Heading> */}
                <FormControl
                  w="84%"
                  color="white"
                  mb="20px"
                  mt="30px"
                  align="center"
                  isRequired
                >
                  <FormLabel fontSize="0.875rem">What's your email?</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email."
                    border="1px solid white"
                    _placeholder={{ color: "white" }}
                    _focus={{ border: "2px solid white" }}
                    onChange={handleChange}
                  />
                  <FormLabel fontSize="0.875rem">Create a password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    border="1px solid white"
                    _placeholder={{ color: "white" }}
                    _focus={{ border: "2px solid white" }}
                    minLength={6}
                    onChange={handleChange}
                  />
                  <FormLabel fontSize="0.875rem">
                    What should we call you?
                  </FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter a profile Name"
                    border="1px solid white"
                    _placeholder={{ color: "white" }}
                    _focus={{ border: "2px solid white" }}
                    minLength={4}
                    onChange={handleChange}
                  />
                  <FormHelperText fontSize="0.799rem" color="" textAlign="left">
                    This appears on your profile.
                  </FormHelperText>
                  <FormLabel fontSize="0.875rem" mt="8px">
                    What's your date of birth?
                  </FormLabel>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    placeholder="dd/mm/yyyy"
                    border="1px solid white"
                    _placeholder={{ color: "white" }}
                    _focus={{ border: "2px solid white" }}
                    _hover={{ bg: "green" }}
                    onChange={handleChange}
                  />
                  <FormLabel fontSize="0.875rem">What's your gender?</FormLabel>
                  <RadioGroup
                    defaultValue=""
                    _focus={{ border: "2px solid white" }}
                    display="flex"
                    flexWrap="wrap"
                    colorScheme="green"
                  >
                    <HStack
                      spacing="10px"
                      display="flex"
                      flexWrap="wrap"
                      name="gender"
                      onChange={handleChange}
                    >
                      <Radio name="gender" value="male">
                        Male
                      </Radio>
                      <Radio name="gender" value="female">
                        Female
                      </Radio>
                      <Radio name="gender" value="other">
                        Others
                      </Radio>
                      <Radio name="gender" value="Prefer not to say">
                        Prefer not to say
                      </Radio>
                    </HStack>
                  </RadioGroup>
                  {/* <Checkbox mt="10px" colorScheme="green">
                    <Text fontSize="13px" mt="10px">
                      Share my registration data with Spotify's content
                      providers for marketing purposes.
                    </Text>
                  </Checkbox> */}
                  <Text fontSize="10px" mt="10px" textAlign="center">
                    By clicking on sign-up, you agree to Spotify's{" "}
                    <Link
                      href="https://www.spotify.com/us/legal/end-user-agreement/"
                      color="#1ed760"
                    >
                      Terms and Conditions of Use
                    </Link>
                    .
                  </Text>
                  <Text fontSize="10px" mt="10px" textAlign="center">
                    To learn more about how Spotify collects, uses, shares and
                    protects your personal data, please see{" "}
                    <Link
                      href="https://www.spotify.com/us/legal/end-user-agreement/"
                      color="#1ed760"
                    >
                      Spotify's Privacy Policy
                    </Link>
                  </Text>
                  <Input
                    type="submit"
                    value="Sign up"
                    bg="#1ed760"
                    color="black"
                    fontSize="20px"
                    fontWeight="700"
                    h="40px"
                    borderRadius="40px"
                    mt="10px"
                    w="180px"
                    border="none"
                    _hover={{ bg: "#b5f7bc" }}
                  />
                  <Text fontSize="16px" mt="10px" textAlign="center">
                    Have an account?{" "}
                    <Link to="/login" color="#1ed760">
                      Log in
                    </Link>
                    <GoogleButton loging={loging}/>
                  </Text>
                </FormControl>
              </Flex>
            </form>
          </VStack>
        </Flex>
      </VStack>
    </>
  );
}

export { Signup };

/**
 * {/* <VStack h="full" w="full"> */
{
  /* -------------facebook button------------ */
}
{
  /* <FacebookButton 
                        /> */
}
{
  /* ------------google button------------------ */
}
{
  /* <GoogleButton
                            loging={loging}
                        /> */
}
{
  /* <GoogleLogin 
                        width={'200px'}
                        clientId = {clientId}
                        buttonText="Login"
                        onSuccess = {onSuccess}
                        onFailure = {onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                         />   */
}
{
  /* </VStack> */
}
{
  /* <Divider orientation="vertical" /> */
}
