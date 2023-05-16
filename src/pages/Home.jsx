
// - question can be added dynamically in question.json , further all the things are dynamic (progress bar , answer slider, answer)



import "./Home.css";
import question from "../assets/question.json";
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";

// slider label

const marks = [
  {
    value: 0,
    label: "Strongly disagree",
  },
  {
    value: 10,
    label: " disagree",
  },
  {
    value: 20,
    label: "Neutral",
  },
  {
    value: 30,
    label: "agree",
  },
  {
    value: 40,
    label: "Strongly agree",
  },
];
function Home() {
  // MUI slider design function

  const PrettoSlider = styled(Slider)({
    color: "#52af77",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#52af77",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  const totalQues = question.length; //count of question

  let answer = new Array(totalQues); //initialize intial array of size total question with default value of 0

  for (let i = 0; i < totalQues; ++i) answer[i] = 0;
  const [count, setCount] = useState(0); //current count of question number

  const [progress, setProgress] = useState(100 / totalQues); //count of question number for progress bar

  const [sliderValue, setSliderValue] = useState(0);





  const getItem = async () => {
    //get answer from local storage 
    const local = await localStorage.getItem("answer");
    const localAnswer1 = JSON.parse(local);
    setSliderValue(localAnswer1[count]); //assigning answer of current question from array
  };





  const prevHandler = async () => {
    //prev button handler
    setCount(count - 1);
    if (progress > 0) {
      setProgress(progress - 100 / totalQues);
    }
    setSliderValue(0);
    getItem();
  };




  const nextHandler = async () => {
    //next button handler
    setCount(count + 1);
    if (progress < 300) {
      setProgress(progress + 100 / totalQues);
    }
    setSliderValue(0);

    getItem();
  };





  const handleSliderChange = async (e, newValue) => {
    //slider change handler
    setSliderValue(newValue);
    const local = await localStorage.getItem("answer");
    const localAnswer = JSON.parse(local);
    localAnswer[count] = newValue;
    console.log(localAnswer);
    localStorage.setItem("answer", JSON.stringify(localAnswer));


   

  };





  useEffect(() => {
    localStorage.setItem("answer",answer);
    getItem();
  }, [nextHandler, prevHandler]);

  return (
    <>
      <h2 className="heading">ARE YOU DISILLUSIONED?</h2>
      <div className="container">
        <div className="progressMain">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="questionMain">
          <p className="quesNumber">
            {count + 1}/{totalQues}
          </p>
          <p className="ques">{question[count].question}</p>
        </div>
        <div className="answerMain">
          <div className="wizard">
            <PrettoSlider
              className="slider"
              onChange={handleSliderChange}
              id="slider"
              value={sliderValue}
              step={10}
              marks={marks}
              min={0}
              max={40}
            />
          </div>
        </div>
        <div className="navigationMain">
          {count === 0 ? (
            <button className="btn btn-prev" onClick={prevHandler} disabled>   
              <BsArrowLeft />
              Prev
            </button>
          ) : (
            <button className="btn btn-prev" onClick={prevHandler}>
              <BsArrowLeft />
              Prev
            </button>
          )}
          {count === totalQues - 1 ? (
            <button className="btn btn-next" onClick={nextHandler} disabled>
              Next
              <BsArrowRight />
            </button>
          ) : (
            <button className="btn btn-next" onClick={nextHandler}>
              Next
              <BsArrowRight />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
