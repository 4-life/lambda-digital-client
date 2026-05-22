export default function env() {
  if (process.env.NODE_ENV === 'production') {
    return {
      PRODUCTION: true,
      imagesUrl: 'https://images.λ.digital/nfts',
      avatarsUrls: 'https://images.λ.digital/avatars',
      uri: 'https://api.λ.digital',
    };
  }

  return {
    PRODUCTION: false,
    imagesUrl: 'https://images.λ.digital/nfts',
    avatarsUrls: 'https://images.λ.digital/avatars',
    uri: 'http://localhost:3005',
  };
}
