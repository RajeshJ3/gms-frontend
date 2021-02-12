import { useEffect, useState } from "react";
import Title from "../components/Typographies/Title";
import Divider from "../components/builtins/Divider";
import Subscriptions from "../components/Tables/Subscriptions";
import AddButton from "../components/Subscriptions/AddButton";
import MemberInfo from "../components/Lists/MemberInfo";
import Progress from "../components/errors/Progress";
import axios from "axios";
import { DOMAIN, getToken } from "../store/utility";

export default function Index(props) {
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/members/`,
      headers: { Authorization: `Token ${getToken}` },
      params: { id: props.match.params.id },
    })
      .then((res) => {
        setMember(res.data.output && res.data.output[0]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [props.match.params.id]);

  return props.isAuthenticated ? (
    loading  || !member ? (
      <Progress height="400px" top="50%" />
    ) : (
      <>
        <Title
          title={member.name}
          avatarUrl={member.image}
          edit={true}
        />
        <MemberInfo {...member} />
        <Divider />
        <AddButton title="Add Subscription" />
        <Divider />
        <Title title="Recent Subscriptions" />
        <Subscriptions memberId={props.match.params.id} type="one-member" />
      </>
    )
  ) : (
    <Progress />
  );
}
