const office = {
  createOffice: (office) => {
    return `INSERT INTO inventory.offices (officeId, officeName) VALUES ('${office.officeId}', '${office.officeName}');`;
  },
  getAllOffice: () => {
    return `SELECT * FROM inventory.offices ORDER BY inventory.offices.officeName ASC;`;
  },
  deleteOfficeByOfficeId: (officeId) => {
    return `DELETE FROM inventory.offices WHERE officeId = '${officeId}';`;
  },
};
module.exports = office;
