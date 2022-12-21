INSERT INTO department (name)
VALUES
('Dept-1'),
('Dept-2'),
('Dept-3'),
('Dept-4'),
('Dept-5');

INSERT INTO role (title, salary, department_id)
VALUES
('Role-1', 1000, 1),
('Role-2', 2000, 5),
('Role-3', 3000, 3),
('Role-4', 4000, 4),
('Role-5', 5000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 3),
  ('Virginia', 'Woolf', 1, 2),
  ('Piers', 'Gaveston', 0, 1),
  ('Charles', 'LeRoi', 1, 5),
  ('Katherine', 'Mansfield', 1, 4);