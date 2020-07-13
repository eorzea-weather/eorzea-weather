export default {
  track: ({ path, title }) => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
        page_path: path,
        page_title: title,
      });
    }
  },
};
