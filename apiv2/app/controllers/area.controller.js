const Area = require("../models/area.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const area = new Area({
    descripcion: req.body.descripcion,
  });

  // Save Customer in the database
  Area.create(area, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Area.",
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Area.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Area.findById(req.params.AreaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.AreaId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.AreaId,
        });
      }
    } else res.send(data);
  });
};
// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Area.updateById(req.params.AreaId, new Area(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.AreaId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.AreaId,
        });
      }
    } else res.send(data);
  });
};
// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Area.remove(req.params.AreaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.AreaId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Area with id " + req.params.AreaId,
        });
      }
    } else res.send({ message: `Area was deleted successfully!` });
  });
};
// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Area.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Area.",
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
