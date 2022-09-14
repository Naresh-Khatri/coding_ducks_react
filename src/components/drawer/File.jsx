import { useRef, useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Menu,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faCode,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faPython, faJs, faJava } from "@fortawesome/free-brands-svg-icons";

import { filesRoute } from "../../apiRoutes";
import { UserContext } from "../../contexts/UserContext";

export default function File({ isActive, file}) {
  const langIcons = {
    python: faPython,
    js: faJs,
    java: faJava,
    default: faCode,
  };
  const langColors = {
    py: "#305998",
    js: "#e7cf0e",
    java: "#B07219",
    cpp: "#f9a825",
    c: "#555555",
    default: "#000000",
  };

  const { fileName, lang, id, code, userId } = file;
  const {refreshUserFiles} = useContext(UserContext);
  const cancelRef = useRef();
  const [isDeletingFile, setIsDeletingFile] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toast = useToast();

  const handleOptionsClicked = () => {
    console.log("Options clicked");
  };
  const handleDeleteClicked = () => {
    onOpen();
    console.log("Delete clicked");
  };
  const deleteFile = async () => {
    try {
      setIsDeletingFile(true);
      const { data } = await axios.delete(`${filesRoute}${id}`);
      console.log(data);
      setIsDeletingFile(false);
      refreshUserFiles();
      toast({
        title: "File deleted",
        description: "File has been deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      setIsDeletingFile(false);
      toast({
        title: "Error",
        description: "Could not delete file",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log("Error deleting file", err);
    }
  };

  const handleDuplicateClicked = async () => {
    console.log("Duplicate clicked");
    try {
      const payload = {
        userId: userId,
        fileName: fileName + " (copy)",
        lang: lang,
        code: code,
      };
      const newFile = await axios.post(filesRoute, payload);
      console.log(newFile);
      onMenuClose();
      refreshUserFiles();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <HStack
        w="100%"
        h="40px"
        px={2}
        bg={isActive ? "purple.500" : ""}
        borderRadius={10}
        transition="all 0.2s"
      >
        <Box alignSelf="center">
          <FontAwesomeIcon
            icon={langIcons[lang] || faCode}
            color={isActive ? "white" : langColors[lang]}
            size="2x"
          />
        </Box>
        <Box
          flex="1"
          pl={4}
          alignSelf="center"
          color={isActive ? "white" : "black"}
        >
          {fileName}
        </Box>
        <Box alignSelf="cen ter">
          <Menu>
            {({ isOpen, onClose }) => (
              <>
                {/* <MenuButton isActive={isOpen} as={Button}>
                 {isOpen ? "Close" : "Open"}
               </MenuButton> */}
                <MenuButton
                  px={4}
                  py={2}
                  transition="all 0.2s"
                  borderRadius="md"
                  borderWidth="1px"
                  _focus={{ boxShadow: "outline" }}
                  w={10}
                  h={10}
                >
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    // color={isActive ? "white" : "black"}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem disabled _hover={{ outline: "none" }}>
                    <Text ml={5}>Rename</Text>
                  </MenuItem>
                  <MenuItem
                    _hover={{ outline: "none" }}
                    onClick={handleDuplicateClicked}
                  >
                    <Text ml={5}>Duplicate</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    bg="red.400"
                    _hover={{ outline: "none" }}
                    onClick={handleDeleteClicked}
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    closeOnSelect={false}
                  >
                    <Text>Delete</Text>
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          {/* <Menu>
            {({ isOpen, onClose }) => {
              <>
                <MenuButton isActive={isOpen} as={Button}>
                  {isOpen ? "Close" : "Open"}
                </MenuButton>
                <MenuButton
                  px={4}
                  py={2}
                  transition="all 0.2s"
                  borderRadius="md"
                  borderWidth="1px"
                  _focus={{ boxShadow: "outline" }}
                  w={10}
                  h={10}
                >
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    // color={isActive ? "white" : "black"}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem disabled _hover={{ outline: "none" }}>
                    <Text ml={5}>Rename</Text>
                  </MenuItem>
                  <MenuItem
                    _hover={{ outline: "none" }}
                    onClick={handleDuplicateClicked}
                    closeOnSelect={false}
                  >
                    <Text ml={5}>Duplicate</Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    bg="red.400"
                    _hover={{ outline: "none" }}
                    onClick={handleDeleteClicked}
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    closeOnSelect={false}
                  >
                    <Text>Delete</Text>
                  </MenuItem>
                </MenuList>
              </>;
            }}
          </Menu> */}
        </Box>
      </HStack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              MASTERRRRRRRRRRRR
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} mr={4}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteFile}
                isLoading={isDeletingFile}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
