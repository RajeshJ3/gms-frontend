import React from "react";
import Title from "../components/Typographies/Title";
import Members from "../components/Tables/Members";
import Progress from "../components/errors/Progress";

export default function Index(props) {
  console.log(props.location.search);
  return props.isAuthenticated ? (
    <>
      <Title title="Members" />
      <Members {...props} />
    </>
  ) : (
    <Progress />
  );
}
