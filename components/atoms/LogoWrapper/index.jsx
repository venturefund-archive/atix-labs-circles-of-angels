import TitlePage from "../TitlePage/TitlePage";
import './_style.scss';

const LogoWrapper = ({ textTitle }) => (
  <div className="LogoWrapper">
    <img src="./static/images/isologo.svg" alt="Circles of angels" />
    <TitlePage textTitle={textTitle} />
  </div>
)

export default LogoWrapper;
