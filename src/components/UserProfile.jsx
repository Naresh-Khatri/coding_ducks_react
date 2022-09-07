import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";

function UserProfile({ userInfo, onLogout }) {
  const { fullname, username, email, photo_url } = userInfo;

  const [maskedEmail, setMaskedEmail] = useState("");
  const [isEmailMasked, setIsEmailMasked] = useState(true);

  useEffect(() => {
    const emailParts = email.split("@");
    const maskedEmail = `${emailParts[0].slice(0, 2)}...@${emailParts[1]}`;
    setMaskedEmail(maskedEmail);
  }, [email]);

  return (
    <div>
      <ModalContent>
        <ModalHeader borderRadius="5px" bg="purple.500">
          <Text
            bgGradient={[
              "linear(to-tr, teal.300, yellow.400)",
              "linear(to-t, blue.200, teal.500)",
              "linear(to-b, orange.100, purple.400)",
            ]}
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
            position="absolute"
          >
            {fullname}
          </Text>
          <Divider mt={15} h={70}></Divider>
          <Center position="relative">
            {/* <Avatar
              name="Christian Nwamba"
              position="absolute"
              w={150}
              h={150}
              src="https://bit.ly/code-beast"
            /> */}
            {/* <img
              src={photo_url}
              alt="profile"
              width="150px"
              height="150px"
              /> */}
            <Image
              referrerPolicy="no-referrer"
              position="absolute"
              src={photo_url}
              size="sm"
              bg="white"
              w={150}
              h={150}
              rounded="full"
              alt="profile"
            />
          </Center>
        </ModalHeader>
        {/* <ModalCloseButton/> */}
        <IconButton
          position="absolute"
          top={2}
          right={2}
          bg="transparent"
          color="white"
          icon={<FontAwesomeIcon icon={faSignOut} />}
          onClick={() => {
            onLogout();
          }}
        />
        <ModalBody mt={70}>
          <HStack spacing={4}>
            <VStack spacing={4} w="100%">
              <HStack spacing={4}>
                <Text fontSize="lg" fontWeight="semibold">
                  {fullname}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {username}
                </Text>
              </HStack>
              <Box>
                <HStack>
                  <Text fontSize="sm" color="gray.500">
                    {isEmailMasked ? maskedEmail : email}
                  </Text>
                  <IconButton
                    variant="outline"
                    icon={
                      <FontAwesomeIcon
                        icon={isEmailMasked ? faEye : faEyeSlash}
                      />
                    }
                    size="sm"
                    onClick={() => setIsEmailMasked((p) => !p)}
                  />
                </HStack>
              </Box>
              <Divider />
              <HStack w="100%" justify="center" h={10}>
                <Flex w="50%">
                  <Box>
                    <VStack>
                      <Text fontSize="md" fontWeight="extrabold">
                        23.4K
                      </Text>
                      <Text
                        fontSize="sm"
                        style={{ margin: 0 }}
                        color="gray.500"
                      >
                        Followers
                      </Text>
                    </VStack>
                  </Box>
                  <Spacer />
                  <Box>
                    <VStack>
                      <Text fontSize="md" fontWeight="extrabold">
                        4.5K
                      </Text>
                      <Text
                        fontSize="sm"
                        style={{ margin: 0 }}
                        color="gray.500"
                      >
                        Likes
                      </Text>
                    </VStack>
                  </Box>
                  <Spacer />
                  <Box>
                    <VStack>
                      <Text fontSize="md" fontWeight="extrabold">
                        423.2K
                      </Text>
                      <Text
                        fontSize="sm"
                        style={{ margin: 0 }}
                        color="gray.500"
                      >
                        Views
                      </Text>
                    </VStack>
                  </Box>
                </Flex>
              </HStack>
            </VStack>
          </HStack>
        </ModalBody>
        {/* <ModalFooter>
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
        </ModalFooter> */}
      </ModalContent>
    </div>
  );
}

export default UserProfile;
