const {expect} = require("chai");
const {
    capFirstLetter,
    sortTeams,
    establishTeams,
    isMissingSpreadCheck,
    isMissingTeamCheck,
    backfillTeamNames
} = require(
    "./src/store/funcs");

const DVOA_Obj_TESTING = {
    eagles: 1,
    bills: 2,
    "9ers": 3,
    boys: 4,
    ravens: 5,
    bengals: 6,
    chiefs: 7,
    fins: 8,
    jets: 9,
    hawks: 10,
    lions: 11,
    pats: 12,
    bucs: 13,
    browns: 14,
    pack: 15,
    falcons: 16,
    wash: 17,
    jags: 18,
    steelers: 19,
    titans: 20,
    vikings: 21,
    saints: 22,
    broncos: 23,
    giants: 24,
    raiders: 25,
    chargers: 26,
    rams: 27,
    panthers: 28,
    bears: 29,
    cards: 30,
    colts: 31,
    texans: 32,
};

describe("backfillTeamNames func", () => {
    const determineTeamName = ( team, defaultTeamName ) => {
        return team.team ? team.team : defaultTeamName
    };

    it("when 9ers are not selected, 9ers are used for every team", () => {
        const teams = [
            {team: "boys", spread: "8", rank: 5, locked: true},
            {team: null, spread: "3.5", rank: null, locked: false},
            {team: "fins", spread: "5.5", rank: 7, locked: true},
            {team: null, spread: "3", rank: 8, locked: true},
            {team: "hawks", spread: "10.5", rank: null, locked: false},
            {team: "lions", spread: "14.5", rank: null, locked: false},
            {team: null, spread: "4", rank: null, locked: false},
            {team: "jags", spread: "7", rank: null, locked: false},
            {team: "steelers", spread: "3.5", rank: null, locked: false},
            {team: "broncos", spread: "16.5", rank: null, locked: false},
            {team: "giants", spread: "6", rank: null, locked: false},
            {team: "raiders", spread: "9", rank: null, locked: false},
            {team: null, spread: "5.5", rank: null, locked: false},
            {team: "bears", spread: "3.5", rank: null, locked: false},
            {team: "texans", spread: "3", rank: null, locked: false},
        ];

        const result = backfillTeamNames(teams)

        result.forEach(( team, idx ) => {
            const teamDataFromResult = team
            const originalTeamInfo = teams[idx]

            const defaultTeamName = '9ers'

            let expectedTeamTeam = determineTeamName(originalTeamInfo,
                defaultTeamName)

            expect(teamDataFromResult.team).to.equal(expectedTeamTeam)
            expect(teamDataFromResult.spread).to.equal(originalTeamInfo.spread)
            expect(teamDataFromResult.rank).to.equal(originalTeamInfo.rank)
            expect(teamDataFromResult.locked).to.equal(originalTeamInfo.locked)

        })
    });

    it("when 9ers are selected, bears are used for every team", () => {
        const teams = [
            {team: "boys", spread: "8", rank: 5, locked: true},
            {team: null, spread: "3.5", rank: null, locked: false},
            {team: "fins", spread: "5.5", rank: 7, locked: true},
            {team: null, spread: "3", rank: 8, locked: true},
            {team: "hawks", spread: "10.5", rank: null, locked: false},
            {team: "lions", spread: "14.5", rank: null, locked: false},
            {team: null, spread: "4", rank: null, locked: false},
            {team: "jags", spread: "7", rank: null, locked: false},
            {team: "steelers", spread: "3.5", rank: null, locked: false},
            {team: "broncos", spread: "16.5", rank: null, locked: false},
            {team: "giants", spread: "6", rank: null, locked: false},
            {team: "raiders", spread: "9", rank: null, locked: false},
            {team: null, spread: "5.5", rank: null, locked: false},
            {team: "9ers", spread: "3.5", rank: null, locked: false},
            {team: "texans", spread: "3", rank: null, locked: false},
        ];

        const teamsCopy = teams

        const result = backfillTeamNames(teamsCopy)

        result.forEach(( team, idx ) => {
            const teamDataFromResult = team
            const originalTeamInfo = teams[idx]

            const defaultTeamName = 'bears'

            let expectedTeamTeam = determineTeamName(originalTeamInfo,
                defaultTeamName)

            expect(teamDataFromResult.team).to.equal(expectedTeamTeam)
            expect(teamDataFromResult.spread).to.equal(originalTeamInfo.spread)
            expect(teamDataFromResult.rank).to.equal(originalTeamInfo.rank)
            expect(teamDataFromResult.locked).to.equal(originalTeamInfo.locked)

        })
    });

    it("when 9ers & bears are selected, bengals are used for every team",
        () => {
            const teams = [
                {team: "boys", spread: "8", rank: 5, locked: true},
                {team: null, spread: "3.5", rank: null, locked: false},
                {team: "fins", spread: "5.5", rank: 7, locked: true},
                {team: null, spread: "3", rank: 8, locked: true},
                {team: "hawks", spread: "10.5", rank: null, locked: false},
                {team: "lions", spread: "14.5", rank: null, locked: false},
                {team: null, spread: "4", rank: null, locked: false},
                {team: "jags", spread: "7", rank: null, locked: false},
                {team: "bears", spread: "3.5", rank: null, locked: false},
                {team: "broncos", spread: "16.5", rank: null, locked: false},
                {team: "giants", spread: "6", rank: null, locked: false},
                {team: "raiders", spread: "9", rank: null, locked: false},
                {team: null, spread: "5.5", rank: null, locked: false},
                {team: "9ers", spread: "3.5", rank: null, locked: false},
                {team: "texans", spread: "3", rank: null, locked: false},
            ];

            const result = backfillTeamNames(teams)

            result.forEach(( team, idx ) => {
                const teamDataFromResult = team
                const originalTeamInfo = teams[idx]

                const defaultTeamName = 'bengals'

                let expectedTeamTeam = determineTeamName(originalTeamInfo,
                    defaultTeamName)

                expect(teamDataFromResult.team).to.equal(expectedTeamTeam)
                expect(teamDataFromResult.spread).to.equal(
                    originalTeamInfo.spread)
                expect(teamDataFromResult.rank).to.equal(originalTeamInfo.rank)
                expect(teamDataFromResult.locked).to.equal(
                    originalTeamInfo.locked)

            })
        });

    it("when 9ers & bears & bengals are selected, bills are used for every team",
        () => {
            const teams = [
                {team: "boys", spread: "8", rank: 5, locked: true},
                {team: null, spread: "3.5", rank: null, locked: false},
                {team: "fins", spread: "5.5", rank: 7, locked: true},
                {team: null, spread: "3", rank: 8, locked: true},
                {team: "hawks", spread: "10.5", rank: null, locked: false},
                {team: "bengals", spread: "14.5", rank: null, locked: false},
                {team: null, spread: "4", rank: null, locked: false},
                {team: "jags", spread: "7", rank: null, locked: false},
                {team: "bears", spread: "3.5", rank: null, locked: false},
                {team: "broncos", spread: "16.5", rank: null, locked: false},
                {team: "giants", spread: "6", rank: null, locked: false},
                {team: "raiders", spread: "9", rank: null, locked: false},
                {team: null, spread: "5.5", rank: null, locked: false},
                {team: "9ers", spread: "3.5", rank: null, locked: false},
                {team: "texans", spread: "3", rank: null, locked: false},
            ];

            const result = backfillTeamNames(teams)

            result.forEach(( team, idx ) => {
                const teamDataFromResult = team
                const originalTeamInfo = teams[idx]

                const defaultTeamName = 'bills'

                let expectedTeamTeam = determineTeamName(originalTeamInfo,
                    defaultTeamName)

                expect(teamDataFromResult.team).to.equal(expectedTeamTeam)
                expect(teamDataFromResult.spread).to.equal(
                    originalTeamInfo.spread)
                expect(teamDataFromResult.rank).to.equal(originalTeamInfo.rank)
                expect(teamDataFromResult.locked).to.equal(
                    originalTeamInfo.locked)

            })
        });
});

describe("isMissingSpreadCheck func", () => {
    it("when every team is filled in", () => {
        const teams = [
            {team: "9ers", spread: "8", rank: 14, locked: false},
            {team: "boys", spread: "8", rank: 5, locked: false},
        ];

        const result = isMissingSpreadCheck(teams)

        expect(result).to.equal(false)
    });

    it("when every team is not filled in", () => {
        const teams = [
            {team: "steelers", spread: "3.5", rank: null, locked: false},
            {team: null, spread: null, rank: null, locked: false},
            {team: "steelers", spread: "3.5", rank: null, locked: false},

        ];

        const result = isMissingSpreadCheck(teams)

        expect(result).to.equal(true)
    });
});

describe("isMissingTeamCheck func", () => {
    it("when every team is filled in", () => {
        const teams = [
            {team: "9ers", spread: "8", rank: 14, locked: false},
            {team: "boys", spread: "8", rank: 5, locked: false},
        ];

        const result = isMissingTeamCheck(teams)

        expect(result).to.equal(false)
    });

    it("when every team is not filled in", () => {
        const teams = [
            {team: "steelers", spread: "3.5", rank: null, locked: false},
            {team: null, spread: "8", rank: null, locked: false},
            {team: "steelers", spread: "3.5", rank: null, locked: false},

        ];

        const result = isMissingTeamCheck(teams)

        expect(result).to.equal(true)
    });
});

