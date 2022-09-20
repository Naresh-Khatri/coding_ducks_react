import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Box,
  HStack,
  Select,
  Spacer,
  IconButton,
  Text,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faEdit,
  faSave,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";

import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { filesRoute } from "../apiRoutes";
import axios from "axios";

export default function ToolBar({
  isLoading,
  runCode,
  lang,
  setLang,
  theme,
  setTheme,
  saveUserFile,
  saveBtnLoading,
}) {
  const { currentFile, refreshUserFiles } = useContext(UserContext);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState(currentFile.fileName);
  const handleRenameClick = async () => {
    try {
      const res = await axios.patch(
        `${filesRoute}/${currentFile.id}`,
        { fileName: newFileName },
        { withCredentials: true }
      );
      console.log(res);
      refreshUserFiles();
      setIsRenaming(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancelRenameClick = () => {
    setNewFileName(currentFile.fileName);
    setIsRenaming(false);
  };
  return (
    <Box bg="gray.800">
      <HStack p={2} justifyContent="end">
        <Box color="white">
          {isRenaming ? (
            <InputGroup size="md">
              <Input
                placeholder="File Name"
                value={newFileName}
                onChange={(e) => {
                  setNewFileName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRenameClick();
                  }
                }}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  bg="transparent"
                  color="white"
                  icon={<FontAwesomeIcon icon={faSave} />}
                  size="sm"
                  onClick={handleRenameClick}
                >
                  Save
                </IconButton>
                <IconButton
                  bg="transparent"
                  color="white"
                  icon={<FontAwesomeIcon icon={faCancel} />}
                  size="sm"
                  onClick={handleCancelRenameClick}
                ></IconButton>
              </InputRightElement>
            </InputGroup>
          ) : (
            <HStack>
              <Text fontSize="xl">{currentFile.fileName}</Text>
              <IconButton
                bg="transparent"
                _hover={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                onClick={() => {
                  setIsRenaming(true);
                  setNewFileName(currentFile.fileName);
                }}
                icon={<FontAwesomeIcon icon={faEdit} />}
              />
            </HStack>
          )}
        </Box>
        <Button
          isLoading={saveBtnLoading}
          loadingText="Syncing..."
          onClick={saveUserFile}
        >
          save
        </Button>

        <Button
          loadingText="Running..."
          isLoading={isLoading}
          bg="green.400"
          leftIcon={<FontAwesomeIcon icon={faPlay} />}
          color="white"
          onClick={runCode}
        >
          Run
        </Button>
        <Select
          bg="purple.500"
          color="white"
          maxW={40}
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
          }}
        >
          <option style={{ color: "black" }} value="py">
            Python
          </option>
          <option style={{ color: "black" }} value="js">
            Javascript
          </option>
          <option style={{ color: "black" }} value="cpp">
            C++
          </option>
          <option style={{ color: "black" }} value="c">
            C
          </option>
          <option style={{ color: "black" }} value="java">
            Java
          </option>
        </Select>
        <Select
          maxW={40}
          onChange={(e) => setTheme(e.target.value)}
          bg="purple.500"
          color="white"
        >
          <option style={{ color: "black" }} value="dracula">
            Dracula
          </option>
          <option style={{ color: "black" }} value="atomone">
            Atom One
          </option>
          <option style={{ color: "black" }} value="eclipse">
            Eclipse
          </option>
          <option style={{ color: "black" }} value="okaidia">
            Okaidia
          </option>
          <option style={{ color: "black" }} value="githubDark">
            Github Dark
          </option>
          <option style={{ color: "black" }} value="githubLight">
            Github Light
          </option>
          <option style={{ color: "black" }} value="duotoneDark">
            Duotone Dark
          </option>
          <option style={{ color: "black" }} value="duotoneLight">
            Duotone Light
          </option>
          <option style={{ color: "black" }} value="xcodeDark">
            Xcode Dark
          </option>
          <option style={{ color: "black" }} value="xcodeLight">
            Xcode Light
          </option>
        </Select>
      </HStack>
    </Box>
  );
}
