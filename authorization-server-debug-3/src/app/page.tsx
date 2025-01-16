"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const [authorizationCode, setAuthorizationCode] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();
  const router = useRouter();

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
    const code = searchParams.get('code');
    const stateReceived = searchParams.get('state');
  
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
      const baseURL = 'http://localhost:8084/oauth2/token';
      const response = await fetch(baseURL, {
        method: 'POST',
        body: new URLSearchParams({
          'grant_type': 'authorization_code',
          'client_id': 'capstone-project-auth-code-pkce-1',
          'redirect_uri': 'http://localhost:3000',
          'code': code,
          'code_verifier': '2m_do5z6EiZu5WFtXjTjxMwy47vxTB3i-fFLVGsnu2-PY9Y3'
        }),
      });
  
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
  
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Send Request To Auth Server Handler");
    const loginData = new URLSearchParams();
  
    // Replace with the actual input field names from the form
    loginData.append('username', 'admin@email.com');
    loginData.append('password', '1234');

    const baseURL = 'http://localhost:8084/oauth2/authorize';
    const queryParams = {
      response_type: 'code',
      client_id: 'capstone-project-auth-code-pkce-1',
      redirect_uri: 'http://localhost:3000',
      scope: 'openid email',
      state: '4qFl3tTCkYb2R6pD',
      code_challenge: 'Tgc1QidrfeRMUExvgLljq621HlAIkc5YJ7NmUfGiryA',
      code_challenge_method: 'S256',
    };
    
    const url = new URL(baseURL);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    console.log("Constructed URL:", url.toString());

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        credentials: "include",
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded",
        //       Authorization: "Basic " + btoa("admin@email.com:1234"),
        //   },
        // redirect: 'manual',
        // body: loginData.toString(),
      });

      if (response.ok) {
        const redirectUrl = response.url;
        const cookies = document.cookie;
        console.log(cookies);

        if (!cookies) {
          throw new Error("No cookies found in the response.");
        }

        // Parse cookies to find the XSRF token
        const xsrfTokenMatch = cookies.match(/XSRF-TOKEN=([^;]+)/);
        if (!xsrfTokenMatch) {
          throw new Error("Failed to extract XSRF token from cookies.");
        }
        const csrfToken = xsrfTokenMatch[1];
        console.log("Extracted XSRF Token:", csrfToken);
    
        if (!csrfToken) {
          throw new Error("Failed to extract CSRF token from login page.");
        }
        loginData.append("_csrf", csrfToken);
        // console.log("Redirect URL: ", redirectUrl);
        // console.log('Headers:', JSON.stringify(response.headers));
        // console.dir("Response: ", JSON.stringify(response));
        console.log("URL: ", redirectUrl);
        console.log("Status:", response.status);
        console.log("Headers:");

        response.headers.forEach((value, name) => {
          console.log(`${name}: ${value}`);
        });

        const htmlContent = await response.text();
        console.log("HTML Content:", htmlContent);


        const urlRedirected = new URL(redirectUrl);
        // Object.entries(queryParams).forEach(([key, value]) => {
        //   urlRedirected.searchParams.append(key, value);
        // });

        console.log("Login Data: ", loginData.get('username'));

        const responsePost = await fetch(urlRedirected, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: "Basic " + btoa("admin@email.com:1234"),
            // "X-XSRF-TOKEN": csrfToken,
          },
          body: loginData.toString(),
          credentials: "include",
          // redirect: 'manual',
        });

        if (responsePost.ok) {
          console.log("1 Login successful!");
          console.log("1 Redirecting to:", responsePost.headers.get('Location'));
        } else if (responsePost.status === 302 || response.status === 301) {
          console.log("1 Redirect to:", responsePost.headers.get('Location'));
          // Optionally, follow the redirect manually
        } else {
          console.error("1 Login failed:", responsePost.status, responsePost.statusText);
        }
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err) {
      console.error("Error in authorization request:", err.message);
    }
  };
  
  return (
    <>
      <h1>OAuth2.0 App</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <br /><br />
          <button type="submit">Login</button>
        </form>
        <button onClick={sendRequestToAuthServerHandler}><h1>Get Authorization Code</h1></button>
        <button onClick={verifyStateParameterHandler}><h1>Verify State Parameter</h1></button>
        <button onClick={accessTokenHandler}><h1>Get Access Token</h1></button>
      </div>
    </>
  );
};
