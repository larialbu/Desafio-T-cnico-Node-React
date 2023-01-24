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

const Select = styled.select`
  width: 130px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Option = styled.option`

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

const Form = ({ getAtividades, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const atividades = ref.current;

      atividades.nome.value = onEdit.nome;
      atividades.descricao.value = onEdit.email;
      atividades.hora_inicio.value = onEdit.hora_inicio;
      atividades.hora_termino.value = onEdit.hora_termino;
      atividades.status.value = onEdit.status;

      
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const atividades = ref.current;
    console.log(atividades?.currentTarget?.elements)

    if (
      !atividades.nome.value ||
      !atividades.descricao.value ||
      !atividades.hora_inicio.value ||
      !atividades.hora_termino.value ||
      !atividades.status.value 
      
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      console.log("edit",atividades)
      await axios
        .put("http://localhost:8080/" + onEdit.id, {
          nome: atividades.nome.value,
          descricao: atividades.descricao.value,
          hora_inicio: atividades.hora_inicio.value,
          hora_termino: atividades.hora_termino.value,
          status: atividades.status.value,
          
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      console.log("create",atividades)
      await axios
        .post("http://localhost:8080", {
          nome: atividades.nome.value,
          descricao: atividades.descricao.value,
          hora_inicio: atividades.hora_inicio.value,
          hora_termino: atividades.hora_termino.value,
          status: atividades.status.value,
          
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    atividades.nome.value = "";
    atividades.descricao.value = "";
    atividades.hora_inicio.value = "";
    atividades.hora_termino.value = "";
    atividades.status.value = "";

    setOnEdit(null);
    getAtividades();
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
      <InputArea>
        <Label>Status</Label>
        {/* <Input name="status" type="select" /> */}
        <Select name="status" >
          <Option name="status" value="concluida">concluida</Option>
          <Option name="status" value="em andamento">em andamento</Option>
          <Option name="status" selected value="pendente">pendente</Option>
        </Select>
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;