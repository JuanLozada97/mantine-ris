'use client'

import { Tabs, Container, rem} from "@mantine/core";
import { useState } from "react";
import  classes  from "./TabsComponent.module.css";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { IconFileSpreadsheet, IconUsers } from "@tabler/icons-react";

interface TabsComponentProps {
  tabs: string[];
}

export function TabsComponent() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const router = useRouter();
  const handleChangeTab = (value : string | null) => {
    //setActiveTab(value);
    router.push(`/${value}`);
  }
  

  return (
    <Tabs 
    defaultValue="Home"
    variant="outline"
    visibleFrom="sm"
    classNames={{
    root: classes.tabs,
    list: classes.tabsList,
    tab: classes.tab,}}
    value={activeTab} onChange={handleChangeTab}>
      <Tabs.List>
        <Tabs.Tab value="patients" leftSection={<IconFileSpreadsheet style={iconStyle} />}>Patients Form </Tabs.Tab>
        <Tabs.Tab value="table" leftSection={<IconUsers style={iconStyle} />}>Patients Table</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}