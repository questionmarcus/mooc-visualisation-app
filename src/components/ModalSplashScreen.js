import React from "react";
import "../styles/SplashScreen.css";

const ModalSplashScreen = (closeFunc) => {
    return (
        <div id="ModalSplashScreen">
            <div className="ModalDisplay">
                <h3>Welcome to the data visualisation application for Glasgow University's Haskell MOOC</h3>
                <p>
      Since September 2016, Glasgow University has been running a Massive Open Online Course (MOOC) to teach <em><a alt="Find out more about Haskell" href="https://wiki.haskell.org/Introduction">Haskell</a></em>.
      This course is aimed at those who are interested in learning more about functional programming, and those who are new to programming.
      As this is a MOOC, everyone is welcome to sign up at <a href="https://www.futurelearn.com/courses/functional-programming-haskell">FutureLearn</a>, and join when the course runs again.
                </p>
                <p>
This application was written as a way to provide a window into the way in which users engage with the course materials.
      Additionally, this application set out to try and <em>map</em> the way users travel between courses, to see which exercises students were completing and which ones they might prefer to skip.
                </p>
                <button className="action-btn" onClick={() => closeFunc.toggleModalFunc()}>
                    Continue to Application
                </button>
            </div>
        </div>
    );
};

export default ModalSplashScreen;
