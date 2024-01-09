import React, { useState, useContext } from "react";
import { Menu, Button } from "semantic-ui-react";
import { GlobalContext } from "../../context/GlobalContext";

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);
  const { isSignedIn, signOutOfApp } = useContext(GlobalContext);

  let isAppInstalled = false;

  if (window.matchMedia("(display-mode: standalone)").matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    setPromptEvent(e);
  });

  const installApp = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then((result) => {
      if (result.outcome === "accepted") {
        setAppAccepted(true);
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
    });
  };

  return (
    <Menu stackable inverted>
      <Menu.Item header>
        <h1>QuizApp</h1>
      </Menu.Item>
      {promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )}
      {/* {isSignedIn && (
        <Menu.Item>
          <button
            onClick={signOutOfApp}
            className="px-4 py-2 bg-white text-black rounded-lg active:scale-95 duration-150"
          >
            Log out
          </button>
        </Menu.Item>
      )} */}
    </Menu>
  );
};

export default Header;
