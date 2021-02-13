import React from "react";
import Title from "../components/Typographies/Title";
import Divider from "../components/builtins/Divider";
import GYMInfo from "../components/Lists/GYMInfo";
import Progress from "../components/errors/Progress";
import Memberships from "./Memberships";
import Members from "./Members";
import BatchList from "../components/GYM/Batches/CardList";

export default function Index(props) {
  return props.isAuthenticated ? (
    <>
      <GYMInfo />
      <Divider />
      <Memberships {...props} />
      <Divider />
      <Title title="Batches" />
      <BatchList />
      <Divider />
      <Members {...props} />
    </>
  ) : (
    <Progress />
  );
}
