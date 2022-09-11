import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

import ProfileInfo from "./ProfileInfo";
import LeftDrawer from "./LeftDrawer";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <LeftDrawer isOpen={isOpen} onClose={onClose} />
      <header>
        <Box bg="purple.600" w="100%" p={4} color="white" maxH={60}>
          <Flex>
            <Box>
              <HStack>
                <Button
                  _focus={{ outline: "none" }}
                  _hover={{ bg: "purple.500" }}
                  bg="purple.600"
                  leftIcon={<HamburgerIcon w={6} h={6} />}
                  onClick={onOpen}
                />
                <Text fontSize="20px" fontWeight={"extrabold"} noOfLines={1}>
                  Coding karlo frenzzzz
                </Text>
              </HStack>
            </Box>
            <Spacer />
            <Box>
              <ProfileInfo />
            </Box>
          </Flex>
        </Box>
      </header>
    </>
  );
}
