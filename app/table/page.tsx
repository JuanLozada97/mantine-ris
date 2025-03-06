import UserData from "@/components/UserData/UserData";
import { rem, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { IconFileSpreadsheet, IconUsers } from "@tabler/icons-react";

export default async function TableScrollArea() {

  const response = await fetch("https://demoris.indira.ai/api/v2/mock/patient");
  const result = await response.json();

  return (

        <UserData users={result.data} />

  );
}