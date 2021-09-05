type TrackOptions = {
  path: string;
  title: string;
};

export function track({ path, title }: TrackOptions): void {
  const trackingID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  if (typeof window.gtag === 'function' && trackingID) {
    window.gtag('config', trackingID, {
      page_path: path,
      page_title: title,
    });
  }
}
