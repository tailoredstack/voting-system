import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import { SidebarContent } from "@components/SidebarContent";

export function Layout() {
  const sidebar = useDisclosure();
  return (
    <>
      <Box
        as="section"
        bg={useColorModeValue("gray.50", "gray.700")}
        minH="100vh"
      >
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg={useColorModeValue("white", "gray.800")}
            borderBottomWidth="1px"
            borderColor={useColorModeValue("inherit", "gray.700")}
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", md: "none" }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            />
            <Flex ml="3" display={{ base: "inline-flex", md: "none" }}>
              Voting System
            </Flex>

            <Flex align="center" ml="auto">
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
              <Avatar
                ml="4"
                size="sm"
                name="anubra266"
                src="https://avatars.githubusercontent.com/u/30869823?v=4"
                cursor="pointer"
              />
            </Flex>
          </Flex>

          <Box as="main" p="4">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Layout;
