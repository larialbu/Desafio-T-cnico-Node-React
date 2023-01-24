import { db } from "../db.js";

export const getUsuario = (_, res) => {
  const q = "SELECT * FROM usuarios";
 
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUsuario = (req, res) => {
  const q =
    "INSERT INTO atividades(`email`, `senha`) VALUES(?)";

  const values = [
    req.body.email,
    req.body.senha,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("cadastro feito com sucesso!!");
  });
};
