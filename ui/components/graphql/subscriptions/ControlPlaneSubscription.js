import { graphql, requestSubscription } from "react-relay";
import environment from "../../../lib/relayEnvironment";

export const controlPlaneSubscription = graphql`
  subscription ControlPlaneSubscription($filter: ServiceMeshFilter) {
    controlPlanesState: listenToControlPlaneState(filter: $filter) {
      name
      members {
        name
        version
        component
        namespace
      }
    }
  }
`;

export default function subscribeControlPlaneEvents(dataCB, variables) {
  return requestSubscription(environment, {
    subscription : controlPlaneSubscription,
    variables : { filter : variables },
    onNext : dataCB,
    onError : (error) => console.log(`An error occured:`, error),
  });
}
