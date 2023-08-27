import React from "react";
import {Button, MenuItem, Menu} from "@mui/material";
import styles from "./menubar.module.css";

export default function MenuBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = (link: string | undefined) => {
        setAnchorEl(null);
        if(link !== undefined)
          window.document.location = link;
      };

      return (
        <div className="menu">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleClose("/")}>Home</MenuItem>
            <MenuItem onClick={() => handleClose("/time-card")}>Time Card</MenuItem>
          </Menu>
        </div>
      );
}