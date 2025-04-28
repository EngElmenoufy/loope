import "./FooterBottom.css";

const FooterBottom = () => {
  const socialMedia = [
    {
      src: "icons/WhatsApp.png",
      alt: "WhatsApp icon",
    },
    {
      src: "icons/LinkedIn.png",
      alt: "LinkedIn icon",
    },
    {
      src: "icons/Facebook.png",
      alt: "Facebook icon",
    },
    {
      src: "icons/X.png",
      alt: "X (Twitter) icon",
    },
    {
      src: "icons/TikTok.png",
      alt: "TikTok icon",
    },
    {
      src: "icons/Instagram.png",
      alt: "Instagram icon",
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
            <a>
              <img src={icon.src} alt={icon.alt} className="w-5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterBottom;
