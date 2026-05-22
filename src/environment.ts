export default function env() {
  if (process.env.NODE_ENV === 'production') {
    return {
      PRODUCTION: true,
      imagesUrl: 'https://images.xn--wxa.digital/nfts',
      avatarsUrls: 'https://images.xn--wxa.digital/avatars',
      uri: 'https://api.xn--wxa.digital',
    };
  }

  return {
    PRODUCTION: false,
    imagesUrl: 'https://images.xn--wxa.digital/nfts',
    avatarsUrls: 'https://images.xn--wxa.digital/avatars',
    uri: 'http://localhost:3005',
  };
}
