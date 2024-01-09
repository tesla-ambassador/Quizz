import React, { useEffect, useState } from "react";

import Layout from "../Layout";
import Loader from "../Loader";
import Main from "../Main";
import Quiz from "../Quiz";
import Result from "../Result";
import SignIn from "../Signin/SignIn";
import { GlobalContext } from "../../context/GlobalContext";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { app } from "../../firebase";

import { shuffle } from "../../utils";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [isSignedIn, setSignedIn] = useState(false);

  const startQuiz = (data, countdownTime) => {
    setLoading(true);
    setLoadingMessage({
      title: "Loading your quiz...",
      message: "It won't be long!",
    });
    setCountdownTime(countdownTime);

    setTimeout(() => {
      setData(data);
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  const endQuiz = (resultData) => {
    setLoading(true);
    setLoadingMessage({
      title: "Fetching your results...",
      message: "Just a moment!",
    });

    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(resultData);
      setLoading(false);
    }, 2000);
  };

  const replayQuiz = () => {
    setLoading(true);
    setLoadingMessage({
      title: "Getting ready for round two.",
      message: "It won't take long!",
    });

    const shuffledData = shuffle(data);
    shuffledData.forEach((element) => {
      element.options = shuffle(element.options);
    });

    setData(shuffledData);

    setTimeout(() => {
      setIsQuizStarted(true);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  const resetQuiz = () => {
    setLoading(true);
    setLoadingMessage({
      title: "Loading the home screen.",
      message: "Thank you for playing!",
    });

    setTimeout(() => {
      setData(null);
      setCountdownTime(null);
      setIsQuizStarted(false);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  // Auth
  function toggleSignIn() {
    setSignedIn(!isSignedIn);
  }

  function signInToApp() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        toggleSignIn();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function signOutOfApp() {
    signOut()
      .then(() => {
        alert("Successfuly logged out!");
        toggleSignIn();
      })
      .catch((err) => {
        alert("Whoops sorry we cannot log you out");
        console.log(err);
      });
  }

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [isSignedIn]);

  console.log(isSignedIn);

  return (
    <GlobalContext.Provider value={{ isSignedIn, signInToApp, signOutOfApp }}>
      <Layout>
        {isSignedIn ? (
          <>
            {loading && <Loader {...loadingMessage} />}
            {!loading && !isQuizStarted && !isQuizCompleted && (
              <Main startQuiz={startQuiz} />
            )}
            {!loading && isQuizStarted && (
              <Quiz
                data={data}
                countdownTime={countdownTime}
                endQuiz={endQuiz}
              />
            )}
            {!loading && isQuizCompleted && (
              <Result
                {...resultData}
                replayQuiz={replayQuiz}
                resetQuiz={resetQuiz}
              />
            )}
          </>
        ) : (
          <SignIn />
        )}
      </Layout>
    </GlobalContext.Provider>
  );
};

export default App;
