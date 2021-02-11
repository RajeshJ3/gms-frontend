import React from "react";
import CardList from "../components/Cards/CardList";
import Title from "../components/Typographies/Title";
import Divider from "../components/builtins/Divider";
import Subscriptions from "../components/Tables/Subscriptions";
import AddButton from "../components/Subscriptions/AddButton";
import Progress from "../components/errors/Progress";

export default function Index(props) {
  return props.isAuthenticated ? (
    <>
      <CardList />
      <Divider />
      <Title title="New Subscription" />
      <AddButton title="Add Subscription" />
      <Divider />
      <Title title="Recent Subscriptions" />
      <Subscriptions />
    </>
  ) : (
    <Progress />
  );
}
