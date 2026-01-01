// import React from "react";
// import "../Footer/Footer.css";

// const Footer = () => {
//   return (
//     <footer className="lm-footer">
//       <div className="lm-footer-inner">
//         <div className="lm-footer-left">
//           <h4 className="lm-footer-logo">Landmine Soft</h4>
//           <p className="lm-footer-address">
//             {/* 2nd Floor, XYZ Tech Park, Madhapur,
//             <br /> */}
//             Hyderabad, Telangana 500081, India
//           </p>
//         </div>

//         <div className="lm-footer-right">
//           <p className="lm-footer-small">contact@landminesoft.com</p>
//           <p className="lm-footer-small">+91‑98XX‑XXX‑XXX</p>
//         </div>
//       </div>

//       <div className="lm-footer-bottom">
//         <p>© {new Date().getFullYear()} Landmine Soft. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <footer className="lm-footer">
      <div className="lm-footer-inner">
        <div className="lm-footer-left">
          <h4 className="lm-footer-logo">Landmine Soft</h4>
          <p className="lm-footer-address">
            {/* 2nd Floor, XYZ Tech Park, Madhapur,
            <br /> */}
            Hyderabad, Telangana 500081, India
          </p>
        </div>

        <div className="lm-footer-right">
          <p className="lm-footer-small">contact@landminesoft.com</p>
          <p className="lm-footer-small">+91‑98XX‑XXX‑XXX</p>
          
          {/* Social Media Icons */}
          <div className="lm-social-icons">
            <a href="https://linkedin.com/company/landminesoft" target="_blank" rel="noopener noreferrer" className="lm-social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 192 192" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M156,0h-120c-19.875,0 -36,16.125 -36,36v120c0,19.875 16.125,36 36,36h120c19.875,0 36,-16.125 36,-36v-120c0,-19.875 -16.125,-36 -36,-36zM59.36539,162.98077h-29.82693l-0.17307,-89.30769h29.82692zM43.70192,61.99038h-0.17308c-9.75,0 -16.03846,-6.72115 -16.03846,-15.08653c0,-8.56731 6.49039,-15.0577 16.41347,-15.0577c9.92308,0 16.00961,6.49038 16.21153,15.0577c0,8.36538 -6.31731,15.08653 -16.41346,15.08653zM162.77885,162.98077h-30.08654v-48.51923c0,-11.74039 -3.11538,-19.73077 -13.61538,-19.73077c-8.01923,0 -12.34615,5.39423 -14.42308,10.61538c-0.77885,1.875 -0.98077,4.44231 -0.98077,7.06731v50.56731h-30.23077l-0.17308,-89.30769h30.23077l0.17308,12.60577c3.86538,-5.97116 10.29808,-14.42308 25.70192,-14.42308c19.09616,0 33.37501,12.46154 33.37501,39.25961v51.86539z"/>
              </svg>
            </a>
            
            <a href="https://facebook.com/landminesoft" target="_blank" rel="noopener noreferrer" className="lm-social-link" aria-label="Facebook">
              <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05-.865 0-1.716.107-2.528.321v14.49L8.864 12.7c.69-.696 1.61-1.102 2.59-1.102 2.418 0 4.382 1.956 4.382 4.365 0 2.402-1.743 4.429-4.014 4.62v-3.802c0-.599.064-1.194.19-1.785.463-1.946 1.407-3.26 2.776-3.26 1.085 0 1.966.894 1.966 1.994v2.587h-3.292V13.11h5.338c-.042 1.32-.373 2.604-1.017 3.626l2.658 2.579V8.05z"/>
              </svg>
            </a>
            
            <a href="https://instagram.com/landminesoft" target="_blank" rel="noopener noreferrer" className="lm-social-link" aria-label="Instagram">
              <svg viewBox="0 0 512 512" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M256 49.471c67.266 0 75.233.257 101.8 1.469 24.562 1.121 37.9 5.224 46.778 8.674a78.052 78.052 0 0 1 28.966 18.845 78.052 78.052 0 0 1 18.845 28.966c3.45 8.877 7.554 22.216 8.674 46.778 1.212 26.565 1.469 34.532 1.469 101.8s-.257 75.233-1.469 101.8c-1.121 24.562-5.225 37.9-8.674 46.778a83.427 83.427 0 0 1-47.811 47.811c-8.877 3.45-22.216 7.554-46.778 8.674-26.56 1.212-34.527 1.469-101.8 1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051 78.051 0 0 1-28.966-18.845 78.053 78.053 0 0 1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s.257-75.233 1.469-101.8c1.121-24.562 5.224-37.9 8.674-46.778A78.052 78.052 0 0 1 78.458 78.458a78.053 78.053 0 0 1 28.966-18.845c8.877-3.45 22.216-7.554 46.778-8.674 26.565-1.212 34.532-1.469 101.8-1.469m0-45.391c-68.418 0-77 .29-103.866 1.516-26.815 1.224-45.127 5.482-61.151 11.71a123.488 123.488 0 0 0-44.62 29.057A123.488 123.488 0 0 0 17.3 90.982C11.077 107.007 6.819 125.319 5.6 152.134 4.369 179 4.079 187.582 4.079 256S4.369 333 5.6 359.866c1.224 26.815 5.482 45.127 11.71 61.151a123.489 123.489 0 0 0 29.057 44.62 123.486 123.486 0 0 0 44.62 29.057c16.025 6.228 34.337 10.486 61.151 11.71 26.87 1.226 35.449 1.516 103.866 1.516s77-.29 103.866-1.516c26.815-1.224 45.127-5.482 61.151-11.71a128.817 128.817 0 0 0 73.677-73.677c6.228-16.025 10.486-34.337 11.71-61.151 1.226-26.87 1.516-35.449 1.516-103.866s-.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486 123.486 0 0 0-29.057-44.62A123.487 123.487 0 0 0 421.018 17.3C404.993 11.077 386.681 6.819 359.866 5.6 333 4.369 324.418 4.079 256 4.079h0Z"/>
                <path fill="currentColor" d="M256 126.635A129.365 129.365 0 1 0 385.365 256 129.365 129.365 0 0 0 256 126.635Zm0 213.338A83.973 83.973 0 1 1 339.974 256 83.974 83.974 0 0 1 256 339.973Z"/>
                <circle fill="currentColor" cx="390.476" cy="121.524" r="30.23"/>
              </svg>
            </a>
            
            <a href="https://x.com/landminesoft" target="_blank" rel="noopener noreferrer" className="lm-social-link" aria-label="X (Twitter)">
              <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.52 3.2c.128.512.24 1.024.352 1.536h-3.424v5.824h-1.792V9.056H3.488V7.632h2.656V4.496c0-.512-.064-1.024-.192-1.536h1.984v2.944h3.584V3.2h1.792ZM8 0C3.584 0 0 3.584 0 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8m6.336 11.552a6.272 6.272 0 0 1-1.792-.512 3.424 3.424 0 0 0 1.984-1.888 6.4 6.4 0 0 1-2.176 1.024A6.336 6.336 0 0 1 8 10.112a6.24 6.24 0 0 0 4.288-1.888 3.2 3.2 0 0 1-2.976-2.208v-.064a3.232 3.232 0 0 0 3.36 2.912 3.232 3.232 0 0 1-.96-.128 3.2 3.2 0 0 0-2.912-1.888 3.2 3.2 0 0 1-2.176-.896A3.184 3.184 0 0 0 5.12 6.08a3.232 3.232 0 0 0 .96.128 3.2 3.2 0 0 1 2.112-.896 6.336 6.336 0 0 1 1.024 12.8Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="lm-footer-bottom">
        <p>© {new Date().getFullYear()} Landmine Soft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

