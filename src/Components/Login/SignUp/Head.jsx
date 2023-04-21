import React from 'react'
import {Flex,VStack,Image,Heading} from "@chakra-ui/react"
export function Head() {
    return (
        <Flex mb={["45px", "50px", "55px"]}>
            <VStack mt="30px" h="50px">
                <Image
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
                    alt="Spotify_Logo"
                    h="full"
                />
                <Heading
                    fontSize="1.5rem"
                    letterSpacing="-0.04em"
                    textAlign="center"
                >
                    Sign up for free to start listening.
                </Heading>
            </VStack>
        </Flex>
    )
}
