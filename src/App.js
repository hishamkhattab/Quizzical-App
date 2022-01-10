import Home from "./Home";
import Quiz from "./Quiz";
import { useEffect, useState } from "react";

function App() {

  /**
   * useState
   */
  //control the form
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  
  //control if the quiz started
  const [isStarted, setIsStarted] = useState(false);

  //control if the data still loading 
  const [isLoading, setIsLoading] = useState(true);

  //control the data
  const [questionsData, setQuestionsData] = useState(null);

  //control if there is an error when fetching data
  const [error, setError] = useState(false);

  //control when the quiz is finished
  const [isFinish, setIsFinish] = useState(false);

  //control the number of ansnswered questiones
  const [countAnswer, setCountAnswer] = useState(0);

  //control if there is some questiones unanswered
  const [complete, setComplete] = useState(false);

    /**
   * useEffect
   */
  useEffect(() => {
    
    if (isStarted) {
      let url = '';
      if (category && difficulty) {
        url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}`;
      } else if(category && !difficulty) {
        url = `https://opentdb.com/api.php?amount=5&category=${category}`;
      } else if (!category && difficulty) {
        url=`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}`;
      } else {
        url = `https://opentdb.com/api.php?amount=5`;
      }
      
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } 
          throw Error('Could not fetch data')
        })
        .then(data => {
          setQuestionsData(data.results.map((q,idx) => {
            return {
              id: idx,
              question: q.question,
              correctAnswer: q.correct_answer,
              selectedAnswer: '',
              answers:shuffleAnswers([q.correct_answer,...q.incorrect_answers])
            }
          }));
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.name)
        })
    }
  },[category, difficulty, isStarted])


  /**
   * Functions
   */

  //shuffle the answers, so that the correct answer won't be in the same place for every question
  const shuffleAnswers = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }
  
  /**
   * handle the selected answer and map it in the questionsData object
   * @param {*} answers the selected answer
   * @param {*} id the id of the question to link the answer with 
   */ 
  const handleSelectedAnswer = (answers,id) => {
    setQuestionsData(prev => prev.map(q => {
      return q.id === id ? {...q, selectedAnswer:answers} : q
    }))
  }

  /**
   * handle when is the quiz ends 
   */
  const handleQuizEnd = () => {
    //counter to track number of unanswered question
    let count = 0;

    questionsData.forEach(element => {
      if (element.selectedAnswer === '') {
        count++;
      } if (element.selectedAnswer === element.correctAnswer) {
        setCountAnswer(prev => prev+1)
      }
    });

    //if there all questions answered then finish the quiz, otherwise raise an error
    if (count) {
      setIsFinish(false);
      setComplete(true)
    } else {
      setIsFinish(true)
      setComplete(false)
    }

  }


  //reset everything when user want to play again
  const handlePlayAgain = () => {
    setIsFinish(false);
    setIsStarted(false);
    setCountAnswer(0);
    setQuestionsData(null);
    setComplete(false)
  }


  //return App-component
  return (
    <div className="App">
      {!isStarted && 
        <Home
        category={category}
        setCategory={setCategory}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        setIsStarted={setIsStarted}
      />
      }
      {isStarted && isLoading && !error &&
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
      }
      {
        error && <div className="error">Someting went wrong: {error}</div>
      }
      <div className="quiz-page">
      {questionsData && isStarted &&
        questionsData.map(q => {
          return (
            <Quiz
              key={q.id}
              data={q}
              handleClick={handleSelectedAnswer}
              completed={isFinish}
            />
          )
        })
        }
        <div className="control">
        {complete && <span className="not-finish-msg">Complete the quiz first...</span>}
        {!isFinish && isStarted && !isLoading && <button className='btn' onClick={handleQuizEnd}>Submit</button>}
        {isFinish && isStarted && !isLoading &&
          <div className="answer-msg">
          <p>You scored <span className="cntr">{countAnswer}</span> / 5 correct answers</p>
          <button className='btn' onClick={handlePlayAgain}>Play again</button>
          </div>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
