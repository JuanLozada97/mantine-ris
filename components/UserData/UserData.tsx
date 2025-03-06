'use client';
import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './UserData.module.css';

interface User {
    ID: string;
    IPCODPACI: string;
    IPTIPODOC: number;
    IPNOMCOMP: string;
    CORELEPAC: string;
}

interface ScrollPosition {
    y: number;
}

export default function UserData({ users }: { users: User[] }) { 
    const [scrolled, setScrolled] = useState<boolean>(false);

    const data: User[] = users;

    interface TypeIdMap {
        [key: number]: string;
    }

    const getTypeId = (type: number): string => {
        const typeIdMap: TypeIdMap = {
            1: 'Cédula',
            2: 'Cédula de extranjería',
            3: 'Tarjeta de identidad',
            4: 'Registro civil',
            5: 'Pasaporte',
        };

        return typeIdMap[type] || 'Desconocido';
    };

    const rows = data.map((row: User) => (
        <Table.Tr key={row.ID}>
            <Table.Td>{row.IPCODPACI}</Table.Td>
            <Table.Td>{getTypeId(row.IPTIPODOC)}</Table.Td>
            <Table.Td>{row.IPNOMCOMP}</Table.Td>
            <Table.Td>{row.CORELEPAC}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea h={300} onScrollPositionChange={({ y }: ScrollPosition) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    <Table.Tr>
                        <Table.Th>Identificación</Table.Th>
                        <Table.Th>Tipo de Identificación</Table.Th>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Th>Correo</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
}