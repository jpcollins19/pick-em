import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTeams,
  clearTeams,
  sortTeams,
  rankColumns,
  loadExcelRankings,
} from "../../store";
import Overview_Cont from "./Overview_Cont";
import Column_Cont_Rank from "./Column_Cont_Rank";
import Loading from "../Misc/Loading";
import Button from "../Misc/Button";
import "./Rank.css";

const Rank_Page = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadTeams());
    dispatch(loadExcelRankings());
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const teams = useSelector((state) => state.teams);
  const excel_rankings = useSelector((state) => state.excelRankings);

  const DVOA_Rank = {};

  excel_rankings.forEach(
    (teamData) => (DVOA_Rank[teamData.team] = teamData.rank)
  );

  const teamsRanked = sortTeams(teams, DVOA_Rank);

  return loading ? (
    <Loading />
  ) : (
    <div className="box rank-page">
      <div className="reset-cont">
        <Button text="Reset Page" onClick={() => dispatch(clearTeams(teams))} />
      </div>

      <div className="header">
        <h1 className="white-text">Rank Info</h1>
      </div>

      <Overview_Cont teams={teams} />

      <div className="rank-info-cont">
        {rankColumns.map((column) => (
          <Column_Cont_Rank key={column} teams={teamsRanked} column={column} />
        ))}
      </div>
    </div>
  );
};

export default Rank_Page;
