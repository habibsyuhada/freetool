import { IconBook, IconChartPie3, IconChevronDown, IconCode, IconCoin, IconFingerprint, IconNotification, IconSun, IconMoonStars } from "@tabler/icons-react";
import { Anchor, Box, Burger, Button, Center, Collapse, Divider, Drawer, Group, HoverCard, ScrollArea, SimpleGrid, Text, ThemeIcon, UnstyledButton, useMantineTheme, Switch, createTheme, MantineProvider, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMegaMenu.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from '../../pages/ThemeContext';

const mockdata = [
  {
    icon: IconCode,
    title: "Currency & Salary Converter",
    description: "This Pokémon cry is very loud and distracting",
    link: "/currency-salary-converter",
  },
  {
    icon: IconCoin,
    title: "Task Management",
    description: "The fluid of Smeargle tail secretions changes",
    link: "#",
  },
  {
    icon: IconBook,
    title: "Cut Url",
    description: "Yanma is capable of seeing 360 degrees without",
    link: "#",
  },
  {
    icon: IconFingerprint,
    title: "Encoder & Decoder",
    description: "The shell rounded shape and the grooves on its.",
    link: "#",
  },
  {
    icon: IconChartPie3,
    title: "QR Generator",
    description: "This Pokémon uses its flying ability to quickly chase",
    link: "#",
  },
  {
    icon: IconNotification,
    title: "Image Compressor",
    description: "Combusken battles with the intensely hot flames it spews",
    link: "#",
  },
];

export function HeaderMegaMenu() {  
  const { isDark, toggleTheme } = useTheme(); // Use the theme context  
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);  
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);  
  const theme = useMantineTheme();  

  const links = mockdata.map((item) => (  
    <Link href={item.link} key={item.title}>  
      <UnstyledButton className={classes.subLink}>  
        <Group wrap="nowrap" align="flex-start">  
          <ThemeIcon size={34} variant="default" radius="md">  
            <item.icon size={22} color={theme.colors.blue[6]} />  
          </ThemeIcon>  
          <div>  
            <Text size="sm" fw={500}>  
              {item.title}  
            </Text>  
            <Text size="xs" c="dimmed">  
              {item.description}  
            </Text>  
          </div>  
        </Group>  
      </UnstyledButton>  
    </Link>  
  ));  

  return (  
    <Box className={classes.headerBox}>  
      <header className={classes.header}>  
        <Group justify="space-between" h="100%">  
          <Link href="/" style={{ textDecoration: "none" }}>  
            <Text size="xl" fw={700} c={theme.colors.blue[6]} style={{ cursor: "pointer" }}>  
              FreeTool  
            </Text>  
          </Link>  

          <Group h="100%" gap={0} visibleFrom="sm">  
            <a href="/" className={classes.link}>Home</a>  
            <HoverCard width={{ base: "100%", lg: "80%" }} position="bottom" radius="md" shadow="md" withinPortal>  
              <HoverCard.Target>  
                <a href="#" className={classes.link}>  
                  <Center inline>  
                    <Box component="span" mr={5}>Tools</Box>  
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />  
                  </Center>  
                </a>  
              </HoverCard.Target>  

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>  
                <Group justify="space-between" px="md">  
                  <Text fw={500}>Tools</Text>  
                  <Anchor href="#" fz="xs">View all</Anchor>  
                </Group>  

                <Divider my="sm" />  

                <SimpleGrid cols={3} spacing={0}>  
                  {links}  
                </SimpleGrid>  

                <div className={classes.dropdownFooter}>  
                  <Group justify="space-between">  
                    <div>  
                      <Text fw={500} fz="sm">Join Us Today!</Text>  
                      <Text size="xs" c="dimmed">  
                        Sign in or create an account to access exclusive features and content. Best of all, it's completely free!  
                      </Text>  
                    </div>  
                    <div>  
                      <Button variant="default">Log In / Sign</Button>  
                    </div>  
                  </Group>  
                </div>  
              </HoverCard.Dropdown>  
            </HoverCard>  
            <a href="#" className={classes.link}>Blog</a>  
            <a href="#" className={classes.link}>Feedback</a>  
          </Group>  

          <Group visibleFrom="sm">  
            <Button variant="default" onClick={toggleTheme}>  
              {isDark ? <IconSun size={16} /> : <IconMoonStars size={16} />}  
            </Button>  
            <Button variant="default">Log in</Button>  
            <Button>Sign up</Button>  
          </Group>  

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />  
        </Group>  
      </header>  

      <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="Navigation" hiddenFrom="sm" zIndex={1000000}>  
        <ScrollArea h="calc(100vh - 80px)" mx="-md">  
          <Divider my="sm" />  
          <a href="/" className={classes.link}>Home</a>  
          <UnstyledButton className={classes.link} onClick={toggleLinks}>  
            <Center inline>  
              <Box component="span" mr={5}>Tools</Box>  
              <IconChevronDown size={16} color={theme.colors.blue[6]} />  
            </Center>  
          </UnstyledButton>  
          <Collapse in={linksOpened}>{links}</Collapse>  
          <a href="#" className={classes.link}>Blog</a>  
          <a href="#" className={classes.link}>Feedback</a>  
          <Divider my="sm" />  
          <Button variant="default" onClick={toggleTheme}>  
            {isDark ? <IconSun size={16} /> : <IconMoonStars size={16} />}  
          </Button>  
          <Divider my="sm" />  
          <Group justify="center" grow pb="xl" px="md">  
            <Button variant="default">Log in</Button>  
            <Button>Sign up</Button>  
          </Group>  
        </ScrollArea>  
      </Drawer>  
    </Box>  
  );  
}  