describe("establishTeams func", () => {
    it("when there is no lastTeam and all teams are filled in", () => {
        const teams = [
            {team: "9ers", spread: "8", rank: 14, locked: false},
            {team: "boys", spread: "8", rank: 5, locked: false},
            {team: "bengals", spread: "3.5", rank: null, locked: false},
            {team: "fins", spread: "5.5", rank: null, locked: false},
            {team: "jets", spread: "3", rank: null, locked: false},
            {team: "hawks", spread: "10.5", rank: null, locked: false},
            {team: "lions", spread: "14.5", rank: null, locked: false},
            {team: "falcons", spread: "4", rank: null, locked: false},
            {team: "jags", spread: "7", rank: null, locked: false},
            {team: "steelers", spread: "3.5", rank: null, locked: false},
            {team: "broncos", spread: "16.5", rank: null, locked: false},
            {team: "giants", spread: "6", rank: null, locked: false},
            {team: "raiders", spread: "9", rank: null, locked: false},
            {team: "panthers", spread: "5.5", rank: null, locked: false},
            {team: "bears", spread: "3.5", rank: null, locked: false},
            {team: "texans", spread: "3", rank: null, locked: false},
        ];

        const result = establishTeams(teams)

        result.forEach(( team, idx ) => {
            const teamNameFromAnswer = team.team
            const expectedTeamName = teams[idx].team
            expect(teamNameFromAnswer).to.equal(expectedTeamName);

        })
    });

    it("when there is no lastTeam and all teams are not filled in", () => {
        const teams = [
            {team: "9ers", spread: "8", rank: 14, locked: false},
            {team: null, spread: "8", rank: 5, locked: false},
            {team: "bengals", spread: "3.5", rank: null, locked: false},
            {team: "fins", spread: "5.5", rank: null, locked: false},
            {team: "jets", spread: "3", rank: null, locked: false},
            {team: "hawks", spread: "10.5", rank: null, locked: false},
            {team: null, spread: "14.5", rank: null, locked: false},
            {team: "falcons", spread: "4", rank: null, locked: false},
            {team: "jags", spread: "7", rank: null, locked: false},
            {team: "steelers", spread: "3.5", rank: null, locked: false},
            {team: "broncos", spread: "16.5", rank: null, locked: false},
            {team: "giants", spread: "6", rank: null, locked: false},
            {team: null, spread: "9", rank: null, locked: false},
            {team: "panthers", spread: "5.5", rank: null, locked: false},
            {team: "bears", spread: "3.5", rank: null, locked: false},
            {team: "texans", spread: "3", rank: null, locked: false},
        ];

        const result = establishTeams(teams)

        result.forEach(( team, idx ) => {
            const teamNameFromAnswer = team.team
            const expectedTeamName = teams[idx].team
            expect(teamNameFromAnswer).to.equal(expectedTeamName);

        })
    });

    it("when there is a lastTeam and all teams are filled in", () => {
        const teams = [
            {team: "9ers", spread: "8", rank: 14, locked: false},
            {team: "boys", spread: "8", rank: 5, locked: false},
            {team: "bengals", spread: "3.5", rank: null, locked: false},
            {team: "fins", spread: "5.5", rank: null, locked: false},
            {team: "jets", spread: "3", rank: null, locked: false},
            {team: "hawks", spread: "10.5", rank: null, locked: false},
            {team: "lions", spread: "14.5", rank: null, locked: false},
            {team: "falcons", spread: "4", rank: null, locked: false},
            {team: "jags", spread: "7", rank: null, locked: false},
            {
                team: "steelers",
                spread: "3.5",
                rank: null,
                locked: false,
                lastTeam: true
            },
            {team: "broncos", spread: "16.5", rank: null, locked: false},
            {team: "giants", spread: "6", rank: null, locked: false},
            {team: "raiders", spread: "9", rank: null, locked: false},
            {team: "panthers", spread: "5.5", rank: null, locked: false},
            {team: "bears", spread: "3.5", rank: null, locked: false},
            {team: "texans", spread: "3", rank: null, locked: false},
        ];

        const expectedTeams = [
            {
                team: "9ers",
                spread: "8",
                rank: 14,
                locked: false
            },
            {team: "boys", spread: "8", rank: 5, locked: false},
            {team: "bengals", spread: "3.5", rank: null, locked: false},
            {team: "fins", spread: "5.5", rank: null, locked: false},
            {team: "jets", spread: "3", rank: null, locked: false},
            {team: "hawks", spread: "10.5", rank: null, locked: false},
            {team: "lions", spread: "14.5", rank: null, locked: false},
            {team: "falcons", spread: "4", rank: null, locked: false},
            {team: "jags", spread: "7", rank: null, locked: false},
            {
                team: "steelers",
                spread: "3.5",
                rank: null,
                locked: false,
                lastTeam: true
            },
        ]

        const result = establishTeams(teams)

        result.forEach(( team, idx ) => {
            const teamNameFromAnswer = team.team
            const expectedTeamName = expectedTeams[idx].team
            expect(teamNameFromAnswer).to.equal(expectedTeamName);

        })
    });

    it("when there is a lastTeam and not all teams are filled in", () => {
        const teams = [
            {team: "9ers", spread: "8", rank: 14, locked: false},
            {team: "boys", spread: "8", rank: 5, locked: false},
            {team: null, spread: "3.5", rank: null, locked: false},
            {team: "fins", spread: "5.5", rank: null, locked: false},
            {team: "jets", spread: "3", rank: null, locked: false},
            {team: "hawks", spread: "10.5", rank: null, locked: false},
            {team: null, spread: "14.5", rank: null, locked: false},
            {team: "falcons", spread: "4", rank: null, locked: false},
            {team: "jags", spread: "7", rank: null, locked: false},
            {
                team: "steelers",
                spread: "3.5",
                rank: null,
                locked: false,
                lastTeam: true
            },
            {team: "broncos", spread: "16.5", rank: null, locked: false},
            {team: "giants", spread: "6", rank: null, locked: false},
            {team: "raiders", spread: "9", rank: null, locked: false},
            {team: null, spread: "5.5", rank: null, locked: false},
            {team: "bears", spread: "3.5", rank: null, locked: false},
            {team: "texans", spread: "3", rank: null, locked: false},
        ];

        const expectedTeams = [
            {team: "9ers", spread: "8", rank: 14, locked: false},
            {team: "boys", spread: "8", rank: 5, locked: false},
            {team: null, spread: "3.5", rank: null, locked: false},
            {team: "fins", spread: "5.5", rank: null, locked: false},
            {team: "jets", spread: "3", rank: null, locked: false},
            {team: "hawks", spread: "10.5", rank: null, locked: false},
            {team: null, spread: "14.5", rank: null, locked: false},
            {team: "falcons", spread: "4", rank: null, locked: false},
            {team: "jags", spread: "7", rank: null, locked: false},
            {
                team: "steelers",
                spread: "3.5",
                rank: null,
                locked: false,
                lastTeam: true
            },
        ]

        const result = establishTeams(teams)

        result.forEach(( team, idx ) => {
            const teamNameFromAnswer = team.team
            const expectedTeamName = expectedTeams[idx].team
            expect(teamNameFromAnswer).to.equal(expectedTeamName);

        })
    });
});

describe("capFirstLetter func", () => {
    it("capitalizes the first letter of each word", () => {
        const team = capFirstLetter("team");
        const spread = capFirstLetter("spread");
        const locked = capFirstLetter("locked");
        const rank = capFirstLetter("rank");

        expect(team).to.equal("Team");
        expect(spread).to.equal("Spread");
        expect(locked).to.equal("Locked");
        expect(rank).to.equal("Rank");
    });
});

