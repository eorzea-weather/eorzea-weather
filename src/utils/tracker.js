export default {
  track: ({ path, title }) => {
    if (!process.env.GOOGLE_ANALYTICS_TRACKING_ID && typeof window.gtag !== 'function') {
      return;
    }
    window.gtag('config', process.env.GOOGLE_ANALYTICS_TRACKING_ID, {
      page_path: path,
      page_title: title,
    });
  },
};
