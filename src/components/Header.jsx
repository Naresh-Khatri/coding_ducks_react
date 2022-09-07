import { useState, useRef } from "react";

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

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";

import File from "./drawer/File";
import ProfileInfo from './ProfileInfo';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDialogOpen,
    onOpen: onDialogOpen,
    onClose: onDialogClose,
  } = useDisclosure();

  const cancelRef = useRef();

  const [currentFile, setCurrentFile] = useState("2");
  const [files, setFiles] = useState([
    {
      id: "1",
      name: "merge_sort.py",
      lang: "python",
    },
    {
      id: "2",
      name: "LinkedList.java",
      lang: "java",
    },
    {
      id: "3",
      name: "LinkedList.js",
      lang: "js",
    },
  ]);

  const handleFileClick = (id) => {
    setCurrentFile(id);
    showInProgress();
    // onClose();
  };
  const showInProgress = () => {
    onDialogOpen();
  };

  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">OKay masterr</DrawerHeader>
          <DrawerBody>
            <HStack>
              <Button
                leftIcon={<AddIcon />}
                _hover={{ bg: "purple.500" }}
                _focus={{ outline: "none", bg: "purple.600" }}
                bg="purple.400"
                color="white"
                onClick={showInProgress}
              >
                New File
              </Button>
            </HStack>
            <VStack spacing={1} mt={10} align="stretch">
              {files.map((file) => (
                <Box
                  borderRadius={10}
                  _hover={{ bg: "purple.100", cursor: "pointer" }}
                  key={file.name}
                  onClick={() => handleFileClick(file.id)}
                >
                  <File
                    isActive={file.id === currentFile}
                    fileName={file.name}
                    fileLang={file.lang}
                  />
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDialogClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Ruk ja MASTERRRRRRRRRRRR 🛑🥺
            </AlertDialogHeader>

            <AlertDialogBody>ye wala bacha hai abhi 😳</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDialogClose} mr={4}>
                GM
              </Button>
              <Button colorScheme="red" onClick={onDialogClose}>
                Acha
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