describe("sortTeams func", () => {
    let teams, teamData, teams2Find, answer, lockedAudit;

    describe("no locking", () => {
        beforeEach(() => {
            teams = [
                {team: "9ers", spread: "8", rank: 14, locked: false},
                {team: "boys", spread: "8", rank: 5, locked: false},
                {team: "bengals", spread: "3.5", rank: null, locked: false},
                {team: "fins", spread: "5.5", rank: null, locked: false},
                {team: "jets", spread: "3", rank: null, locked: false},
                {team: "hawks", spread: "10.5", rank: null, locked: false},
                {team: "lions", spread: "14.5", rank: null, locked: false},
                {team: "falcons", spread: "4", rank: null, locked: false},
                {team: "jags", spread: "7", rank: null, locked: false},
                {team: "steelers", spread: "3.5", rank: null, locked: false},
                {team: "broncos", spread: "16.5", rank: null, locked: false},
                {team: "giants", spread: "6", rank: null, locked: false},
                {team: "raiders", spread: "9", rank: null, locked: false},
                {team: "panthers", spread: "5.5", rank: null, locked: false},
                {team: "bears", spread: "3.5", rank: null, locked: false},
                {team: "texans", spread: "3", rank: null, locked: false},
            ];
        });

        describe("w/ no dupe spreads", () => {
            it("sorts 3 teams correctly", () => {
                teamData = [
                    {team: "9ers", spread: "6"},
                    {team: "boys", spread: "8"},
                    {team: "bengals", spread: "7"},
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team
                            === team.team) {
                            team.spread = teeam.spread;
                        }
                    });
                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit.includes(true)).to.equal(false);

                expect(answer[0].team).to.equal("boys");
                expect(answer[1].team).to.equal("bengals");
                expect(answer[2].team).to.equal("9ers");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });

            it("sorts 5 teams correctly", () => {
                teamData = [
                    {team: "9ers", spread: "1"},
                    {team: "boys", spread: "8"},
                    {team: "bengals", spread: "4"},
                    {team: "fins", spread: "4.5"},
                    {team: "jets", spread: "3"},
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team
                            === team.team) {
                            team.spread = teeam.spread;
                        }
                    });
                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit.includes(true)).to.equal(false);

                expect(answer[0].team).to.equal("boys");
                expect(answer[1].team).to.equal("fins");
                expect(answer[2].team).to.equal("bengals");
                expect(answer[3].team).to.equal("jets");
                expect(answer[4].team).to.equal("9ers");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });

            it("sorts 10 teams correctly", () => {
                teamData = [
                    {team: "9ers", spread: "1"},
                    {team: "boys", spread: "8"},
                    {team: "bengals", spread: "4"},
                    {team: "fins", spread: "4.5"},
                    {team: "jets", spread: "3"},
                    {team: "hawks", spread: "1.5"},
                    {team: "lions", spread: "16"},
                    {team: "falcons", spread: "15"},
                    {team: "jags", spread: "14"},
                    {team: "steelers", spread: "13.5"},
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team
                            === team.team) {
                            team.spread = teeam.spread;
                        }
                    });
                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit.includes(true)).to.equal(false);

                expect(answer[0].team).to.equal("lions");
                expect(answer[1].team).to.equal("falcons");
                expect(answer[2].team).to.equal("jags");
                expect(answer[3].team).to.equal("steelers");
                expect(answer[4].team).to.equal("boys");
                expect(answer[5].team).to.equal("fins");
                expect(answer[6].team).to.equal("bengals");
                expect(answer[7].team).to.equal("jets");
                expect(answer[8].team).to.equal("hawks");
                expect(answer[9].team).to.equal("9ers");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });

            it("sorts 16 teams correctly", () => {
                teamData = [
                    {team: "9ers", spread: "1"},
                    {team: "boys", spread: "8"},
                    {team: "bengals", spread: "4"},
                    {team: "fins", spread: "4.5"},
                    {team: "jets", spread: "3"},
                    {team: "hawks", spread: "1.5"},
                    {team: "lions", spread: "16"},
                    {team: "falcons", spread: "15"},
                    {team: "jags", spread: "12"},
                    {team: "steelers", spread: "13"},
                    {team: "broncos", spread: "7"},
                    {team: "giants", spread: "14.5"},
                    {team: "raiders", spread: "11"},
                    {team: "panthers", spread: "6"},
                    {team: "bears", spread: "14"},
                    {team: "texans", spread: "13.5"},
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team
                            === team.team) {
                            team.spread = teeam.spread;
                        }
                    });
                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit.includes(true)).to.equal(false);

                expect(answer[0].team).to.equal("lions");
                expect(answer[1].team).to.equal("falcons");
                expect(answer[2].team).to.equal("giants");
                expect(answer[3].team).to.equal("bears");
                expect(answer[4].team).to.equal("texans");
                expect(answer[5].team).to.equal("steelers");
                expect(answer[6].team).to.equal("jags");
                expect(answer[7].team).to.equal("raiders");
                expect(answer[8].team).to.equal("boys");
                expect(answer[9].team).to.equal("broncos");
                expect(answer[10].team).to.equal("panthers");
                expect(answer[11].team).to.equal("fins");
                expect(answer[12].team).to.equal("bengals");
                expect(answer[13].team).to.equal("jets");
                expect(answer[14].team).to.equal("hawks");
                expect(answer[15].team).to.equal("9ers");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });
        });

        describe("w/ dupe spreads", () => {
            it("sorts 3 teams correctly", () => {
                teamData = [
                    {team: "9ers", spread: "6"},
                    {team: "boys", spread: "6"},
                    {team: "bengals", spread: "7"},
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team
                            === team.team) {
                            team.spread = teeam.spread;
                        }
                    });
                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit.includes(true)).to.equal(false);

                expect(answer[0].team).to.equal("bengals");
                expect(answer[1].team).to.equal("9ers");
                expect(answer[2].team).to.equal("boys");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });

            it("sorts 5 teams correctly", () => {
                teamData = [
                    {team: "9ers", spread: "1"},
                    {team: "boys", spread: "8"},
                    {team: "bengals", spread: "4.5"},
                    {team: "fins", spread: "4.5"},
                    {team: "jets", spread: "3"},
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team
                            === team.team) {
                            team.spread = teeam.spread;
                        }
                    });
                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit.includes(true)).to.equal(false);

                expect(answer[0].team).to.equal("boys");
                expect(answer[1].team).to.equal("bengals");
                expect(answer[2].team).to.equal("fins");
                expect(answer[3].team).to.equal("jets");
                expect(answer[4].team).to.equal("9ers");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });

            it("sorts 10 teams correctly", () => {
                teamData = [
                    {team: "9ers", spread: "1"},
                    {team: "boys", spread: "8"},
                    {team: "bengals", spread: "3"},
                    {team: "fins", spread: "4.5"},
                    {team: "jets", spread: "3"},
                    {team: "hawks", spread: "1.5"},
                    {team: "lions", spread: "16"},
                    {team: "falcons", spread: "15"},
                    {team: "jags", spread: "14"},
                    {team: "steelers", spread: "13.5"},
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team
                            === team.team) {
                            team.spread = teeam.spread;
                        }
                    });
                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit.includes(true)).to.equal(false);

                expect(answer[0].team).to.equal("lions");
                expect(answer[1].team).to.equal("falcons");
                expect(answer[2].team).to.equal("jags");
                expect(answer[3].team).to.equal("steelers");
                expect(answer[4].team).to.equal("boys");
                expect(answer[5].team).to.equal("fins");
                expect(answer[6].team).to.equal("bengals");
                expect(answer[7].team).to.equal("jets");
                expect(answer[8].team).to.equal("hawks");
                expect(answer[9].team).to.equal("9ers");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });

            it("sorts 16 teams correctly", () => {
                teams = teams.map(( team ) => {
                    if (team.team === "9ers") {
                        team.spread = "1";
                    }
                    if (team.team === "boys") {
                        team.spread = "8";
                    }
                    if (team.team === "bengals") {
                        team.spread = "4";
                    }
                    if (team.team === "fins") {
                        team.spread = "4";
                    }
                    if (team.team === "jets") {
                        team.spread = "3";
                    }
                    if (team.team === "hawks") {
                        team.spread = "1.5";
                    }
                    if (team.team === "lions") {
                        team.spread = "16";
                    }
                    if (team.team === "falcons") {
                        team.spread = "15";
                    }
                    if (team.team === "jags") {
                        team.spread = "14";
                    }
                    if (team.team === "steelers") {
                        team.spread = "13";
                    }
                    if (team.team === "broncos") {
                        team.spread = "7";
                    }
                    if (team.team === "giants") {
                        team.spread = "14.5";
                    }
                    if (team.team === "raiders") {
                        team.spread = "11";
                    }
                    if (team.team === "panthers") {
                        team.spread = "6";
                    }
                    if (team.team === "bears") {
                        team.spread = "14";
                    }
                    if (team.team === "texans") {
                        team.spread = "13.5";
                    }
                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                teams2Audit = ["colts", "pack", "titans", "wash"];

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit.includes(true)).to.equal(false);

                expect(answer[0].team).to.equal("lions");
                expect(answer[1].team).to.equal("falcons");
                expect(answer[2].team).to.equal("giants");
                expect(answer[3].team).to.equal("jags");
                expect(answer[4].team).to.equal("bears");
                expect(answer[5].team).to.equal("texans");
                expect(answer[6].team).to.equal("steelers");
                expect(answer[7].team).to.equal("raiders");
                expect(answer[8].team).to.equal("boys");
                expect(answer[9].team).to.equal("broncos");
                expect(answer[10].team).to.equal("panthers");
                expect(answer[11].team).to.equal("bengals");
                expect(answer[12].team).to.equal("fins");
                expect(answer[13].team).to.equal("jets");
                expect(answer[14].team).to.equal("hawks");
                expect(answer[15].team).to.equal("9ers");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });
        });
    });

    describe("week 15 scenario testing", () => {
        it("calcs correctly", () => {
            teams = [
                {team: "9ers", spread: "3", rank: null, locked: false}, //7
                {team: "vikings", spread: "4", rank: null, locked: false}, //10
                {team: "browns", spread: "3", rank: null, locked: false}, //6
                {team: "bills", spread: "7", rank: null, locked: false}, //14
                {team: "saints", spread: "4", rank: null, locked: false}, //9
                {team: "panthers", spread: "3", rank: null, locked: false}, //5
                {team: "eagles", spread: "9", rank: null, locked: false}, //15
                {team: "chiefs", spread: "14", rank: null, locked: false}, //16
                {team: "boys", spread: "4", rank: null, locked: false}, //11
                {team: "lions", spread: "0", rank: null, locked: false}, //2
                {team: "broncos", spread: "2.5", rank: null, locked: false}, //3
                {team: "raiders", spread: "1", rank: null, locked: false}, //1
                {team: "chargers", spread: "3", rank: null, locked: false}, //4
                {team: "bengals", spread: "3.5", rank: null, locked: false}, //8
                {team: "wash", spread: "4.5", rank: null, locked: false}, //12
                {team: "pack", spread: "7", rank: null, locked: false}, //13
            ];

            answer = sortTeams(teams, DVOA_Obj_TESTING);

            lockedAudit = answer.map(( user ) => user.locked);

            expect(lockedAudit.includes(true)).to.equal(false);

            expect(answer[0].team).to.equal("chiefs");
            expect(answer[1].team).to.equal("eagles");
            expect(answer[2].team).to.equal("bills");
            expect(answer[3].team).to.equal("pack");
            expect(answer[4].team).to.equal("wash");
            expect(answer[5].team).to.equal("boys");
            expect(answer[6].team).to.equal("vikings");
            expect(answer[7].team).to.equal("saints");
            expect(answer[8].team).to.equal("bengals");
            expect(answer[9].team).to.equal("9ers");
            expect(answer[10].team).to.equal("browns");
            expect(answer[11].team).to.equal("chargers");
            expect(answer[12].team).to.equal("panthers");
            expect(answer[13].team).to.equal("broncos");
            expect(answer[14].team).to.equal("raiders");
            expect(answer[15].team).to.equal("lions");

            teams.forEach(( team, idx ) => {
                expect(answer[idx].rank).to.equal(teams.length - idx);
            });
        });
    });

    describe("with locking", () => {
        beforeEach(() => {
            teams = [
                {team: "chiefs", spread: "8", rank: 14, locked: false},
                {team: "eagles", spread: "8", rank: 5, locked: false},
                {team: "ravens", spread: "3.5", rank: null, locked: false},
                {team: "browns", spread: "5.5", rank: null, locked: false},
                {team: "pack", spread: "3", rank: null, locked: false},
                {team: "titans", spread: "10.5", rank: null, locked: false},
                {team: "colts", spread: "14.5", rank: null, locked: false},
                {team: "vikings", spread: "4", rank: null, locked: false},
                {team: "wash", spread: "7", rank: null, locked: false},
                {team: "saints", spread: "3.5", rank: null, locked: false},
                {team: "bills", spread: "16.5", rank: null, locked: false},
                {team: "pats", spread: "6", rank: null, locked: false},
                {team: "bucs", spread: "9", rank: null, locked: false},
                {team: "cards", spread: "5.5", rank: null, locked: false},
                {team: "rams", spread: "3.5", rank: null, locked: false},
                {team: "chargers", spread: "3", rank: null, locked: false},
            ];
        });

        describe("w/ no dupe spreads", () => {
            it("sorts 3 teams correctly", () => {
                teamData = [
                    {team: "bills", spread: "8", locked: false, rank: null},
                    {team: "colts", spread: "7", locked: true, rank: 1},
                    {team: "titans", spread: "6", locked: false, rank: null},
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team === team.team) {
                            team.spread = teeam.spread;
                            team.locked = teeam.locked;
                            team.rank = teeam.rank;
                        }
                    });

                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit[0]).to.equal(false);
                expect(lockedAudit[1]).to.equal(false);
                expect(lockedAudit[2]).to.equal(true);

                expect(answer[0].team).to.equal("bills");
                expect(answer[1].team).to.equal("titans");
                expect(answer[2].team).to.equal("colts");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });

            it("sorts 6 teams correctly, first team = locked & listed highest rank",
                () => {
                    teamData = [
                        {team: "chiefs", spread: "3", locked: true, rank: 6},
                        {team: "bucs", spread: "1", locked: false, rank: null},
                        {
                            team: "ravens",
                            spread: "1.5",
                            locked: false,
                            rank: null
                        },
                        {team: "pack", spread: "10", locked: false, rank: null},
                        {team: "pats", spread: "4", locked: false, rank: null},
                        {
                            team: "titans",
                            spread: "5",
                            locked: false,
                            rank: null
                        },
                    ];

                    teams2Find = Object.values(teamData).map(
                        ( team ) => team.team);

                    teams = teams
                    .filter(( team ) => teams2Find.includes(team.team))
                    .map(( team ) => {
                        teamData.forEach(( teeam ) => {
                            if (teeam.team === team.team) {
                                team.spread = teeam.spread;
                                team.locked = teeam.locked;
                                team.rank = teeam.rank;
                            }
                        });

                        return team;
                    });

                    answer = sortTeams(teams, DVOA_Obj_TESTING);

                    lockedAudit = answer.map(( user ) => user.locked);

                    expect(lockedAudit[0]).to.equal(true);
                    expect(lockedAudit[1]).to.equal(false);
                    expect(lockedAudit[2]).to.equal(false);
                    expect(lockedAudit[3]).to.equal(false);
                    expect(lockedAudit[4]).to.equal(false);

                    expect(answer[0].team).to.equal("chiefs");
                    expect(answer[1].team).to.equal("pack");
                    expect(answer[2].team).to.equal("titans");
                    expect(answer[3].team).to.equal("pats");
                    expect(answer[4].team).to.equal("ravens");
                    expect(answer[5].team).to.equal("bucs");

                    teams.forEach(( team, idx ) => {
                        expect(answer[idx].rank).to.equal(teams.length - idx);
                    });
                });

            it("sorts 6 teams correctly, first team = locked & listed lowest rank",
                () => {
                    teamData = [
                        {team: "chiefs", spread: "3", locked: true, rank: 1},
                        {team: "bucs", spread: "1", locked: false, rank: null},
                        {
                            team: "ravens",
                            spread: "1.5",
                            locked: false,
                            rank: null
                        },
                        {team: "pack", spread: "10", locked: false, rank: null},
                        {team: "pats", spread: "4", locked: false, rank: null},
                        {
                            team: "titans",
                            spread: "5",
                            locked: false,
                            rank: null
                        },
                    ];

                    teams2Find = Object.values(teamData).map(
                        ( team ) => team.team);

                    teams = teams
                    .filter(( team ) => teams2Find.includes(team.team))
                    .map(( team ) => {
                        teamData.forEach(( teeam ) => {
                            if (teeam.team === team.team) {
                                team.spread = teeam.spread;
                                team.locked = teeam.locked;
                                team.rank = teeam.rank;
                            }
                        });

                        return team;
                    });

                    answer = sortTeams(teams, DVOA_Obj_TESTING);

                    lockedAudit = answer.map(( user ) => user.locked);

                    expect(lockedAudit[0]).to.equal(false);
                    expect(lockedAudit[1]).to.equal(false);
                    expect(lockedAudit[2]).to.equal(false);
                    expect(lockedAudit[3]).to.equal(false);
                    expect(lockedAudit[4]).to.equal(false);
                    expect(lockedAudit[5]).to.equal(true);

                    expect(answer[0].team).to.equal("pack");
                    expect(answer[1].team).to.equal("titans");
                    expect(answer[2].team).to.equal("pats");
                    expect(answer[3].team).to.equal("ravens");
                    expect(answer[4].team).to.equal("bucs");
                    expect(answer[5].team).to.equal("chiefs");

                    teams.forEach(( team, idx ) => {
                        expect(answer[idx].rank).to.equal(teams.length - idx);
                    });
                });

            it("sorts 6 teams correctly, last team = locked & listed highest rank",
                () => {
                    teamData = [
                        {
                            team: "chiefs",
                            spread: "6",
                            locked: false,
                            rank: null
                        },
                        {
                            team: "titans",
                            spread: "5",
                            locked: false,
                            rank: null
                        },
                        {team: "bucs", spread: "1", locked: false, rank: null},
                        {
                            team: "ravens",
                            spread: "1.5",
                            locked: false,
                            rank: null
                        },
                        {team: "pack", spread: "10", locked: false, rank: null},
                        {team: "pats", spread: "3", locked: true, rank: 6},
                    ];

                    teams2Find = Object.values(teamData).map(
                        ( team ) => team.team);

                    teams = teams
                    .filter(( team ) => teams2Find.includes(team.team))
                    .map(( team ) => {
                        teamData.forEach(( teeam ) => {
                            if (teeam.team === team.team) {
                                team.spread = teeam.spread;
                                team.locked = teeam.locked;
                                team.rank = teeam.rank;
                            }
                        });

                        return team;
                    });

                    answer = sortTeams(teams, DVOA_Obj_TESTING);

                    lockedAudit = answer.map(( user ) => user.locked);

                    expect(lockedAudit[0]).to.equal(true);
                    expect(lockedAudit[1]).to.equal(false);
                    expect(lockedAudit[2]).to.equal(false);
                    expect(lockedAudit[3]).to.equal(false);
                    expect(lockedAudit[4]).to.equal(false);
                    expect(lockedAudit[5]).to.equal(false);

                    expect(answer[0].team).to.equal("pats");
                    expect(answer[1].team).to.equal("pack");
                    expect(answer[2].team).to.equal("chiefs");
                    expect(answer[3].team).to.equal("titans");
                    expect(answer[4].team).to.equal("ravens");
                    expect(answer[5].team).to.equal("bucs");

                    teams.forEach(( team, idx ) => {
                        expect(answer[idx].rank).to.equal(teams.length - idx);
                    });
                });

            it("sorts 6 teams correctly, last team = locked & listed lowest rank",
                () => {
                    teamData = [
                        {
                            team: "chiefs",
                            spread: "6",
                            locked: false,
                            rank: null
                        },
                        {
                            team: "titans",
                            spread: "5",
                            locked: false,
                            rank: null
                        },
                        {team: "bucs", spread: "1", locked: false, rank: null},
                        {
                            team: "ravens",
                            spread: "1.5",
                            locked: false,
                            rank: null
                        },
                        {team: "pack", spread: "10", locked: false, rank: null},
                        {team: "pats", spread: "3", locked: true, rank: 1},
                    ];

                    teams2Find = Object.values(teamData).map(
                        ( team ) => team.team);

                    teams = teams
                    .filter(( team ) => teams2Find.includes(team.team))
                    .map(( team ) => {
                        teamData.forEach(( teeam ) => {
                            if (teeam.team === team.team) {
                                team.spread = teeam.spread;
                                team.locked = teeam.locked;
                                team.rank = teeam.rank;
                            }
                        });

                        return team;
                    });

                    answer = sortTeams(teams, DVOA_Obj_TESTING);

                    lockedAudit = answer.map(( user ) => user.locked);

                    expect(lockedAudit[0]).to.equal(false);
                    expect(lockedAudit[1]).to.equal(false);
                    expect(lockedAudit[2]).to.equal(false);
                    expect(lockedAudit[3]).to.equal(false);
                    expect(lockedAudit[4]).to.equal(false);
                    expect(lockedAudit[5]).to.equal(true);

                    expect(answer[0].team).to.equal("pack");
                    expect(answer[1].team).to.equal("chiefs");
                    expect(answer[2].team).to.equal("titans");
                    expect(answer[3].team).to.equal("ravens");
                    expect(answer[4].team).to.equal("bucs");
                    expect(answer[5].team).to.equal("pats");

                    teams.forEach(( team, idx ) => {
                        expect(answer[idx].rank).to.equal(teams.length - idx);
                    });
                });

            it("sorts 10 teams correctly", () => {
                teamData = [
                    {team: "browns", spread: "20", locked: true, rank: 3}, //
                    {team: "chargers", spread: "16", locked: false, rank: null}, //
                    {team: "pack", spread: "6", locked: true, rank: 1}, //
                    {team: "ravens", spread: "11", locked: false, rank: null}, //
                    {team: "rams", spread: "1", locked: false, rank: null}, //
                    {team: "bills", spread: "5", locked: false, rank: null}, //
                    {team: "colts", spread: "7.5", locked: false, rank: null}, //
                    {team: "titans", spread: "10", locked: true, rank: 8}, //
                    {team: "wash", spread: "9", locked: false, rank: null}, //
                    {team: "eagles", spread: "14.5", locked: false, rank: null}, //
                ];

                teams2Find = Object.values(teamData).map(( team ) => team.team);

                teams = teams
                .filter(( team ) => teams2Find.includes(team.team))
                .map(( team ) => {
                    teamData.forEach(( teeam ) => {
                        if (teeam.team === team.team) {
                            team.spread = teeam.spread;
                            team.locked = teeam.locked;
                            team.rank = teeam.rank;
                        }
                    });

                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit[0]).to.equal(false);
                expect(lockedAudit[1]).to.equal(false);
                expect(lockedAudit[2]).to.equal(true);
                expect(lockedAudit[3]).to.equal(false);
                expect(lockedAudit[4]).to.equal(false);
                expect(lockedAudit[5]).to.equal(false);
                expect(lockedAudit[6]).to.equal(false);
                expect(lockedAudit[7]).to.equal(true);
                expect(lockedAudit[8]).to.equal(false);
                expect(lockedAudit[9]).to.equal(true);

                expect(answer[0].team).to.equal("chargers");
                expect(answer[1].team).to.equal("eagles");
                expect(answer[2].team).to.equal("titans");
                expect(answer[3].team).to.equal("ravens");
                expect(answer[4].team).to.equal("wash");
                expect(answer[5].team).to.equal("colts");
                expect(answer[6].team).to.equal("bills");
                expect(answer[7].team).to.equal("browns");
                expect(answer[8].team).to.equal("rams");
                expect(answer[9].team).to.equal("pack");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });

            it("sorts 16 teams correctly", () => {
                teams = teams.map(( team ) => {
                    if (team.team === "bills") {
                        team.spread = "1";
                    }
                    if (team.team === "colts") {
                        team.spread = "9";
                    }
                    if (team.team === "titans") {
                        team.spread = "4";
                    }
                    if (team.team === "wash") {
                        team.spread = "5.5";
                    }
                    if (team.team === "eagles") {
                        team.spread = "10";
                        team.locked = true;
                        team.rank = 14;
                    }
                    if (team.team === "browns") {
                        team.spread = "1.5";
                    }
                    if (team.team === "ravens") {
                        team.spread = "16";
                    }
                    if (team.team === "chargers") {
                        team.spread = "15";
                    }
                    if (team.team === "pack") {
                        team.spread = "12";
                    }
                    if (team.team === "rams") {
                        team.spread = "12.5";
                    }
                    if (team.team === "chiefs") {
                        team.spread = "7";
                    }
                    if (team.team === "cards") {
                        team.spread = "14.5";
                    }
                    if (team.team === "bucs") {
                        team.spread = "20";
                        team.locked = true;
                        team.rank = 8;
                    }
                    if (team.team === "pats") {
                        team.spread = "6";
                    }
                    if (team.team === "saints") {
                        team.spread = "13";
                    }
                    if (team.team === "vikings") {
                        team.spread = "13.5";
                    }

                    return team;
                });

                answer = sortTeams(teams, DVOA_Obj_TESTING);

                lockedAudit = answer.map(( user ) => user.locked);

                expect(lockedAudit[0]).to.equal(false);
                expect(lockedAudit[1]).to.equal(false);
                expect(lockedAudit[2]).to.equal(true);
                expect(lockedAudit[3]).to.equal(false);
                expect(lockedAudit[4]).to.equal(false);
                expect(lockedAudit[5]).to.equal(false);
                expect(lockedAudit[6]).to.equal(false);
                expect(lockedAudit[7]).to.equal(false);
                expect(lockedAudit[8]).to.equal(true);
                expect(lockedAudit[9]).to.equal(false);
                expect(lockedAudit[10]).to.equal(false);
                expect(lockedAudit[11]).to.equal(false);
                expect(lockedAudit[12]).to.equal(false);
                expect(lockedAudit[13]).to.equal(false);
                expect(lockedAudit[14]).to.equal(false);
                expect(lockedAudit[15]).to.equal(false);

                expect(answer[0].team).to.equal("ravens");
                expect(answer[1].team).to.equal("chargers");
                expect(answer[2].team).to.equal("eagles");
                expect(answer[3].team).to.equal("cards");
                expect(answer[4].team).to.equal("vikings");
                expect(answer[5].team).to.equal("saints");
                expect(answer[6].team).to.equal("rams");
                expect(answer[7].team).to.equal("pack");
                expect(answer[8].team).to.equal("bucs");
                expect(answer[9].team).to.equal("colts");
                expect(answer[10].team).to.equal("chiefs");
                expect(answer[11].team).to.equal("pats");
                expect(answer[12].team).to.equal("wash");
                expect(answer[13].team).to.equal("titans");
                expect(answer[14].team).to.equal("browns");
                expect(answer[15].team).to.equal("bills");

                teams.forEach(( team, idx ) => {
                    expect(answer[idx].rank).to.equal(teams.length - idx);
                });
            });
        });

        describe("w/ dupe spreads", () => {
            describe("sorts 3 teams correctly", () => {
                beforeEach(() => {
                    teams2Find = ["bills", "colts", "titans"];

                    teams = teams.filter(
                        ( team ) => teams2Find.includes(team.team));
                });

                it("dupe spreads are locked", () => {
                    teams = teams.map(( team ) => {
                        if (team.team === "bills") {
                            team.spread = "8";
                        }
                        if (team.team === "colts") {
                            team.spread = "7";
                            team.locked = true;
                            team.rank = 2;
                        }
                        if (team.team === "titans") {
                            team.spread = "7";
                            team.locked = true;
                            team.rank = 1;
                        }
                        return team;
                    });

                    answer = sortTeams(teams, DVOA_Obj_TESTING);

                    lockedAudit = answer.map(( user ) => user.locked);

                    expect(lockedAudit[0]).to.equal(false);
                    expect(lockedAudit[1]).to.equal(true);
                    expect(lockedAudit[2]).to.equal(true);

                    expect(answer[0].team).to.equal("bills");
                    expect(answer[1].team).to.equal("colts");
                    expect(answer[2].team).to.equal("titans");

                    teams.forEach(( team, idx ) => {
                        expect(answer[idx].rank).to.equal(teams.length - idx);
                    });
                });

                it("dupe spreads are not locked, locked spread is not in between, locked is ranked last",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8";
                            }
                            if (team.team === "titans") {
                                team.spread = "8";
                            }
                            if (team.team === "colts") {
                                team.spread = "7";
                                team.locked = true;
                                team.rank = 1;
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("colts");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("dupe spreads are not locked, locked spread is not in between, locked is ranked first",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8";
                            }
                            if (team.team === "titans") {
                                team.spread = "8";
                            }
                            if (team.team === "colts") {
                                team.spread = "7";
                                team.locked = true;
                                team.rank = 3;
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);

                        expect(answer[0].team).to.equal("colts");
                        expect(answer[1].team).to.equal("bills");
                        expect(answer[2].team).to.equal("titans");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("dupe spreads are not locked, locked spread is in between, locked is ranked last",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8";
                            }
                            if (team.team === "colts") {
                                team.spread = "7";
                                team.locked = true;
                                team.rank = 1;
                            }
                            if (team.team === "titans") {
                                team.spread = "8";
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("colts");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("dupe spreads are not locked, locked spread is in between, locked is ranked first",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8";
                            }
                            if (team.team === "colts") {
                                team.spread = "7";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "titans") {
                                team.spread = "8";
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);

                        expect(answer[0].team).to.equal("colts");
                        expect(answer[1].team).to.equal("bills");
                        expect(answer[2].team).to.equal("titans");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });
            });

            describe("sorts 5 teams correctly", () => {
                beforeEach(() => {
                    teams2Find = ["bills", "colts", "titans", "pack", "ravens"];

                    teams = teams.filter(
                        ( team ) => teams2Find.includes(team.team));
                });

                it("dupe spreads are locked", () => {
                    teams = teams.map(( team ) => {
                        if (team.team === "bills") {
                            team.spread = "7.5";
                        }
                        if (team.team === "colts") {
                            team.spread = "8";
                            team.locked = true;
                            team.rank = 3;
                        }
                        if (team.team === "titans") {
                            team.spread = "8";
                            team.locked = true;
                            team.rank = 1;
                        }
                        if (team.team === "pack") {
                            team.spread = "10";
                        }
                        if (team.team === "ravens") {
                            team.spread = "6";
                        }
                        return team;
                    });

                    answer = sortTeams(teams, DVOA_Obj_TESTING);

                    lockedAudit = answer.map(( user ) => user.locked);

                    expect(lockedAudit[0]).to.equal(false);
                    expect(lockedAudit[1]).to.equal(false);
                    expect(lockedAudit[2]).to.equal(true);
                    expect(lockedAudit[3]).to.equal(false);
                    expect(lockedAudit[4]).to.equal(true);

                    expect(answer[0].team).to.equal("pack");
                    expect(answer[1].team).to.equal("bills");
                    expect(answer[2].team).to.equal("colts");
                    expect(answer[3].team).to.equal("ravens");
                    expect(answer[4].team).to.equal("titans");

                    teams.forEach(( team, idx ) => {
                        expect(answer[idx].rank).to.equal(teams.length - idx);
                    });
                });

                it("dupe spreads are not locked, locked spread is not in between, locked is ranked last",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 1;
                            }
                            if (team.team === "colts") {
                                team.spread = "7.5";
                            }
                            if (team.team === "titans") {
                                team.spread = "7.5";
                            }
                            if (team.team === "pack") {
                                team.spread = "10";
                            }
                            if (team.team === "ravens") {
                                team.spread = "10";
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);

                        expect(answer[0].team).to.equal("ravens");
                        expect(answer[1].team).to.equal("pack");
                        expect(answer[2].team).to.equal("titans");
                        expect(answer[3].team).to.equal("colts");
                        expect(answer[4].team).to.equal("bills");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("dupe spreads are not locked, locked spread is not in between, locked is ranked first",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 5;
                            }
                            if (team.team === "colts") {
                                team.spread = "7";
                            }
                            if (team.team === "titans") {
                                team.spread = "7.5";
                            }
                            if (team.team === "pack") {
                                team.spread = "10";
                            }
                            if (team.team === "ravens") {
                                team.spread = "10";
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("ravens");
                        expect(answer[2].team).to.equal("pack");
                        expect(answer[3].team).to.equal("titans");
                        expect(answer[4].team).to.equal("colts");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("dupe spreads are not locked, locked spread is in between",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "16";
                            }
                            if (team.team === "colts") {
                                team.spread = "1";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "titans") {
                                team.spread = "13.5";
                            }
                            if (team.team === "pack") {
                                team.spread = "10";
                            }
                            if (team.team === "ravens") {
                                team.spread = "10";
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(true);
                        expect(lockedAudit[4]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("ravens");
                        expect(answer[3].team).to.equal("colts");
                        expect(answer[4].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("dupe spreads are not locked, locked spread is in between",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "16";
                            }
                            if (team.team === "colts") {
                                team.spread = "10";
                            }
                            if (team.team === "titans") {
                                team.spread = "16";
                            }
                            if (team.team === "pack") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 4;
                            }
                            if (team.team === "ravens") {
                                team.spread = "13.5";
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("pack");
                        expect(answer[2].team).to.equal("titans");
                        expect(answer[3].team).to.equal("ravens");
                        expect(answer[4].team).to.equal("colts");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });
            });

            describe("sorts 10 teams correctly", () => {
                beforeEach(() => {
                    teams2Find = [
                        "bills",
                        "colts",
                        "titans",
                        "wash",
                        "eagles",
                        "browns",
                        "ravens",
                        "chargers",
                        "pack",
                        "rams",
                    ];

                    teams = teams.filter(
                        ( team ) => teams2Find.includes(team.team));
                });

                it("2+ locked w/ 1 same spread, locks are in sequetial order, no dupes in non-locked - a non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "16";
                            }
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            }
                            if (team.team === "titans") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "15";
                            }
                            if (team.team === "eagles") {
                                team.spread = "9";
                            }
                            if (team.team === "browns") {
                                team.spread = "8.5";
                            }
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 4;
                            }
                            if (team.team === "chargers") {
                                team.spread = "12";
                            }
                            if (team.team === "pack") {
                                team.spread = "2";
                            }
                            if (team.team === "rams") {
                                team.spread = "10";
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("wash");
                        expect(answer[2].team).to.equal("colts");
                        expect(answer[3].team).to.equal("chargers");
                        expect(answer[4].team).to.equal("rams");
                        expect(answer[5].team).to.equal("eagles");
                        expect(answer[6].team).to.equal("ravens");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("browns");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ 1 same spread, locks are in sequetial order, no dupes in non-locked - no non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "16";
                            }
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            }
                            if (team.team === "titans") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "15";
                            }
                            if (team.team === "eagles") {
                                team.spread = "9";
                            }
                            if (team.team === "browns") {
                                team.spread = "8.5";
                            }
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 4;
                            }
                            if (team.team === "chargers") {
                                team.spread = "12";
                            }
                            if (team.team === "pack") {
                                team.spread = "2";
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("wash");
                        expect(answer[2].team).to.equal("colts");
                        expect(answer[3].team).to.equal("chargers");
                        expect(answer[4].team).to.equal("eagles");
                        expect(answer[5].team).to.equal("browns");
                        expect(answer[6].team).to.equal("ravens");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("rams");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are in sequetial order, no dupes in non-locked, a non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "16";
                            } //10
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //6
                            if (team.team === "titans") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "15";
                            } //9
                            if (team.team === "eagles") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "browns") {
                                team.spread = "4.4";
                            } //4
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 7;
                            }
                            if (team.team === "chargers") {
                                team.spread = "10";
                            } //5
                            if (team.team === "pack") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //1
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(true);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(true);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("wash");
                        expect(answer[2].team).to.equal("eagles");
                        expect(answer[3].team).to.equal("ravens");
                        expect(answer[4].team).to.equal("colts");
                        expect(answer[5].team).to.equal("chargers");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("pack");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are in sequetial order, no dupes in non-locked, no non locked team has the same spread as the lockedd upe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "16";
                            } //10
                            if (team.team === "colts") {
                                team.spread = "13.5";
                            } //6
                            if (team.team === "titans") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "15";
                            } //9
                            if (team.team === "eagles") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "browns") {
                                team.spread = "4.4";
                            } //4
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 7;
                            }
                            if (team.team === "chargers") {
                                team.spread = "14";
                            } //5
                            if (team.team === "pack") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //1
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(true);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(true);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("wash");
                        expect(answer[2].team).to.equal("eagles");
                        expect(answer[3].team).to.equal("ravens");
                        expect(answer[4].team).to.equal("chargers");
                        expect(answer[5].team).to.equal("colts");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("pack");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ 1 same spread, locks are NOT in sequetial order, no dupes in non-locked, a non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "5";
                            } //5
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //8
                            if (team.team === "titans") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "15";
                            } //9
                            if (team.team === "eagles") {
                                team.spread = "11";
                            } //6
                            if (team.team === "browns") {
                                team.spread = "4.5";
                            } //4
                            if (team.team === "ravens") {
                                team.spread = "4";
                            } //2
                            if (team.team === "chargers") {
                                team.spread = "12";
                            } //7
                            if (team.team === "pack") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 10;
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //1
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("pack");
                        expect(answer[1].team).to.equal("wash");
                        expect(answer[2].team).to.equal("colts");
                        expect(answer[3].team).to.equal("chargers");
                        expect(answer[4].team).to.equal("eagles");
                        expect(answer[5].team).to.equal("bills");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("ravens");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ 1 same spread, locks are NOT in sequetial order, no dupes in non-locked, no non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11.5";
                            } //5
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //8
                            if (team.team === "titans") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "15";
                            } //9
                            if (team.team === "eagles") {
                                team.spread = "11";
                            } //6
                            if (team.team === "browns") {
                                team.spread = "4.5";
                            } //4
                            if (team.team === "ravens") {
                                team.spread = "4";
                            } //2
                            if (team.team === "chargers") {
                                team.spread = "12";
                            } //7
                            if (team.team === "pack") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 10;
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //1
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("pack");
                        expect(answer[1].team).to.equal("wash");
                        expect(answer[2].team).to.equal("colts");
                        expect(answer[3].team).to.equal("chargers");
                        expect(answer[4].team).to.equal("bills");
                        expect(answer[5].team).to.equal("eagles");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("ravens");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are NOT in sequetial order, a dupe spread exists for non-locked teams, a non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //7 and 6
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //9
                            if (team.team === "titans") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //7 and 6
                            if (team.team === "eagles") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 10;
                            }
                            if (team.team === "browns") {
                                team.spread = "8";
                            } //5
                            if (team.team === "ravens") {
                                team.spread = "4";
                            } //4
                            if (team.team === "chargers") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "pack") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 1;
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //2
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(true);

                        expect(answer[0].team).to.equal("eagles");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("chargers");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("wash");
                        expect(answer[5].team).to.equal("browns");
                        expect(answer[6].team).to.equal("ravens");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("rams");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are NOT in sequetial order, a dupes in non-locked, no non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //7 and 6
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //9
                            if (team.team === "titans") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //7 and 6
                            if (team.team === "eagles") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 10;
                            }
                            if (team.team === "browns") {
                                team.spread = "3.5";
                            } //5
                            if (team.team === "ravens") {
                                team.spread = "4";
                            } //4
                            if (team.team === "chargers") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "pack") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 1;
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //2
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(true);

                        expect(answer[0].team).to.equal("eagles");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("chargers");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("wash");
                        expect(answer[5].team).to.equal("ravens");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("rams");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are NOT in sequetial order, no dupes in non-locked, a non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //8
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //9
                            if (team.team === "titans") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "5";
                            } //6
                            if (team.team === "eagles") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 10;
                            }
                            if (team.team === "browns") {
                                team.spread = "8";
                            } //7
                            if (team.team === "ravens") {
                                team.spread = "4";
                            } //4
                            if (team.team === "chargers") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 5;
                            }
                            if (team.team === "pack") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 1;
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //2
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(true);

                        expect(answer[0].team).to.equal("eagles");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("bills");
                        expect(answer[3].team).to.equal("browns");
                        expect(answer[4].team).to.equal("wash");
                        expect(answer[5].team).to.equal("chargers");
                        expect(answer[6].team).to.equal("ravens");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("rams");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are NOT in sequetial order, no dupes in non-locked, no non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //8
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //9
                            if (team.team === "titans") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "wash") {
                                team.spread = "5";
                            } //7
                            if (team.team === "eagles") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 10;
                            }
                            if (team.team === "browns") {
                                team.spread = "1";
                            } //2
                            if (team.team === "ravens") {
                                team.spread = "4";
                            } //6
                            if (team.team === "chargers") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 5;
                            }
                            if (team.team === "pack") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 1;
                            }
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //4
                            return team;
                        });
                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(true);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(true);

                        expect(answer[0].team).to.equal("eagles");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("bills");
                        expect(answer[3].team).to.equal("wash");
                        expect(answer[4].team).to.equal("ravens");
                        expect(answer[5].team).to.equal("chargers");
                        expect(answer[6].team).to.equal("rams");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("browns");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ 1 same spread, no dupes in locked, a non locked team has the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //7-5-4
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //10
                            if (team.team === "titans") {
                                team.spread = "12";
                            } //8
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //7-5-4
                            if (team.team === "eagles") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "browns") {
                                team.spread = "11";
                            } //7-5-4
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //3
                            if (team.team === "chargers") {
                                team.spread = "5";
                            } //2
                            if (team.team === "pack") {
                                team.spread = "13";
                            } //9
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //1
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("colts");
                        expect(answer[1].team).to.equal("pack");
                        expect(answer[2].team).to.equal("titans");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("eagles");
                        expect(answer[5].team).to.equal("browns");
                        expect(answer[6].team).to.equal("wash");
                        expect(answer[7].team).to.equal("ravens");
                        expect(answer[8].team).to.equal("chargers");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ 1 same spread, no dupes in locked, no non-locked team has the same spread as the locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //7-5-4
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //10
                            if (team.team === "titans") {
                                team.spread = "12";
                            } //8
                            if (team.team === "wash") {
                                team.spread = "2";
                            } //1
                            if (team.team === "eagles") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "browns") {
                                team.spread = "11";
                            } //7-5-4
                            if (team.team === "ravens") {
                                team.spread = "11";
                            } //7-5-4
                            if (team.team === "chargers") {
                                team.spread = "9.5";
                            } //3
                            if (team.team === "pack") {
                                team.spread = "13";
                            } //9
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //2
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("colts");
                        expect(answer[1].team).to.equal("pack");
                        expect(answer[2].team).to.equal("titans");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("eagles");
                        expect(answer[5].team).to.equal("ravens");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("chargers");
                        expect(answer[8].team).to.equal("rams");
                        expect(answer[9].team).to.equal("wash");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread for 2 diff spreads, no dupes in locked, a non locked team has the same spread as the locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //8-7-5
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //10
                            if (team.team === "titans") {
                                team.spread = "12";
                            } //9
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //8-7-5
                            if (team.team === "eagles") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "browns") {
                                team.spread = "11";
                            } //8-7-5
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //3-2
                            if (team.team === "chargers") {
                                team.spread = "9";
                            } //3-2
                            if (team.team === "pack") {
                                team.spread = "2";
                            } //1
                            if (team.team === "rams") {
                                team.spread = "10";
                            } //4
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("colts");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("bills");
                        expect(answer[3].team).to.equal("browns");
                        expect(answer[4].team).to.equal("eagles");
                        expect(answer[5].team).to.equal("wash");
                        expect(answer[6].team).to.equal("rams");
                        expect(answer[7].team).to.equal("ravens");
                        expect(answer[8].team).to.equal("chargers");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread for 2 diff spreads, no dupes in locked, no non locked team has the same spread as the locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //8-7-5
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //10
                            if (team.team === "titans") {
                                team.spread = "12";
                            } //9
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //8-7-5
                            if (team.team === "eagles") {
                                team.spread = "5";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "browns") {
                                team.spread = "11";
                            } //8-7-5
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //4-3
                            if (team.team === "chargers") {
                                team.spread = "9";
                            } //4-3
                            if (team.team === "pack") {
                                team.spread = "2";
                            } //2
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //1
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ 1 same spread, no dupes in locked, a non locked team has the same spread as the locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //7-6
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //10
                            if (team.team === "titans") {
                                team.spread = "12";
                            } //9
                            if (team.team === "wash") {
                                team.spread = "11.5";
                            } //8
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "browns") {
                                team.spread = "8.5";
                            } //4
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //5
                            if (team.team === "chargers") {
                                team.spread = "11";
                            } //7-6
                            if (team.team === "pack") {
                                team.spread = "2";
                            } //1
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //3
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(true);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("colts");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("wash");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("chargers");
                        expect(answer[5].team).to.equal("ravens");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("rams");
                        expect(answer[8].team).to.equal("eagles");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ 1 same spread, no dupes in locked, no non locked team has the same spread as the locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "11";
                            } //7-6
                            if (team.team === "colts") {
                                team.spread = "14.5";
                            } //10
                            if (team.team === "titans") {
                                team.spread = "12";
                            } //9
                            if (team.team === "wash") {
                                team.spread = "11.5";
                            } //8
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "browns") {
                                team.spread = "8";
                            } //4
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //5
                            if (team.team === "chargers") {
                                team.spread = "11";
                            } //7-6
                            if (team.team === "pack") {
                                team.spread = "2";
                            } //1
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //3
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(true);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("colts");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("wash");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("chargers");
                        expect(answer[5].team).to.equal("ravens");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("rams");
                        expect(answer[8].team).to.equal("eagles");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread for 2 diff spreads, no dupes in locked, a non locked team has the same spread as the locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "16";
                            } //10-9-8
                            if (team.team === "colts") {
                                team.spread = "1.5";
                            } //1
                            if (team.team === "titans") {
                                team.spread = "16";
                            } //10-9-8
                            if (team.team === "wash") {
                                team.spread = "8.5";
                            } //6-5
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "browns") {
                                team.spread = "8";
                            } //4
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //7
                            if (team.team === "chargers") {
                                team.spread = "8.5";
                            } //6-5
                            if (team.team === "pack") {
                                team.spread = "2";
                            } //3
                            if (team.team === "rams") {
                                team.spread = "16";
                            } //10-9-8
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(true);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("rams");
                        expect(answer[3].team).to.equal("ravens");
                        expect(answer[4].team).to.equal("wash");
                        expect(answer[5].team).to.equal("chargers");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("pack");
                        expect(answer[8].team).to.equal("eagles");
                        expect(answer[9].team).to.equal("colts");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread for 2 diff spreads, no non locked team has the same spread as the locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "16";
                            } //10-9-7
                            if (team.team === "colts") {
                                team.spread = "1.5";
                            } //1
                            if (team.team === "titans") {
                                team.spread = "16";
                            } //10-9-7
                            if (team.team === "wash") {
                                team.spread = "7";
                            } //4-3
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "browns") {
                                team.spread = "8";
                            } //5
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //6
                            if (team.team === "chargers") {
                                team.spread = "7";
                            } //4-3
                            if (team.team === "pack") {
                                team.spread = "2";
                            } //2
                            if (team.team === "rams") {
                                team.spread = "16";
                            } //10-9-7
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("eagles");
                        expect(answer[3].team).to.equal("rams");
                        expect(answer[4].team).to.equal("ravens");
                        expect(answer[5].team).to.equal("browns");
                        expect(answer[6].team).to.equal("wash");
                        expect(answer[7].team).to.equal("chargers");
                        expect(answer[8].team).to.equal("pack");
                        expect(answer[9].team).to.equal("colts");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ 1 same spread, locks are in sequetial order, dupes for non-locked too, non locked teams have the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "4";
                            } //2
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 7;
                            }
                            if (team.team === "titans") {
                                team.spread = "16";
                            } //10
                            if (team.team === "wash") {
                                team.spread = "7";
                            } //3
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "browns") {
                                team.spread = "8.5";
                            } //9-5
                            if (team.team === "ravens") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "chargers") {
                                team.spread = "7.5";
                            } //4
                            if (team.team === "pack") {
                                team.spread = "8.5";
                            } //9-5
                            if (team.team === "rams") {
                                team.spread = "1";
                            } //1
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(true);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("titans");
                        expect(answer[1].team).to.equal("browns");
                        expect(answer[2].team).to.equal("ravens");
                        expect(answer[3].team).to.equal("colts");
                        expect(answer[4].team).to.equal("eagles");
                        expect(answer[5].team).to.equal("pack");
                        expect(answer[6].team).to.equal("chargers");
                        expect(answer[7].team).to.equal("wash");
                        expect(answer[8].team).to.equal("bills");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ 1 same spread, locks are in sequetial order, dupes for non-locked too, non locked teams have diff dupe spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "4";
                            } //5
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "titans") {
                                team.spread = "16";
                            } //10
                            if (team.team === "wash") {
                                team.spread = "7";
                            } //6
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 4;
                            }
                            if (team.team === "browns") {
                                team.spread = "15";
                            } //9-8
                            if (team.team === "ravens") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "chargers") {
                                team.spread = "7.5";
                            } //7
                            if (team.team === "pack") {
                                team.spread = "15";
                            } //9-8
                            if (team.team === "rams") {
                                team.spread = "1";
                            } //1
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(true);
                        expect(lockedAudit[8]).to.equal(true);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("titans");
                        expect(answer[1].team).to.equal("browns");
                        expect(answer[2].team).to.equal("pack");
                        expect(answer[3].team).to.equal("chargers");
                        expect(answer[4].team).to.equal("wash");
                        expect(answer[5].team).to.equal("bills");
                        expect(answer[6].team).to.equal("eagles");
                        expect(answer[7].team).to.equal("colts");
                        expect(answer[8].team).to.equal("ravens");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ 1 same spread, locks are NOT sequetial order, dupes for non-locked too, non locked teams have the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "4";
                            } //3
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 9;
                            }
                            if (team.team === "titans") {
                                team.spread = "8.5";
                            } //8-7
                            if (team.team === "wash") {
                                team.spread = "7";
                            } //5
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 4;
                            }
                            if (team.team === "browns") {
                                team.spread = "8.5";
                            } //8-7
                            if (team.team === "ravens") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 1;
                            }
                            if (team.team === "chargers") {
                                team.spread = "7.5";
                            } //6
                            if (team.team === "pack") {
                                team.spread = "15";
                            } //10
                            if (team.team === "rams") {
                                team.spread = "1";
                            } //2
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(true);

                        expect(answer[0].team).to.equal("pack");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("browns");
                        expect(answer[3].team).to.equal("titans");
                        expect(answer[4].team).to.equal("chargers");
                        expect(answer[5].team).to.equal("wash");
                        expect(answer[6].team).to.equal("eagles");
                        expect(answer[7].team).to.equal("bills");
                        expect(answer[8].team).to.equal("rams");
                        expect(answer[9].team).to.equal("ravens");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ 1 same spread, locks are NOT sequetial order, dupes for non-locked too, non locked teams have diff spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "4";
                            } //3
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 9;
                            }
                            if (team.team === "titans") {
                                team.spread = "6";
                            } //6-5
                            if (team.team === "wash") {
                                team.spread = "7";
                            } //8
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 4;
                            }
                            if (team.team === "browns") {
                                team.spread = "6";
                            } //6-5
                            if (team.team === "ravens") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 1;
                            }
                            if (team.team === "chargers") {
                                team.spread = "7.5";
                            } //7
                            if (team.team === "pack") {
                                team.spread = "15";
                            } //10
                            if (team.team === "rams") {
                                team.spread = "1";
                            } //2
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(true);

                        expect(answer[0].team).to.equal("pack");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("chargers");
                        expect(answer[3].team).to.equal("wash");
                        expect(answer[4].team).to.equal("browns");
                        expect(answer[5].team).to.equal("titans");
                        expect(answer[6].team).to.equal("eagles");
                        expect(answer[7].team).to.equal("bills");
                        expect(answer[8].team).to.equal("rams");
                        expect(answer[9].team).to.equal("ravens");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are in NOT sequetial order, dupes for non-locked too, non locked teams have the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "4";
                            } //2
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 9;
                            }
                            if (team.team === "titans") {
                                team.spread = "8.5";
                            } //7-5
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //8
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 4;
                            }
                            if (team.team === "browns") {
                                team.spread = "8.5";
                            } //7-5
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "chargers") {
                                team.spread = "7.5";
                            } //3
                            if (team.team === "pack") {
                                team.spread = "15";
                            } //10
                            if (team.team === "rams") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 1;
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(true);

                        expect(answer[0].team).to.equal("pack");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("wash");
                        expect(answer[3].team).to.equal("browns");
                        expect(answer[4].team).to.equal("ravens");
                        expect(answer[5].team).to.equal("titans");
                        expect(answer[6].team).to.equal("eagles");
                        expect(answer[7].team).to.equal("chargers");
                        expect(answer[8].team).to.equal("bills");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are in NOT sequetial order, dupes for non-locked too, non locked teams have diff spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "4";
                            } //2
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 9;
                            }
                            if (team.team === "titans") {
                                team.spread = "16";
                            } //10-8
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //5
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 4;
                            }
                            if (team.team === "browns") {
                                team.spread = "16";
                            } //10-8
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "chargers") {
                                team.spread = "7.5";
                            } //3
                            if (team.team === "pack") {
                                team.spread = "15";
                            } //7
                            if (team.team === "rams") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 1;
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(true);

                        expect(answer[0].team).to.equal("browns");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("titans");
                        expect(answer[3].team).to.equal("pack");
                        expect(answer[4].team).to.equal("ravens");
                        expect(answer[5].team).to.equal("wash");
                        expect(answer[6].team).to.equal("eagles");
                        expect(answer[7].team).to.equal("chargers");
                        expect(answer[8].team).to.equal("bills");
                        expect(answer[9].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are in sequetial order, dupes for non-locked too, non locked teams have the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8.5";
                            } //2-1
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 9;
                            }
                            if (team.team === "titans") {
                                team.spread = "16";
                            } //10
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //7
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "browns") {
                                team.spread = "8.5";
                            } //2-1
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 5;
                            }
                            if (team.team === "chargers") {
                                team.spread = "10";
                            } //6-3
                            if (team.team === "pack") {
                                team.spread = "10";
                            } //6-3
                            if (team.team === "rams") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 4;
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("titans");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("eagles");
                        expect(answer[3].team).to.equal("wash");
                        expect(answer[4].team).to.equal("pack");
                        expect(answer[5].team).to.equal("ravens");
                        expect(answer[6].team).to.equal("rams");
                        expect(answer[7].team).to.equal("chargers");
                        expect(answer[8].team).to.equal("bills");
                        expect(answer[9].team).to.equal("browns");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are in sequetial order, dupes for non-locked too, non locked teams have diff spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "14";
                            } //10
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 9;
                            }
                            if (team.team === "titans") {
                                team.spread = "11";
                            } //7-6
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //7-6
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "browns") {
                                team.spread = "8";
                            } //3
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 5;
                            }
                            if (team.team === "chargers") {
                                team.spread = "1";
                            } //2-1
                            if (team.team === "pack") {
                                team.spread = "1";
                            } //2-1
                            if (team.team === "rams") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 4;
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        // teams2Audit = ["titans", "wash", "pack", "chargers"];
                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("bills");
                        expect(answer[1].team).to.equal("colts");
                        expect(answer[2].team).to.equal("eagles");
                        expect(answer[3].team).to.equal("wash");
                        expect(answer[4].team).to.equal("titans");
                        expect(answer[5].team).to.equal("ravens");
                        expect(answer[6].team).to.equal("rams");
                        expect(answer[7].team).to.equal("browns");
                        expect(answer[8].team).to.equal("pack");
                        expect(answer[9].team).to.equal("chargers");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are NOT in sequetial order, dupes for non-locked too, non locked teams have the same spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8.5";
                            } //5-3
                            if (team.team === "colts") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "titans") {
                                team.spread = "8.5";
                            } //5-3
                            if (team.team === "wash") {
                                team.spread = "11";
                            } //10
                            if (team.team === "eagles") {
                                team.spread = "8.5";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "browns") {
                                team.spread = "10";
                            } //9-7
                            if (team.team === "ravens") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "chargers") {
                                team.spread = "10";
                            } //9-7
                            if (team.team === "pack") {
                                team.spread = "1";
                            } //1
                            if (team.team === "rams") {
                                team.spread = "10";
                                team.locked = true;
                                team.rank = 4;
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(true);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("wash");
                        expect(answer[1].team).to.equal("browns");
                        expect(answer[2].team).to.equal("eagles");
                        expect(answer[3].team).to.equal("chargers");
                        expect(answer[4].team).to.equal("ravens");
                        expect(answer[5].team).to.equal("bills");
                        expect(answer[6].team).to.equal("rams");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("colts");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ locked w/ same spread for 2 diff spreads, locks are NOT in sequetial order, dupes for non-locked too, non locked teams have diff spread as the locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "bills") {
                                team.spread = "8.5";
                            }
                            if (team.team === "colts") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 2;
                            }
                            if (team.team === "titans") {
                                team.spread = "8.5";
                            }
                            if (team.team === "wash") {
                                team.spread = "11";
                            }
                            if (team.team === "eagles") {
                                team.spread = "8";
                                team.locked = true;
                                team.rank = 8;
                            }
                            if (team.team === "browns") {
                                team.spread = "10";
                            }
                            if (team.team === "ravens") {
                                team.spread = "4";
                                team.locked = true;
                                team.rank = 6;
                            }
                            if (team.team === "chargers") {
                                team.spread = "10";
                            }
                            if (team.team === "pack") {
                                team.spread = "1";
                            }
                            if (team.team === "rams") {
                                team.spread = "4";
                                team.locked = true;
                                team.rank = 4;
                            }
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(true);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(true);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(true);
                        expect(lockedAudit[9]).to.equal(false);

                        expect(answer[0].team).to.equal("wash");
                        expect(answer[1].team).to.equal("browns");
                        expect(answer[2].team).to.equal("eagles");
                        expect(answer[3].team).to.equal("chargers");
                        expect(answer[4].team).to.equal("ravens");
                        expect(answer[5].team).to.equal("bills");
                        expect(answer[6].team).to.equal("rams");
                        expect(answer[7].team).to.equal("titans");
                        expect(answer[8].team).to.equal("colts");
                        expect(answer[9].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });
            });

            describe("sorts 16 teams correctly", () => {
                it("2+ non-locked w/ same spread, only 1 team = locked, locked team has the same spread as the non-locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "chiefs") {
                                team.spread = "16";
                            } //16
                            if (team.team === "eagles") {
                                team.spread = "9";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //12-11-10
                            if (team.team === "browns") {
                                team.spread = "15";
                            } //15
                            if (team.team === "pack") {
                                team.spread = "1";
                            } //1
                            if (team.team === "titans") {
                                team.spread = "9";
                            } //12-11-10
                            if (team.team === "colts") {
                                team.spread = "6";
                            } //6
                            if (team.team === "vikings") {
                                team.spread = "7";
                            } //7
                            if (team.team === "wash") {
                                team.spread = "7.5";
                            } //8
                            if (team.team === "saints") {
                                team.spread = "9";
                            } //12-11-10
                            if (team.team === "bills") {
                                team.spread = "8";
                            } //9
                            if (team.team === "pats") {
                                team.spread = "12.5";
                            } //13
                            if (team.team === "bucs") {
                                team.spread = "14";
                            } //14
                            if (team.team === "cards") {
                                team.spread = "5";
                            } //5
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //2
                            if (team.team === "chargers") {
                                team.spread = "4";
                            } //4
                            return team;
                        });

                        answer = sortTeams(teams, (str = DVOA_Obj_TESTING));

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);
                        expect(lockedAudit[10]).to.equal(false);
                        expect(lockedAudit[11]).to.equal(false);
                        expect(lockedAudit[12]).to.equal(false);
                        expect(lockedAudit[13]).to.equal(true);
                        expect(lockedAudit[14]).to.equal(false);
                        expect(lockedAudit[15]).to.equal(false);

                        expect(answer[0].team).to.equal("chiefs");
                        expect(answer[1].team).to.equal("browns");
                        expect(answer[2].team).to.equal("bucs");
                        expect(answer[3].team).to.equal("pats");
                        expect(answer[4].team).to.equal("ravens");
                        expect(answer[5].team).to.equal("titans");
                        expect(answer[6].team).to.equal("saints");
                        expect(answer[7].team).to.equal("bills");
                        expect(answer[8].team).to.equal("wash");
                        expect(answer[9].team).to.equal("vikings");
                        expect(answer[10].team).to.equal("colts");
                        expect(answer[11].team).to.equal("cards");
                        expect(answer[12].team).to.equal("chargers");
                        expect(answer[13].team).to.equal("eagles");
                        expect(answer[14].team).to.equal("rams");
                        expect(answer[15].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread, only 1 team = locked, locked team has diff spread as the non-locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "chiefs") {
                                team.spread = "16";
                            } //16
                            if (team.team === "eagles") {
                                team.spread = "6.5";
                                team.locked = true;
                                team.rank = 3;
                            }
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //12-11-10
                            if (team.team === "browns") {
                                team.spread = "15";
                            } //15
                            if (team.team === "pack") {
                                team.spread = "1";
                            } //1
                            if (team.team === "titans") {
                                team.spread = "9";
                            } //12-11-10
                            if (team.team === "colts") {
                                team.spread = "6";
                            } //6
                            if (team.team === "vikings") {
                                team.spread = "7";
                            } //7
                            if (team.team === "wash") {
                                team.spread = "7.5";
                            } //8
                            if (team.team === "saints") {
                                team.spread = "9";
                            } //12-11-10
                            if (team.team === "bills") {
                                team.spread = "8";
                            } //9
                            if (team.team === "pats") {
                                team.spread = "12.5";
                            } //13
                            if (team.team === "bucs") {
                                team.spread = "14";
                            } //14
                            if (team.team === "cards") {
                                team.spread = "5";
                            } //5
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //2
                            if (team.team === "chargers") {
                                team.spread = "4";
                            } //4
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(false);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);
                        expect(lockedAudit[10]).to.equal(false);
                        expect(lockedAudit[11]).to.equal(false);
                        expect(lockedAudit[12]).to.equal(false);
                        expect(lockedAudit[13]).to.equal(true);
                        expect(lockedAudit[14]).to.equal(false);
                        expect(lockedAudit[15]).to.equal(false);

                        expect(answer[0].team).to.equal("chiefs");
                        expect(answer[1].team).to.equal("browns");
                        expect(answer[2].team).to.equal("bucs");
                        expect(answer[3].team).to.equal("pats");
                        expect(answer[4].team).to.equal("ravens");
                        expect(answer[5].team).to.equal("titans");
                        expect(answer[6].team).to.equal("saints");
                        expect(answer[7].team).to.equal("bills");
                        expect(answer[8].team).to.equal("wash");
                        expect(answer[9].team).to.equal("vikings");
                        expect(answer[10].team).to.equal("colts");
                        expect(answer[11].team).to.equal("cards");
                        expect(answer[12].team).to.equal("chargers");
                        expect(answer[13].team).to.equal("eagles");
                        expect(answer[14].team).to.equal("rams");
                        expect(answer[15].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread for 2 diff spreads, only 1 team = locked, locked team has the same spread as the non-locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "chiefs") {
                                team.spread = "7.5";
                            } //8-7
                            if (team.team === "eagles") {
                                team.spread = "7.5";
                                team.locked = true;
                                team.rank = 11;
                            }
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //13-12-10
                            if (team.team === "browns") {
                                team.spread = "15";
                            } //16
                            if (team.team === "pack") {
                                team.spread = "1";
                            } //1
                            if (team.team === "titans") {
                                team.spread = "9";
                            } //13-12-10
                            if (team.team === "colts") {
                                team.spread = "6";
                            } //5
                            if (team.team === "vikings") {
                                team.spread = "7";
                            } //6
                            if (team.team === "wash") {
                                team.spread = "7.5";
                            } //8-7
                            if (team.team === "saints") {
                                team.spread = "9";
                            } //13-12-10
                            if (team.team === "bills") {
                                team.spread = "8";
                            } //9
                            if (team.team === "pats") {
                                team.spread = "12.5";
                            } //14
                            if (team.team === "bucs") {
                                team.spread = "14";
                            } //15
                            if (team.team === "cards") {
                                team.spread = "5";
                            } //4
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //2
                            if (team.team === "chargers") {
                                team.spread = "4";
                            } //3
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);
                        expect(lockedAudit[10]).to.equal(false);
                        expect(lockedAudit[11]).to.equal(false);
                        expect(lockedAudit[12]).to.equal(false);
                        expect(lockedAudit[13]).to.equal(false);
                        expect(lockedAudit[14]).to.equal(false);
                        expect(lockedAudit[15]).to.equal(false);

                        expect(answer[0].team).to.equal("browns");
                        expect(answer[1].team).to.equal("bucs");
                        expect(answer[2].team).to.equal("pats");
                        expect(answer[3].team).to.equal("ravens");
                        expect(answer[4].team).to.equal("titans");
                        expect(answer[5].team).to.equal("eagles");
                        expect(answer[6].team).to.equal("saints");
                        expect(answer[7].team).to.equal("bills");
                        expect(answer[8].team).to.equal("chiefs");
                        expect(answer[9].team).to.equal("wash");
                        expect(answer[10].team).to.equal("vikings");
                        expect(answer[11].team).to.equal("colts");
                        expect(answer[12].team).to.equal("cards");
                        expect(answer[13].team).to.equal("chargers");
                        expect(answer[14].team).to.equal("rams");
                        expect(answer[15].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread for 2 diff spreads, only 1 team = locked, locked team has diff spread as the non-locked dupe spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "chiefs") {
                                team.spread = "7.5";
                            } //8-7
                            if (team.team === "eagles") {
                                team.spread = "18";
                                team.locked = true;
                                team.rank = 11;
                            }
                            if (team.team === "ravens") {
                                team.spread = "9";
                            } //13-12-10
                            if (team.team === "browns") {
                                team.spread = "15";
                            } //16
                            if (team.team === "pack") {
                                team.spread = "1";
                            } //1
                            if (team.team === "bucs") {
                                team.spread = "9";
                            } //13-12-10
                            if (team.team === "colts") {
                                team.spread = "6";
                            } //5
                            if (team.team === "vikings") {
                                team.spread = "7";
                            } //6
                            if (team.team === "wash") {
                                team.spread = "7.5";
                            } //8-7
                            if (team.team === "saints") {
                                team.spread = "9";
                            } //13-12-10
                            if (team.team === "bills") {
                                team.spread = "8";
                            } //9
                            if (team.team === "pats") {
                                team.spread = "12.5";
                            } //14
                            if (team.team === "titans") {
                                team.spread = "14";
                            } //15
                            if (team.team === "cards") {
                                team.spread = "5";
                            } //4
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //2
                            if (team.team === "chargers") {
                                team.spread = "4";
                            } //3
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(false);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(false);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);
                        expect(lockedAudit[10]).to.equal(false);
                        expect(lockedAudit[11]).to.equal(false);
                        expect(lockedAudit[12]).to.equal(false);
                        expect(lockedAudit[13]).to.equal(false);
                        expect(lockedAudit[14]).to.equal(false);
                        expect(lockedAudit[15]).to.equal(false);

                        expect(answer[0].team).to.equal("browns");
                        expect(answer[1].team).to.equal("titans");
                        expect(answer[2].team).to.equal("pats");
                        expect(answer[3].team).to.equal("ravens");
                        expect(answer[4].team).to.equal("bucs");
                        expect(answer[5].team).to.equal("eagles");
                        expect(answer[6].team).to.equal("saints");
                        expect(answer[7].team).to.equal("bills");
                        expect(answer[8].team).to.equal("chiefs");
                        expect(answer[9].team).to.equal("wash");
                        expect(answer[10].team).to.equal("vikings");
                        expect(answer[11].team).to.equal("colts");
                        expect(answer[12].team).to.equal("cards");
                        expect(answer[13].team).to.equal("chargers");
                        expect(answer[14].team).to.equal("rams");
                        expect(answer[15].team).to.equal("pack");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread, 2+ teams = locked, but with diff spreads for each lock, one of the locked spreads is the same as the dupe non-locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "chiefs") {
                                team.spread = "7.5";
                            } //10-9
                            if (team.team === "eagles") {
                                team.spread = "2";
                                team.locked = true;
                                team.rank = 11;
                            }
                            if (team.team === "ravens") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "browns") {
                                team.spread = "15";
                            } //16
                            if (team.team === "pack") {
                                team.spread = "18";
                                team.locked = true;
                                team.rank = 15;
                            }
                            if (team.team === "titans") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "colts") {
                                team.spread = "6";
                            } //7
                            if (team.team === "vikings") {
                                team.spread = "7";
                            } //8
                            if (team.team === "wash") {
                                team.spread = "7.5";
                            } //10-9
                            if (team.team === "bills") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "saints") {
                                team.spread = "8";
                            } //13
                            if (team.team === "pats") {
                                team.spread = "10.5";
                                team.locked = true;
                                team.rank = 12;
                            }
                            if (team.team === "bucs") {
                                team.spread = "14";
                            } //14
                            if (team.team === "cards") {
                                team.spread = "5";
                            } //6
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //4
                            if (team.team === "chargers") {
                                team.spread = "4";
                            } //5
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);
                        expect(lockedAudit[10]).to.equal(false);
                        expect(lockedAudit[11]).to.equal(false);
                        expect(lockedAudit[12]).to.equal(false);
                        expect(lockedAudit[13]).to.equal(false);
                        expect(lockedAudit[14]).to.equal(false);
                        expect(lockedAudit[15]).to.equal(false);

                        expect(answer[0].team).to.equal("browns");
                        expect(answer[1].team).to.equal("pack");
                        expect(answer[2].team).to.equal("bucs");
                        expect(answer[3].team).to.equal("saints");
                        expect(answer[4].team).to.equal("pats");
                        expect(answer[5].team).to.equal("eagles");
                        expect(answer[6].team).to.equal("chiefs");
                        expect(answer[7].team).to.equal("wash");
                        expect(answer[8].team).to.equal("vikings");
                        expect(answer[9].team).to.equal("colts");
                        expect(answer[10].team).to.equal("cards");
                        expect(answer[11].team).to.equal("chargers");
                        expect(answer[12].team).to.equal("rams");
                        expect(answer[13].team).to.equal("bills");
                        expect(answer[14].team).to.equal("ravens");
                        expect(answer[15].team).to.equal("titans");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread, 2+ teams = locked, but with diff spreads for each lock, locked spreads are diff from the dupe non-locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "browns") {
                                team.spread = "7.5";
                            } //10-9
                            if (team.team === "eagles") {
                                team.spread = "16.5";
                                team.locked = true;
                                team.rank = 11;
                            }
                            if (team.team === "ravens") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "chiefs") {
                                team.spread = "15";
                            } //16
                            if (team.team === "pack") {
                                team.spread = "18";
                                team.locked = true;
                                team.rank = 15;
                            }
                            if (team.team === "titans") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "colts") {
                                team.spread = "6";
                            } //7
                            if (team.team === "vikings") {
                                team.spread = "7";
                            } //8
                            if (team.team === "wash") {
                                team.spread = "7.5";
                            } //10-9
                            if (team.team === "saints") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "bills") {
                                team.spread = "8";
                            } //13
                            if (team.team === "pats") {
                                team.spread = "10.5";
                                team.locked = true;
                                team.rank = 12;
                            }
                            if (team.team === "bucs") {
                                team.spread = "14";
                            } //14
                            if (team.team === "cards") {
                                team.spread = "5";
                            } //6
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //4
                            if (team.team === "chargers") {
                                team.spread = "4";
                            } //5
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);
                        expect(lockedAudit[10]).to.equal(false);
                        expect(lockedAudit[11]).to.equal(false);
                        expect(lockedAudit[12]).to.equal(false);
                        expect(lockedAudit[13]).to.equal(false);
                        expect(lockedAudit[14]).to.equal(false);
                        expect(lockedAudit[15]).to.equal(false);

                        expect(answer[0].team).to.equal("chiefs");
                        expect(answer[1].team).to.equal("pack");
                        expect(answer[2].team).to.equal("bucs");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("pats");
                        expect(answer[5].team).to.equal("eagles");
                        expect(answer[6].team).to.equal("browns");
                        expect(answer[7].team).to.equal("wash");
                        expect(answer[8].team).to.equal("vikings");
                        expect(answer[9].team).to.equal("colts");
                        expect(answer[10].team).to.equal("cards");
                        expect(answer[11].team).to.equal("chargers");
                        expect(answer[12].team).to.equal("rams");
                        expect(answer[13].team).to.equal("ravens");
                        expect(answer[14].team).to.equal("titans");
                        expect(answer[15].team).to.equal("saints");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread for 2 diff spreads, 2+ teams = locked, but with diff spreads for each lock, one of the locked spreads is the same as the dupe non-locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "chiefs") {
                                team.spread = "7.5";
                            } //10-9
                            if (team.team === "eagles") {
                                team.spread = "7.5";
                                team.locked = true;
                                team.rank = 11;
                            }
                            if (team.team === "ravens") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "browns") {
                                team.spread = "15";
                            } //16
                            if (team.team === "pack") {
                                team.spread = "18";
                                team.locked = true;
                                team.rank = 15;
                            }
                            if (team.team === "titans") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "colts") {
                                team.spread = "6";
                            } //7
                            if (team.team === "saints") {
                                team.spread = "7";
                            } //8
                            if (team.team === "wash") {
                                team.spread = "7.5";
                            } //10-9
                            if (team.team === "vikings") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "bills") {
                                team.spread = "8";
                            } //13
                            if (team.team === "pats") {
                                team.spread = "10.5";
                                team.locked = true;
                                team.rank = 12;
                            }
                            if (team.team === "bucs") {
                                team.spread = "14";
                            } //14
                            if (team.team === "cards") {
                                team.spread = "5";
                            } //6
                            if (team.team === "rams") {
                                team.spread = "3";
                            } //4
                            if (team.team === "chargers") {
                                team.spread = "4";
                            } //5
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);
                        expect(lockedAudit[10]).to.equal(false);
                        expect(lockedAudit[11]).to.equal(false);
                        expect(lockedAudit[12]).to.equal(false);
                        expect(lockedAudit[13]).to.equal(false);
                        expect(lockedAudit[14]).to.equal(false);
                        expect(lockedAudit[15]).to.equal(false);

                        expect(answer[0].team).to.equal("browns");
                        expect(answer[1].team).to.equal("pack");
                        expect(answer[2].team).to.equal("bucs");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("pats");
                        expect(answer[5].team).to.equal("eagles");
                        expect(answer[6].team).to.equal("chiefs");
                        expect(answer[7].team).to.equal("wash");
                        expect(answer[8].team).to.equal("saints");
                        expect(answer[9].team).to.equal("colts");
                        expect(answer[10].team).to.equal("cards");
                        expect(answer[11].team).to.equal("chargers");
                        expect(answer[12].team).to.equal("rams");
                        expect(answer[13].team).to.equal("ravens");
                        expect(answer[14].team).to.equal("titans");
                        expect(answer[15].team).to.equal("vikings");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });

                it("2+ non-locked w/ same spread for 2 diff spreads, 2+ teams = locked, but with diff spreads for each lock, locked spreads are diff from the dupe non-locked spread",
                    () => {
                        teams = teams.map(( team ) => {
                            if (team.team === "chiefs") {
                                team.spread = "7.5";
                            } //10-9
                            if (team.team === "ravens") {
                                team.spread = "1.5";
                                team.locked = true;
                                team.rank = 11;
                            }
                            if (team.team === "eagles") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "browns") {
                                team.spread = "15";
                            } //16
                            if (team.team === "pack") {
                                team.spread = "18";
                                team.locked = true;
                                team.rank = 15;
                            }
                            if (team.team === "titans") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "colts") {
                                team.spread = "6";
                            } //7
                            if (team.team === "vikings") {
                                team.spread = "7";
                            } //8
                            if (team.team === "wash") {
                                team.spread = "7.5";
                            } //10-9
                            if (team.team === "rams") {
                                team.spread = "2";
                            } //3-2-1
                            if (team.team === "bills") {
                                team.spread = "8";
                            } //13
                            if (team.team === "pats") {
                                team.spread = "10.5";
                                team.locked = true;
                                team.rank = 12;
                            }
                            if (team.team === "bucs") {
                                team.spread = "14";
                            } //14
                            if (team.team === "cards") {
                                team.spread = "5";
                            } //6
                            if (team.team === "saints") {
                                team.spread = "3";
                            } //4
                            if (team.team === "chargers") {
                                team.spread = "4";
                            } //5
                            return team;
                        });

                        answer = sortTeams(teams, DVOA_Obj_TESTING);

                        lockedAudit = answer.map(( user ) => user.locked);

                        expect(lockedAudit[0]).to.equal(false);
                        expect(lockedAudit[1]).to.equal(true);
                        expect(lockedAudit[2]).to.equal(false);
                        expect(lockedAudit[3]).to.equal(false);
                        expect(lockedAudit[4]).to.equal(true);
                        expect(lockedAudit[5]).to.equal(true);
                        expect(lockedAudit[6]).to.equal(false);
                        expect(lockedAudit[7]).to.equal(false);
                        expect(lockedAudit[8]).to.equal(false);
                        expect(lockedAudit[9]).to.equal(false);
                        expect(lockedAudit[10]).to.equal(false);
                        expect(lockedAudit[11]).to.equal(false);
                        expect(lockedAudit[12]).to.equal(false);
                        expect(lockedAudit[13]).to.equal(false);
                        expect(lockedAudit[14]).to.equal(false);
                        expect(lockedAudit[15]).to.equal(false);

                        expect(answer[0].team).to.equal("browns");
                        expect(answer[1].team).to.equal("pack");
                        expect(answer[2].team).to.equal("bucs");
                        expect(answer[3].team).to.equal("bills");
                        expect(answer[4].team).to.equal("pats");
                        expect(answer[5].team).to.equal("ravens");
                        expect(answer[6].team).to.equal("chiefs");
                        expect(answer[7].team).to.equal("wash");
                        expect(answer[8].team).to.equal("vikings");
                        expect(answer[9].team).to.equal("colts");
                        expect(answer[10].team).to.equal("cards");
                        expect(answer[11].team).to.equal("chargers");
                        expect(answer[12].team).to.equal("saints");
                        expect(answer[13].team).to.equal("eagles");
                        expect(answer[14].team).to.equal("titans");
                        expect(answer[15].team).to.equal("rams");

                        teams.forEach(( team, idx ) => {
                            expect(answer[idx].rank).to.equal(
                                teams.length - idx);
                        });
                    });
            });
        });
    });
});
