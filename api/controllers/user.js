import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`nome`, `descricao`, `hora_inicio`, `hora_termino`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.hora_inicio,
    req.body.hora_termino,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa criada com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `descricao` = ?, `hora_inicio` = ?, `hora_termino` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.hora_inicio,
    req.body.hora_termino,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa deletada com sucesso.");
  });
};