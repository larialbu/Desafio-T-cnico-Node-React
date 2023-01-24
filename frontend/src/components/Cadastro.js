import GlobalStyle from "../styles/global";
import styled from "styled-components";
import Form from "./Form.js";
import Grid from "./Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {Link} from 'react-router-dom'
// import { getAtividades } from "./api/controllers/atividades";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function Cadastro() {
  const [activity, setAtividades] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getAtividades = async () => {
    try {
      const res = await axios.get("http://localhost:8080");
      setAtividades(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAtividades();
  }, [setAtividades]);

  return (
    <>
      <Container>
        <Title>Tarefas</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getAtividades={getAtividades} />
        <Grid setOnEdit={setOnEdit} activity={activity} setAtividades={setAtividades} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Cadastro;