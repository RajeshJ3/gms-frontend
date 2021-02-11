import React from "react";
import CardList from "../components/Memberships/CardList";
import Title from "../components/Typographies/Title";
import Progress from "../components/errors/Progress";

export default function Index(props) {
  return props.isAuthenticated ? (
    <>
      <Title title="Memberships" />
      <CardList />
    </>
  ) : (
    <Progress />
  );
}
