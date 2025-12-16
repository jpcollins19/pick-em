const {teams} = require("./variables");

const capFirstLetter = ( str ) => {
    return str
    .split("")
    .map(( letter, idx ) => {
        if (idx === 0) {
            letter = letter.toUpperCase();
        }
        return letter;
    })
    .join("");
};

const createCountObj = ( arr, key ) => {
    return arr.reduce(( a, obj ) => {
        a[obj[key]] ? a[obj[key]]++ : (a[obj[key]] = 1);
        return a;
    }, {});
};

const sortSingleSpread = ( teamArray, lockedRanks ) => {
    let highestRank = -1;

    teamArray
    .filter(( team ) => !team.locked)
    .forEach(( team ) => {
        if (team.rank > highestRank) {
            highestRank = team.rank;
        }
    });

    teamArray.sort(( a, b ) => a.dvoaRank - b.dvoaRank);

    teamArray
    .filter(( team ) => !team.locked)
    .forEach(( team ) => {
        while (lockedRanks.includes(highestRank)) {
            highestRank--;
        }

        team.rank = highestRank--;
    });

    return teamArray;
};

const rankDVOA = ( teamArray, lockedRanks, DVOA_Rank ) => {
    teamArray.forEach(( obj ) => {
        obj.dvoaRank = DVOA_Rank[obj.team];

        return obj;
    });

    const sameSpreadAuditObj = teamArray.reduce(( a, team ) => {
        !a[team.spread] ? (a[team.spread] = [team]) : a[team.spread].push(team);

        return a;
    }, {});

    let newArr = [];

    Object.keys(sameSpreadAuditObj).forEach(( number ) => {
        const newOrder = sortSingleSpread(sameSpreadAuditObj[number],
            lockedRanks);

        newArr = [...newArr, ...newOrder];
    });

    return newArr;
};

const sameSpreadAudit = ( teamArray, DVOA_Rank ) => {
    const spreadCountObj = createCountObj(teamArray, "spread");

    const lockedRanks = [];

    teamArray
    .filter(( team ) => team.locked)
    .forEach(( team ) => lockedRanks.push(team.rank));

    let dupeSpreadTeams = teamArray.filter(
        ( team ) => spreadCountObj[team.spread] > 1
    );

    let nonDupeSpreadTeams = teamArray.filter(
        ( team ) => spreadCountObj[team.spread] === 1
    );

    dupeSpreadTeams = rankDVOA(dupeSpreadTeams, lockedRanks, DVOA_Rank);

    return [...dupeSpreadTeams, ...nonDupeSpreadTeams];
};

const sortTeams = ( teamArray, DVOA_Rank ) => {
    let rank = teamArray.length;

    const lockedTeams = teamArray.filter(( team ) => team.locked);

    if (lockedTeams.length) {
        const ranksUsed = [];

        lockedTeams.forEach(( team ) => ranksUsed.push(team.rank));

        const unLockedTeams = teamArray
        .filter(( team ) => !team.locked)
        .sort(( a, b ) => b.spread - a.spread)
        .map(( team ) => {
            while (ranksUsed.includes(rank)) {
                rank--;
            }

            ranksUsed.push(rank);
            team.rank = rank--;

            return team;
        });

        teamArray = [...lockedTeams, ...unLockedTeams];
    } else {
        teamArray
        .sort(( a, b ) => b.spread - a.spread)
        .map(( team ) => {
            team.rank = rank--;
            return team;
        });
    }

    teamArray = sameSpreadAudit(teamArray, DVOA_Rank);

    return teamArray.sort(( a, b ) => b.rank - a.rank);
};

const establishTeams = ( teamArray ) => {
    let result = []

    for (let i = 0; i < teamArray.length; i++) {
        const team = teamArray[i]

        result.push(team)

        if (team.lastTeam) {
            break;
        }

    }

    return result
};

const backfillTeamNames = ( teamArray ) => {

    const teamNames = teamArray
    .filter(team => team.team)
    .map(team => team.team)

    let teamNameToUse = ''

    for (let i = 0; i < teams.length; i++) {
        const team = teams[i]

        if (!teamNames.includes(team)) {
            teamNameToUse = team
            break;
        }

    }

    return teamArray.map(( team ) => {
        if (!team.team) {
            return {...team, team: teamNameToUse};
        }
        return team;
    });
};

const isMissingSpreadCheck = ( teamArray ) => {
    for (let i = 0; i < teamArray.length; i++) {
        const team = teamArray[i]

        if (team.spread === null) {
            return true
            break;
        }
    }

    return false
};

const isMissingTeamCheck = ( teamArray ) => {
    for (let i = 0; i < teamArray.length; i++) {
        const team = teamArray[i]

        if (team.team === null) {
            return true
            break;
        }

    }

    return false
};

module.exports = {
    capFirstLetter,
    sortTeams,
    backfillTeamNames,
    establishTeams,
    isMissingSpreadCheck,
    isMissingTeamCheck
};
