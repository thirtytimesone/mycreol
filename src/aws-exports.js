const awsconfig = {
  Auth: {
    region: '[your-aws-region]',
    userPoolId: '[your-user-pool-id]',
    userPoolWebClientId: '[your-user-pool-web-client-id]',
  },
  API: {
    endpoints: [
      {
        name: 'toastAPI',
        endpoint: 'https://[your-api-gateway-url]',
        region: '[your-aws-region]'
      }
    ]
  }
};

export default awsconfig;