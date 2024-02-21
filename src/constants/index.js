export const MAX_FILE_SIZE = 10485760;
export const ACCEPTED_ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const headers = new Headers();
headers.append(
  "X-CSCAPI-KEY",
  "R05jbFZnTXpUbU8wQ2lxS2NWVkUzOXl4aFhPWlVrZm9DNTFrVzhSRQ=="
);

export const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <i className="nav-icon fas fa-tachometer-alt" />,
  },
  {
    path: "/",
    name: "User Management",
    icon: <i className="nav-icon far fa-image" />,
    subRoutes: [
      {
        path: "/membermanagement",
        name: "Add User ",
        icon: <i className="far fa-circle nav-icon" />,
      },
      {
        path: "/directory",
        name: "Manage User",
        icon: <i className="far fa-circle nav-icon" />,
      },
    ],
  },
  {
    path: "/events",
    name: "Complaint Management",
    icon: <i className="nav-icon fas fa-columns" />,
    exact: true,
    subRoutes: [
      {
        path: "/addevent",
        name: "Add Complaint ",
        icon: <i className="far fa-circle nav-icon" />,
      },
      {
        path: "/eventdirectory",
        name: "Manage Complaint",
        icon: <i className="far fa-circle nav-icon" />,
      },
    ],
  },
  {
    path: "/reports",
    name: "Reports and Analytics",
    icon: <i class="nav-icon fas fa-edit"></i>,
  },
  {
    path: "/donations",
    name: "Donations",
    icon: <i class="nav-icon fas fa-tree"></i>,
  },
  {
    path: "/literature",
    name: "Literature",
    icon: <i class="nav-icon fas fa-file"></i>,
  },
  {
    path: "/config",
    name: "Configuration",
    icon: <i class="nav-icon far fa-plus-square"></i>,
  },
];
