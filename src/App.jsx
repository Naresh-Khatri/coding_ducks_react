import { useState, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Stack, Skeleton } from "@chakra-ui/react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import AlertExample from "./components/AlertExample";
import ToolBar from "./components/ToolBar";
import CodeEditor from "./components/CodeEditor";
import OutputViewer from "./components/OutputViewer";

import "./splitter.css";

import Split from "react-split";

function App() {
  const [code, setCode] = useState(`print('hi mom!')`);
  const [lang, setLang] = useState("python");
  const [theme, setTheme] = useState("dracula");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const runCode = async () => {
    setIsLoading(true);
    const payload = { code, lang };
    try {
      const res = await axios.post(
        "https://coding_ducks.panipuri.tech/playground",
        payload
      );
      setIsLoading(false);
      setOutput(res.data.stdout || res.data.error);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setOutput("Somehings fishy :thinking_face:");
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <ToolBar
                isLoading={isLoading}
                runCode={runCode}
                setLang={setLang}
                setTheme={setTheme}
              />
              <Box h="800px">
                <Split
                  className="split"
                  minSize={10}
                  maxSize={1000}
                  gutterSize={13}
                  gutterAlign="center"
                  snapOffset={10}
                  dragInterval={10}
                >
                  <Box>
                    <CodeEditor
                      code={code}
                      setCode={setCode}
                      lang={lang}
                      theme={theme}
                    />
                  </Box>
                  <Box>
                    {isLoading && (
                      <Stack bg="gray.800" h="100%">
                        <Skeleton
                          height="20px"
                          fadeDuration={1}
                          isLoaded={!isLoading}
                        />
                        <Skeleton
                          height="20px"
                          fadeDuration={3}
                          isLoaded={!isLoading}
                        />
                        <Skeleton
                          height="20px"
                          fadeDuration={5}
                          isLoaded={!isLoading}
                        />
                      </Stack>
                    )}
                    {!isLoading && (
                      <Box>
                        <OutputViewer output={output} theme={theme} />
                      </Box>
                    )}
                  </Box>
                </Split>
              </Box>
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
                      <Button colorScheme="red" onClick={onClose}>
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
