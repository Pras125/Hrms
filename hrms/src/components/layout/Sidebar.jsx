import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReportIcon from "@mui/icons-material/Report";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HistoryIcon from "@mui/icons-material/History";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../../config/Firebase';
import { signOut } from 'firebase/auth';

const drawerWidth = 260;

function Sidebar() {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});

  const handleMenuClick = (menuName) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };


  const handleLogout = async () => {
    console.log('Logout button clicked'); // Add this line to check if the function is triggered
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  

  // const handleLogout = () => {
  //   logout();
  //   handleClose();
  //   navigate('/login');
  // };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/",
    },
    {
      name: "Employee Management",
      icon: <PeopleIcon />,
      link: "/employee-directory" ,
    },
    {
      name: "Department Management",
      icon: <BusinessIcon />,
      link: "/departments",
    },
    {
      name: "Leave Management",
      icon: <EventNoteIcon />,
      submenus: [
        { name: "Leave Request", icon: <SendIcon />, link: "/leave-request" },
        { name: "Leave Approval", icon: <ThumbUpIcon />, link: "/leave-approval" },
        { name: "Leave History", icon: <HistoryIcon />, link: "/leave-history" },
      ],
    },
    {    
        name: "Payroll Dashboard", 
        icon: <DashboardCustomizeIcon />,
        link: "/payroll-dashboard" 

    
    },
    {
      name: "Payroll Management",
      icon: <AttachMoneyIcon />,
      submenus: [
        { name: "Payroll Records", icon: <ReceiptIcon />, link: "/payroll-records" },
        { name: "Payroll Reports", icon: <BarChartIcon />, link: "/payroll-reports" },
      ],
    },
    {
      name: "Performance Management",
      icon: <AssessmentIcon />,
      submenus: [
        { name: "Performance Review", icon: <StarIcon />, link: "/performance-review" },
        { name: "Performance Analytics", icon: <TrendingUpIcon />, link: "/performance-analytics" },
      ],
    },
    {
      name: "Reports",
      icon: <ReportIcon />,
      submenus: [
        { name: "Employee Reports", icon: <PeopleIcon />, link: "/employee-reports" },
        { name: "Leave Reports", icon: <EventNoteIcon />, link: "/leave-reports" },
        { name: "Payroll Reports", icon: <AttachMoneyIcon />, link: "/payroll-reports" },
        { name: "Performance Reports", icon: <AssessmentIcon />, link: "/performance-reports" },
      ],
    },
    {
      name: "Notifications",
      icon: <NotificationsIcon />,
      link: "/notifications",
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
      submenus: [
        { name: "User Settings", icon: <PersonIcon />, link: "/user-settings" },
        { name: "Admin Settings", icon: <AdminPanelSettingsIcon />, link: "/admin-settings" },
      ],
    },
    {
      name: "Help and Support",
      icon: <HelpIcon />,
      submenus: [
        { name: "Help Center", icon: <LiveHelpIcon />, link: "/help-center" },
        { name: "Documentation", icon: <DescriptionIcon />, link: "/documentation" },
      ],
    },
    {
      name: "Logout",
      icon: <ExitToAppIcon />,
      onClick: handleLogout,
    },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          marginTop: "65px"
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          height: "100vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              <ListItem
                button
                component={item.submenus ? "div" : Link}
                to={item.link}
                onClick={() => item.submenus && handleMenuClick(item.name)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                {item.submenus && (openMenus[item.name] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.submenus && (
                <Collapse in={openMenus[item.name]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenus.map((subitem) => (
                      <ListItem
                        key={subitem.name}
                        button
                        component={Link}
                        to={subitem.link}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{subitem.icon}</ListItemIcon>
                        <ListItemText primary={subitem.name} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;