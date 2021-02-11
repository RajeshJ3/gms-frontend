import React from "react";
import Title from "../components/Typographies/Title";
import Divider from "../components/builtins/Divider";
import Subscriptions from "../components/Tables/Subscriptions";
import AddButton from "../components/Subscriptions/AddButton";
import MemberInfo from "../components/Lists/MemberInfo";
import Progress from "../components/errors/Progress";

export default function Index(props) {
  return props.isAuthenticated ? (
    <>
      <Title
        title="Rajesh Joshi"
        avatarUrl={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDXpJ03vvBEzI9QZ6F-Y44JnKvfh1aXZCZw&usqp=CAU"
        }
        edit={true}
      />
      <MemberInfo />
      <Divider />
      <AddButton title="Add Subscription" />
      <Divider />
      <Title title="Recent Subscriptions" />
      <Subscriptions type="one-member" />
    </>
  ) : (
    <Progress />
  );
}
