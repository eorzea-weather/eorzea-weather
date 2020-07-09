export default {
  track: ({ path, title }) => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', process.env.GOOGLE_ANALYTICS_TRACKING_ID, {
        page_path: path,
        page_title: title,
      });
    }
  },
};
