import { useState } from "react";
import { decode } from "html-encoder-decoder"

const Quiz = ({ data, handleClick,completed}) => {

    //control the selected answer
    const [selected, setSelected] = useState('');

    //create answer component
    const answers = data.answers.map((answer,idx) => {

        const color = { background: '' };

        //control the background-color of the answer component
        if (!completed && answer === selected) {
            color.background = "#D6DBF5";
        } else if (completed && answer === data.correctAnswer) {
            color.background = "#94D7A2";
        } else if (completed && answer !== data.correctAnswer && answer === selected) {
            color.background = "#F8BCBC";
        }

        return (
            <span
            key={idx}
            onClick={() => {
                handleClick(answer, data.id);
                setSelected(answer);
            }}
            style={color}
        >{decode(answer)}</span>
        )
    })

    //return the Quiz-component
    return (
        <div className="quiz">
            <h3>{decode(data.question)}</h3>
            <div className="answer-container">
            {answers}
            </div>
        </div>
    );
}

export default Quiz;
