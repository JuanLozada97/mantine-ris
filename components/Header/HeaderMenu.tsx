'use client'

import Link from 'next/link';
import cx from 'clsx';
import Image from 'next/image';
import {  rem, Avatar, Text, Menu, Group, Center, Burger, Container, UnstyledButton, useMantineTheme, MantineTheme, useMantineColorScheme} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconFileText, IconHeart, IconInfoCircle, IconLogout, IconMessage, IconPlayerPause, IconSettings, IconSignature, IconStar, IconSwitchHorizontal, IconTemplate, IconTrash, IconUserCheck } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';
import { ActionToggle } from '../ActionToggle/ActionToggle';
import { useState } from 'react';
import { LanguagePicker } from '../LanguagePicker/LanguagePicker';

const data = [
  { label: 'HOMI'},
  { label: 'San Jose'},
  { label: 'Medilaser'},
  { label: 'INDIRA QA'},
];

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

export function HeaderMenu() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme=== 'dark';
  const [openedCompanies, setOpenedCompanies] = useState(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(data[0]);
  console.log('colorScheme', colorScheme);

  const itemsCompanies = data.map((item) => (
    <Menu.Item
      onClick={() => setSelectedCompany(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  const getAltText = () => (isDarkTheme ? 'Dark Logo' : 'Light Logo');

  return (
    <header className={classes.header}>
      <Container size="md">
        
        
        <div className={classes.inner}>
        <Link href="/">
        <Image
            alt={getAltText()}
            src={isDarkTheme ? '/w-indira.png' : '/b-indira.png'}
            width={180}
            height={30}
          />
        </Link>
        
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onOpen={() => setOpenedCompanies(true)}
            onClose={() => setOpenedCompanies(false)}
            radius="md"
            withinPortal
          >
            
            <Menu.Target>
              <UnstyledButton className={classes.control} data-expanded={openedCompanies || undefined}>
                <Group gap="xs">
                  <span className={classes.label}>{selectedCompany.label}</span>
                </Group>
                <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{itemsCompanies}</Menu.Dropdown>
            <LanguagePicker />
          </Menu>
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group gap={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconTemplate
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Plantillas
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSignature
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Firmas
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconUserCheck
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Usuarios de confianza
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }disabled
              >
                Preferences
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconFileText style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Changelogs
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconInfoCircle style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                About
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Logout
              </Menu.Item>

            </Menu.Dropdown>
            <Group>
              <ActionToggle />
            </Group>
          </Menu>
        </div>
      </Container>
    </header>
  );
}