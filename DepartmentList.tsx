import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const data = {
  departments: [
    {
      name: 'Department 1',
      subDepartments: ['Sub Department 1.1', 'Sub Department 1.2'],
    },
    {
      name: 'Department 2',
      subDepartments: ['Sub Department 2.1', 'Sub Department 2.2'],
    },
  ],
};

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

  const handleClick = (name: string) => {
    setOpen({ ...open, [name]: !open[name] });
  };

  const handleToggle = (name: string, sub?: string) => {
    if (sub) {
      setChecked({ ...checked, [sub]: !checked[sub] });
    } else {
      const isChecked = !checked[name];
      setChecked({ ...checked, [name]: isChecked });
      data.departments.forEach((department) => {
        if (department.name === name) {
          department.subDepartments.forEach((sub) => {
            setChecked((prevChecked) => ({ ...prevChecked, [sub]: isChecked }));
          });
        }
      });
    }
  };

  return (
    <List>
      {data.departments.map((department) => (
        <div key={department.name}>
          <ListItem>
            <Checkbox
              checked={checked[department.name] || department.subDepartments.every((sub) => checked[sub])}
              onClick={() => handleToggle(department.name)}
            />
            <ListItemText primary={department.name} />
            <IconButton onClick={() => handleClick(department.name)}>
              {open[department.name] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open[department.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((sub) => (
                <ListItem key={sub} sx={{ pl: 4 }}>
                  <Checkbox
                    checked={checked[sub] || checked[department.name]}
                    onClick={() => handleToggle(department.name, sub)}
                  />
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;