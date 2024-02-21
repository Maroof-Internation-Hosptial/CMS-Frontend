import UnderConstruction from "../componenets/pages/underconstruction";

const appRoutes = [
  {
    path: "/member",
    element: <UnderConstruction />,
    state: "member",
    sidebarProps: {
      displayText: "User Management",
      icon: <i className="nav-icon far fa-image" />,
    },
    child: [
      {
        path: "/membermanagement",
        element: <UnderConstruction />,
        state: "member.add",
        sidebarProps: {
          displayText: "Add User",
          icon: <i class="far fa-circle nav-icon"></i>,
        },
      },
      {
        path: "/directory",
        element: <UnderConstruction />,
        state: "member.directory",
        sidebarProps: {
          displayText: "Manage User",
          icon: <i class="far fa-circle nav-icon"></i>,
        },
      },
    ],
  },
  {
    path: "/component",
    element: <UnderConstruction />,
    state: "component",
    sidebarProps: {
      displayText: "Complaint Management",
      icon: <i className="nav-icon fas fa-columns" />,
    },
    child: [
      {
        path: "/addevent",
        element: <UnderConstruction />,
        state: "component.alert",
        sidebarProps: {
          displayText: "Add Complaint",
          icon: <i class="far fa-circle nav-icon"></i>,
        },
      },
      {
        path: "/eventdirectory",
        element: <UnderConstruction />,
        state: "component.button",
        sidebarProps: {
          displayText: "Event Directory",
          icon: <i class="far fa-circle nav-icon"></i>,
        },
      },
    ],
  },
  {
    path: "/component",
    element: <UnderConstruction />,
    state: "component",
    sidebarProps: {
      displayText: "Mailbox",
      icon: <i className="nav-icon far fa-envelope" />,
    },
    child: [
      {
        path: "/compose",
        element: <UnderConstruction />,
        state: "component.alert",
        sidebarProps: {
          displayText: "Compose",
          icon: <i class="far fa-circle nav-icon"></i>,
        },
      },
      {
        path: "/inbox",
        element: <UnderConstruction />,
        state: "component.button",
        sidebarProps: {
          displayText: "Inbox",
          icon: <i class="far fa-circle nav-icon"></i>,
        },
      },
    ],
  },
  {
    path: "/reports",
    element: <UnderConstruction />,
    state: "documentation",
    sidebarProps: {
      displayText: "Reports & Analytics",
      icon: <i class="nav-icon fas fa-edit"></i>,
    },
  },
  {
    path: "/donations",
    element: <UnderConstruction />,
    state: "changelog",
    sidebarProps: {
      displayText: "Donations",
      icon: <i class="nav-icon fas fa-tree"></i>,
    },
  },
  {
    path: "/literature",
    element: <UnderConstruction />,
    state: "changelog",
    sidebarProps: {
      displayText: "Literature",
      icon: <i class="nav-icon fas fa-file"></i>,
    },
  },
  {
    path: "/config",
    element: <UnderConstruction />,
    state: "changelog",
    sidebarProps: {
      displayText: "Configuration",
      icon: <i class="nav-icon far fa-plus-square"></i>,
    },
  },
];

export default appRoutes;
