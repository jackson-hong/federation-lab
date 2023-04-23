import { GraphQLResponse } from "apollo-server-core";
import _ from "lodash";

export const graphqlStatusCodeResponse = (response: GraphQLResponse, requestContext) => {
  if (response.errors) {
    response.http = {
      headers: requestContext.response.http.headers,
      status: 500
    };
    const status = _.get(response, 'errors.0.extensions.exception.status', false);
    if (status) response.http.status = status;
  }
  return response;
}