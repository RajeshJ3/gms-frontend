import React from "react";
import Title from "../components/Typographies/Title";
import Members from "../components/Tables/Members";
import AddButton from "../components/Members/AddButton";
import Progress from "../components/errors/Progress";

export default function Index(props) {
  return props.isAuthenticated ? (
    <>
      <Title
        title="Members"
        action={
          <div style={{ paddingLeft: "10px" }}>
            <AddButton />
          </div>
        }
      />
      <Members {...props} />
    </>
  ) : (
    <Progress />
  );
}
