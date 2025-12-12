import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {
    addTeam,
    numbers,
    pickTeamsColumns,
    establishTeams, isMissingTeamCheck, isMissingSpreadCheck,
} from "../../store";
import Loading from "../Misc/Loading";
import Button from "../Misc/Button";
import Column_Cont from "./Column_Cont";
import "./Pick_Teams.css";

const Pick_Teams_Page = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [missingSpread, setMissingSpread] = useState(false);
    const [missingTeam, setMissingTeam] = useState(false);

    const [pickDataObj, setPickDataObj] = useState(() => {
        return numbers.reduce(( a, number ) => {
            const team = {
                team: null,
                spread: null,
            };

            a[number] = team;

            return a;
        }, {});
    });

    setTimeout(() => {
        setLoading(false);
    }, 500);

    const onDropdownChange = ( objIdx, teamName ) => {
        setPickDataObj(prev => ({
            ...prev,
            [objIdx]: {
                ...prev[objIdx],
                team: teamName
            }
        }));
    };

    const onChange = ( number, key, answer ) => {
        setMissingSpread(false)

        const lockedStatus = key === "locked" ? pickDataObj[number][key] : null;

        const keyResult = key === "rank"
            ? Number(answer)
            : key === "locked"
                ? !lockedStatus
                : key === "lastTeam"
                    ? true
                    : answer;

        setPickDataObj(prev => ({
            ...prev,
            [number]: {
                ...prev[number],
                [key]: keyResult
            }
        }));

        console.log('onChange - setObj', pickDataObj)
    };

    const onSubmit = async ( evt ) => {
        evt.preventDefault();

        //TODO" joe - write code for backfillTeamNames
        //TODO" joe - incorporate backfillTeamNames

        //TODO" joe - do lots of scenario testing

        //TODO" joe - search for all todos

        //TODO" joe - remove console.logs

        const fullPickDataObjAsArray = Object.values(pickDataObj);

        const teams = establishTeams(fullPickDataObjAsArray)

        console.log('onSubmit - teams', teams)

        if (isMissingSpreadCheck(teams)) {
            return setMissingSpread(true)

        }

        if (isMissingTeamCheck(teams) && !missingTeam) {
            return setMissingTeam(true)
        }

        try {
            teams.forEach(team => dispatch(addTeam(team)))
            evt.target.reset();
        } catch (err) {
            console.log(err);
        }

    };

    const submitButton = <Button text="Submit" form="submit"/>

    const verifySubmitButton = <Button text="Missing Teams, still submit?"
                                       form="submit"/>

    const error = <div className="missing-spread">Missing Spread</div>

    const submitSection = missingSpread ? error : missingTeam
        ? verifySubmitButton : submitButton

    return loading ? (
        <Loading/>
    ) : (
        <form onSubmit={onSubmit} id="submit" className="box pick-teams">
            <div className="reset-cont">
                <Button
                    text="Reset Page"
                    form="submit"
                    onClick={() => setLoading(true)}
                />
            </div>

            <div className="header">
                <h1 className="white-text">Choose Team & Spread Info</h1>
            </div>


            {submitSection}

            <div className="full-spread-info-cont">
                {pickTeamsColumns.map(( column, idx ) => (
                    <Column_Cont
                        key={idx}
                        column={column}
                        onDropdownChange={onDropdownChange}
                        onChange={onChange}
                    />
                ))}
            </div>
        </form>
    );
};

export default Pick_Teams_Page;
