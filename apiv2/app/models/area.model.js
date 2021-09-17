const sql = require("./db.js");

//constructor
const Area = function (area) {
  this.descripcion = area.descripcion;
};

Area.create = (newArea, result) => {
  sql.query("INSERT INTO area SET ?", newArea, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created area: ", { id: res.insertId, ...newArea });
    result(null, { id: res.insertId, ...newArea });
  });
};

Area.findById = (areaId, result) => {
  sql.query("SELECT * FROM area WHERE id= ${areaId}", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found area: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Area.getAll = (result) => {
  sql.query("SELECT * FROM area", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("area:", res);
    result(null, res);
  });
};

Area.updateById = (id, area, result) => {
  sql.query(
    "UPDATE area SET descripcion = ? where id = ?",
    [area.descripcion],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated area: ", { id: id, ...area });
      result(null, { id: id, ...area });
    }
  );
};

Area.remove = (id, result) => {
  sql.query("DELETE FROM area WHERE id= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted area with id: ", id);
    result(null, res);
  });
};

Area.removeAll = (result) => {
  sql.query("DELETE FROM area", (err, res) => {
    if (err) {
      console.log("errir: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ${red.affectedRows} area");
    result(null, res);
  });
};

module.exports = Area;
