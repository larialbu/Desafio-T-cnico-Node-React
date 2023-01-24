import { db } from "../db.js";

export const getAtividades = (_, res) => {
  const q = "SELECT * FROM atividades";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addAtividades = (req, res) => {
  const q =
    "INSERT INTO atividades(`nome`, `descricao`, `hora_inicio`, `hora_termino`,`status`,`id_usuario`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.hora_inicio,
    req.body.hora_termino,
    req.body.status,
    1 
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa criada com sucesso.");
  });
};

export const updateAtividades = (req, res) => {
  const q =
    "UPDATE atividades SET `nome` = ?, `descricao` = ?, `hora_inicio` = ?, `hora_termino` = ?, `status` = ? `id_usuario` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.descricao,
    req.body.hora_inicio,
    req.body.hora_termino,
    req.body.status,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
};

export const deleteAtividades = (req, res) => {
  const q = "DELETE FROM atividades WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Tarefa deletada com sucesso.");
  });
};