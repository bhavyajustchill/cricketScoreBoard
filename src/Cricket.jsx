import React, { useEffect, useState } from "react";

const Cricket = () => {
  // const [score, setScore] = useState(0)
  // const [balls, setBalls] = useState(0)
  // const [bowler, setBowler] = useState(0)
  // const [batsman, setBatsman] = useState([0, 1])
  // const [wicket, setWicket] = useState(0)
  const [over, setOver] = useState([]);
  const [overName, setOverName] = useState("This Over");
  const [teamNameA, setTeamNameA] = useState("India");
  const [teamNameB, setTeamNameB] = useState("Australia");

  function calculation_over(balls) {
    let overs = Math.floor(balls / 6);
    let remainballs = balls % 6;
    return overs + "." + remainballs;
  }

  const [data, setData] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : {
          score: 0,
          //   ball: 0, // original value
          ball: 1,
          bowler: 0,
          batsman: [0, 1],
          wicket: 0,
          over: 0,
        }
  );

  const [teamA, setTeamA] = useState(
    localStorage.getItem("teamA")
      ? JSON.parse(localStorage.getItem("teamA"))
      : [
          {
            id: 1,
            name: "Virat Kohli",
            category: "Batsman",
            Runs: 0,
            Balls: 0,
            Four: 0,
            Six: 0,
            Timings: 0,
            StrickRate: 0,
          },
          {
            id: 2,
            name: "Rohit Sarma",
            category: "Batsman",
            Runs: 0,
            Four: 0,
            Six: 0,
            Balls: 0,
            Timings: 0,
            StrickRate: 0,
          },
          {
            id: 3,
            name: "MS Dhoni",
            category: "Batsman",
            Runs: 0,
            Four: 0,
            Six: 0,
            Balls: 0,
            Timings: 0,
            StrickRate: 0,
          },
        ]
  );

  const [teamB, setTeamB] = useState(
    localStorage.getItem("teamB")
      ? JSON.parse(localStorage.getItem("teamB"))
      : [
          {
            id: 1,
            name: "Josh Buttler",
            category: "Batsman",
            Runs: 0,
            Balls: 0,
            Wicket: 0,
            Maddian: 0,
            Eco: 0,
          },
          {
            id: 2,
            name: "Stive Smith",
            category: "Bowler",
            Runs: 0,
            Balls: 0,
            Wicket: 0,
            Maddian: 0,
            Eco: 0,
          },
          {
            id: 3,
            name: "Rasid Khan",
            category: "Bowler",
            Runs: 0,
            Balls: 0,
            Wicket: 0,
            Maddian: 0,
            Eco: 0,
          },
        ]
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("teamA", JSON.stringify(teamA));
    localStorage.setItem("teamB", JSON.stringify(teamB));
  }, [teamA, teamB, data]);

  const handleRuns = (e) => {
    // ---- Start Batsman ----- //
    //balls count
    //setBalls(balls + 1)
    //setData({ ...data, "ball": data.ball + 1, "score": data.score + e })
    console.log(data.ball);
    if (over.length === 5) {
      setOver([]);
    } else {
      if (overName === "Last Over") {
        setOverName("This Over");
      }
      over.push(e);
    }
    let tempdata = { ...data };
    tempdata.ball += 1;
    tempdata.score += e;

    let temp = [...teamA];
    temp[data.batsman[0]].Balls += 1;
    setTeamA(temp);

    if (e % 2 == 0) {
      //console.log(e)
      let temp = [...teamA];
      temp[data.batsman[0]].Runs += e;
      setTeamA(temp);

      // four or six
      if (e == 4) {
        let temp = [...teamA];
        temp[data.batsman[0]].Four += 1;
        setTeamA(temp);
      }
      if (e == 6) {
        let temp = [...teamA];
        temp[data.batsman[0]].Six += 1;
        setTeamA(temp);
      }
    } else {
      //console.log(e)
      let temp = [...teamA];
      temp[data.batsman[0]].Runs += e;
      setTeamA(temp);

      //change the strick
      let temp1 = data.batsman[0];
      data.batsman[0] = data.batsman[1];
      data.batsman[1] = temp1;
    }
    //score count
    //setScore(score + e)
    //setData({ ...data,  })

    if (data.ball % 6 == 0 && data.ball != 0) {
      //change the strick for data.batsman
      let temp1 = data.batsman[0];
      data.batsman[0] = data.batsman[1];
      data.batsman[1] = temp1;

      var bowlerIndex = prompt("Please Bowler Index");
      //setBowler(parseInt(bowlerIndex))
      //setData({ ...data, "ball": parseInt(bowlerIndex) })
      tempdata.bowler = parseInt(bowlerIndex);
      console.log(bowlerIndex);
    }
    //console.log(teamA)
    // ---- End Batsman ----- //

    // ---- Start Bowler ----- //
    //balls count
    let temp2 = [...teamB];
    temp2[data.bowler].Balls += 1;
    temp2[data.bowler].Runs += e;
    setTeamB(temp2);
    setData(tempdata);
  };

  return (
    <>
      <div
        className="container mt-5"
        style={{
          background: "linear-gradient(160deg, #667eea, #764ba2)",
          padding: "90px",
          borderRadius: "10px",
        }}>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="text-light fw-bold">
              {teamNameA} :{" "}
              <span>
                {data.score}/{data.wicket} ({calculation_over(data.ball)}/20)
              </span>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 text-center border">
            <h4 className="text-start text-light fw-bolder mt-2">Batsmen</h4>
            <hr className="text-light" />
            <div className="d-flex justify-content-between">
              <h2 className="bg-success text-light px-4 py-2 rounded mb-3">
                {teamA[data.batsman[0]].name} ({teamA[data.batsman[0]].Runs})
              </h2>
              <h2 className="bg-danger text-light px-4 py-2 rounded mb-3">
                {teamA[data.batsman[1]].name} ({teamA[data.batsman[1]].Runs})
              </h2>
            </div>
          </div>
          <div className="col-md-6 text-center border">
            <h4 className="text-start text-light fw-bolder mt-2">Bowler</h4>
            <hr className="text-light" />
            <div className="d-flex justify-content-center">
              <h2 className="bg-light py-2 text-dark px-5 rounded mb-3">
                {teamB[data.bowler].name} ({teamB[data.bowler].Balls} | {teamB[data.bowler].Runs})
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 border text-light">
            <h3 className="mt-2">
              {overName} : <span>{over.toString()}</span>
            </h3>
          </div>
        </div>
        <div className="row mt-5">
          <div className="d-flex justify-content-around text-light">
            <h5 className="mt-1">
              <input type="checkbox" name="wide" /> Wide
            </h5>

            <h5 className="mt-1">
              <input type="checkbox" name="noBall" /> NoBall
            </h5>

            <h5 className="mt-1">
              <input type="checkbox" name="bye" /> Bye
            </h5>

            <h5 className="mt-1">
              <input type="checkbox" name="legBye" /> LegBye
            </h5>

            <h5 className="mt-1">
              <input type="checkbox" name="wicket" /> Wicket
            </h5>
            <button type="button" className="btn btn-danger mx-2">
              Undo
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                localStorage.clear();
                window.location.reload();
              }}
              className="btn btn-primary">
              Start New Game
            </button>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12 text-center">
            {[0, 1, 2, 3, 4, 5, 6].map((e, i) => {
              return (
                <button
                  type="button"
                  className="btn btn-danger btn-lg rounded-circle ms-4"
                  key={i}
                  style={{
                    background: "linear-gradient(45deg, #ed0d15, #f0bfb1)",
                  }}
                  onClick={() => handleRuns(e)}>
                  {e}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cricket;
