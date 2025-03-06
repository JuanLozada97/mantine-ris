import React from 'react';
import { Select, TextInput, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import CreatePatient from '@/components/CreatePatient/CreatePatient';

export default function Patients() {
  return (
    <div className='px-4'>
      <CreatePatient />
    </div>
  );
}
