import { AddIcon } from "@chakra-ui/icons";
import { Button, HStack, Select } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function ToolBar({ isLoading, runCode, setLang, setTheme }) {
  return (
    <HStack m={2} justifyContent="end">
      <Select
        maxW={40}
        onChange={(e) => {
          setLang(e.target.value);
        }}
      >
        <option value="python">Python</option>
        <option value="js">Javascript</option>
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="java">Java</option>
      </Select>
      <Select maxW={40} onChange={(e) => setTheme(e.target.value)}>
        <option value="dracula">Dracula</option>
        <option value="atomone">Atom One</option>
        <option value="eclipse">Eclipse</option>
        <option value="okaidia">Okaidia</option>
        <option value="githubDark">Github Dark</option>
        <option value="githubLight">Github Light</option>
        <option value="duotoneDark">Duotone Dark</option>
        <option value="duotoneLight">Duotone Light</option>
        <option value="xcodeDark">Xcode Dark</option>
        <option value="xcodeLight">Xcode Light</option>
      </Select>
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
    </HStack>
  );
}
