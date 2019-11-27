import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Pane,
  Button,
  FormField,
  TextInput,
  Text,
  Heading
} from "evergreen-ui";

const Page = () => {
  const [postalCode, setPostalCode] = useState("04078011");
  const [phone, setPhone] = useState("");

  const [isLoadingAddress, setLoadingAddress] = useState(false);
  const [address, setAddress] = useState();

  const searchAddress = () => {
    axios.get(`https://viacep.com.br/ws/${postalCode}/json/`).then(response => {
      setAddress(response.data);
      setLoadingAddress(false);
    });
  };

  return (
    <Pane>
      <Heading size={600} marginBottom>
        Dados Pessoais
      </Heading>
      ...
      <Heading size={600} marginBottom marginTop>
        Endereço
      </Heading>
      <FormField label="🏠CEP">
        <TextInput
          value={postalCode}
          placeholder="04078011"
          onChange={({ target }) => setPostalCode(target.value)}
        />
        <Button onClick={searchAddress}>Buscar</Button>
      </FormField>
      {isLoadingAddress ? (
        <Text>Espere um momento...</Text>
      ) : (
        address && (
          <Pane>
            <FormField label="Rua">
              <TextInput value={address.logradouro} disabled />
            </FormField>

            <FormField label="Bairro">
              <TextInput value={address.bairro} disabled />
            </FormField>

            <FormField label="Cidade">
              <TextInput value={address.localidade} disabled />
            </FormField>

            <FormField label="Número">
              <TextInput
                value={phone}
                placeholder="(99) 999999999"
                onChange={({ target }) => setPhone(target.value)}
              />
            </FormField>
          </Pane>
        )
      )}
      <Heading size={600} marginBottom marginTop>
        Dados de Pagamento
      </Heading>
      ...
    </Pane>
  );
};

function App() {
  return (
    <div className="App">
      <Page />
    </div>
  );
}

export default App;
