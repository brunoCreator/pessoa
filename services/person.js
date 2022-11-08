import db from "./database";

db.transaction((tx) => {

  tx.executeSql(
    'CREATE TABLE "pessoa" (  "id" INTEGER UNIQUE,  "nome" TEXT,  "tipo" TEXT,  "foto" BLOB,  "cpf" TEXT, "email" TEXT, "telefone" TEXT,"civil" TEXT,"cep" TEXT,"estado" TEXT,"municipio" TEXT,"bairro" TEXT,"logradouro" TEXT,"numero" TEXT, "complemento" TEXT,  PRIMARY KEY("id" AUTOINCREMENT) )');
});


const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO 'pessoa' (nome, tipo, foto, cpf, email, telefone, civil, cep,estado, municipio, bairro, logradouro, numero, complemento) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [obj.nome, obj.tipo, obj.foto, obj.cpf, obj.email, obj.telefone, obj.civil, obj.cep, obj.estado, obj.municipio, obj.bairro, obj.logradouro, obj.numero, obj.complemento],

        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error)
      );
    });
  });
};

const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {

      tx.executeSql(
        "UPDATE cars SET brand=?, model=?, hp=? WHERE id=?;",
        [obj.brand, obj.model, obj.hp, id],

        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM pessoa WHERE id=?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj not found: id=" + id); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};


const findByBrand = (brand) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM pessoa WHERE brand LIKE ?;",
        [brand],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj not found: brand=" + brand); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM pessoa;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM pessoa WHERE id=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

export default {
  create,
  update,
  find,
  findByBrand,
  all,
  remove,
};