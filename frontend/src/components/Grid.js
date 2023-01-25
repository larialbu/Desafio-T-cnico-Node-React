import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
} 
`;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  width: 130px;

`;

export const Td = styled.td`
  padding-top: 15px; 
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width:40px;
`;

const Grid = ({ activity, setAtividades, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8080/" + id)
      .then(({ data }) => {
        const newArray = activity.filter((atividades) => atividades.id !== id);

        setAtividades(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Descrição</Th>
          <Th onlyWeb>Hora I</Th>
          <Th onlyWeb>Hora T</Th>
          <Th onlyWeb>status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {activity.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.descricao}</Td>
            <Td width="20%" onlyWeb>
              {item.hora_inicio}
            </Td>
            <Td width="20%" onlyWeb>
              {item.hora_termino}
            </Td>
            <Td onlyWeb>
              {item.status}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;