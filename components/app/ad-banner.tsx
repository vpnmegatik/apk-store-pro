interface AdBannerProps {
  slot: string;
  fallbackImage?: string;
  link?: string;
}

export function AdBanner({ slot, fallbackImage, link }: AdBannerProps) {
  if (fallbackImage && link) {
    return (
      <a href={link} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg border">
        <img src={fallbackImage} alt="Advertisement" className="h-28 w-full object-cover" />
      </a>
    );
  }

  return (
    <ins
      className="adsbygoogle block h-28 w-full overflow-hidden rounded-lg border"
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
