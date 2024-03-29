export const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <i className="nav-icon fas fa-tachometer-alt" />,
  },
  {
    path: "/users",
    name: "User Management",
    icon: <i className="nav-icon far fa-image" />,
    subRoutes: [
      {
        path: "/membermanagement",
        name: "Add User",
        icon: <i className="far fa-circle nav-icon" />,
      },
      {
        path: "/admin-directory",
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
        path: "/user_event_directory",
        name: "View Complaint ",
        icon: <i className="far fa-eye nav-icon" />,
      },
      {
        path: "/admin-event-directory",
        name: "Manage Complaint",
        icon: <i className="far fa-circle nav-icon" />,
      },
      // {
      //   path: "/eventfeedback",
      //   name: "Complaint Feedback",
      //   icon: <i className="far fa-circle nav-icon" />,
      // },
    ],
  },
  // {
  //   path: "/reports",
  //   name: "Reports and Analytics",
  //   icon: <i class="nav-icon fas fa-edit"></i>,
  // },
  // {
  //   path: "/donations",
  //   name: "Donations",
  //   icon: <i class="nav-icon fas fa-tree"></i>,
  // },
  // {
  //   path: "/literature",
  //   name: "Literature",
  //   icon: <i class="nav-icon fas fa-file"></i>,
  // },
  {
    path: "/contacts",
    name: "Contacts",
    icon: <i class="nav-icon fas fa-envelope"></i>,
  },
  {
    path: "/config",
    name: "Configuration",
    icon: <i class="nav-icon far fa-plus-square"></i>,
  },
];

export const rukanRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <i className="nav-icon fas fa-tachometer-alt" />,
  },
  // {
  //   path: "/users",
  //   name: "User Management",
  //   icon: <i className="nav-icon far fa-image" />,
  //   subRoutes: [
  //     {
  //       path: "/membermanagement",
  //       name: "Add User",
  //       icon: <i className="far fa-circle nav-icon" />,
  //     },
  //     {
  //       path: "/directory",
  //       name: "User Management",
  //       icon: <i className="far fa-circle nav-icon" />,
  //     },
  //   ],
  // },

  // {
  //   path: "/events",
  //   name: "Complaint Management",
  //   icon: <i className="nav-icon fas fa-columns" />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/addevent",
  //       name: "Add Complaint ",
  //       icon: <i className="far fa-circle nav-icon" />,
  //     },
  //     {
  //       path: "/eventdirectory",
  //       name: "Manage Complaint",
  //       icon: <i className="far fa-circle nav-icon" />,
  //     },
  //     {
  //       path: "/eventfeedback",
  //       name: "Complaint Feedback",
  //       icon: <i className="far fa-circle nav-icon" />,
  //     },
  //   ],
  // },

  {
    path: "/addevent",
    name: "Add Complaint ",
    icon: <i className="far fa-circle nav-icon" />,
  },
  {
    path: "/user_event_directory",
    name: "View Complaint ",
    icon: <i className="far fa-eye nav-icon" />,
  },
  {
    path: "/eventdirectory",
    name: "In Queue",
    icon: <i className="far fa-circle nav-icon" />,
  },
  {
    path: "/eventdirectoryresolved",
    name: "Resolved/Canceled",
    icon: <i className="far fa-circle nav-icon" />,
  },

  // {
  //   path: "/reports",
  //   name: "Reports and Analytics",
  //   icon: <i class="nav-icon fas fa-edit"></i>,
  // },
  // {
  //   path: "/donations",
  //   name: "Donations",
  //   icon: <i class="nav-icon fas fa-tree"></i>,
  // },
  // {
  //   path: "/literature",
  //   name: "Literature",
  //   icon: <i class="nav-icon fas fa-file"></i>,
  // },
];

export const muawinRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <i className="nav-icon fas fa-tachometer-alt" />,
  },

  {
    path: "/addevent",
    name: "Add Complaint ",
    icon: <i className="far fa-circle nav-icon" />,
  },
  {
    path: "/user_event_directory",
    name: "View Complaint ",
    icon: <i className="far fa-eye nav-icon" />,
  },

  {
    path: "/muawin-event-directory",
    name: "In Queue",
    icon: <i className="far fa-circle nav-icon" />,
  },

  // {
  //   path: "/eventdirectoryresolved",
  //   name: "Resolved",
  //   icon: <i className="far fa-circle nav-icon" />,
  // },
  // {
  //   path: "/events",
  //   name: "Complaint Management",
  //   icon: <i className="nav-icon fas fa-columns" />,
  //   exact: true,
  //   subRoutes: [
  //       {
  //         path: "/addevent",
  //         name: "Add Complaint ",
  //         icon: <i className="far fa-circle nav-icon" />,
  //       },

  //     {
  //       path: "/eventfeedback",
  //       name: "Complaint Feedback",
  //       icon: <i className="far fa-circle nav-icon" />,
  //     },
  //   ],
  // },
  // {
  //   path: "/reports",
  //   name: "Reports and Analytics",
  //   icon: <i class="nav-icon fas fa-edit"></i>,
  // },
  // {
  //   path: "/donations",
  //   name: "Donations",
  //   icon: <i class="nav-icon fas fa-tree"></i>,
  // },
  // {
  //   path: "/literature",
  //   name: "Literature",
  //   icon: <i class="nav-icon fas fa-file"></i>,
  // },
];

export const donorRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <i className="nav-icon fas fa-tachometer-alt" />,
  },

  // {
  //   path: "/events",
  //   name: "Complaint Management",
  //   icon: <i className="nav-icon fas fa-columns" />,
  //   exact: true,
  //   subRoutes: [

  {
    path: "/addevent",
    name: "Add Complaint ",
    icon: <i className="far fa-comment-dots nav-icon" />,
  },
  {
    path: "/user_event_directory",
    name: "View Complaint ",
    icon: <i className="far fa-eye nav-icon" />,
  },

  // {
  //   path: "/muawin-event-directory",
  //   name: "Manage Complaint",
  //   icon: <i className="far fa-circle nav-icon" />,
  // },

  // {
  //   path: "/eventfeedback",
  //   name: "Complaint Feedback",
  //   icon: <i className="far fa-circle nav-icon" />,
  // },

  //   ],
  // },

  // {
  //   path: "/donations",
  //   name: "Donations",
  //   icon: <i class="nav-icon fas fa-tree"></i>,
  // },
  // {
  //   path: "/literature",
  //   name: "Literature",
  //   icon: <i class="nav-icon fas fa-file"></i>,
  // },
];
