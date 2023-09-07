"use client";

import { Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Popover, PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Image from "next/image";
import styles from "./page.module.css";
import { IconType } from "react-icons/lib";
import { IoChevronDownOutline } from "react-icons/io5";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex bg={useColorModeValue("black", "gray.800")} color={useColorModeValue("gray.600", "white")} minH={"60px"} py={{ base: 2 }} px={{ base: 4 }} align={"center"}>
        <Flex flex={{ base: 1, lg: "auto" }} ml={{ base: -2 }} display={{ base: "flex", lg: "none" }}>
          <IconButton onClick={onToggle} icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />} variant={"ghost"} aria-label={"Toggle Navigation"} />
        </Flex>
        <Flex flex={{ base: 1 }} justify={"start"}>
          <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} width={100} height={24} priority  />

          <Flex display={{ base: "none", lg: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, lg: 0 }} justify={"flex-end"} direction={"row"} spacing={10}>
          <Button as={"a"} fontSize={"sm"} fontWeight={400} variant={"link"} href={"#"}>
            Sign In
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", lg: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href={"#"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
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
                fontSize={"sm"}
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
              <PopoverContent border={1} boxShadow={"xl"} bg={popoverContentBgColor} color={useColorModeValue("white", "black")} p={4} rounded={"xl"} minW={"sm"}>
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
          <Text transition={"all .3s ease"} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex transition={"all .3s ease"} transform={"translateX(-10px)"} opacity={0} _groupHover={{ opacity: "100%", transform: "translateX(0)" }} justify={"flex-end"} align={"center"} flex={1}>
          <Icon w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ lg: "none" }}>
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
        <Text fontWeight={600} color={useColorModeValue("gray.600", "gray.200")}>
          {label}
        </Text>
        {children && <Icon as={ChevronDownIcon} transition={"all .25s ease-in-out"} transform={isOpen ? "rotate(180deg)" : ""} w={6} h={6} />}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack mt={2} pl={4} borderLeft={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")} align={"start"}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  icon?: IconType;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Features",
    icon: IoChevronDownOutline,
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
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
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