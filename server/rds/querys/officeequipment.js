const officeEquipment = {
  createOfficeEquipment: (equipment) => {
    return `INSERT INTO inventory.officeequipment ( equipmentId, equipmentName) VALUES ( '${equipment.equipmentId}', '${equipment.equipmentName}');`;
  },
  getOfficeEquipmentByEquipmentId: () => {
    return `SELECT * FROM inventory.officeequipment WHERE equipmentId = '${equipmentId}';`;
  },
  deleteOfficeEquipmentByEquipmentId: () => {
    return `DELETE FROM inventory.officeequipment WHERE equipmentId = '${equipmentId}'`;
  },
  getAllOfficeEquipment: () => {
    return `SELECT * FROM inventory.officeequipment;`;
  },
};
module.exports = officeEquipment;
