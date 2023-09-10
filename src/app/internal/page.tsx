"use client";

import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Center,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiInbox, FiUser } from "react-icons/fi";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons";
import Graph from "../components/internal-page/CustomerGraph";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface StatsCardProps {
  title: string;
  stat: string;
  growth: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome },
  { name: "Inbox", icon: FiInbox },
  { name: "Contacts", icon: FiUser },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={60}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8">
        <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" mx="6">
          User
        </Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box as="a" href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

function StatsCard(props: StatsCardProps) {
  const { title, stat, growth } = props;
  return (
    <Box>
      <Stat
        display="flex"
        flexDirection="row"
        flexWrap={"wrap"}
        alignItems="center"
        px={{ base: 4, md: 8 }}
        py={"5"}
        height={"200px"}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
      >
        <div>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
          <StatHelpText fontSize={"2xl"} fontWeight={"medium"}>
            {growth}
          </StatHelpText>
        </div>
      </Stat>
    </Box>
  );
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <HStack spacing={{ base: "5", md: "6" }}>
        <IconButton display={{ base: "flex", md: "none" }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />
        <Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold" justifyContent={"flex-start"}>
          User
        </Text>
      </HStack>

      <HStack spacing={{ base: "0", md: "6" }} justifySelf={"flex-end"}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FaTwitter />} />
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FaGithub />} />
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FaDiscord />} />
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose}>
        <DrawerContent maxW={60}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard title={"Revenue"} stat={"€43.400"} growth={"23%"}/>
          <StatsCard title={"New customers"} stat={"130"} growth={"29%"}/>
          <StatsCard title={"Churned customers"} stat={"5"} growth={"2%"} />
          <StatsCard title={"Active users"} stat={"1337"} growth={"103%"}/>
        </SimpleGrid>
        <Box boxSize={"l"} border={"solid 2px"} mt={"10"} bg="white" padding={"5"} rounded={"lg"} shadow={"xl"}>
          <Center marginBottom={10}>
            <Text color={"black"} fontSize={"xl"} fontWeight={900}>
              Sample Graph
            </Text>
          </Center>

          <Center>
            <Graph />
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
