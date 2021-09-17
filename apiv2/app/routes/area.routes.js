module.exports = (app) => {
  const area = require("../controllers/area.controller.js");

  // Create a new Customer
  app.post("/area", area.create);

  // Retrieve all area
  app.get("/area", area.findAll);

  // Retrieve a single Customer with customerId
  app.get("/area/:areaId", area.findOne);

  // Update a Customer with customerId
  app.put("/area/:areaId", area.update);

  // Delete a Customer with customerId
  app.delete("/area/:areaId", area.delete);

  // Create a new Customer
  app.delete("/area", area.deleteAll);
};
