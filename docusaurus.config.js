// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// Full configuration options detailed here: https://docusaurus.io/docs/api/docusaurus-config

// Documentation page id for open source: sumo-logic-open-source-projects

const fs = require('fs')

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const cidRedirects = JSON.parse(fs.readFileSync('cid-redirects.json').toString())

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Sumo Logic Docs',
  tagline: '',
  url: process.env.HOSTNAME || "http://localhost:3000",
  trailingSlash: true,
  baseUrl: process.env.BASE_URL || "/",
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://www.sumologic.com/favicon.ico',
  organizationName: 'sumologic', // Usually your GitHub org/user name.
  projectName: 'sumologic-documentation', // Usually your repo name.
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Material+Icons',
  ],
  scripts: [
    {
      src: 'https://js.sitesearch360.com/plugin/bundle/3113.js',
      async: true,
    },
    {
      src: 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
      async: true,
    },
    {
      src: './src/helper/google-translate.js',
      async: true,
    },
  ],
  staticDirectories: ['static'],
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          "parser": {
            "syntax": "typescript",
            "tsx": true
          },
          target: 'es2017',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        }
      },
    }),
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/SumoLogic/sumologic-documentation/edit/main/',
          //sidebarCollapsible: true,
          //sidebarCollapsed: false,
          remarkPlugins: [
            //https://www.npmjs.com/package/remark-code-import
            require('remark-code-import'),
            //https://www.npmjs.com/package/remark-import-partial
            // snippet support {@import ./my-name.md} relative filepath to md file
            require('remark-import-partial'),
          ],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          admonitions: {
            tag: ':::',
            keywords: [
              'sumo',
              'secondary',
              'info',
              'success',
              'danger',
              'note',
              'tip',
              'warning',
              'important',
              'caution',
            ],
          },
        },
        googleAnalytics: {
          trackingID: 'UA-16579649-3',
        },
        blog: {
          blogTitle: 'Sumo Logic Service Release Notes',
          path: 'blog-service',
          routeBasePath: 'release-notes-service',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          blogDescription: 'Latest features and bug fixes for Sumo Logic apps, alerts, security, search, observability, data collectors, and more.',
          postsPerPage: 'ALL',
          showReadingTime: false,
          feedOptions: {
            type: 'rss',
            // https://help.sumologic.com/release-notes-service/rss.xml
            title: 'Sumo Logic Service Release Notes',
            description: 'Latest features and bug fixes for Sumo Logic apps, alerts, security, search, observability, data collectors, and more.',
            copyright: `Copyright ©${new Date().getFullYear()} Sumo Logic`,
          },
        },
        theme: {
          customCss: [
            require.resolve('./src/css/sumo.scss'),
            require.resolve('./src/css/sitesearch360.scss'),
          ],
        },
      }),
    ],
  //  [
  //    'redocusaurus',
  //    {
  //      specs: [
  //        {
  //          id: 'sumoapi',
  //          //specUrl: 'https://api.sumologic.com/docs/sumologic-api.yaml',
  //          spec: 'sumologic-api.yaml',
  //          route: '/sumoapi/',
  //        },
  //      ],
  //    },
  //  ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom',
    'react-iframe',
    ['@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: './community',
        routeBasePath: 'hackathon',
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        breadcrumbs: false,
        // ... other options
      },
    ],
    ['@docusaurus/plugin-content-blog',
      {
         id: 'blog-cse',
         routeBasePath: 'release-notes-cse',
         path: './blog-cse',
         archiveBasePath: 'archive',
         blogTitle: 'Sumo Logic Cloud SIEM Release Notes',
         blogSidebarTitle: 'All posts',
         blogSidebarCount: 'ALL',
         postsPerPage: 'ALL',
         blogDescription: 'New and enhanced Cloud SIEM features, bug fixes, updated rules, log mappers, parsers, and more.',
         showReadingTime: false,
         feedOptions: {
           type: 'rss',
           // https://help.sumologic.com/release-notes-cse/rss.xml
           title: 'Sumo Logic Cloud SIEM Release Notes',
           description: 'New and enhanced Cloud SIEM features, bug fixes, updated rules, log mappers, parsers, and more.',
           copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
         },
      },
    ],
    ['@docusaurus/plugin-content-blog',
       {
          id: 'blog-developer',
          routeBasePath: 'release-notes-developer',
          path: './blog-developer',
          archiveBasePath: 'archive',
          blogTitle: 'Sumo Logic Developer Release Notes',
          blogDescription: 'The latest Sumo Logic developer features and updates to our APIs, Live Tail CLI, and more.',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          showReadingTime: false,
          feedOptions: {
            type: 'rss',
            // https://help.sumologic.com/release-notes-developer/rss.xml
            title: 'Sumo Logic Developer Release Notes',
            description: 'The latest Sumo Logic developer features and updates to our APIs, Live Tail CLI, and more.',
            copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
         },
       },
    ],
    ['@docusaurus/plugin-content-blog',
       {
          id: 'blog-collector',
          routeBasePath: 'release-notes-collector',
          path: './blog-collector',
          archiveBasePath: 'archive',
          blogTitle: 'Sumo Logic Collector Release Notes',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
          blogDescription: 'New Sumo Logic Collector features and relevant bug fixes for each release.',
          showReadingTime: false,
          feedOptions: {
            type: 'rss',
            // https://help.sumologic.com/release-notes-collector/rss.xml
            title: 'Sumo Logic Collector Release Notes',
            description: 'New Sumo Logic Collector features and relevant bug fixes for each release.',
            copyright: `Copyright © ${new Date().getFullYear()} Sumo Logic`,
          },
        },
    ],
    ['@docusaurus/plugin-client-redirects',
      {
        redirects: Object.entries(cidRedirects).map(
          ([key, value]) => ({ from: key, to: value })
        )
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    // SEO Global Metadata
    metadata: [{name: 'keywords', content: 'sumo logic, documentation, tutorials, quickstarts'}],
    imageZoom: {
      selector: '.markdown :not(a) > img',
      // Optional medium-zoom options
      // see: https://www.npmjs.com/package/medium-zoom#options
      options: {
        background: 'rgba(0, 0, 0, 0.6)',
      },
    },
    colorMode: {
      defaultMode: 'light',
    },
    algolia: {
      //The application ID provided by Algolia
      appId: '2SJPGMLW1Q',
      // Public API key: it is safe to commit it
      apiKey: 'fb2f4e1fb40f962900631121cb365549',
      indexName: 'crawler_sumodocs',
      // Optional: see doc section below
      contextualSearch: false,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //externalUrlRegex: 'external\\.com|domain\\.com',
      // Optional: Algolia search parameters
      //searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: false,
      //... other Algolia params
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['csharp', 'powershell', 'java', 'markdown', `scala`],
    },
      navbar: {
        logo: {
          alt: 'Sumo Logic logo',
          srcDark: 'img/sumo-logo.svg',
          src: 'img/sumo-logo-dark.svg',
        },
        items: [
          {
            label: 'Guides',
            position: 'left',
            to: '#',
            type: 'dropdown',
            items:[
              {
                label: 'Start Here',
                to: '/docs/get-started',
                activeBaseRegex: '^/docs/get-started/.*',
              },
              {
                label: 'Send Data (Collectors)',
                to: '/docs/send-data',
                activeBaseRegex: '^/docs/send-data/.*',
              },
              {
                label: 'App Catalog',
                to: '/docs/integrations',
                activeBaseRegex: '^/docs/integrations/.*',
              },
              {
                label: 'Log Search',
                to: '/docs/search',
                activeBaseRegex: '^/docs/search/.*',
              },
              {
                label: 'Alerts, Monitors',
                to: '/docs/alerts',
                activeBaseRegex: '^/docs/alerts/.*',
              },
              {
                label: 'Traces, APM, RUM',
                to: '/docs/apm',
                activeBaseRegex: '^/docs/apm/.*',
              },
              {
                label: 'Metrics',
                to: '/docs/metrics',
                activeBaseRegex: '^/docs/metrics/.*',
              },
              {
                label: 'Observability',
                to: '/docs/observability',
                activeBaseRegex: '^/docs/observability/about',
              },
              {
                label: 'Dashboards',
                to: '/docs/dashboards-new',
                activeBaseRegex: '^/docs/dashboards-new/.*',
              },
              {
                label: 'Manage Sumo Acct',
                to: '/docs/manage',
                activeBaseRegex: '^/docs/manage/.*',
              },
              {
                label: 'Cloud SIEM',
                to: '/docs/cse',
                activeBaseRegex: '^/docs/(cse)/.*',
              },
              {
                label: 'Cloud SOAR',
                to: '/docs/cloud-soar',
                activeBaseRegex: '^/docs/cloud-soar/.*',
              },
            ]
          },
          {
            label: 'API',
            position: 'left',
            to: '#',
            type: 'dropdown',
            items:[
              {
                label: 'Docs',
                to: '/docs/api',
              },
              {
                label: 'Reference',
                href: 'https://api.sumologic.com/docs/',
              },
            ]
          },
          {
            label: 'Release Notes',
            position: 'left',
            to: '/docs/release-notes',
            type: 'dropdown',
            items:[
              {
                label: 'Service',
                to: 'release-notes-service',
              },
              {
                label: 'Cloud SIEM',
                to: 'release-notes-cse',
              },
              {
                label: 'Collector',
                to: 'release-notes-collector',
              },
              {
                label: 'Developer',
                to: 'release-notes-developer',
              },
            ]
          },
          {
            label: 'Contribute',
            to: '/docs/contributing',
            position: 'left',
          },
          {
            type: 'html',
            position: 'right',
            value: '<div id="google_translate_element"></div>',
          },
          {
            to: 'https://www.sumologic.com/sign-up',
            position: 'right',
            className: 'header-login',
          },
          {
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
            to: 'https://github.com/SumoLogic/sumologic-documentation',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            items: [
              {
                label: 'Training & Certifications',
                href: 'https://www.sumologic.com/learn/training/',
              },
              {
                label: 'Events & Webinars',
                href: 'https://www.sumologic.com/events/',
              },
              {
                label: 'Request Demo',
                href: 'https://www.sumologic.com/request-demo',
              },
            ],
            title: 'Learn',
          },
          {
            items: [
              {
                label: 'Contact Support',
                href: 'https://support.sumologic.com/hc/en-us',
              },
              {
                label: 'Sumo Dojo Slack',
                href: 'https://sumodojo.slack.com/',
              },
              {
                label: 'Community',
                href: 'https://support.sumologic.com/hc/en-us/community/topics',
              },
            ],
            title: 'Help',
          },
          {
            items: [
              {
                label: 'Docs GitHub',
                href: 'https://github.com/SumoLogic/sumologic-documentation',
              },
              {
                label: 'Sumo Logic GitHub',
                href: 'https://github.com/SumoLogic',
              },
              {
                label: 'Sumo Labs Projects',
                href: 'https://github.com/SumoLogic-Labs',
              },
            ],
            title: 'Open Source',
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} by Sumo Logic, Inc.`,
      },
    }),
};
