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
      method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa("admin@email.com:1234"),
        },
    });

    if (response.ok) {
      // const redirectUrl = response.url;
      // if (redirectUrl) {
      //   console.log("Redirecting to:", redirectUrl);
      //   // router.push(redirectUrl);
      //   const response = await fetch(redirectUrl, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded",
      //       Authorization: "Basic " + btoa("admin@email.com:1234"),
      //     },
      //   });
      //   console.log("Response: ", JSON.stringify(response));
      // } else {
      //   console.error('No redirect URL provided by the server.');
      // }
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (err) {
    console.error("Error in authorization request:", err.message);
  }

    // // Construct the base URL
    // const baseURL = 'http://localhost:8084/oauth2/authorize';

    // // Define query parameters
    // const queryParams = {
    //   response_type: 'code',
    //   client_id: 'capstone-project-auth-code-pkce-1',
    //   redirect_uri: 'http://localhost:3000',
    //   scope: 'openid email',
    //   state: '4qFl3tTCkYb2R6pD',
    //   code_challenge: 'Tgc1QidrfeRMUExvgLljq621HlAIkc5YJ7NmUfGiryA',
    //   code_challenge_method: 'S256'
    // };

    // // Use URLSearchParams to append parameters
    // const url = new URL(baseURL);
    // Object.entries(queryParams).forEach(([key, value]) => {
    //   url.searchParams.append(key, value);
    // });

    // console.dir(url);
    // try {
    //   const response = await fetch(url.toString(), {
    //     method: 'GET',
    //     // headers: {
    //     //   // 'Authorization': 'Basic YWRtaW5AZW1haWwuY29tOjEyMzQ',
    //     //   // 'Content-Type': 'application/json',
    //     // },
    //   }).then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`Error: ${response.statusText}`);
    //     }
    //     return response;
    //   });
  
    //   if (!response.ok) {
    //     throw new Error(`Error: ${response.statusText}`);
    //   }
  
    //   // Process the response
    //   console.log("Redirected to:", response.url);

    //   if (response.url) {
    //     // window.location.href = response.url;
    //     // router.push(response.url);
    //     const redirectUrl = new URL(response.url);
    //     // Object.entries(queryParams).forEach(([key, value]) => {
    //     //   redirectUrl.searchParams.append(key, value);
    //     // });
    //     // window.location.href = redirectUrl.toString();
    //     // console.log("Redirecting to:", redirectUrl.toString());
    //     router.push(redirectUrl.toString());

    //     // const response1 = await fetch(redirectUrl, {
    //     // method: "POST",
    //     // headers: {
    //     //   "Content-Type": "application/x-www-form-urlencoded",
    //     //   Authorization: "Basic " + btoa("admin@email.com:1234"),
    //     // },
    //     // // redirect: "manual",
    //     // body: new URLSearchParams({
    //     //   response_type: 'code',
    //     //   client_id: 'capstone-project-auth-code-pkce-1',
    //     //   redirect_uri: 'http://localhost:3000',
    //     //   scope: 'openid email',
    //     //   state: '4qFl3tTCkYb2R6pD',
    //     //   code_challenge: 'Tgc1QidrfeRMUExvgLljq621HlAIkc5YJ7NmUfGiryA',
    //     //   code_challenge_method: 'S256'
    //     // }),
    //   //   },
    //   // });

    //   // console.dir("Response 1: ", response1);

    //   }
    // } catch (error) {
    //   console.error("Fetch Error:", error);
    // }

    // // Create a new URLSearchParams instance
    // const formData = new FormData(event.currentTarget);
    // const urlEncodedData = new URLSearchParams();

    // // Convert FormData to URLSearchParams
    // formData.forEach((value, key) => {
    //   urlEncodedData.append(key, value as string);
    // });

    // console.log(urlEncodedData.toString());
    // console.log("Send Request To Auth Server Handler");

    // // Construct the base URL
    // const baseURL1 = 'http://localhost:8084';

    // // Define query parameters
    // const queryParams1 = {
    //   response_type: 'code',
    //   client_id: 'capstone-project-auth-code-pkce-1',
    //   redirect_uri: 'http://localhost:3000',
    //   scope: 'openid email',
    //   state: '4qFl3tTCkYb2R6pD',
    //   code_challenge: 'Tgc1QidrfeRMUExvgLljq621HlAIkc5YJ7NmUfGiryA',
    //   code_challenge_method: 'S256'
    // };

    // // Use URLSearchParams to append parameters
    // const url1 = new URL(baseURL);
    // Object.entries(queryParams).forEach(([key, value]) => {
    //   url1.searchParams.append(key, value);
    // });

    // console.dir(url1);
    // try {
    //   const response = await fetch(url1.toString(), {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': 'Basic YWRtaW5AZW1haWwuY29tOjEyMzQ',
    //       'Content-Type': "Basic " + btoa("admin@email.com:1234"),
    //     },
    //   }).then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`Error: ${response.statusText}`);
    //     }
    //     return response;
    //   });

    //   if (response.url) {
    //     // window.location.href = response.url;
    //     const redirectUrl = new URL(response.url);
    //     // Object.entries(queryParams).forEach(([key, value]) => {
    //     //   redirectUrl.searchParams.append(key, value);
    //     // });
    //     // window.location.href = redirectUrl.toString();
    //     console.log("Redirecting to:", redirectUrl.toString());
    //     // router.push(redirectUrl.toString());

    //     //   const response1 = await fetch(redirectUrl, {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/x-www-form-urlencoded",
    //     //     Authorization: "Basic " + btoa("admin@email.com:1234"),
    //     //   },
    //     //   body: new URLSearchParams({
    //     //     response_type: 'code',
    //     //     client_id: 'capstone-project-auth-code-pkce-1',
    //     //     redirect_uri: 'http://localhost:3000',
    //     //     scope: 'openid email',
    //     //     state: '4qFl3tTCkYb2R6pD',
    //     //     code_challenge: 'Tgc1QidrfeRMUExvgLljq621HlAIkc5YJ7NmUfGiryA',
    //     //     code_challenge_method: 'S256'
    //     //   }),
    //     // });
    //     // 
    //     // console.dir("Response 1: ", response1);
    //     }
    // } catch (error) {
    //   console.error("Fetch Error:", error);
    // }
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
