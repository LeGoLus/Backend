exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.managerBoard = (req, res) => {
  res.status(200).send("Manager Content.");
};

exports.saleBoard = (req, res) => {
  res.status(200).send("Sale Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.technicianBoard = (req, res) => {
  res.status(200).send("Technician Content.");
};

exports.serviceBoard = (req, res) => {
  res.status(200).send("Service Content.");
};
