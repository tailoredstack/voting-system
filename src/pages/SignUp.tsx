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
import { useNavigate } from "react-router-dom";
import { client as supabase } from "../services/supabase";

import type { User } from "@supabase/supabase-js";

type SignUpProps = {};

export function SignUp(props: SignUpProps) {
  const navigate = useNavigate();
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [verify, setVerify] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [canResendOTP, setCanResendOTP] = useState(true);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);

  // ColorModes
  const centerColor = useColorModeValue("gray.700", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleSignup = async (event: any) => {
    event.preventDefault();
    let hasErrors = false;
    const firstName = firstNameRef.current?.value.trim().toLocaleLowerCase();
    const lastName = lastNameRef.current?.value.trim().toLocaleLowerCase();
    const email = emailRef.current?.value.trim().toLocaleLowerCase();
    const password = passwordRef.current?.value.trim();
    let phone = phoneRef.current?.value.trim().toLocaleLowerCase();

    if (![firstName, lastName, email, password, phone].filter(Boolean).length) {
      return;
    }

    if (!email?.includes("@liceo.edu.ph")) {
      setInvalidEmail(true);
      hasErrors = true;
    } else setInvalidEmail(false);

    if (password && password?.length < 8) {
      setInvalidPassword(true);
      hasErrors = true;
    } else setInvalidPassword(false);

    if (hasErrors) {
      return;
    }

    // Sanitize phone
    if (phone?.startsWith("0")) {
      phone = phone.substring(1);
    }

    const { error, user: authedUser } = await supabase.auth.signUp(
      {
        email,
        password,
        phone: `+63${phone}`,
      },
      {
        data: {
          name: `${firstName} ${lastName}`,
        },
      }
    );

    setUser(authedUser);

    if (!error) {
      setVerify(true);
    }

    await supabase.auth.update({ email });
    await supabase
      .from("roles")
      .insert([{ user_id: authedUser?.id, name: "voter" }]);
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
            Ready for the change?
          </chakra.h1>
          <chakra.p
            mb={{ base: 10, md: 4 }}
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="thin"
            color="gray.500"
            letterSpacing="wider"
          >
            Join us and help change our Licean experience and take a step closer
            to your dreams!
          </chakra.p>
        </GridItem>
        <GridItem colSpan={{ base: "auto", md: 4 }}>
          {!verify ? (
            <Box
              as="form"
              mb={6}
              rounded="lg"
              shadow="xl"
              onSubmit={handleSignup}
            >
              <Center pb={0} color={centerColor}>
                <chakra.p pt={2}>Join Us</chakra.p>
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
                  <VisuallyHidden>First Name</VisuallyHidden>
                  <Input
                    mt={0}
                    type="text"
                    placeholder="First Name"
                    required
                    ref={firstNameRef}
                  />
                </Flex>
                <Flex>
                  <VisuallyHidden>Last Name</VisuallyHidden>
                  <Input
                    mt={0}
                    type="text"
                    placeholder="Last Name"
                    required
                    ref={lastNameRef}
                  />
                </Flex>
                <Flex direction="column">
                  <VisuallyHidden>Email Address</VisuallyHidden>
                  <Input
                    mt={0}
                    type="email"
                    placeholder="Email Address"
                    required
                    ref={emailRef}
                  />
                  {invalidEmail && (
                    <chakra.span color="red" pt="2" pl="1" fontSize="sm">
                      Email should have @liceo.edu.ph
                    </chakra.span>
                  )}
                </Flex>
                <Flex direction="column">
                  <VisuallyHidden>Password</VisuallyHidden>
                  <Input
                    mt={0}
                    type="password"
                    placeholder="Password"
                    required
                    ref={passwordRef}
                  />
                  {invalidPassword ? (
                    <chakra.span color="red" pt="2" pl="1" fontSize="sm">
                      Choose stronger password
                    </chakra.span>
                  ) : (
                    <chakra.span color="gray.500" pt="2" pl="1" fontSize="sm">
                      Minimum of 8 characters
                    </chakra.span>
                  )}
                </Flex>
                <Flex>
                  <VisuallyHidden>Phone No</VisuallyHidden>
                  <Input
                    mt={0}
                    type="text"
                    placeholder="Phone No."
                    required
                    ref={phoneRef}
                  />
                </Flex>
                <Button colorScheme="blue" w="full" py={2} type="submit">
                  Sign up
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
          <chakra.p fontSize="xs" textAlign="center" color="gray.600">
            By signing up you agree to our{" "}
            <chakra.a href="https://youtube.com" color="brand.500">
              EULA
            </chakra.a>
          </chakra.p>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}

export default SignUp;
