import React from "react";
import Tree from "react-d3-tree";
import { useGetUserTreeQuery } from "../api/api";
import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function OrgChartTree() {
  const activeUser = useSelector((state) => state.authReducer.activeUser);
  const { data, isLoading } = useGetUserTreeQuery(activeUser._id);
  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <image
        href="dist/img/user.png"
        width="30"
        height="30"
        x="-15"
        onClick={toggleNode}
      />

      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>

      {nodeDatum.attributes?.role && (
        <text fill="black" x="20" dy="20" strokeWidth="1" fontSize={13}>
          Role: {nodeDatum.attributes?.role}
        </text>
      )}
      {nodeDatum.attributes?.email && (
        <text fill="black" x="20" dy="40" strokeWidth="1" fontSize={13}>
          Email: {nodeDatum.attributes?.email}
        </text>
      )}
    </g>
  );

  return (
    <div id="treeWrapper" style={{ width: "50vw", height: "30em" }}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          {" "}
          <Loader size={30} />
        </div>
      ) : (
        <Tree
          data={data}
          orientation="vertical"
          pathFunc={"step"}
          translate={{ x: 400, y: 30 }}
          renderCustomNodeElement={renderRectSvgNode}
          separation={{ siblings: 2, nonSiblings: 0 }}
          zoom={0.8}
        />
      )}
    </div>
  );
}
