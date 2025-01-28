import { IconBook, IconChartPie3, IconChevronDown, IconCode, IconCoin, IconFingerprint, IconNotification, IconSun, IconMoonStars } from "@tabler/icons-react";
import { Anchor, Box, Burger, Button, Center, Collapse, Divider, Drawer, Group, HoverCard, ScrollArea, SimpleGrid, Text, ThemeIcon, UnstyledButton, useMantineTheme, Switch, createTheme, MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMegaMenu.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { toggleTheme } from '../../reducer/themeSlice';

const mockdata = [
  {
    icon: IconCode,
    title: "Currency & Salary Converter",
    description: "This Pokémons cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Task Management",
    description: "The fluid of Smeargles tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Cut Url",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Encoder & Decoder",
    description: "The shells rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "QR Generator",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Image Compressor",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const dispatch: AppDispatch = useDispatch();
  const themeApp = useSelector((state: RootState) => state.theme.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const themeSwitch = createTheme({
    cursorType: "pointer",
  });

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
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
            <a href="#" className={classes.link}>
              Home
            </a>
            <HoverCard width={{ base: "100%", lg: "80%" }} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Tools
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Tools</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={3} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Join Us Today!
                      </Text>
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
            <a href="#" className={classes.link}>
              Blog
            </a>
            <a href="#" className={classes.link}>
              Feedback
            </a>
          </Group>

          <Group visibleFrom="sm">
            <MantineProvider theme={themeSwitch}>
              <Switch size="md" color="dark.4" onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />} offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />} checked={themeApp === 'dark'} onChange={handleToggleTheme} style={{ cursor: "pointer" }} />
            </MantineProvider>
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="Navigation" hiddenFrom="sm" zIndex={1000000}>
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Tools
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Blog
          </a>
          <a href="#" className={classes.link}>
            Feedback
          </a>

          <Divider my="sm" />

          <MantineProvider theme={themeSwitch}>
            <Switch size="md" color="dark.4" onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />} offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />} checked={themeApp === 'dark'} onChange={handleToggleTheme} style={{ cursor: "pointer" }} ml="md" />
          </MantineProvider>

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
