INSERT INTO departments (dept_name)
VALUES
('Software Development'),
('Sales'),
('Marketing'),
('Fulfillment');

INSERT INTO roles (title, department_id, salary)
VALUES
('Head of Software Development', 1, 200000),
('Sales associate', 2, 60000),
('Fulfillment Team Lead', 4, 80000),
('Head of Advertising', 3, 300000);

INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES
('James', 'Sanchez', 2, 'Rick'),
('Rick', 'DeMarquez', 4, NULL);




