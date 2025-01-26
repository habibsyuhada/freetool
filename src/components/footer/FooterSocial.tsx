import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text, useMantineTheme } from '@mantine/core';
import classes from './FooterSocial.module.css';
import Link from 'next/link';

export function FooterSocial() {
  const theme = useMantineTheme();
  
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text 
              size="xl" 
              fw={700} 
              c={theme.colors.blue[6]}
              style={{ cursor: 'pointer' }}
            >
              FreeTool
            </Text>
          </Link>	
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}