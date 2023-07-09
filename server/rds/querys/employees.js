const employees = {
  createEmployee: (employee) => {
    return `INSERT INTO inventory.employees (employeeId, employeeName, officeId) VALUES ('${employee.employeeId}', '${employee.employeeName}', '${employee.officeId}');`;
  },
  createOfficeEquipmentForEmployees: (employee) => {
    return `INSERT INTO inventory.officeequipmentforemployees  (employeeId, screen, tv, dockingStation, desktopComputer, ipPhone, laptop, printer, headset, webCamera) VALUES ('${employee.employeeId}', '${employee.screen}', '${employee.tv}',  '${employee.dockingStation}', '${employee.desktopComputer}', '${employee.ipPhone}',  '${employee.laptop}', '${employee.printer}',  '${employee.headset}', '${employee.webCamera}');`;
  },
  updateEmployee: (employee) => {
    return `UPDATE inventory.employees SET employeeName = '${employee.employeeName}', officeId = '${employee.officeId}' WHERE (employeeId = '${employee.employeeId}');`;
  },
  updateOfficeEquipmentForEmployees: (employee) => {
    return `UPDATE inventory.officeequipmentforemployees SET screen = '${employee.screen}', tv = '${employee.tv}', dockingStation = '${employee.dockingStation}', ipPhone = '${employee.ipPhone}', desktopComputer = '${employee.desktopComputer}', laptop = '${employee.laptop}', printer = '${employee.printer}', headset = '${employee.headset}', webCamera = '${employee.webCamera}' WHERE employeeId = '${employee.employeeId}';`;
  },
  getEmployeesByParams: (search, officeId) => {
    let conditions = "";
    if (search?.length) {
      conditions += `inventory.employees.employeeName = '${search}' OR inventory.offices.officeName = '${search}' `;
    }
    if (officeId?.length) {
      if (conditions?.length) {
        conditions += ` OR inventory.employees.officeId LIKE '${officeId}%' `;
      } else {
        conditions += ` inventory.employees.officeId LIKE '${officeId}%' `;
      }
    }
    let query = `SELECT
        inventory.employees.employeeId, inventory.employees.employeeName, inventory.employees.officeId,
            inventory.offices.officeName, inventory.officeequipmentforemployees.screen, inventory.officeequipmentforemployees.tv,
            inventory.officeequipmentforemployees.dockingStation, inventory.officeequipmentforemployees.desktopComputer,
            inventory.officeequipmentforemployees.ipPhone, inventory.officeequipmentforemployees.laptop,
            inventory.officeequipmentforemployees.printer, inventory.officeequipmentforemployees.headset,
            inventory.officeequipmentforemployees.webCamera 
    FROM inventory.employees 
    
    INNER JOIN inventory.officeequipmentforemployees  
        ON inventory.officeequipmentforemployees.employeeId = inventory.employees.employeeId  
    INNER JOIN inventory.offices  
        ON inventory.offices.officeId = inventory.employees.officeId
    ${conditions?.length ? `WHERE ${conditions} ` : ""}
    ORDER BY inventory.employees.employeeName ASC; `;
    return query;
  },
  deleteOfficeEquipmentForEmployees: (employeeId) => {
    return `DELETE FROM inventory.officeequipmentforemployees WHERE(employeeId = '${employeeId}'); `;
  },
  deleteEmployee: (employeeId) => {
    return `DELETE FROM inventory.employees WHERE(employeeId = '${employeeId}'); `;
  },
  deleteOfficeEquipmentForEmployeesByOfficeId: (officeId) => {
    return `DELETE FROM inventory.officeequipmentforemployees
        WHERE inventory.officeequipmentforemployees.employeeId IN(
                SELECT * FROM (SELECT
                    inventory.employees.employeeId FROM inventory.employees
                    INNER JOIN inventory.officeequipmentforemployees ON inventory.officeequipmentforemployees.employeeId = inventory.employees.employeeId
                WHERE
                    officeId = '${officeId}') AS result);`;
  },
  deleteEmployeesByOfficeId: (officeId) => {
    return `DELETE FROM inventory.employees
        WHERE inventory.employees.employeeId IN(
                SELECT * FROM (SELECT
                    inventory.employees.employeeId FROM inventory.employees
                WHERE
                    officeId = '${officeId}') AS result);`;
  },
  getEmployees: () => {
    return `SELECT inventory.employees.employeeId, inventory.employees.employeeName, inventory.employees.officeId,
            inventory.offices.officeName, inventory.officeequipmentforemployees.screen, inventory.officeequipmentforemployees.tv,
            inventory.officeequipmentforemployees.dockingStation, inventory.officeequipmentforemployees.desktopComputer,
            inventory.officeequipmentforemployees.ipPhone, inventory.officeequipmentforemployees.laptop,
            inventory.officeequipmentforemployees.printer, inventory.officeequipmentforemployees.headset,
            inventory.officeequipmentforemployees.webCamera 
    FROM inventory.employees 
    
    INNER JOIN inventory.officeequipmentforemployees  
        ON inventory.officeequipmentforemployees.employeeId = inventory.employees.employeeId  
    INNER JOIN inventory.offices  
        ON inventory.offices.officeId = inventory.employees.officeId
        ORDER BY inventory.offices.officeName ASC; `;
  },
};
module.exports = employees;
