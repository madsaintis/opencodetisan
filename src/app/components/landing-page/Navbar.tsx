"use client";

import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { ReactElement } from "react";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  icon?: ReactElement;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Features",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Docs",
  },
  {
    label: "Templates",
    href: "#",
  },
  {
    label: "Integrations",
    href: "#",
  },
  {
    label: "Customers",
    href: "#",
  },
  {
    label: "Enterprise",
    href: "#",
  },
  {
    label: "Pricing",
    href: "#",
  },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const imageStyles = {
    filter: useColorModeValue("invert(0%)", "invert(100%)"),
  };

  return (
    <Box padding={"3"}>
      <Flex color={useColorModeValue("gray.600", "white")} minH={"60px"} py={{ base: 2 }} px={{ base: 4 }} align={"center"}>
        <Flex flex={{ base: 1 }} justify={"start"}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} priority style={imageStyles} />
          <Flex display={{ base: "none", xl: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, lg: 0 }} justify={"flex-end"} direction={"row"} spacing={10} display={{ base: "none", xl: "inline-flex" }}>
          <Box
            as="a"
            p={2}
            href={"#"}
            fontSize={"lg"}
            fontWeight={500}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Text transition={"all .3s ease"} fontWeight={500}>
              Contact
            </Text>
          </Box>
          <Button
            as={"a"}
            width={"100%"}
            fontSize={"lg"}
            fontWeight={600}
            color={useColorModeValue("black", "white")}
            bg={useColorModeValue("white", "black")}
            border={"#e0e0e0 solid 0.5px"}
            href={"#"}
            _hover={{
              bg: "#e0e0e0",
            }}
          >
            Login
          </Button>
          <Button
            as={"a"}
            width={"100%"}
            fontSize={"lg"}
            fontWeight={600}
            color={useColorModeValue("white", "black")}
            bg={useColorModeValue("black", "white")}
            href={"#"}
            _hover={{
              bg: "#e0e0e0",
            }}
          >
            Sign Up
          </Button>
        </Stack>
        <Flex flex={{ base: 1, lg: "auto" }} ml={{ base: -2 }} display={{ base: "flex", xl: "none" }} justify={"flex-end"}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"lg"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={1}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                color={useColorModeValue("white", "black")}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box as="a" href={href} role={"group"} display={"block"} p={2} rounded={"md"} _hover={{ bg: useColorModeValue("pink.50", "gray.500") }}>
      <Stack direction={"row"} align={"center"}>
        <Box>
          <HStack>
            <Text transition={"all .3s ease"} fontWeight={500} color={"black"}>
              {label}
            </Text>
          </HStack>

          <Text fontSize={"sm"} color={"black"}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ xl: "none" }}>
      <Button
        as={"a"}
        width={"100%"}
        height={"60px"}
        fontSize={"xl"}
        fontWeight={600}
        color={useColorModeValue("black", "white")}
        bg={useColorModeValue("white", "black")}
        border={"#e0e0e0 solid 0.5px"}
        marginBottom={"20px"}
        href={"#"}
        _hover={{
          bg: "#e0e0e0",
        }}
      >
        Login
      </Button>

      <Button
        as={"a"}
        width={"100%"}
        fontSize={"xl"}
        height={"60px"}
        marginBottom={"10px"}
        fontWeight={600}
        color={useColorModeValue("white", "black")}
        bg={useColorModeValue("black", "white")}
        href={"#"}
        _hover={{
          bg: "#e0e0e0",
        }}
      >
        Sign Up
      </Button>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <HStack borderBottom={"#e0e0e0 solid 0.5px"} padding={"10px"}>
          <Text fontSize={"xl"} fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
            {label}
            {children && <Icon as={ChevronDownIcon} transition={"all .25s ease-in-out"} transform={isOpen ? "rotate(180deg)" : ""} w={6} h={6} />}
          </Text>
        </HStack>
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack mt={2} pl={4} borderLeft={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")} align={"start"}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href} width={"100%"} _hover={{ bg: "#e0e0e0" }} padding={"2"}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
