import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.descricao.value = onEdit.email;
      user.hora_inicio.value = onEdit.hora_inicio;
      user.hora_termino.value = onEdit.hora_termino;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;
    console.log(user?.currentTarget?.elements)

    if (
      !user.nome.value ||
      !user.descricao.value ||
      !user.hora_inicio.value ||
      !user.hora_termino.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      console.log("edit",user)
      await axios
        .put("http://localhost:8080/" + onEdit.id, {
          nome: user.nome.value,
          descricao: user.descricao.value,
          hora_inicio: user.hora_inicio.value,
          hora_termino: user.hora_termino.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      console.log("create",user)
      await axios
        .post("http://localhost:8080", {
          nome: user.nome.value,
          descricao: user.descricao.value,
          hora_inicio: user.hora_inicio.value,
          hora_termino: user.hora_termino.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.descricao.value = "";
    user.hora_inicio.value = "";
    user.hora_termino.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="descricao" type="text" />
      </InputArea>
      <InputArea>
        <Label>Hora de inicio</Label>
        <Input name="hora_inicio" type="time" />
      </InputArea>
      <InputArea>
        <Label>Hora de termino</Label>
        <Input name="hora_termino" type="time" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;