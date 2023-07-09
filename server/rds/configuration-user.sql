/*
 
 fix problem with password ALTER USER 'root' @'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';
 
 ALTER USER 'root' @'%' IDENTIFIED WITH mysql_native_password BY '123456789';
 
 SET
 GLOBAL connect_timeout = 31536000;
 
 SET
 GLOBAL interactive_timeout = 31536000;
 
 SET
 GLOBAL wait_timeout = 31536000;
 
 SHOW VARIABLES LIKE 'connect_timeout';
 
 SHOW VARIABLES
 WHERE
 Variable_Name IN (
 'connect_timeout',
 'interactive_timeout',
 'wait_timeout'
 );
 */