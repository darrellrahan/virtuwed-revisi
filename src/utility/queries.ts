export const GET_GUEST = `
  query GetAllGuestWeddingSessionId($weddingSessionId: ID!) {
    getAllGuestWeddingSessionId(wedding_session_id: $weddingSessionId) {
      id
      name
      whatsapp
      instagram
      address
      visit_invitation_at
      visit_virtual_wedding_at
    }
  }
`;


export const GET_COMMENT = `
query GetAllGuestCommentsByWeddingSessionId($weddingSessionId: ID!) {
  getAllGuestCommentsByWeddingSessionId(wedding_session_id: $weddingSessionId){
      id
      wedding_session {
        id
      }
      name
      message
      createdAt
    }
}
`;

export const GET_GIFT = `
query GetAllGuestDigitalGiftByWeddingSessionId($weddingSessionId: ID!){
  getAllGuestDigitalGiftByWeddingSessionId(wedding_session_id: $weddingSessionId){
      id
      digital_gift{
        id
        price
        name
        description
        preview
      }
      guest{
        id
        name
      }
      invoice{
        id
        invoice
      }
      message
    }
}
`;


export const GET_ASSETS = `
  query GetAllAssetByWeddingSession($weddingSessionId: ID!) {
    getAllAssetByWeddingSession(wedding_session_id: $weddingSessionId) {
      id
      wedding_session {
        id
      }
      asset_id
      name
      asset_type
      asset_url
    }
  }
  `