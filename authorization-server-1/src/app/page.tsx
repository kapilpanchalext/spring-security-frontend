"use client"

// import styles from "./page.module.scss";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const [authorizationCode, setAuthorizationCode] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();

  const sendRequestToAuthServerHandler = async () => {
    console.log("Send Request To Auth Server Handler");

    // Construct the base URL
    const baseURL = 'http://localhost:8084/oauth2/authorize';

    // Define query parameters
    const queryParams = {
      response_type: 'code',
      client_id: 'capstone-project-auth-code-pkce-1',
      redirect_uri: 'http://localhost:3000',
      scope: 'openid email',
      state: '4qFl3tTCkYb2R6pD',
      code_challenge: 'Tgc1QidrfeRMUExvgLljq621HlAIkc5YJ7NmUfGiryA',
      code_challenge_method: 'S256'
    };

    // Use URLSearchParams to append parameters
    const url = new URL(baseURL);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    console.dir(url);

    window.addEventListener("beforeunload", () => {
      console.log("Navigating to: ", window.location.href);
    });

    window.location.href = url.toString();
  };

  const verifyStateParameterHandler = () => {
    console.log("Verify State Parameter");
    const stateSent = "4qFl3tTCkYb2R6pD";
    console.log("Verify State");

      // Access the query parameters
    const code = searchParams.get('code');  // Get the 'code' parameter from the URL
    const stateReceived = searchParams.get('state');  // Get the 'state' parameter
    // const error = searchParams.get('error');  // Get the 'error' parameter
  
    if (code && stateReceived === stateSent) {
      // Authorization code received, now you can exchange it for an access token
      console.log('Authorization code: ', code);
      console.log("Verify State: ", stateReceived, " : ", stateSent);
      // You can proceed with exchanging the code for tokens
      setAuthorizationCode(code);
      alert("State Matched and Authorization Code: " + authorizationCode);
    }
  };

  const accessTokenHandler = () => {  
    console.log("Get Access Token Handler: ");
    exchangeCodeForTokens(authorizationCode!);
  }

  async function exchangeCodeForTokens(code: string) {
    try {
      // Send the authorization code to your backend or use it to get tokens
      // const baseURL = 'http://localhost:9002/realms/application1_realm/protocol/openid-connect/token';
      const baseURL = 'http://localhost:8084/oauth2/token';
      // Define query parameters
      // const body = new URLSearchParams({
      //     'grant_type': 'authorization_code',
      //     'client_id': 'capstone-project-auth-code-pkce-1',
      //     'redirect_uri': 'http://localhost:3000',
      //     'code': code,
      //     'code_verifier': '2m_do5z6EiZu5WFtXjTjxMwy47vxTB3i-fFLVGsnu2-PY9Y3'
      //   });

      // Send the POST request
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 3000000);
      const response = await fetch(baseURL, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        body: new URLSearchParams({
          'grant_type': 'authorization_code',
          'client_id': 'capstone-project-auth-code-pkce-1',
          'redirect_uri': 'http://localhost:3000',
          'code': code,
          'code_verifier': '2m_do5z6EiZu5WFtXjTjxMwy47vxTB3i-fFLVGsnu2-PY9Y3'
        }),
      });
  
      // Handle the response
      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          setAccessToken(data.access_token);
          console.log('Received access token:', data.access_token);
          alert("RECEIVED ACCESS TOKEN: " + data.access_token);
        } else {
          console.error('Error exchanging code:', data);
        }
      } else {
        console.error('HTTP error:', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error during code exchange:', error);
      alert("ERROR: " + error);
    }
  };

  const preFlightRequestHandler = async () => {
    console.log("Pre-Flight Request Handler: ");
    try {
      const baseURL = 'http://localhost:9001/api/v1/helloworld';

      // Send the POST request
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          'X-Custom-Header': 'TriggerPreflight',
        },
      });

      // Handle the response
      if (response.ok) {
        const data = await response.text();
        if (data) {
          alert("Received Response: " + data);
        } else {
          console.error('Error exchanging code:', data);
        }
      } else {
        console.error('HTTP error:', response.status, response.statusText);
        const errorData = await response.text();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error during code exchange:', error);
      alert("ERROR: " + error);
    }
  };

  return (
    <>
      <h1>OAuth2.0 App</h1>
      <div>
        <button onClick={sendRequestToAuthServerHandler}><h1>Get Authorization Code</h1></button>
        <button onClick={verifyStateParameterHandler}><h1>Verify State Parameter</h1></button>
        <button onClick={accessTokenHandler}><h1>Get Access Token</h1></button>
        <button onClick={preFlightRequestHandler}><h1>OPTIONS Pre-Flight Request</h1></button>
      </div>
    </>
  );
};