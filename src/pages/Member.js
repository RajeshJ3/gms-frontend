import Title from "../components/Typographies/Title";
import Divider from "../components/builtins/Divider";
import Subscriptions from "../components/Tables/Subscriptions";
import AddButton from "../components/Subscriptions/AddButton";
import MemberInfo from "../components/Lists/MemberInfo";
import Progress from "../components/errors/Progress";

export default function Index(props) {
  return props.isAuthenticated ? (
    <>
      <MemberInfo {...props} />
      <Divider />
      <AddButton title="Add Subscription" />
      <Divider />
      <Title title="Recent Subscriptions" />
      <Subscriptions memberId={props.match.params.id} type="one-member" />
    </>
  ) : (
    <Progress />
  );
}
