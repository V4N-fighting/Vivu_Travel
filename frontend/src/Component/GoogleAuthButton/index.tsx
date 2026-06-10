import React, { useEffect, useRef } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential?: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              width?: number;
              text?: "signin_with" | "signup_with" | "continue_with";
              shape?: "rectangular" | "pill" | "circle" | "square";
            }
          ) => void;
        };
      };
    };
  }
}

interface GoogleAuthButtonProps {
  text?: "signin_with" | "signup_with" | "continue_with";
  onSuccess: (credential: string) => void;
}

const GOOGLE_SCRIPT_ID = "google-identity-services";

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  text = "signin_with",
  onSuccess,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      return;
    }

    const renderGoogleButton = () => {
      if (!window.google || !buttonRef.current) {
        return;
      }

      const buttonWidth = Math.floor(
        buttonRef.current.parentElement?.getBoundingClientRect().width ||
        buttonRef.current.getBoundingClientRect().width ||
        500
      );

      buttonRef.current.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          if (response.credential) {
            onSuccess(response.credential);
          }
        },
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: buttonWidth,
        text,
        shape: "pill",
      });
    };

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
    if (existingScript) {
      renderGoogleButton();
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = renderGoogleButton;
    document.body.appendChild(script);
  }, [clientId, onSuccess, text]);

  if (!clientId) {
    return <MissingConfig type="button">Google login is not configured</MissingConfig>;
  }

  return <GoogleButtonWrap ref={buttonRef} />;
};

export default GoogleAuthButton;

const GoogleButtonWrap = styled.div`
  width: 100%;
  margin-top: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 100% !important;
  }

  iframe {
    width: 100% !important;
    max-width: 100% !important;
  }
`;

const MissingConfig = styled.button`
  width: 100%;
  height: 45px;
  margin-top: 15px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  cursor: not-allowed;
`;
