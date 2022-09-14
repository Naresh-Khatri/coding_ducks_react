import { useState, useRef, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Stack, Skeleton, useToast } from "@chakra-ui/react";
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
import { UserContext } from "./contexts/UserContext";
import { signInWithGoogle, auth, logout } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

import { filesRoute } from "./apiRoutes";

function App() {
  const [code, setCode] = useState("print('hi mom!')");
  const [lang, setLang] = useState("python");
  const [theme, setTheme] = useState("dracula");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen: isAlertOpen,
    onOpen,
    onClose: onAlertClose,
  } = useDisclosure();

  const [user, loading, error] = useAuthState(auth);
  const cancelRef = useRef();
  const [dbUser, setDbUser] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [userPresentInDb, setUserPresentInDb] = useState(false);
  const [currentFileID, setCurrentFileID] = useState(null);

  const [debounce, setDebounce] = useState(null);
  const toast = useToast();
  useEffect(() => {
    setCode(localStorage.getItem("code") || "print('hi mom!')");
  }, []);
  useEffect(() => {
    if (code == `print('hi mom!')`) return;

    clearTimeout(debounce);
    let toastTimeout = null;
    setDebounce(
      setTimeout(() => {
        toast({
          position: "top-right",
          title: "Saving...",
          duration: 1000,
          isClosable: true,
        });
        toastTimeout = setTimeout(() => {
          toast({
            position: "top-right",
            title: "Code saved!",
            description: "local storage.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }, 1000);
        localStorage.setItem("code", code);
      }, 3000)
    );
    return () => clearTimeout(toastTimeout);
  }, [code]);

  useEffect(() => {
    if (dbUser) {
      refreshUserFiles();
    }
  }, [dbUser]);
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

  const saveUserFile = async () => {
    const file = userFiles.find((file) => file.id === currentFileID);

    console.log(currentFileID);
    console.log(userFiles);
    console.log(file);
    const payload = { filename: file.filename, code, lang };
    const savedFile = await axios.put(`${filesRoute}${currentFileID}`, payload);
    console.log(savedFile);
    refreshUserFiles()
  };
  const refreshUserFiles = async () => {
    console.log("refreshing");
    if (!dbUser) return;
    console.log(dbUser);
    const { data } = await axios.get(`${filesRoute}${dbUser.id}`);
    console.log(data);
    setUserFiles(data);
  };

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user,
          loading,
          error,
          saveUserFile,
          logout,
          signInWithGoogle,
          dbUser,
          setDbUser,
          userPresentInDb,
          setUserPresentInDb,
          userFiles,
          setUserFiles,
          refreshUserFiles,
          currentFileID,
          setCurrentFileID,
          code,
          setCode,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Button onClick={saveUserFile}> save</Button>
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
                    dragInterval={0}
                  >
                    <Box>
                      <CodeEditor
                        code={code}
                        setCode={setCode}
                        lang={lang}
                        theme={theme}
                        runCode={runCode}
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
                  isOpen={isAlertOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onAlertClose}
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
                        <Button ref={cancelRef} onClick={onAlertClose} mr={4}>
                          Cancel
                        </Button>
                        <Button colorScheme="red" onClick={onAlertClose}>
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
      </UserContext.Provider>
    </div>
  );
}

export default App;
