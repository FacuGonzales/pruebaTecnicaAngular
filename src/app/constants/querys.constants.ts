import { gql } from 'apollo-angular';

export const GET_CHARACTER_DETAILS = gql`
query getCharacterDetails($id: ID!) {
  character(id: $id) {
    id
    name
    image
    species
    gender
    status
    origin {
      name
      residents {
        id
        name
        image
      }
    }
    location {
      name
      residents {
        id
        name
        image
      }
    }
    episode {
      id
      name
      air_date
    }
  }
}
`;
