import React, { useEffect, useState } from "react";
import "../Styles/MainHome.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import darkTheme from "../Media/dark.png"
import lightTheme from "../Media/light.png"
function MainHome() {
  const [bgColor, setBgColor] = useState("#8abbde");
  const [bgSColor, setBgSColor] = useState("#eff5fb");
  const [fontColor, setfontColor] = useState("#141c23b");
  // const [fontColor, setfontColor] = useState("#eff5fb");
  const [output, setOutput] = useState(null);
  const [outputFound, setOutputFound] = useState(false);
  const [input, setInput] = useState(null);
  const [inputOutput, setInputOutput] = useState("");
  const [currentinput, setcurrentInput] = useState(null);
  const [lightBColor, setLightBColor] = useState("#339dff");
  const [lightBbackColor, setLightBbackColor] = useState("#cde6f7");
  const [digit1, setDigit1] = useState(null);
  const [digit2, setDigit2] = useState(null);
  const [dotMulti, setdotMulti] = useState(1);
  const [outputStack, setoutputStack] = useState([]);
  const [digit3, setDigit3] = useState(null);
  const [digit4, setDigit4] = useState(null);
  const [dotenabled, setdotenabled] = useState(false);
  const [operation, setOperation] = useState(null);
  const [isHovered, setIsHovered] = useState(Array(18).fill(false));
  const [darkEnabled, setdarkEnabled] = useState("");
  const [maindarkEnabled, setmaindarkEnabled] = useState(false);
  const [currentMode, setcurrentMode] = useState(false);
  const [currentDMode, setcurrentDMode] = useState("");
  const [currentLMode, setcurrentLMode] = useState("hidden");
  const [darkButtonTheme, setdarkButtonTheme] = useState("");
  const [mainBackgroundColor, setmainBackgroundColor] = useState("#141c23");
  const [cardsDark, setcardsDark] = useState("");
  const [darkFontValue, setdarkFontValue] = useState("");

  const [focusedIndex, setFocusedIndex] = useState(-1); // initialize focusedIndex to -1 (no card is focused)
  const userMode = () => {
    return {
      backgroundImage: `linear-gradient(27deg,${bgSColor}, ${bgColor},${bgSColor})`,
      borderRadius: "1.5em",
    };
  };
  // const notify = (value) => toast(value);
  const notify = (value, condition) =>
    toast(value, {
      type: condition,
      autoClose: 3000,
    });
  const setDarkTheme = () => {
    setmainBackgroundColor("#a0d7ff");
    setBgColor("#141c23");
    setBgSColor("#141c23");
    setfontColor("#eff5fb");
    setdarkButtonTheme("darkButtonTheme");
    setcardsDark("cardsDark");
    setdarkFontValue("darkFontValue");
    notify("Dark Mode Enabled Successfully!", "success");
    // setdarkEnabled('white')
    // const root = document.documentElement;
    // // const darkModeToggle = document.getElementById('dark-mode-toggle');
    // root.style.setProperty('--dark-mode', root.style.getPropertyValue('--dark-mode') === '0' ? '1' : '0');
  };
  const setLightTheme = () => {
    setmainBackgroundColor("#141c23");
    setBgColor("#8abbde");
    setBgSColor("#eff5fb");
    setfontColor("#141c23");
    setdarkButtonTheme("");
    setcardsDark("");
    setdarkFontValue("");
    notify("Light Mode Enabled Successfully!", "success");
  };
  const userDisplay = () => {
    return {
      color: fontColor,
      width: "100%",
      height: "30%",
    };
  };

  const handleDarkLight = () => {
    console.log("clickes");
    if (currentMode) {
      setcurrentDMode("");
      setcurrentLMode("hidden");
      setcurrentMode(false);
      setmaindarkEnabled(false);
      setLightTheme();
    } else {
      setcurrentDMode("hidden");
      setcurrentLMode("");
      setcurrentMode(true);
      setmaindarkEnabled(true);
      setDarkTheme();
    }
  };
  const handleMouseEnter = (index) => {
    // const newHoverState = [...isHovered];
    // newHoverState[index] = true;
    // setIsHovered(newHoverState);
    // if(index=='clear'){
    //   setdarkEnabled('filled');
    // }
    // else{
    //   setdarkEnabled('filled');
    // }
  };

  const handleMouseLeave = (index) => {
    // const newHoverState = [...isHovered];
    // newHoverState[index] = false;
    // setIsHovered(newHoverState);
    // setdarkEnabled('')
  };

  const userButtonTheme = (index) => {
    return {
      // color: lightBColor,
      // backgroundImage: `linear-gradient(27deg,${bgSColor}, ${lightBbackColor})`,
      // ...(isHovered[index] && {
      //   backgroundImage: `linear-gradient(27deg,${lightBbackColor}, ${lightBColor})`,
      //   color: lightBbackColor,
      // }),
    };
  };

  const handleInput = (digit) => {
    let val;
    console.log(digit);
    if (dotenabled && operation == null) {
      if (digit1 == null) {
        val = digit;
        setDigit1(0.1 * val);
      } else {
        let v = dotMulti * 0.1;
        setdotMulti(v);
        // v=v.toString();
        val = digit1 + digit * v;
        setDigit1(val);
        //
      }
    } else if (dotenabled) {
      if (digit2 == null) {
        val = digit;
        setDigit2(0.1 * val);
      } else {
        let v = dotMulti * 0.1;
        setdotMulti(v);
        // v=v.toString();
        val = digit2 + digit * v;
        setDigit2(val);
        //
      }
    } else if (operation == null) {
      if (digit1 == null) {
        val = digit;
        setDigit1(val);
      } else {
        val = digit1 * 10 + digit;
        setDigit1(val);
        //
      }
    } else {
      if (digit2 == null) {
        val = digit;
        setDigit2(val);
      } else {
        val = digit2 * 10 + digit;
        setDigit2(val);
      }
    }
  };
  const scrollEvent = (event) => {
    console.log(event.target.scrollTop);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      // setKeyDown(event.key);
      console.log(parseInt(event.key, 10));
      if (parseInt(event.key, 10) >= 0 && parseInt(event.key, 10) <= 9) {
        handleInput(parseInt(event.key, 10));
      } else if (event.key == "Enter") {
        handleOutput();
      } else if (event.key == "Backspace") {
        handleClear();
      } else if (
        event.key == "+" ||
        event.key == "-" ||
        event.key == "*" ||
        event.key == "/"
      ) {
        handleOperation(event.key);
      } else if (event.key == ".") {
        console.log(event.key);
        setdotenabled(true);
      }
    };
    const handleScroll = () => {
      scrollEvent({ target: document.documentElement });
    };

    handleScroll(); // Call the function once to get the initial scroll position

    document.addEventListener("scroll", handleScroll);

    document.addEventListener("scroll", scrollEvent);
    document.addEventListener("keydown", handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [digit1, digit2, operation, output, dotenabled]);

  useEffect(() => {
    // Your useEffect logic if needed
    // setInputOutput(`${digit1}${operation}${digit2}`)
    // setInputOutput()
    setInput(
      `${digit1 ? digit1 : ""}${operation ? operation : ""}${
        digit2 ? digit2 : ""
      }`
    );
    setcurrentInput(digit1);
  }, [digit1, digit2, operation, outputStack, dotenabled]);

  const handleOperation = (operand) => {
    if (digit1 == null) {
      // alert("Please enter digit first.");
      notify("Please enter value first!", "error");
    } else {
      setOperation(operand);
      setdotenabled(false);
      setdotMulti(1);
      if (outputFound) {
        let val = output;
        console.log(val);
        setDigit1(val);
        setDigit2(null);
        setOutputFound(false);
        setdotenabled(false);
        setdotMulti(1);
      }
    }
  };
  const addItemStack = (value) => {
    console.log(outputStack);
    setoutputStack([...outputStack, value]);
  };
  const handleOutput = () => {
    let ot;
    console.log(outputFound);
    if (output != null && outputFound) {
      let val = output;
      console.log(val);
      setDigit1(val);
      setDigit2(null);
      setOperation(null);
      setdotMulti(1);
      setdotenabled(false);
      // }
    } else if (digit1 == null || digit2 == null || operation == null) {
      notify("Sorry but its not an valid operation!", "error");
    } else {
      if (operation == "+") {
        ot = digit1 + digit2;
      } else if (operation == "-") {
        ot = digit1 - digit2;
      } else if (operation == "*") {
        ot = digit1 * digit2;
      } else {
        ot = digit1 / digit2;
      }
      setOutput(ot);
      addItemStack(
        `${digit1 ? digit1 : ""} ${operation ? operation : ""} ${
          digit2 ? digit2 : ""
        } = ${ot}`
      );
      setDigit3(digit2);
      setdotMulti(1);
      setdotenabled(false);
      console.log("enter op");
      setOutputFound(true);
    }
  };

  const handleMutate = (digit) => {
    let s = digit.toString();
    // console.log(s);
    if (s.length == 1) {
      return null;
    }
    // console.log(s);
    s = s.substring(0, s.length - 1);
    return parseInt(s, 10);
  };
  const handleClear = () => {
    // console.log(digit2.toString.length)
    if (digit2 != null) {
      setDigit2(handleMutate(digit2));
    } else if (operation != null) {
      setOperation(null);
    } else if (digit1 != null) {
      setDigit1(handleMutate(digit1));
    }
  };
  const handleAllClear = () => {
    setInput(null);
    setDigit1(null);
    setDigit2(null);
    setOperation(null);
    setOutput(null);
    setOutputFound(false);
    setdotenabled(false);
    setoutputStack([]);
    notify("All values have been cleared!", "success");
  };
  const handleDot = () => {
    setdotenabled(true);

    // if(digit2!=null){
    //   setDigit2(parseFloat(digit2*1.0));
    // }

    // // else if(operation!=null){
    // //   setOperation(null);
    // // }
    // else if(digit1!=null){
    //   setDigit1(digit1*10/10);
    // }
  };
  const userTheme = () => {
    return {
      backgroundColor: mainBackgroundColor,
    };
  };
  const userLTheme = () => {
    return {
      // backgroundColor:'#86c4f0',
    };
  };

  // const handleKeyDown = (event) => {
  //   console.log(event.key);
  // };

  return (
    <>
      <ToastContainer />
      <div
        className="MainContainer w-full h-screen flex justify-evenly "
        style={userTheme()}
      >
        <div
          className="LeftC w-1/2 flex justify-center items-center"
          style={userTheme()}
        >
          <div className="MainC w-3/6 h-5/6 flex justify-center items-center">
            <div className="innerContainer w-5/6 h-full p-8" style={userMode()}>
              <div className="innerBound w-full h-full ">
                <div
                  className="outputD flex justify-center items-start flex-col gap-6 overflow-hidden relative"
                  onClick={() => {
                    console.log("clicked");
                  }}
                  style={userDisplay()}
                >
                  <div className="themeMode">
                    <div
                      className="themeC flex"
                      onClick={() => handleDarkLight()}
                    >
                      <img
                        className={`${currentDMode}`}
                        width="24"
                        height="24"
                        src={lightTheme}
                        alt="sun--v1"
                      />
                      <img
                        width="24"
                        height="24"
                        className={`${currentLMode}`}
                        style={{ marginLeft: "24px" }}
                        src={darkTheme}
                      
                        alt="external-dark-multimedia-flat-24px-others-amoghdesign"
                      />
                    </div>
                  </div>
                  <div className="userOutput font-medium text-3xl   whitespace-nowrap w-full">
                    = {output ? output : "0"}
                  </div>
                  <div className="userInput self-center whitespace-nowrap w-full ">
                    {input}
                  </div>
                </div>

                <div
                  className="buttonsInput w-full flex justify-center items-center"
                  style={{ height: "70%" }}
                >
                  <div className="group w-full h-full flex justify-center items-center">
                    <div className="numGroup w-3/4 h-full ">
                      <div className="row1">
                        <button
                          style={userButtonTheme(0)}
                          onMouseEnter={handleMouseEnter("allClear")}
                          onMouseLeave={handleMouseLeave()}
                          className={`button1 ${darkButtonTheme}`}
                          onClick={() => handleAllClear()}
                        >
                          AC
                        </button>
                        <button
                          style={userButtonTheme(1)}
                          onMouseEnter={handleMouseEnter("clear")}
                          onMouseLeave={handleMouseLeave()}
                          className={`button1 ${darkButtonTheme}`}
                          onClick={() => handleClear()}
                        >
                          <img
                            width="30"
                            height="30"
                            src={`https://img.icons8.com/ios${darkEnabled}/50/000000/clear-symbol.png`}
                            alt="clear-symbol"
                          />
                          {/* <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/000000/clear-symbol.png" alt="clear-symbol"/> */}
                        </button>
                        <button
                          style={userButtonTheme(2)}
                          className={`button1 ${darkButtonTheme}`}
                          onClick={() => handleOperation("/")}
                        >
                          /
                        </button>
                      </div>
                      <div className="row2">
                        <button
                          style={userButtonTheme(3)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(7)}
                        >
                          7
                        </button>
                        <button
                          style={userButtonTheme(4)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(8)}
                        >
                          8
                        </button>
                        <button
                          style={userButtonTheme(5)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(9)}
                        >
                          9
                        </button>
                      </div>
                      <div className="row3">
                        <button
                          style={userButtonTheme(6)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(4)}
                        >
                          4
                        </button>
                        <button
                          style={userButtonTheme(7)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(5)}
                        >
                          5
                        </button>
                        <button
                          style={userButtonTheme(8)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(6)}
                        >
                          6
                        </button>
                      </div>
                      <div className="row4">
                        <button
                          style={userButtonTheme(9)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(1)}
                        >
                          1
                        </button>
                        <button
                          style={userButtonTheme(10)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(2)}
                        >
                          2
                        </button>
                        <button
                          style={userButtonTheme(11)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleInput(3)}
                        >
                          3
                        </button>
                      </div>
                      <div className="row5 flex justify-between">
                        <button
                          className={`bigwButton ${darkButtonTheme}`}
                          style={userButtonTheme(12)}
                          onClick={() => handleInput(0)}
                        >
                          0
                        </button>
                        <button
                          style={userButtonTheme(13)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleDot()}
                        >
                          .
                        </button>
                      </div>
                    </div>
                    <div className="expGroup w-1/4 h-full ">
                      <div className="expButtons w-full h-full">
                        <button
                          style={userButtonTheme(14)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleOperation("*")}
                        >
                          *
                        </button>
                        <button
                          style={userButtonTheme(15)}
                          className={`${darkButtonTheme}`}
                          onClick={() => handleOperation("-")}
                        >
                          -
                        </button>
                        <button
                          className={`bigButton ${darkButtonTheme}`}
                          style={userButtonTheme(16)}
                          onClick={() => handleOperation("+")}
                        >
                          +
                        </button>
                        <button
                          className={`bigButton ${darkButtonTheme}`}
                          style={userButtonTheme(17)}
                          onClick={() => handleOutput()}
                        >
                          =
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="RightC w-1/2 h-full flex justify-center items-center"
          style={userTheme()}
        >
          <div className="outputStackC w-5/6 h-5/6 flex justify-center items-center">
            <div className="oututStackMain w-5/6 h-5/6 flex justify-center items-center ">
              <div className="scorllable h-5/6 w-full flex justify-center items-center flex-col overflow-y-scroll ">
                {outputStack.length >= 1 ? (
                  outputStack.map((value, index) => {
                    const isFocused = index === focusedIndex;
                    return (
                      <div
                        className={`cards flex justify-center items-center  gap-0  ${cardsDark}`}
                        key={index}
                        style={userLTheme()}
                      >
                        <div className="content text-3xl">{value}</div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="history flex justify-center items-center"
                    style={userLTheme()}
                  >
                    <div className={`content ${darkFontValue}`}>
                      Your History will appear here
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainHome;
