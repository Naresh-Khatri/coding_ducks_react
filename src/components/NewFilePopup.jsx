import React, { initialFocusRef, useState, useContext } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import axios from "axios";
import { filesRoute } from "../apiRoutes";
import { UserContext } from "../contexts/UserContext";

function NewFilePopup({ refreshUserFiles }) {
  const { dbUser } = useContext(UserContext);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const toast = useToast();

  const [fileName, setFileName] = useState("");
  const [lang, setLang] = useState("py");

  const [isLoading, setIsLoading] = useState(false);

  const createFile = async () => {
    try {
      setIsLoading(true);
      const payload = {
        userId: dbUser.id,
        fileName: fileName,
        lang: lang,
        content: "",
      };
      const newFile = await axios.post(filesRoute, payload);
      setIsLoading(false);
      console.log(newFile);
      refreshUserFiles();
      onClose()
      toast({
        title: "Success!",
        description: "File created!",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      onClose()
      refreshUserFiles();
      setIsLoading(false);
      toast({
        title: "Couldn't create file!",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="right"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button
          leftIcon={<AddIcon />}
          _hover={{ bg: "purple.500" }}
          _focus={{ outline: "none", bg: "purple.600" }}
          bg="purple.400"
          color="white"
          onClick={onToggle}
        >
          New File
        </Button>
      </PopoverTrigger>
      <Box>
        <PopoverContent>
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            Name your file
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Input
              placeholder="ex merge_sort.py"
              ref={initialFocusRef}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <Select mt={2} onChange={(e) => setLang(e.target.value)}>
              <option value="py">Python</option>
              <option value="js">Javascript</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="java">Java</option>
            </Select>
          </PopoverBody>
          <PopoverFooter
            border="0"
            display="flex"
            alignItems="center"
            justifyContent="end"
            pb={2}
          >
            <Button
              colorScheme="green"
              isLoading={isLoading}
              loadingText="Creating..."
              onClick={createFile}
            >
              Create
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Box>
    </Popover>
  );
}

export default NewFilePopup;
