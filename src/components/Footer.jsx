import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className=" text-red-700 py-4 fixed inset-x-0 bottom-0">
      <h2 className='flex justify-center items-center text-3xl font-bold underline'>My Socials  </h2>
      <div className="flex justify-center space-x-6 mt-3">
        <a href="https://www.linkedin.com/in/ahmed-baloch-9553b1244/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
        <a href="https://github.com/ASK-Baloch" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
        <a href="https://www.instagram.com/ab_codez/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} />
        </a>
      </div>
    </div>
  );
};

export default Footer;