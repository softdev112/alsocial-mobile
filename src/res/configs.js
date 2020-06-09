const configs = __DEV__
    ? {
          MIXPANEL_API_TOKEN: "f66637cfe86a57b60d2be04f765a1de1",
          SOCIAL_BASE_URI: "https://api-staging.allsocial.com/",
          STREAM: {
              API_KEY: "566vemf4gzzp",
              APP_ID: "44431",
              BASE_URI: "https://api.stream-io-api.com/api/v1.0/",
          },
          SENTRY_PUBLIC_DSN: "https://62454eb37b1c489bb17a69ab6434bf1b@sentry.io/1358220",
          ALGOLIA_SEARCH: {
              APP_ID: "342EUDVR6M",
              API_KEY: "97c2be13a9f90843dc948e20f0d2b54c",
              INDEX: "staging_ALLSOCIAL",
          },
          WEBSITE: "allsocial.com",
          REGION_URL: "https://staging.allsocial.com/location-data.json",
      }
    : {
          MIXPANEL_API_TOKEN: "f66637cfe86a57b60d2be04f765a1de1",
          SOCIAL_BASE_URI: "https://api.allsocial.com/",
          STREAM: {
              API_KEY: "by3px36ahgsx",
              APP_ID: "44430",
              BASE_URI: "https://api.stream-io-api.com/api/v1.0/",
          },
          SENTRY_PUBLIC_DSN: "SENTRY_PUBLIC_DSN=32003b5367e841d0b8c0cb03c17f6b36@sentry.io/1324754",
          ALGOLIA_SEARCH: {
              APP_ID: "342EUDVR6M",
              API_KEY: "c9550152ccfdbfe5ee7bf17f492dc004",
              INDEX: "prod_ALLSOCIAL",
          },
          WEBSITE: "allsocial.com",
          REGION_URL: "https://allsocial.com/location-data.json",
      };

export default configs;
