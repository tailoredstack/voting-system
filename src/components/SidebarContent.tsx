import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { MdHome, MdPoll, MdPeople } from "react-icons/md";
import { Link as ReactRouterLink } from "react-router-dom";
import { NavItem } from "@components/NavItem";

export function SidebarContent(props: BoxProps) {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          as={ReactRouterLink}
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
          to="/"
        >
          Voting System
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem to="/" icon={MdHome}>
          Home
        </NavItem>
        <NavItem to="/poll" icon={MdPoll}>
          Poll
        </NavItem>
        <NavItem to="/candidate" icon={MdPeople}>
          Candidate
        </NavItem>
      </Flex>
    </Box>
  );
}

export default SidebarContent;
