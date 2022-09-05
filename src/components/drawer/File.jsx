import {
  Flex,
  Box,
  Popover,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  PopoverContent,
  PopoverArrow,
  VStack,
  Portal,
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
import { faEllipsisV, faCode } from "@fortawesome/free-solid-svg-icons";
import { faPython, faJs, faJava } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";

export default function File({ isActive, fileName, fileLang }) {
  const langIcons = {
    python: faPython,
    js: faJs,
    java: faJava,
    default: faCode,
  };
  const handleOptionsClicked = () => {
    console.log("Options clicked");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Flex
        w="100%"
        h="40px"
        px={2}
        bg={isActive ? "purple.500" : ""}
        borderRadius={10}
        transition="all 0.2s"
      >
        <Box alignSelf="center">
          <FontAwesomeIcon
            icon={langIcons[fileLang] || faCode}
            color={isActive ? "white" : "black"}
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
        <Box alignSelf="cen ter" w={4} h={4} onClick={handleOptionsClicked}>
          <Popover>
            <PopoverTrigger>
              <Button size="md">
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  // color={isActive ? "white" : "black"}
                />
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent w="fit-content">
                <PopoverArrow />
                <PopoverCloseButton />
                {/* <PopoverHeader>Confirmation</PopoverHeader> */}
                <PopoverBody>
                  {/* Are you sure you want to have that milkshake? */}
                  <VStack>
                    <Button size="sm" w="120px">
                      Rename
                    </Button>
                    <Button size="sm" w="120px">
                      Move
                    </Button>
                    <Button size="sm" w="120px" bg="red.300">
                      Delete
                    </Button>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Box>
      </Flex>
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
              <Button colorScheme="red" onClick={onOpen}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
