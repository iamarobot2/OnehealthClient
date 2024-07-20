import { HashLink as Link } from "react-router-hash-link";
import MenuIcon from "@mui/icons-material/Menu";
import Switcher from "./Switcher";
import { Button, IconButton, Drawer, Box } from "@mui/material";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const drawernav = (
    <Box
      sx={{
        width: 250,
        display: open ? "block" : "none",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
        transition: "all 0.3s ease-out",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div  className="dark:bg-slate-900 bg-white dark:text-white h-full w-full py-12 px-6 flex flex-col gap-12 select-none">
        <nav>
          <ul className="flex flex-col text-md gap-4">
            <li className="hover:text-blue-400">
              <Link smooth to="/#home">
                Home
              </Link>
            </li>
            <li className="hover:text-blue-400">
              <Link smooth to="/#services">
                Our Services
              </Link>
            </li>
            <li className="hover:text-blue-400">
              <Link smooth to="/#about">About</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link smooth to="/#contact">Contact Us</Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-row gap-2 justify-center">
          <Link to={"/login"}>
            <Button variant="outlined" size="small">
              Login
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button variant="contained" size="small">
              Signup
            </Button>
          </Link>
        </div>
      </div>
    </Box>
  );
  return (
    <>
      <header className="fixed w-full  mx-auto px-6 lg:px-12 py-1 dark:bg-slate-900 bg-white dark:text-white flex flex-row justify-between items-center z-50 font-poppins select-none">
        <div className="flex flex-row items-center gap-10">
          <div className="flex flex-row gap-2 items-center">
            <img
              src="/assets/logo3.png"
              alt="Logo"
              className=" aspect-square w-12"
            />
            <h1 className="text-2xl font-semibold">One Health</h1>
          </div>
          <nav>
            <ul className="hidden lg:flex flex-row gap-6 text-md dark:text-slate-300 text-slate-700">
              <li className="hover:text-blue-400">
                <Link smooth to="/#home">
                  Home
                </Link>
              </li>
              <li className="hover:text-blue-400">
                <Link smooth to="/#services">
                  Our Services
                </Link>
              </li>
              <li className="hover:text-blue-400">
                <Link smooth to="/#about">About</Link>
              </li>
              <li className="hover:text-blue-400">
                <Link smooth to="/#contact">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-row gap-2 lg:gap-6 items-center">
          <div className="hidden lg:flex flex-row gap-2">
            <Link to={"/login"}>
              <Button variant="outlined" size="small">
                Login
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button variant="contained" size="small">
                Signup
              </Button>
            </Link>
          </div>
          <div className="pt-7">
            <Switcher></Switcher>
          </div>
          <div className="lg:hidden">
            <IconButton aria-label="Menu Button" onClick={toggleDrawer(true)}>
              <MenuIcon color="primary" />
            </IconButton>
          </div>
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {drawernav}
        </Drawer>
      </header>
    </>
  );
}

export default Header;
