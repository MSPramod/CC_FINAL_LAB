import React from 'react';

export default function Home() {
  return (
    <div>
      <style>
        {`
          .home-container {
            padding: 24px 16px;
            max-width: 768px;
            margin: 0 auto;
          }

          .home-heading {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 16px;
            color: #2c3e50; /* Slate-like color */
          }

          .home-paragraph {
            margin-bottom: 16px;
            color: #7f8c8d; /* Slate-like color */
            font-size: 1rem;
          }
        `}
      </style>
      <div className='home-container'>
        <h1 className='home-heading'>
          Single Sign-On Using Auth0
        </h1>
        <p className='home-paragraph'>
          This project integrates a modern front-end architecture with a React-based user interface and React Router 
          for efficient client-side routing. The back-end leverages Node.js and Express for robust server-side functionality, 
          while MongoDB serves as the chosen database for data storage and management. Authentication is implemented using JSON 
          Web Tokens (JWT), providing a secure and scalable solution.
        </p>
        <p className='home-paragraph'>
          Single sign-on (SSO) is a centralized authentication mechanism that allows users to access multiple applications with a 
          single set of credentials. This approach streamlines the user experience and mitigates the risks associated with password 
          fatigue by reducing the number of unique passwords a user must manage.
        </p>
        <p className='home-paragraph'>
          SSO not only simplifies the user experience but also strengthens security protocols by consolidating authentication 
          processes and minimizing opportunities for unauthorized access. Users can seamlessly navigate between applications without
           the need for multiple logins, promoting productivity and a smooth digital experience.
        </p>
        <p className='home-paragraph'>
          In this application, Auth0, a prominent identity management platform, is employed to facilitate the implementation of SSO.
           Auth0 offers extensive support for various identity providers, providing a comprehensive suite of authentication options 
           and security measures tailored to the needs of the application.
        </p>
        <p className='home-paragraph'>
          By centralizing authentication through SSO, organizations can optimize IT administration efforts, streamline access control,
           and ensure consistent application of security policies across different systems. This centralized approach enhances overall
            operational efficiency and security within complex digital environments.
        </p>
      </div>
    </div>
  );
}
