import { AddIcon } from "@chakra-ui/icons";
import { Button, Box, HStack, Select, Spacer } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function ToolBar({ isLoading, runCode, setLang, setTheme }) {
  return (
    <Box bg="gray.800">
      <HStack p={2} justifyContent="end">
        <Box></Box>
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
          onChange={(e) => {
            setLang(e.target.value);
          }}
        >
          <option style={{ color: "black" }} value="python">
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
