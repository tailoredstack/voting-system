import {
  chakra,
  Box,
  GridItem,
  useColorModeValue,
  Button,
  Center,
  Flex,
  SimpleGrid,
  VisuallyHidden,
  Input,
  useInterval,
} from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { client as supabase } from "../services/supabase";
import type { User, UserCredentials } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

type SignInProps = {};

export function SignIn(props: SignInProps) {
  const navigate = useNavigate();
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);
  const [verify, setVerify] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [canResendOTP, setCanResendOTP] = useState(true);

  // ColorModes
  const centerColor = useColorModeValue("gray.700", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // functions
  const handleSignIn = async (event: any) => {
    event.preventDefault();
    let isVerify = false;
    let id = idRef.current?.value;
    const password = passwordRef.current?.value;

    const credentials: UserCredentials = {
      password,
    };

    if (id?.includes("@")) {
      credentials.email = id;
    } else {
      // Sanitize phone
      id = id?.substring(1);
      credentials.phone = `+63${id}`;
      setVerify(true);
      isVerify = true;
    }

    try {
      const result = await supabase.auth.signIn(credentials);
      if (result.error) {
        setSignInError(result.error.message);
      } else {
        setUser(result.user);
        if (isVerify) {
          await supabase.auth.api.sendMobileOTP(`+${result.user?.phone}`);
        } else navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleVerify = async () => {
    const token = tokenRef.current?.value.trim() || "";
    const { error } = await supabase.auth.verifyOTP({
      phone: `+${user?.phone}`,
      token,
    });

    if (error?.status === 410) {
      setInvalidOTP(true);
    } else navigate("/");
  };

  const handleResendVerifyOTP = useCallback(async () => {
    if (!canResendOTP) return;
    await supabase.auth.api.sendMobileOTP(`+${user?.phone}`);
    setCanResendOTP(false);
  }, [canResendOTP, user]);

  useInterval(() => {
    setCanResendOTP(true);
  }, 60000);

  return (
    <Box px={8} py={40} mx="auto">
      <SimpleGrid
        alignItems="center"
        w={{ base: "full", xl: 11 / 12 }}
        columns={{ base: 1, lg: 11 }}
        gap={{ base: 0, lg: 24 }}
        mx="auto"
      >
        <GridItem
          colSpan={{ base: "auto", lg: 7 }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <chakra.h1
            mb={4}
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            lineHeight={{ base: "shorter", md: "none" }}
            color={useColorModeValue("gray.900", "gray.200")}
            letterSpacing={{ base: "normal", md: "tight" }}
          >
            Cast your votes!
          </chakra.h1>
          <chakra.p
            mb={{ base: 10, md: 4 }}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="thin"
            color="gray.500"
            letterSpacing="wider"
          >
            Enjoy the freedom of choosing your candidates!
          </chakra.p>
        </GridItem>
        <GridItem colSpan={{ base: "auto", md: 4 }}>
          {!verify ? (
            <Box
              as="form"
              mb={6}
              rounded="lg"
              shadow="xl"
              onSubmit={handleSignIn}
            >
              <Center pb={0} color={centerColor}>
                <p pt={2}>Vote Now!</p>
              </Center>
              <SimpleGrid
                columns={1}
                px={6}
                py={4}
                spacing={4}
                borderBottom="solid 1px"
                borderColor={borderColor}
              >
                <Flex>
                  <VisuallyHidden>Email Address or Phone No</VisuallyHidden>
                  <Input
                    ref={idRef}
                    mt={0}
                    type="text"
                    placeholder="Email Address / Phone No"
                    required
                  />
                </Flex>
                <Flex>
                  <VisuallyHidden>Password</VisuallyHidden>
                  <Input
                    ref={passwordRef}
                    mt={0}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Flex>
                {signInError && (
                  <chakra.span color="red" pt="2" pl="1" fontSize="sm">
                    {signInError}
                  </chakra.span>
                )}
                <Button colorScheme="blue" w="full" py={2} type="submit">
                  Sign In
                </Button>
              </SimpleGrid>
            </Box>
          ) : (
            <Box as="form" mb={6} rounded="lg" shadow="xl">
              <Center pb={0} color={centerColor}>
                <chakra.p pt={2}>Verify</chakra.p>
              </Center>
              <SimpleGrid
                columns={1}
                px={6}
                py={4}
                spacing={4}
                borderBottom="solid 1px"
                borderColor={borderColor}
              >
                <Flex>
                  <VisuallyHidden>Token</VisuallyHidden>
                  <Input
                    mt={0}
                    type="text"
                    placeholder="Token"
                    required
                    ref={tokenRef}
                  />
                </Flex>
                {invalidOTP && (
                  <chakra.span pl="1" fontSize="sm" color="red">
                    Expired or invalid OTP
                  </chakra.span>
                )}
                <chakra.a
                  pl="1"
                  fontSize="sm"
                  onClick={handleResendVerifyOTP}
                  href="#"
                  _hover={{
                    textDecoration: "underline",
                  }}
                  cursor={canResendOTP ? "pointer" : "not-allowed"}
                >
                  Resend SMS verification
                </chakra.a>
                <Button
                  colorScheme="blue"
                  w="full"
                  py={2}
                  type="button"
                  onClick={handleVerify}
                >
                  Verify
                </Button>
              </SimpleGrid>
            </Box>
          )}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

export default SignIn;
