import { MeDocument } from "@/autogenerated/documents/me";
import { FullPageLoader } from "@/components/FullPageLoader";
import { Page } from "@/components/Page";
import { withGraphQL } from "@/graphql/urql";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "urql";

function User() {
  const [{ data, fetching, error }] = useQuery({ query: MeDocument });

  if (fetching) {
    return <div className="animate-pulse">Loading user...</div>;
  }

  if (error || !data?.me) {
    return <div className="text-indigo-600">Not authenticated.</div>;
  }

  return <div>Hello {data.me.name}</div>;
}

function Dashboard() {
  const { isLoading, hasError, id } = useUser();

  return (
    <Page title="Dashboard">
      <FullPageLoader isVisible={isLoading || hasError || !id} />
      <div className="p-16">
        <User />
      </div>
    </Page>
  );
}

export default withGraphQL(Dashboard);
