import { useState, useRef, useContext, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Skeleton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import File from "./drawer/File";
import { AddIcon } from "@chakra-ui/icons";

import NewFilePopup from "./NewFilePopup";

import { UserContext } from "../contexts/UserContext";
import { filesRoute } from "../apiRoutes";
import axios from "axios";

export default function LeftDrawer({ isOpen, onClose }) {
  const {
    dbUser,
    userFiles,
    setUserFiles,
    currentFileID,
    setCurrentFileID,
    code,
    setCode,
  } = useContext(UserContext);

  // const [currentFile, setCurrentFileID] = useState("2");
  const {
    isOpen: isDialogOpen,
    onOpen: onDialogOpen,
    onClose: onDialogClose,
  } = useDisclosure();

  const cancelRef = useRef();

  const handleFileClick = (id) => {
    setCurrentFileID(id);
    console.log(userFiles)
    const file = userFiles.find((file) => file.id === id);
    setCode(file.code);
    // showInProgress();
    // onClose();
  };
  const showInProgress = () => {
    onDialogOpen();
  };

  const createNewFile = () => {};
  const refreshUserFiles = async () => {
    if (!dbUser) return;
    console.log(dbUser);
    const { data } = await axios.get(`${filesRoute}${dbUser.id}`);
    console.log(data);
    setUserFiles(data);
  };
  useEffect(() => {
    refreshUserFiles();
  }, [dbUser]);

  return (
    <>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">OKay masterr</DrawerHeader>
          <DrawerBody>
            <HStack>
              <NewFilePopup refreshUserFiles={refreshUserFiles} />
            </HStack>
            <VStack spacing={1} mt={10} align="stretch">
              {!dbUser || userFiles.length == 0 ? (
                <VStack>
                  <Skeleton w="100%" height="20px" />
                  <Skeleton w="100%" height="20px" />
                  <Skeleton w="100%" height="20px" />
                  <Skeleton w="100%" height="20px" />
                  <Skeleton w="100%" height="20px" />
                </VStack>
              ) : (
                userFiles.map((file) => (
                  <Box
                    borderRadius={10}
                    _hover={{ bg: "purple.100", cursor: "pointer" }}
                    key={file.id}
                    onClick={() => handleFileClick(file.id)}
                  >
                    <File
                      isActive={file.id === currentFileID}
                      file={file}
                      refreshUserFiles={refreshUserFiles}
                    />
                  </Box>
                ))
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
