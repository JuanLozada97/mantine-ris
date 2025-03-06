"use client";
import { Button, Grid, GridCol, Group, Select, TextInput } from "@mantine/core";

interface Country {
  cca3: string;
  name: {
    common: string;
  };
}
import { hasLength, isNotEmpty, useForm } from "@mantine/form";


const typeDocument = [
  { value: '1', label: 'Cédula' },
  { value: '2', label: 'Cédula de extranjería' },
  { value: '3', label: 'Tarjeta de identidad' },
  { value: '4', label: 'Registro civil' },
  { value: '5', label: 'Pasaporte' }
];
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";

export default function FormCreate() {
  const [countries, setCountries] = useState([]);
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,name",
      );

      if (!response.ok) {
        throw new Error("Error al obtener los países");
      }

      const data = await response.json();
      const countryNames = data.map((country: Country) => ({
        value: country.cca3,
        label: country.name.common,
      }));
      setCountries(countryNames);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  const form = useForm({
    initialValues: {
      identification: "",
      firstName: "",
      secondName: "",
      lastName: "",
      secondLastName: "",
      typeDocument: "1",
      country: "COL",
      birthDate: "",
    },

    validate: {
      identification: hasLength(
        { min: 2, max: 12 },
        "La identificación debe tener entre 2 y 12 caracteres",
      ),
      firstName: isNotEmpty("El primer nombre es requerido"),
      lastName: isNotEmpty("El primer apellido es requerido"),
      typeDocument: isNotEmpty("El tipo de documento es requerido"),
      birthDate: (value) => {
        const date = new Date(value);
        const today = new Date();
        return value && date < today ? null : "Ingresa una fecha valida";
      },
    },
  });

  const handleValidation = () => {
    form.validate();
    if (form.isValid()) {
      alert("Paciente creada correctamente");
    }
  };
  return (
    <form
      onSubmit={form.onSubmit(() => {})}
      style={{ marginTop: "2rem" }}
      onSubmitCapture={handleValidation}
    >
      <Grid
        columns={12}
        gutter="sm"
        breakpoints={{
          xs: "100px",
          sm: "200px",
          md: "300px",
          lg: "700px",
          xl: "500px",
        }}
      >
        <GridCol span={{ base: 12, lg: 4 }}>
          <TextInput
            label="Identificación"
            placeholder="Identificación"
            withAsterisk
            key={form.key("identification")}
            {...form.getInputProps("identification")}
          />
          <TextInput
            label="Primer Nombre"
            placeholder="Primer Nombre"
            withAsterisk
            mt="md"
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
          />

        </GridCol>
        <GridCol span={{ base: 12, lg: 4 }}>
          <Select
            label="Tipo de Documento"
            placeholder="Tipo de Documento"
            withAsterisk
            key={form.key("typeDocument")}
            {...form.getInputProps("typeDocument")}
            data={typeDocument}
            checkIconPosition="right"
          />
          <TextInput
            label="Segundo Nombre"
            placeholder="Segundo Nombre"
            mt="md"
            key={form.key("secondName")}
            {...form.getInputProps("secondName")}
          />
          <TextInput
            label="Segundo Apellido"
            placeholder="Segundo Apellido"
            mt="md"
            key={form.key("secondLastName")}
            {...form.getInputProps("secondLastName")}
          />
        </GridCol>
        <GridCol span={{ base: 12, lg: 4 }}>
          <Select
            label="Pais"
            placeholder="Pais"
            key={form.key("country")}
            {...form.getInputProps("country")}
            data={countries}
            checkIconPosition="right"
            searchable
            nothingFoundMessage="No existe"
          />
          <DateInput
            label="Fecha de Nacimiento"
            withAsterisk
            placeholder="Fecha de Nacimiento"
            key={form.key("birthDate")}
            {...form.getInputProps("birthDate")}
            mt="md"
          />
        </GridCol>
      </Grid>

      <Group justify="flex-end" mt="md">
        <Button type="submit">Guardar</Button>
        <Button variant="filled" color="red" onClick={() => form.reset()}>
          Limpiar
        </Button>
      </Group>
    </form>
  );
}