import { Text, Center, Spacer } from "@chakra-ui/react";
import React from "react";

function NotFound() {
  return (
    <Center w="100vw" h="100vh" bg="blackAlpha.800" flexDir="column">
      <Text
        bgGradient="linear(to-r, green.200, pink.500)"
        bgClip="text"
        fontWeight="extrabold"
        fontSize="9xl"
      >
        404
      </Text>
      <Text
        bgGradient="linear(to-r, green.200, pink.500)"
        bgClip="text"
        fontWeight="extrabold"
        fontSize="6xl"
      >
        Not Found :(
      </Text>
    </Center>
  );
}

export default NotFound;
