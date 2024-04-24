import '../cssFiles/Works.css'
import ImgExample1 from '../assets/images/imageWorks/img1.png'
import ImgExample2 from '../assets/images/imageWorks/img2.png'
import ImgExample3 from '../assets/images/imageWorks/img3.png'
import ImgExample4 from '../assets/images/imageWorks/img4.png'
import ImgExample5 from '../assets/images/imageWorks/img5.png'
import ImgExample6 from '../assets/images/imageWorks/img6.png'
import ImgExample7 from '../assets/images/imageWorks/img7.png'
import ImgExample8 from '../assets/images/imageWorks/img8.png'
import ImgExample9 from '../assets/images/imageWorks/img9.png'
import ImgExample10 from '../assets/images/imageWorks/img10.png'
import ImgExample11 from '../assets/images/imageWorks/img11.png'
import ImgExample12 from '../assets/images/imageWorks/img12.png'
import HeartLogo from '../components/HeratLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import BackHome from '../components/BackToHome';
const HEIGTH = '210';
 const WIDTH = '210';
function Works(){
    return(
    <>
    <header className="headerMyWorks">
        <HeartLogo className='logo'/>
    </header>
    <div className="examplePic">
      <img src={ImgExample1} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample2} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample3} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample4} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample5} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample6} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample7} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample8} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample9} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample10} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample11} alt="" height={HEIGTH} width={WIDTH} />
      <img src={ImgExample12} alt="" height={HEIGTH} width={WIDTH} />
    </div>
    <div className="WoeksBtn">
      <BackHome/>
    </div>

    <div className="instagramFooter">
      <a href='https://www.instagram.com/dananailsofficial?igsh=bjBkcGxqd3I2dXY4'> 
        <FontAwesomeIcon icon={faInstagram} className="icon" />
        <span>
            👈לתמונות נוספות בקרו באינסטגרם 
        </span>
      </a>
      </div>
    </>
    )
};

export default Works;