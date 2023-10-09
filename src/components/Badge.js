import BadgeImage from "../assets/img/badge_lvl_1.png";
import Badge2Image from "../assets/img/badge_lvl_2.png";
import Badge3Image from "../assets/img/badge_lvl_3.png";
import Badge4Image from "../assets/img/badge_lvl_4.png";
import Badge5Image from "../assets/img/badge_lvl_5.png";

const Badge = ({ level = 1, size = "w-6" }) => {
  let badge = "";
  switch (level) {
    case 1:
      badge = (
        <img src={BadgeImage} className={`inline mr-1.5 ${size}`} alt="badge" />
      );
      break;
    case 2:
      badge = (
        <img
          src={Badge2Image}
          className={`inline mr-1.5 ${size}`}
          alt="badge"
        />
      );
      break;
    case 3:
      badge = (
        <img
          src={Badge3Image}
          className={`inline mr-1.5 ${size}`}
          alt="badge"
        />
      );
      break;
    case 4:
      badge = (
        <img
          src={Badge4Image}
          className={`inline mr-1.5 ${size}`}
          alt="badge"
        />
      );
      break;
    case 5:
      badge = (
        <img
          src={Badge5Image}
          className={`inline mr-1.5 ${size}`}
          alt="badge"
        />
      );
      break;
    default:
      badge = (
        <img src={BadgeImage} className={`inline mr-1.5 ${size}`} alt="badge" />
      );
      break;
  }

  return <>{badge}</>;
};

export default Badge;
