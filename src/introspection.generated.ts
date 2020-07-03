/* eslint-disable */

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'UNION',
        name: '_Entity',
        possibleTypes: [
          {
            name: 'User',
          },
          {
            name: 'Todo',
          },
        ],
      },
    ],
  },
};
export default result;
