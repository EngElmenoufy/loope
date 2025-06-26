import "./FooterBottom.css";

const FooterBottom = () => {
  const socialMedia = [
    {
      src: "icons/WhatsApp.png",
      alt: "WhatsApp icon",
      link: "https://www.whatsapp.com/",
    },
    {
      src: "icons/LinkedIn.png",
      alt: "LinkedIn icon",
      link: "https://www.linkedin.com/",
    },
    {
      src: "icons/Facebook.png",
      alt: "Facebook icon",
      link: "https://www.facebook.com/",
    },
    {
      src: "icons/X.png",
      alt: "X (Twitter) icon",
      link: "https://x.com/home",
    },
    {
      src: "icons/TikTok.png",
      alt: "TikTok icon",
      link: "https://www.tiktok.com/",
    },
    {
      src: "icons/Instagram.png",
      alt: "Instagram icon",
      link: "https://www.instagram.com/",
    },
  ];

  return (
    <div className="footer-bottom">
      <div className="footer-logo">
        <h3>Loope</h3>
      </div>
      <ul className="social-icons">
        {socialMedia.map((icon) => (
          <li key={icon.alt}>
            <a href={icon.link} target="_blank">
              <img src={icon.src} alt={icon.alt} className="w-5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterBottom;
