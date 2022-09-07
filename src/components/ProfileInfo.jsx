import React, { useState, useEffect } from "react";

import {
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  HStack,
  Alert,
  AlertIcon,
  Button,
  useDisclosure,
  DrawerOverlay,
  VStack,
  Input,
  Stack,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  Image,
  Center,
  useToast,
  Tooltip,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
} from "@chakra-ui/react";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { signInWithGoogle, auth, logout } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import UserProfile from "./UserProfile.jsx";

function ProfileInfo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegistering, setIsRegistering] = useState(false);

  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  const [dbUser, setDbUser] = useState({});
  const [debounce, setDebounce] = useState(null);

  const [isusernameValid, setIsusernameValid] = useState(true);

  const [userPresentInDb, setUserPresentInDb] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = async (provider) => {
    const user = await signInWithGoogle();
    if (!user) {
      console.log("new user");
    }
  };

  useEffect(() => {
    // handleSignIn("google");
    const checkUser = async () => {
      //check if user is logged in
      if (user) {
        //check if user exists in db
        const { data: fetchedUser } = await axios.get(
          // `http://localhost:3333/users/${user.uid}`
          `https://coding_ducks.panipuri.tech/users/${user.uid}`
        );
        console.log(fetchedUser[0]);
        if (fetchedUser[0]) {
          setDbUser(fetchedUser[0]);
          setUserPresentInDb(true);
        }
        //does not exist
        if (fetchedUser.length === 0) {
          setUserInfo(user);
          setEmail(user.email);
          setUsername(user.email.split("@")[0]);
          setName(user.displayName);
          setUserPresentInDb(false);

          //create user in db
          promptRegister();
        }
      }
    };
    checkUser();
  }, [user]);
  useEffect(() => {
    checkUsernameValidity(username);
  }, [username]);
  const promptRegister = () => {
    onOpen();
    setIsRegistering(true);
  };
  const toast = useToast();
  const saveUser = async () => {
    setIsLoading(true);
    try {
      const newUser = await axios.post(`http://localhost:3333/users/v2`, {
        fullname: name,
        email: email,
        username: username,
        photoURL: user.photoURL,
        googleUID: user.uid,
      });
      setDbUser(newUser.data);
      setUserPresentInDb(true);
      setIsLoading(false);
      setIsRegistering(false);
      toast({
        title: "Success!",
        description: "User created!",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const onLogout = () => {
    logout();
    setDbUser({});
    setUserPresentInDb(false);
    setUserInfo({});
  }
    
  const checkUsernameValidity = async (username) => {
    setUsername(username);

    clearTimeout(debounce);
    setDebounce(
      setTimeout(async () => {
        const { data } = await axios.post(
          // `http://localhost:3333/users/checkUsername/`,
          `https://coding_ducks.panipuri.tech/users/checkUsername/`,
          { username }
        );
        if (!data.available)
          toast({
            title: "Username not available",
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true,
          });
        setIsusernameValid(data.available);
      }, 500)
    );
  };

  return (
    <div>
      <Button bg="purple.500" onClick={onOpen}>
        <FontAwesomeIcon icon={faUser} />
      </Button>
      <Modal
        closeOnOverlayClick={!isRegistering}
        blockScrollOnMount={false}
        closeOnEsc={!isRegistering}
        onClose={onClose}
        size="lg"
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        {userPresentInDb ? (
          <UserProfile userInfo={dbUser} onLogout={onLogout}/>
        ) : (
          <ModalContent>
            <ModalHeader>Profile Info</ModalHeader>
            {loading? (
              // show Skeleton until firebase user is loaded
              <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" />
              </Box>
            ) : (
              <>
                {!isRegistering && <ModalCloseButton />}
                <ModalBody>
                  {!isRegistering && (
                    <>
                      <Alert status="warning">
                        <AlertIcon />
                        Seems your you are not logged in.
                      </Alert>
                      <HStack mt={10} justify="center">
                        <Button
                          onClick={() => {
                            handleSignIn("google");
                          }}
                          bg="#4285f4 "
                          color="white"
                          leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                        >
                          Google
                        </Button>
                        <Button
                          colorScheme="facebook"
                          leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                        >
                          Facebook
                        </Button>
                        <Button
                          bg="black"
                          color="white"
                          leftIcon={<FontAwesomeIcon icon={faGithub} />}
                        >
                          Github
                        </Button>
                      </HStack>
                    </>
                  )}
                  {isRegistering && (
                    <>
                      <Alert status="success">
                        <AlertIcon />
                        Almost done.
                      </Alert>
                      <Stack mt={10} justifyContent="center">
                        {/* ---photo--- */}
                        <Center>
                          <Image
                            mb={10}
                            src={user.photoURL}
                            borderRadius="full"
                            boxSize="150px"
                          />
                        </Center>

                        {/* ---username--- */}
                        <InputGroup>
                          <InputLeftAddon children="username" />
                          <Input
                            value={username}
                            onChange={(e) =>
                              checkUsernameValidity(e.target.value)
                            }
                          />
                          <InputRightElement
                            children={
                              isusernameValid ? (
                                <Tooltip
                                  label="Username Available"
                                  color="white"
                                  placement="left"
                                  hasArrow
                                  arrowSize={8}
                                >
                                  <CheckIcon color="green.500" />
                                </Tooltip>
                              ) : (
                                <Tooltip
                                  label="Username taken!"
                                  color="white"
                                  placement="left"
                                  hasArrow
                                  arrowSize={8}
                                >
                                  <WarningIcon color="red.500" />
                                </Tooltip>
                              )
                            }
                          />
                        </InputGroup>
                        {/* ---name--- */}
                        <InputGroup>
                          <InputLeftAddon children="Name" />
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </InputGroup>
                        {/* ---email--- */}
                        <InputGroup>
                          <InputLeftAddon children="email" />
                          <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </Stack>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  {isRegistering && (
                    <Button
                      onClick={saveUser}
                      bg="purple.500"
                      _hover={{ bg: "purple.700" }}
                      color="white"
                      disabled={!isusernameValid}
                      isLoading={isLoading}
                      loadingText="Saving..."
                      leftIcon={<FontAwesomeIcon icon={faSave} />}
                    >
                      Save
                    </Button>
                  )}
                  {!isRegistering && <Button onClick={onClose}>Close</Button>}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
    </div>
  );
}

export default ProfileInfo;
