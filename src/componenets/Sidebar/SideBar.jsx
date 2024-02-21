import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { Outlet } from "react-router-dom";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
// import { routes } from "../../constants";
import useMediaQuery from "@mui/material/useMediaQuery";
import { adminRoutes, donorRoutes, muawinRoutes, rukanRoutes } from "./Routes";

const SideBar = () => {
  const user = useSelector((state) => state.authReducer.activeUser);
  const isMobile = useMediaQuery("(max-width:600px)");

  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "195px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") {
      setRoutes(adminRoutes);
    } else if (user?.role === "dept-manager") {
      setRoutes(rukanRoutes);
    } else if (user?.role === "complaint-assignee") {
      setRoutes(muawinRoutes);
    } else if (user?.role === "user") {
      setRoutes(donorRoutes);
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterRoutes = (routes) => {
    return routes
      .map((route) => {
        if (route.subRoutes) {
          const filteredSubRoutes = route.subRoutes.filter((subRoute) =>
            subRoute.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          return filteredSubRoutes.length
            ? { ...route, subRoutes: filteredSubRoutes }
            : null;
        } else if (
          route.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return route;
        }
        return null;
      })
      .filter(Boolean);
  };

  const filteredRoutes = filterRoutes(routes);
  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "60px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
          style={{ height: "auto" }}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  <Link
                    to="/dashboard"
                    className="brand-link"
                    style={{ color: "white" }}
                  >
                    <div>
                      <img
                        src="dist/img/maroof.png"
                        alt="Admin Logo"
                        className="brand-image img-circle elevation-3"
                        style={{ opacity: ".8", marginLeft: 4 }}
                      />
                    </div>
                    <span className="brand-text font-weight-light">MIH</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className="bars"
              style={{
                padding: !isOpen && "10px",
                margin: !isOpen && "7px",
                cursor: "pointer",
              }}
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          <Divider sx={{ backgroundColor: "gray" }} />
          <div>
            <AnimatePresence>
              <>
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  style={{ margin: "10px 0px" }}
                >
                  <NavLink
                    to="/profile"
                    className="d-block"
                    style={{ color: "white", borderRadius: 5 }}
                  >
                    <div className="user-panel pt-2 pb-2 d-flex">
                      <div className={`${isOpen ? "image" : ""}`}>
                        <img
                          src={user.image}
                          className="img-circle elevation-2"
                          alt="User Image"
                        />
                      </div>
                      {isOpen && (
                        <div className="info">
                          {user.firstName} {user.lastName}
                        </div>
                      )}
                    </div>
                  </NavLink>
                </motion.div>
              </>
            </AnimatePresence>
          </div>
          <Divider sx={{ backgroundColor: "gray", marginBottom: 3 }} />

          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {filteredRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        <div style={{ flex: 1, width: isMobile ? "89%" : "100%" }}>
          {<Outlet />}
        </div>
      </div>
    </>
  );
};

export default SideBar;
