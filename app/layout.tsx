



import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { TabsComponent } from '@/components/Tabs/TabsComponent';
import { HeaderMenu } from '@/components/Header/HeaderMenu';
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

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

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className='h-screen'>
        <MantineProvider theme={theme}>
        <HeaderMenu data={data} user={user} />
        <TabsComponent />
        <div className="p-4">
            {children}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
