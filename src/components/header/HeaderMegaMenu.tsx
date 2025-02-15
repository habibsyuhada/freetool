import { IconChevronDown, IconSun, IconMoonStars, IconLogout, IconUser } from "@tabler/icons-react";
import { Anchor, Box, Burger, Button, Center, Collapse, Divider, Drawer, Group, HoverCard, ScrollArea, SimpleGrid, Text, ThemeIcon, UnstyledButton, useMantineTheme, Switch, createTheme, MantineProvider, useMantineColorScheme, Menu, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession, signOut } from "next-auth/react";
import classes from "./HeaderMegaMenu.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { toggleTheme, setTheme } from '../../reducer/themeSlice';
import { useEffect } from 'react';
import { featureData } from '../../data/featureData';

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const dispatch: AppDispatch = useDispatch();
  const themeApp = useSelector((state: RootState) => state.theme.theme);
  const { setColorScheme } = useMantineColorScheme();
  const { data: session } = useSession();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
      setColorScheme(savedTheme);
    }
  }, [dispatch, setColorScheme]);

  const handleToggleTheme = () => {
    const newTheme = themeApp === 'light' ? 'dark' : 'light';
    dispatch(toggleTheme());
    localStorage.setItem('theme', newTheme);
    setColorScheme(newTheme);
  };

  const themeSwitch = createTheme({
    cursorType: "pointer",
  });

  const handleLinkClick = () => {
    closeDrawer();
  };

  const links = featureData.map((item) => (
    <Link href={item.link} key={item.title} style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
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
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <HoverCard width='95%' position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Link href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Tools
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </Link>
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
                        Sign in or create an account to access exclusive features and content. Best of all, it&apos;s completely free!
                      </Text>
                    </div>
                    <Link href="/login" style={{ textDecoration: 'none' }}>
                      <Button variant="default">Log In / Sign</Button>
                    </Link>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="#" className={classes.link}>
              Blog
            </Link>
            <Link href="#" className={classes.link}>
              Contact Us
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <MantineProvider theme={themeSwitch}>
              <Switch 
                size="md" 
                color="dark.4" 
                onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
                offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
                checked={themeApp === 'dark'}
                onChange={handleToggleTheme}
              />
            </MantineProvider>
            
            {session ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <Group>
                      <Avatar 
                        src={session.user?.image} 
                        alt={session.user?.name || ''} 
                        radius="xl"
                        size={34}
                      >
                        {session.user?.name?.[0]}
                      </Avatar>
                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                          {session.user?.name}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {session.user?.email}
                        </Text>
                      </div>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconUser size={14} />}
                    component={Link}
                    href="/profile"
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<IconLogout size={14} />}
                    onClick={() => signOut()}
                    color="red"
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Group>
                <Link href="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="default">Log in</Button>
                </Link>
                <Link href="/register" style={{ textDecoration: 'none' }}>
                  <Button>Sign up</Button>
                </Link>
              </Group>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="Navigation" hiddenFrom="sm" zIndex={1000000}>
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <Link href="/" className={classes.link} onClick={handleLinkClick}>
            Home
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Tools
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link href="#" className={classes.link} onClick={handleLinkClick}>
            Blog
          </Link>
          <Link href="#" className={classes.link} onClick={handleLinkClick}>
            Contact Us
          </Link>

          <Divider my="sm" />

          <MantineProvider theme={themeSwitch}>
            <Switch size="md" color="dark.4" onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />} offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />} checked={themeApp === 'dark'} onChange={handleToggleTheme} style={{ cursor: "pointer" }} ml="md" />
          </MantineProvider>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {session ? (
              <>
                <Text size="sm" ta="center" mb="xs">
                  Signed in as {session.user?.name}
                </Text>
                <Button 
                  variant="light" 
                  color="blue" 
                  fullWidth 
                  component={Link} 
                  href="/profile"
                  leftSection={<IconUser size={14} />}
                  onClick={handleLinkClick}
                >
                  Profile
                </Button>
                <Button 
                  variant="light" 
                  color="red" 
                  fullWidth 
                  onClick={() => {
                    closeDrawer();
                    signOut();
                  }}
                  leftSection={<IconLogout size={14} />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
                  <Button variant="default" fullWidth>Log in</Button>
                </Link>
                <Link href="/register" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
                  <Button fullWidth>Sign up</Button>
                </Link>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
