import {
  chakra,
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export function Poll() {
  const [state, setState] = useState({
    poll: {
      name: "",
      date: "",
    },
    positions: [
      {
        name: "President",
        selection: "1",
        limit: 1,
      },
    ],
  });

  const handleAddPositionClick = () => {
    setState((prev) => ({
      ...prev,
      positions: [
        ...prev.positions,
        {
          name: "",
          selection: "1",
          limit: 1,
        },
      ],
    }));
  };

  const colorColorModeValue = useColorModeValue("gray.700", "gray.50");
  return (
    <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 3 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Poll Information
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                General information about the poll
              </Text>
            </Box>
          </GridItem>

          <GridItem mt={[5, null, 0]} colSpan={12}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
              >
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="name"
                      fontSize="sm"
                      fontWeight="md"
                      color={colorColorModeValue}
                    >
                      Name
                    </FormLabel>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      placeholder="Name"
                      value={state.poll.name}
                      onInput={(event) => {
                        const name = event.currentTarget.value;
                        setState((prev) => ({
                          ...prev,
                          poll: {
                            ...prev.poll,
                            name,
                          },
                        }));
                      }}
                    />
                  </FormControl>
                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="date"
                      fontSize="sm"
                      fontWeight="md"
                      color={colorColorModeValue}
                    >
                      Date
                    </FormLabel>
                    <Input
                      type="date"
                      name="date"
                      id="date"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={state.poll.date}
                      onInput={(event) => {
                        const date = event.currentTarget.value;
                        setState((prev) => ({
                          ...prev,
                          poll: {
                            ...prev.poll,
                            date,
                          },
                        }));
                      }}
                    />
                  </FormControl>
                </SimpleGrid>
              </Stack>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
          ></Box>
        </Box>
      </Box>
      <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 3 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Poll Positions
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Poll positions information
              </Text>
            </Box>
            <Box mt="5">
              <Button
                colorScheme="blue"
                py={2}
                type="button"
                onClick={handleAddPositionClick}
              >
                Add Position
              </Button>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={6}>
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
              >
                {state.positions.map((position, posIndex) => (
                  <SimpleGrid
                    key={`position-${posIndex}`}
                    columns={6}
                    spacing={6}
                  >
                    <FormControl
                      as={GridItem}
                      colSpan={{ lg: 3, md: 6, sm: 6 }}
                    >
                      <FormLabel
                        htmlFor="position_name"
                        fontSize="sm"
                        fontWeight="md"
                        color={colorColorModeValue}
                      >
                        Position
                      </FormLabel>
                      <Input
                        type="text"
                        name="position_name"
                        id="position_name"
                        autoComplete="position-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        value={position.name}
                        onInput={(event) => {
                          const name = event.currentTarget.value;
                          setState((prev) => {
                            return {
                              ...prev,
                              positions: prev.positions.map((pos, j) => {
                                if (j === posIndex) {
                                  return {
                                    ...pos,
                                    name,
                                  };
                                } else return pos;
                              }),
                            };
                          });
                        }}
                      />
                    </FormControl>

                    <FormControl
                      as={GridItem}
                      colSpan={{ lg: 2, md: 6, sm: 6 }}
                    >
                      <FormLabel
                        htmlFor="selection"
                        fontSize="sm"
                        fontWeight="md"
                        color={colorColorModeValue}
                      >
                        Selection
                      </FormLabel>
                      <Select
                        id="selection"
                        name="selection"
                        autoComplete="selection"
                        placeholder="Select option"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        value={position.selection}
                        onInput={(event) => {
                          const selection = event.currentTarget.value;
                          setState((prev) => {
                            return {
                              ...prev,
                              positions: prev.positions.map((pos, j) => {
                                if (j === posIndex) {
                                  return {
                                    ...pos,
                                    selection,
                                  };
                                } else return pos;
                              }),
                            };
                          });
                        }}
                      >
                        <option value="1">Multiple</option>
                        <option value="0">Single</option>
                      </Select>
                    </FormControl>
                    <FormControl
                      as={GridItem}
                      colSpan={{ lg: 1, md: 6, sm: 6 }}
                    >
                      <FormLabel
                        htmlFor="position_limit"
                        fontSize="sm"
                        fontWeight="md"
                        color={colorColorModeValue}
                      >
                        Limit
                      </FormLabel>
                      <Input
                        disabled={position.selection === "0"}
                        type="number"
                        name="position_limit"
                        id="position_limit"
                        autoComplete="position-limit"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        placeholder="Limit"
                        value={position.limit}
                        onInput={(event) => {
                          const limit = event.currentTarget.valueAsNumber;
                          setState((prev) => {
                            return {
                              ...prev,
                              positions: prev.positions.map((pos, j) => {
                                if (j === posIndex) {
                                  return {
                                    ...pos,
                                    limit,
                                  };
                                } else return pos;
                              }),
                            };
                          });
                        }}
                      />
                    </FormControl>
                  </SimpleGrid>
                ))}
              </Stack>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Poll;
