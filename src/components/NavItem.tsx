import { Link as ReactRouterLink, useMatch, useResolvedPath } from "react-router-dom";
import { Icon,Flex, useColorModeValue } from "@chakra-ui/react";
import type { LinkProps } from 'react-router-dom'
import type { IconProps } from '@chakra-ui/react'

type NavItemProps = LinkProps & IconProps & {
    icon: any
}

export function NavItem(props: NavItemProps) {
  const { icon, children,to, ...rest } = props;
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  const colorInactiveColor = useColorModeValue("inherit", "gray.400")
  const hoverBackgroundColor = useColorModeValue("gray.100", "gray.900")
  const hoverColor = useColorModeValue("gray.900", "gray.200")

  return (
    <Flex
      as={ReactRouterLink}
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color={match ? hoverColor : colorInactiveColor}
      background={match ? hoverBackgroundColor : "inherit"}
      _hover={{
        bg: hoverBackgroundColor,
        color: hoverColor,
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      to={to}
      {...rest}
      
    >
      {icon && <Icon mx="2" boxSize="4" as={icon} />}
      {children}
    </Flex>
  );
}


export default NavItem;
