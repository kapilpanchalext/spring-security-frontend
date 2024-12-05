"use client"

// import styles from "./page.module.scss";

export default function Home() {

  const buttonClickHandler = () => {
    alert("HelloWorld");
  }

  // const sendRequestToAuthServerHandler = async () => {
  //   console.log("Send Request To Auth Server Handler");

  //   // Construct the base URL
  //   // const baseURL = 'http://localhost:9002/realms/application1_realm/protocol/openid-connect/auth';
  //   const baseURL = 'http://localhost:8084/oauth2/authorize';

  //   // Define query parameters
  //   const queryParams = {
  //     response_type: 'code',
  //     client_id: 'capstone-project-auth-code-pkce-1',
  //     redirect_uri: 'http://localhost:3000',
  //     scope: 'openid email',
  //     state: '4qFl3tTCkYb2R6pD',
  //     code_challenge: 'Tgc1QidrfeRMUExvgLljq621HlAIkc5YJ7NmUfGiryA',
  //     code_challenge_method: 'S256'
  //   };

  //   // Use URLSearchParams to append parameters
  //   const url = new URL(baseURL);
  //   Object.entries(queryParams).forEach(([key, value]) => {
  //     url.searchParams.append(key, value);
  //   });
  //   // alert("URL: " + url.toString());
  //   console.dir(url);
  //   window.location.href = url.toString();
  // };

  return (
    <>
      <h1>OAuth2.0 App</h1>
      <div>
        <button onClick={buttonClickHandler}>Click</button>
        {/* <button onClick={sendRequestToAuthServerHandler}><h1>Send Request to Auth Server</h1></button> */}
    </div>
    </>
  );
}
