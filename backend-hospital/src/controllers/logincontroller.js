const bcrypt = require("bcrypt");
function auth(req, res) {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [data.email],
      (err, userdata) => {
        if (userdata.length > 0) {
          userdata.forEach((element) => {
            bcrypt.compare(data.password, element.password, (err, isMatch) => {
              if (!isMatch) {
                return res.status(200).json({
                  error: "Error: Contraseña incorrecta!",
                  ok: false,
                });
              } else {
                return res.status(200).json({
                  success: element,
                  ok: true,
                });
              }
            });
          });
        } else {
          return res.status(200).json({
            error: "Error: ESTE USUARIO NO EXISTE !",
            ok: false,
          });
        }
      }
    );
  });
}

function storeUser(req, res) {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [data.email],
      (err, userdata) => {
        if (userdata.length > 0) {
          return res.status(200).json({
            error: "Error: ESTE USUARIO YA EXISTE !",
            ok: false,
          });
        } else {
          bcrypt.hash(data.password, 12).then((hash) => {
            data.password = hash;
            req.getConnection((err, conn) => {
              conn.query("INSERT INTO users SET ?", [data], (err, rows) => {
                return res.status(200).json({
                  success: "Exito: EL USUARIO SE HA CREADO CORRECTAMENTE !",
                  ok: true,
                });
              });
            });
          });
        }
      }
    );
  });
}

function obtenerUsuarios(req, res) {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM users WHERE tipoUser = ?;",
      ["paciente"],
      (err, userdata) => {
        return res.status(200).json({
          user: userdata,
          ok: true,
        });
      }
    );
  });
}

function storecitas(req, res) {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO citas SET ?", [data], (err, rows) => {
      return res.status(200).json({
        success: "Exito: LA CITA SE HA CREADO CORRECTAMENTE !",
        ok: true,
      });
    });
  });
}

function obtenercitas(req, res) {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM citas;", [], (err, citas) => {
      return res.status(200).json({
        citas: citas,
        ok: true,
      });
    });
  });
}

function storenovedades(req, res) {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO novedades SET ?", [data], (err, rows) => {
      return res.status(200).json({
        success: "Exito: LA NOVEDAD SE HA CREADO CORRECTAMENTE !",
        ok: true,
      });
    });
  });
}

function obtenenovedades(req, res) {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM novedades;", [], (err, novedad) => {
      return res.status(200).json({
        novedad: novedad,
        ok: true,
      });3
    });
  });
}

function obtenermiscitas(req, res) {
  const email = req.params.email;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM citas WHERE email = ?;", [email], (err, citas) => {
      return res.status(200).json({
        citas: citas,
        ok: true,
      });
    });
  });
}

function obtenemisnovedades(req, res) {
  const email = req.params.email;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM novedades WHERE email = ?;", [email], (err, novedad) => {
      return res.status(200).json({
        novedad: novedad,
        ok: true,
      });
    });
  });
}

module.exports = {
  storeUser,
  auth,
  obtenerUsuarios,
  storecitas,
  obtenercitas,
  obtenenovedades,
  storenovedades,
  obtenermiscitas,
  obtenemisnovedades,
};
