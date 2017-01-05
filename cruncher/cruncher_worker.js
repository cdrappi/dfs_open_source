window = this;
void 0 === window.document && importScripts("o.min.js");
var randomness = !1,
    normalize = !1;

function xb(f) {
    for (var t = leagueConst.sort, q = JSON.parse(JSON.stringify(leagueConst.rosterspots)), g = [], a = 0, u = f.players.length; a < u; ++a) {
        var A = JSON.parse(JSON.stringify(pl[f.players[a]]));
        g[a] = A
    }
    if ("NFL" == league || "CFL" == league || "NHL" == league || "NBA" == league && "draftkings" != site && "yahoo" != site && "fcdraft" != site)
        for (g.sort(function(a, c) {
                return (new Date(a.DateTime.replace(/-/g, "/"))).getTime() - (new Date(c.DateTime.replace(/-/g, "/"))).getTime()
            }), a = 0, u = g.length; a < u; ++a) q[g[a].PlayerPos].min--, 0 > q[g[a].PlayerPos].min &&
            (g[a].PlayerPos = "FLEX");
    if ("NBA" == league && ("draftkings" == site || "yahoo" == site || "fcdraft" == site))
        for (g.sort(function(a, c) {
                return (new Date(a.DateTime.replace(/-/g, "/"))).getTime() - (new Date(c.DateTime.replace(/-/g, "/"))).getTime()
            }), a = 0, u = g.length; a < u; ++a) A = g[a], 0 < A.PlayerPos.indexOf("/") && (A.PlayerPos = A.PlayerPos.split("/")[f.playersOptionalPos[A.PlayerId]]), q[A.PlayerPos].count--, 0 > q[A.PlayerPos].count && (A = A.PlayerPos[1] || null, "undefined" != typeof q[A] && 0 < q[A].count ? (q[A].count--, g[a].PlayerPos = A) :
            g[a].PlayerPos = "FLEX");
    g.sort(function(a, c) {
        return a.PlayerPos == c.PlayerPos ? c.Proj_Score - a.Proj_Score : t.indexOf(a.PlayerPos) - t.indexOf(c.PlayerPos)
    });
    g.sort(function(a, c) {
        aPlayerPos = a.PlayerPos;
        bPlayerPos = c.PlayerPos;
        0 < aPlayerPos.indexOf("/") && (aPlayerPos = aPlayerPos.split("/")[f.playersOptionalPos[a.PlayerId]]);
        0 < bPlayerPos.indexOf("/") && (bPlayerPos = bPlayerPos.split("/")[f.playersOptionalPos[c.PlayerId]]);
        return t.indexOf(aPlayerPos) - t.indexOf(bPlayerPos)
    });
    return g
}

function yb() {
    var f = team;
    Math.random().toString(36).substring(7);
    for (var t = "", t = "", q = "== FantasyCruncher Lineup ==\n", g = "== FantasyCruncher Lineup ==\n", a = {
            Proj_Score: 0,
            Default_Proj_Score: 0,
            Proj_Floor: 0,
            Proj_Ceiling: 0,
            Salary: 0,
            Actual_Pts: 0,
            Avg_Pts: 0,
            Price_Per_Point: 0,
            trueValue: 0
        }, u = xb(f), A = 0, Oa = u.length; A < Oa; ++A) {
        var c = u[A],
            fa = c.PlayerId,
            q = q + (c.PlayerPos + "\t" + c.PlayerName + "\t" + c.Proj_Score + "\t" + c.Salary + "\n"),
            g = g + (c.PlayerPos + "\t" + c.PlayerName + "\n");
        a.Proj_Score += parseFloat(c.Proj_Score) || 0;
        a.Default_Proj_Score +=
            parseFloat(c.Default_Proj_Score) || 0;
        a.Proj_Floor += parseFloat(c.Proj_Floor) || 0;
        a.Proj_Ceiling += parseFloat(c.Proj_Ceiling) || 0;
        a.Actual_Pts += parseFloat(c.Actual_Pts) || 0;
        a.Avg_Pts += parseFloat(c.Avg_Pts) || 0;
        a.Salary += parseInt(c.Salary) || 0;
        a.Price_Per_Point += parseInt(c.Price_Per_Point) || 0;
        a.trueValue += parseInt(c.trueValue) || 0;
        var k = "",
            ga = "",
            ga = c.Team == c.HomeTeam ? "vs " + c.AwayTeam : "@ " + c.HomeTeam;
        "" != c.Status && (k = '<span title="' + c.StatusDetails + '" class="status"><i class="fa fa-plus"></i></span>');
        var Ha =
            c.locked ? '<i class="fa fa-lock player-lock on" data-playerid="' + fa + '"></i>' : '<i class="fa fa-unlock-alt player-lock" data-playerid="' + fa + '"></i>',
            sa = '<i class="fa-close fa fa-lg remove-player-from-pool" data-playerid="' + fa + '"></i>',
            Q = "",
            M = "",
            H = "";
        "MLB" == league && (Q = "P" == c.PlayerPos ? '<div class="div-table-col Order">SP<i class="fa fa-circle confirmed" title="Confirmed Batting Order"></i></div>' : null != c.batting_order ? '<div class="div-table-col Order">' + c.batting_order + '<i class="fa fa-circle confirmed" title="Confirmed Batting Order"></i></div>' :
            '<div class="div-table-col Order">' + c.Last_batting_order + '<i class="fa fa-circle projected" title="Projected Batting Order"></i></div>', M += '<div class="div-table-col Order">Ord</div>', H += '<div class="div-table-col Order"></div>');
        "NHL" == league && (Q = "G" == c.PlayerPos ? "1" == c.depth ? '<div class="div-table-col Status"><i class="fa fa-circle confirmed" title="Confirmed Starting Goalie"></i></div>' : '<div class="div-table-col Status"><i class="fa fa-circle projected" title="Probable Starting Goalie"></i></div>' :
            '<div class="div-table-col Status">' + c.Line + "/" + (null == c.pp_unit ? "" : c.pp_unit) + "</div>", M += '<div class="div-table-col Status">Line/PP</div>', H += '<div class="div-table-col Status"></div>');
        "NAS" == league && (M += '<div class="div-table-col Status">Start</div><div class="div-table-col Status">Odds</div>', Q = '<div class="div-table-col Status">' + c.NAS_start + '</div><div class="div-table-col Status">' + c.NAS_odds + "</div>", H += '<div class="div-table-col Status"></div><div class="div-table-col Status"></div>');
        "MMA" ==
        league && (M += '<div class="div-table-col Status">Fight</div><div class="div-table-col Status">Odds</div>', Q = '<div class="div-table-col Status">' + c.fightnumber + '</div><div class="div-table-col Status">' + c.NAS_odds + "</div>", H += '<div class="div-table-col Status"></div><div class="div-table-col Status"></div>');
        t += '<div class="div-table-row ' + league + "_" + c.Team + '" data-playerid="' + fa + '"><div class="div-table-col PlayerPos">' + c.PlayerPos + '</div><div class="div-table-col PlayerName"><div class="teamIcon ' +
            league + "_" + c.Team + '"></div><span class="teamName">' + k + '<span class="playerName player-stats" data-playerid="' + fa + '">' + c.PlayerName + "</span></span></div>" + Q + '<div class="div-table-col opponent">' + ga + '</div><div class="div-table-col Proj_Floor">' + c.Proj_Floor + '</div><div class="div-table-col Proj_Ceiling">' + c.Proj_Ceiling + '</div><div class="div-table-col Avg_Pts">' + c.Avg_Pts + '</div><div class="div-table-col Default_Proj_Score">' + c.Default_Proj_Score + '</div><div class="div-table-col Proj_Score">' + c.Proj_Score +
            '</div><div class="div-table-col Actual_Pts">' + c.Actual_Pts + '</div><div class="div-table-col Salary">' + c.Salary + '</div><div class="div-table-col Price_Per_Point">' + c.Price_Per_Point + '</div><div class="div-table-col non_removable">' + sa + Ha + "</div></div>"
    }
    shareMenu = '<div class="lineup-action-menu"><ul><li class="share-lineup-img"><i class="fa fa-share-alt"></i>Share as Image</li><li class="copy-lineup-txt" data-txt="' + g + '" onclick="doCopyTeamText(this)"><i class="fa fa-copy"></i><span>Copy as simple text</span></li><li class="copy-lineup-txt" data-txt="' +
        q + '" onclick="doCopyTeamText(this)"><i class="fa fa-copy"></i><span>Copy as full text</span></li></ul></div>';
    M = '<div class="div-table player-card-table"><div class="div-table-head"><div class="div-table-col PlayerPos">Pos</div><div class="div-table-col PlayerName">Player</div>' + M + '<div class="div-table-col opponent">Opp</div><div class="div-table-col Proj_Floor">Floor</div><div class="div-table-col Proj_Ceiling">Ceiling</div><div class="div-table-col Avg_Pts">Avg</div><div class="div-table-col Default_Proj_Score">FcProj</div><div class="div-table-col Proj_Score">MyProj</div><div class="div-table-col Actual_Pts">Actual</div><div class="div-table-col Salary">Salary</div><div class="div-table-col Price_Per_Point">Value</div><div class="div-table-col non_removable config-header-th"><i class="fa fa-cog columns-config" title="configure columns"></i><div class="col-config"></div></div></div>';
    H = '<div class="div-table-foot"><div class="div-table-col span2">Totals</div>' + H + '<div class="div-table-col opponent"></div><div class="div-table-col Proj_Floor">' + a.Proj_Floor.toFixed(2) + '</div><div class="div-table-col Proj_Ceiling">' + a.Proj_Ceiling.toFixed(2) + '</div><div class="div-table-col Avg_Pts">' + a.Avg_Pts.toFixed(2) + '</div><div class="div-table-col Default_Proj_Score">' + a.Default_Proj_Score.toFixed(2) + '</div><div class="div-table-col Proj_Score">' + a.Proj_Score.toFixed(2) + '</div><div class="div-table-col Actual_Pts">' +
        a.Actual_Pts.toFixed(2) + '</div><div class="div-table-col Salary">' + a.Salary + '</div><div class="div-table-col Price_Per_Point"></div><div class="div-table-col non_removable"></div><div class="original-order hidden">' + f.n + "</div></div></div>";
    return t = '<div class="team-card" data-teamid="' + f.id + '"><div class="team-card-title" data-site="' + site + '"><span class="lineup-menu save" title="Save Lineup"><i class="fa fa-floppy-o"></i></span><span class="lineup-menu delete" title="Delete Lineup" data-file=""><i class="fa fa-trash"></i></span><span class="lineup-menu share" title="Share Lineup"><i class="fa fa-share-square"></i></span><span class="team-card-score">#' +
        f.n + " " + {
            Proj_Score: "My Projected",
            Default_Proj_Score: "FC Projected",
            Proj_Floor: "Highest Floor",
            Proj_Ceiling: "Highest Ceiling",
            Actual_Pts: "Actual Score",
            Avg_Pts: "Highest Average",
            Price_Per_Point: "Highest Value",
            trueValue: "Highest True Value"
        }[f.objective] + " " + a[f.objective].toFixed(2) + '</span><span class="team-card-salary">$' + a.Salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span><span class="team-card-selector"><i class="fa fa-check"></i></span></div>' + shareMenu + M + t + H + '<div class="card-footer clearfix"><span class="team-card-id" contentEditable spellcheck="false">' +
        site + "_" + f.n + '</span><img class="card-footer-logo" src="/img/logo_149x20.png"></div></div>'
}

function calcTeams(f, t, q, g, a, u, A, Oa, c, fa) {
    function k(a, d) {
        d = d || 1;
        if (0 != d && pl.hasOwnProperty(a)) {
            var c = pl[a],
                J = c.PlayerId;
            return 0 < c.PlayerPos.indexOf("/") ? 1 == d ? "+p" + J + "__0+p" + J + "__1" : 0 < d ? "+" + d + "p" + J + "__0+" + d + "p" + J + "__1" : d + "p" + J + "__0" + d + "p" + J + "__1" : 1 == d ? "+p" + J : 0 < d ? "+" + d + "p" + J : d + "p" + J
        }
        return ""
    }

    function ga(a) {
        var d;
        d = d || 1;
        return 1 == d ? "+p" + a : 0 < d ? "+" + d + "p" + a : d + "p" + a
    }

    function Ha(a) {
        var d = a.indexOf("_"),
            c = a.indexOf("_", d + 1);
        return 0 > d || 0 > c || d + 1 == c ? a : a.substring(0, c)
    }

    function sa() {
        for (var a = "", a = "undefined" !=
                typeof min && 1 == min ? "min\n" : "max\n", d = 0, c = u.length; d < c; ++d) {
            var J = u[d],
                r = pl[J],
                b = parseFloat(r[q]);
            1 == normalize && "undefined" != typeof r.Salary && (b = parseInt(r.Salary) / 1E3 * 2);
            1 == randomness && (b = parseFloat((b * (Math.floor(Math.random() * randomPct * 2 + 1) / 100 + (100 - randomPct) / 100)).toFixed(2)));
            "Actual_Pts" != q && (b += b * r.liked * .08);
            a += k(J, b)
        }
        return a
    }

    function Q(a, d, c, J, r, b) {
        var f = "";
        randomness ? f = sa() : a.hasOwnProperty("o") ? f = a.o : (f = sa(), a.o = f);
        for (var f = f + a.l + a.m, m = a.e, g = a.g, k = "\nbound\n", u = 0, x = d.length; u < x; ++u) {
            var D =
                d[u],
                A = pl[D],
                q = 0,
                C = A.exposure,
                t = m[D];
            if (A.locked) q = 1;
            else if ("group" == b && 1 > C) {
                if (0 >= C || (t + 1) / r > C && 0 < t) q = 2
            } else "each" == b && 1 > C && 0 < J && (0 >= C || t / J > C) && (q = 2);
            if (0 < A.PlayerPos.indexOf("/")) switch (q) {
                case 0:
                case 1:
                    k += "0<=p" + D + "__0<=1\n0<=p" + D + "__1<=1\n";
                    break;
                case 2:
                    k += "p" + D + "__0=0\np" + D + "__1=0\n"
            } else switch (q) {
                case 0:
                    k += "0<=p" + D + "<=1\n";
                    break;
                case 1:
                    k += "p" + D + "=1\n";
                    break;
                case 2:
                    k += "p" + D + "=0\n"
            }
        }
        d = 0;
        m = Object.keys(g);
        for (x = m.length; d < x; ++d) {
            u = g[Ha(m[d])];
            q = 0;
            t = u.c;
            C = u.l;
            if ("group" == b && 1 > C) {
                if (0 >= C || (t + 1) /
                    (r - c) > C && 0 < t) q = 1
            } else "each" == b && 1 > C && 0 < J - c && (0 >= C || t / (J - c) > C) && (q = 1);
            C = 0;
            for (t = u.k.length; C < t; ++C) k = 1 == q ? k + (u.k[C] + "=0\n") : k + ("0<=" + u.k[C] + "<=1\n")
        }
        return f + k + a.r
    }

    function M(a, d, c) {
        var f = a.m,
            r = d.players.length - 1;
        1 < g && (r = d.players.length - g);
        for (var b = "", u = 0, m = 0, q = d.players.length; m < q; ++m) {
            var t = k(d.players[m]);
            0 < t.length && (b += t, u++)
        }
        a.m = f + (u > r ? b + "<=" + r + "\n" : "");
        if (-1 != d.visible)
            for (f = 0, r = d.players.length; f < r; ++f) b = d.players[f], a.e.hasOwnProperty(b) ? a.e[b]++ : a.e[b] = 1;
        f = 0;
        for (r = c.length; f < r; ++f) d = Ha(c[f]),
            a.g.hasOwnProperty(d) && a.g[d].c++
    }

    function H(c, d, f, k) {
        var r = Q(k, u, c, d, f, A);
        "undefined" !== typeof showProblem && 1 == showProblem && console.log(r);
        var b, t = {};
        b = glp_create_prob();
        glp_read_lp_from_string(b, null, r);
        glp_scale_prob(b, GLP_SF_AUTO);
        r = new SMCP({
            b: GLP_ON
        });
        glp_simplex(b, r);
        glp_intopt(b);
        for (r = 1; r <= glp_get_num_cols(b); r++) 0 != glp_mip_col_val(b, r) && (t[glp_get_col_name(b, r)] = glp_mip_col_val(b, r));
        b = null;
        d++;
        team = {
            players: [],
            n: d,
            playersOptionalPos: {},
            rdmId: a,
            objective: q,
            visible: 1
        };
        team.id = a + "_" + team.n;
        team_groups = [];
        r = 0;
        b = Object.keys(t);
        for (t = b.length; r < t; ++r) {
            var m = b[r];
            if (0 == m.indexOf("g")) team_groups.push(m);
            else if (0 < m.indexOf("__")) {
                var g = m.substring(0, m.length - 3).substring(1);
                team.players.push(g);
                team.playersOptionalPos[g] = m.slice(-1)
            } else team.players.push(m.substring(1))
        }
        if (0 == team.players.length) return d--, r = 0 == d ? "Could not find any teams under the salary cap with the selected players.\n\nYou may not have enough players selected or you may have too many players locked." : "Could only find " +
            d + " teams possible with given constraints.", void 0 !== window.document ? (swal("", r, "warning"), stopCalculation()) : window.postMessage({
                error: r,
                rdmId: a
            }), !1;
        M(k, team, team_groups);
        team.html = yb();
        void 0 !== window.document ? (addTeamCard(team), d < f ? setTimeout(function() {
            H(c, d, f, k)
        }, 300) : markFinished(a)) : window.postMessage({
            team: team,
            rdmId: a
        });
        return !0
    }
    var Y = function() {
        for (var a, d = "\nst\n", f = "\ngen\n", q = [], r = "", b = 0, g = Object.keys(pstacks), m = g.length; b < m; ++b) q.push(pstacks[g[b]]);
        for (var A = stacks, H = [], Q = "", x = {},
                D = 0, ha = Object.keys(A), Y = ha.length; D < Y; ++D) {
            var C = A[ha[D]],
                Da = C.stackSize,
                ea = C.teams;
            if (1 > Object.keys(ea).length) console.log("empty stack");
            else {
                var ta = {};
                C.hasOwnProperty("value_restrictions") && (ta = C.value_restrictions);
                var R = [];
                C.hasOwnProperty("position_restrictions") && (R = C.position_restrictions);
                for (var ua = {
                        groups: [],
                        comp: ">=",
                        limit: 1
                    }, aa = 0, ba = 0, sa = Object.keys(ea), Xa = sa.length; ba < Xa; ++ba) {
                    var Na = ea[sa[ba]],
                        T = Na.team,
                        ia = parseFloat(Na.exposure);
                    isNaN(ia) && (ia = 1);
                    var Ya = !1;
                    if (ta.hasOwnProperty("Line"))
                        for (var Ya = !0, va = 0, Za = ta.Line.length; va < Za; ++va) {
                            var ib = ta.Line[va],
                                K = T + "__l" + ib,
                                U = ba + "_" + aa,
                                ja = "g" + D + "_" + U;
                            if (!x.hasOwnProperty(K)) {
                                for (var ka = T.split(","), jb = {
                                        a: [],
                                        players: []
                                    }, N = 0, Ia = ka.length; N < Ia; ++N) {
                                    var la = ka[N];
                                    if (playerlistByTeam.hasOwnProperty(la)) {
                                        var V = playerlistByTeam[la];
                                        if (V.selected)
                                            for (var E = 0, W = V.players.length; E < W; ++E) {
                                                var y = V.players[E];
                                                pl.hasOwnProperty(y) && pl[y].Line == ib && jb.players.push(y)
                                            }
                                    }
                                }
                                x[K] = jb
                            }
                            if (0 < x[K].players.length)
                                if (1 > R.length) ua.groups.push({
                                    id: "" + U,
                                    players: x[K].players,
                                    comp: ">=",
                                    limit: Da,
                                    mExp: ia
                                }), x[K].a.push(ja), ++aa;
                                else {
                                    for (var O = [], E = 0, W = x[K].players.length; E < W; ++E)
                                        if (y = x[K].players[E], 0 < pl[y].PlayerPos.indexOf("/")) {
                                            var ma = pl[y].PlayerPos.split("/");
                                            (0 <= R.indexOf(ma[0]) || 0 <= R.indexOf(ma[1])) && O.push(y)
                                        } else 0 <= R.indexOf(pl[y].PlayerPos) && O.push(y);
                                    0 < O.length && (ua.groups.push({
                                        id: "" + U,
                                        players: O,
                                        comp: ">=",
                                        limit: Da,
                                        mExp: ia
                                    }), x[K].a.push(ja), ++aa)
                                }
                        }
                    if (ta.hasOwnProperty("pp_unit"))
                        for (Ya = !0, va = 0, Za = ta.pp_unit.length; va < Za; ++va) {
                            var kb = ta.pp_unit[va],
                                K = T + "__p" + kb,
                                U = ba + "_" +
                                aa,
                                ja = "g" + D + "_" + U;
                            if (!x.hasOwnProperty(K)) {
                                for (var ka = T.split(","), lb = {
                                        a: [],
                                        players: []
                                    }, N = 0, Ia = ka.length; N < Ia; ++N)
                                    if (la = ka[N], playerlistByTeam.hasOwnProperty(la) && (V = playerlistByTeam[la], V.selected))
                                        for (E = 0, W = V.players.length; E < W; ++E) y = V.players[E], pl.hasOwnProperty(y) && pl[y].pp_unit == kb && lb.players.push(y);
                                x[K] = lb
                            }
                            if (0 < x[K].players.length)
                                if (1 > R.length) ua.groups.push({
                                    id: "" + U,
                                    players: x[K].players,
                                    comp: ">=",
                                    limit: Da,
                                    mExp: ia
                                }), x[K].a.push(ja), ++aa;
                                else {
                                    O = [];
                                    E = 0;
                                    for (W = x[K].players.length; E < W; ++E) y =
                                        x[K].players[E], 0 < pl[y].PlayerPos.indexOf("/") ? (ma = pl[y].PlayerPos.split("/"), (0 <= R.indexOf(ma[0]) || 0 <= R.indexOf(ma[1])) && O.push(y)) : 0 <= R.indexOf(pl[y].PlayerPos) && O.push(y);
                                    0 < O.length && (ua.groups.push({
                                        id: "" + U,
                                        players: O,
                                        comp: ">=",
                                        limit: Da,
                                        mExp: ia
                                    }), x[K].a.push(ja), ++aa)
                                }
                        }
                    if (!Ya) {
                        U = aa;
                        ja = "g" + D + "_" + U;
                        if (x.hasOwnProperty(T)) x[T].a.push(ja);
                        else {
                            for (var ka = T.split(","), mb = {
                                    a: [ja],
                                    players: []
                                }, N = 0, Ia = ka.length; N < Ia; ++N)
                                if (la = ka[N], playerlistByTeam.hasOwnProperty(la) && (V = playerlistByTeam[la], V.selected))
                                    for (E =
                                        0, W = V.players.length; E < W; ++E) y = V.players[E], pl.hasOwnProperty(y) && "P" != pl[y].PlayerPos && mb.players.push(y);
                            x[T] = mb
                        }
                        if (1 > R.length) ua.groups.push({
                            id: "" + U,
                            players: x[T].players,
                            comp: ">=",
                            limit: Da,
                            mExp: ia
                        }), ++aa;
                        else {
                            O = [];
                            E = 0;
                            for (W = x[T].players.length; E < W; ++E) y = x[T].players[E], 0 < pl[y].PlayerPos.indexOf("/") ? (ma = pl[y].PlayerPos.split("/"), (0 <= R.indexOf(ma[0]) || 0 <= R.indexOf(ma[1])) && O.push(y)) : 0 <= R.indexOf(pl[y].PlayerPos) && O.push(y);
                            0 < O.length && (ua.groups.push({
                                    id: "" + U,
                                    players: O,
                                    comp: ">=",
                                    limit: Da,
                                    mExp: ia
                                }),
                                ++aa)
                        }
                    }
                }
                H.push(ua)
            }
        }
        for (var na = {}, D = 0, ha = Object.keys(x), Y = ha.length; D < Y; ++D) {
            var S = ha[D];
            if (!(0 >= x[S].players.length)) {
                var nb = x[S].a,
                    N = S.indexOf("__");
                0 <= N && (S = S.substring(0, N));
                na.hasOwnProperty(S) ? na[S] = na[S].concat(nb) : na[S] = nb
            }
        }
        D = 0;
        ha = Object.keys(na);
        for (Y = ha.length; D < Y; ++D)
            if (S = ha[D], 1 < na[S].length) {
                ba = 0;
                for (Xa = na[S].length; ba < Xa; ++ba) Q += "+" + na[S][ba];
                Q += "<=1\n"
            }
        a = Q;
        b = 0;
        for (m = H.length; b < m; ++b) q.push(H[b]);
        for (var r = a, oa = {}, b = 0, ob = leagueConst.real_positions, m = ob.length; b < m; ++b) oa[ob[b]] = "";
        if ("PGA" !=
            league && "EURO" != league && "NAS" != league)
            for (var Pa = "", b = 0, g = Object.keys(playerlistByTeam), m = g.length; b < m; ++b) {
                var Ea = g[b],
                    L = playerlistByTeam[Ea];
                if (L.selected && 1 > L.max) {
                    L.selected = !1;
                    for (var h = 0, I = L.players.length; h < I; ++h) {
                        var p = L.players[h],
                            pb = u.indexOf(p); - 1 < pb && u.splice(pb, 1);
                        delete pl[p]
                    }
                }
            }
        for (var Qa = "", Ra = "", Sa = "", $a = 0, m = u.length; $a < m; ++$a) {
            var p = u[$a],
                Fa = pl[p],
                Qa = Qa + k(p, Fa.Salary),
                Sa = Sa + k(p);
            if (0 < Fa.PlayerPos.indexOf("/")) {
                var f = f + ("p" + p + "__0\np" + p + "__1\n"),
                    ab = ga(p + "__0") + ga(p + "__1"),
                    Ra = Fa.locked ?
                    Ra + (ab + "<=1\n" + ab + ">=1\n") : Ra + (ab + "<=1\n"),
                    Ta = Fa.PlayerPos.split("/");
                oa[Ta[0]] += ga(p + "__0");
                oa[Ta[1]] += ga(p + "__1")
            } else f += "p" + p + "\n", oa[Fa.PlayerPos] += ga(p)
        }
        var d = d + Ra,
            qb = "",
            qb = Sa + "<=" + leagueConst.player_count + "\n" + Sa + ">=" + leagueConst.player_count + "\n",
            d = d + qb,
            bb = "";
        "" == c && (c = leagueConst.salarycap);
        var bb = bb + (Qa + "<=" + c + "\n"),
            d = d + bb,
            cb = "";
        "" != Oa && (cb += Qa + ">=" + Oa + "\n");
        for (var d = d + cb, wa = "", rb = leagueConst.rosterspots, b = 0, g = Object.keys(rb), m = g.length; b < m; ++b) {
            for (var sb = g[b], ca = rb[sb], xa = "", h = 0, I = ca.Positions.length; h <
                I; ++h) xa += oa[ca.Positions[h]];
            if (1 > xa.length)
                if (0 == ca.min) continue;
                else {
                    var ya = "Not enough players to fill position '" + sb + "'. This is either from player pool restrictions or max players per team restrictions";
                    return {
                        error: ya
                    }
                }
            ca.min == ca.max ? wa += xa + "<=" + ca.min + "\n" + xa + ">=" + ca.min + "\n" : (wa += xa + ">=" + ca.min + "\n", wa += xa + "<=" + ca.max + "\n")
        }
        d += wa;
        if ("PGA" != league && "EURO" != league && "NAS" != league) {
            Pa = "";
            b = 0;
            g = Object.keys(playerlistByTeam);
            for (m = g.length; b < m; ++b) {
                var Ea = g[b],
                    L = playerlistByTeam[Ea],
                    pa = "",
                    Ga = "";
                if (L.selected) {
                    L.avoidOpposingPlayer && pl.hasOwnProperty(L.opposingPlayer) && pl[L.opposingPlayer].gameSelected && "undefined" != typeof fa && (pa += k(L.opposingPlayer, L.max - fa));
                    h = 0;
                    for (I = L.players.length; h < I; ++h) p = L.players[h], !pl.hasOwnProperty(p) || "draftkings" == site && "P" == pl[p].PlayerPos || (pa += k(p), 0 < L.min && (Ga += k(p)));
                    "" != pa && (pa += "<=" + L.max + "\n");
                    "" != Ga && (Ga += ">=" + L.min + "\n");
                    Pa += pa + Ga
                }
            }
            d += Pa
        }
        if ("draftkings" == site && "NBA" == league) {
            for (var za = "", tb = 0, Aa = 0, b = 0, m = games.length; b < m; ++b) {
                var db = games[b].HomeTeam,
                    eb = games[b].AwayTeam,
                    fb = !1,
                    qa = !1;
                if (playerlistByTeam.hasOwnProperty(db))
                    for (h = 0, I = playerlistByTeam[db].players.length; h < I; ++h) p = playerlistByTeam[db].players[h], pl.hasOwnProperty(p) && (qa = fb = !0, za += k(p));
                qa && Aa++;
                qa = !1;
                if (playerlistByTeam.hasOwnProperty(eb))
                    for (h = 0, I = playerlistByTeam[eb].players.length; h < I; ++h) p = playerlistByTeam[eb].players[h], pl.hasOwnProperty(p) && (qa = fb = !0, za += k(p));
                qa && Aa++;
                fb && (za += "<=" + (leagueConst.player_count - 1) + "\n", tb++)
            }
            if (2 > tb) return ya = "Draftkings NBA requires that you have players from at least two games. Please add more players to your pool.", {
                error: ya
            };
            7 > Aa && (d += za)
        }
        if ("draftkings" == site && "NHL" == league) {
            for (var ub = {
                    groups: [],
                    comp: ">=",
                    limit: 3
                }, b = Aa = 0, g = Object.keys(playerlistByTeam), m = g.length; b < m; ++b) {
                for (var Ea = g[b], qa = !1, vb = [], h = 0, I = playerlistByTeam[Ea].players.length; h < I; ++h) p = playerlistByTeam[Ea].players[h], pl.hasOwnProperty(p) && (qa = !0, vb.push(p));
                qa && (ub.groups.push({
                    id: "" + b,
                    players: vb,
                    comp: ">=",
                    limit: 1
                }), Aa++)
            }
            if (3 > Aa) return ya = "Draftkings NHL requires that you have players from at least three games. Please add more players to your pool.", {
                error: ya
            };
            (0 < q.length || 7 > Aa) && q.push(ub)
        }
        for (var Ba = "", b = 0, g = Object.keys(groups), m = g.length; b < m; ++b) {
            var z = groups[g[b]];
            if (1 == z.active && ("undefined" === typeof z.type || "posStack" != z.type)) {
                var Z = "",
                    w = 0;
                null == z.keyPlayer ? w = 1 : null == z.keyPlayer || "=>" != z.constraint && ">=" != z.constraint ? null != z.keyPlayer && "<=" == z.constraint && (w = 1) : w = -1;
                if (0 != w)
                    for (h = 0, I = z.players.length; h < I; ++h) p = z.players[h], Z += k(p, w);
                else console.log("unhandled group:"), console.log(z);
                null == z.keyPlayer ? "" != Z && (Ba += Z + z.constraint + z.constraintNumber +
                    "\n") : null == z.keyPlayer || "=>" != z.constraint && ">=" != z.constraint ? null != z.keyPlayer && "<=" == z.constraint && ("" == Z && (Z = "+p0"), pl.hasOwnProperty(z.keyPlayer) && (Ba += k(z.keyPlayer, (z.players.length - parseInt(z.constraintNumber)).toString()) + Z + z.constraint + z.players.length.toString() + "\n")) : ("" == Z && (Z = "+p0"), pl.hasOwnProperty(z.keyPlayer) && (Ba += k(z.keyPlayer, z.constraintNumber) + Z + "<=0\n"))
            }
        }
        for (var d = d + Ba, gb = "", b = 0, m = posse.length; b < m; ++b) {
            var Ja = posse[b];
            if (pl.hasOwnProperty(Ja.key)) {
                for (var Ka = k(Ja.key, Ja.teammates_needed),
                        h = 0, I = Ja.teammates.length; h < I; ++h) p = Ja.teammates[h], pl.hasOwnProperty(p) && (Ka += k(p, -1));
                Ka += "<=0\n";
                gb += Ka
            }
        }
        for (var d = d + gb, hb = "", La = {}, b = 0, m = q.length; b < m; ++b) {
            var F = q[b];
            "=" == F.comp && 0 == F.limit && (F.comp = "<=");
            if (1 > F.groups.length) console.log("empty stack");
            else {
                var Ua = {},
                    l = "";
                if (1 != F.groups.length || ">=" != F.comp && "=" != F.comp || 1 != F.limit || !("" == F.groups[0].id || 0 > r.indexOf("g" + b + "_" + F.groups[0].id))) {
                    h = 0;
                    for (I = F.groups.length; h < I; ++h)
                        if (v = "", e = F.groups[h], ">=" != e.comp || 0 != e.limit) {
                            B = G = 0;
                            for (X = e.players.length; B <
                                X; ++B) p = e.players[B], pl.hasOwnProperty(p) && (w = 1, e.hasOwnProperty("w") && B < e.w.length && (w = e.w[B]), G++, v += k(p, w));
                            if (!("<=" == e.comp && e.limit >= G || "!<=" == e.comp && e.limit >= G))
                                if ("" == e.id)
                                    if (e.hasOwnProperty("keys")) {
                                        B = 0;
                                        for (X = e.keys.length; B < X; ++B) Ua["$" + e.keys[B]] = {};
                                        if ("=" == e.comp) {
                                            for (var Va = "", Wa = "", zb = -e.limit, Ab = G - e.limit, B = 0, X = e.keys.length; B < X; ++B) var ra = e.keys[B],
                                                Va = Va + k(ra, zb),
                                                Wa = Wa + k(ra, Ab);
                                            0 < Va.length && (l += v + Va + ">=0\n");
                                            0 < Wa.length && e.limit < G && (l += v + Wa + "<=" + G + "\n")
                                        } else if (">=" == e.comp || "=>" ==
                                            e.comp) {
                                            for (var da = "", w = -e.limit, B = 0, X = e.keys.length; B < X; ++B) ra = e.keys[B], da += k(ra, w);
                                            0 < da.length && (l += v + da + ">=0\n")
                                        } else if ("<=" == e.comp || "=<" == e.comp) {
                                            da = "";
                                            w = G - e.limit;
                                            B = 0;
                                            for (X = e.keys.length; B < X; ++B) ra = e.keys[B], da += k(ra, w);
                                            0 < da.length && (l += v + da + "<=" + G + "\n")
                                        } else console.log("invalid null group comp '" + e.comp + "'")
                                    } else "=" == e.comp ? (l += v + ">=" + e.limit + "\n", l += v + "<=" + e.limit + "\n") : ">=" == e.comp ? l += v + ">=" + e.limit + "\n" : "<=" == e.comp ? l += v + "<=" + e.limit + "\n" : console.log("invalid null group comp '" + e.comp +
                                        "'");
                            else {
                                var P = "g" + b + "_" + e.id;
                                "!>=" == e.comp && e.limit >= G ? l += "+" + P + ">=1" : "=" == e.comp ? (l += v + "-" + e.limit + P + ">=0\n", w = G - e.limit, 0 <= w && (w = "+" + w), e.limit < G && (l += v + w + P + "<=" + G + "\n")) : ">=" == e.comp || "=>" == e.comp ? l += v + "-" + e.limit + P + ">=0\n" : "<=" == e.comp || "=<" == e.comp ? (w = G - e.limit, 0 <= w && (w = "+" + w), l += v + w + P + "<=" + G + "\n") : "!>=" == e.comp ? l += v + "+" + e.limit + P + ">=" + e.limit + "\n" : "!<=" == e.comp ? (w = -(G - e.limit), 0 <= w && (w = "+" + w), l += v + w + P + "<=" + e.limit + "\n") : console.log("invalid group comp '" + e.comp + "'");
                                Ua[e.id] = e.mExp
                            }
                        }
                    for (var v =
                            "", h = 0, Ca = Object.keys(Ua), I = Ca.length; h < I; ++h) {
                        if (">=" != F.comp || 0 != F.limit) "$" == Ca[h].substring(0, 1) ? (ra = Ca[h].substring(1), v += k(ra)) : v += "+g" + b + "_" + Ca[h];
                        if ("$" != Ca[h].substring(0, 1)) {
                            var P = "g" + b + "_" + Ca[h],
                                Bb = Ua[Ca[h]],
                                f = f + (P + "\n"),
                                Ma = Ha(P);
                            La.hasOwnProperty(Ma) ? P != Ma && 0 > La[Ma].k.indexOf(P) && La[Ma].k.push(P) : La[Ma] = {
                                c: 0,
                                k: [P],
                                l: Bb
                            }
                        }
                    }(">=" != F.comp || 0 != F.limit) && 0 < v.length && ("=" == F.comp ? (l += v + ">=" + F.limit + "\n", l += v + "<=" + F.limit + "\n") : l += v + F.comp + F.limit + "\n")
                } else {
                    var v = "",
                        e = F.groups[0];
                    if (">=" == e.comp &&
                        0 == e.limit) continue;
                    for (var G = 0, B = 0, X = e.players.length; B < X; ++B) p = e.players[B], pl.hasOwnProperty(p) && (w = 1, e.hasOwnProperty("w") && B < e.w.length && (w = e.w[B]), G++, v += k(p, w));
                    if (1 > G || G < e.limit && "<=" == e.comp) continue;
                    else {
                        if (G < e.limit && ">=" == e.comp) return ya = "Overconstrained problem. Please increase your pool or reduce stacking", {
                            error: ya
                        };
                        "=" == e.comp ? (l += v + ">=" + e.limit + "\n", l += v + "<=" + e.limit + "\n") : l += v + e.comp + e.limit + "\n"
                    }
                }
                hb += l
            }
        }
        for (var d = d + hb, d = d + r, wb = {
                e: {},
                g: La,
                l: d,
                m: "",
                r: f + "\nEND\n"
            }, b = 0, m = t.length; b <
            m; ++b) M(wb, t[b], []);
        return wb
    }();
    if (Y.hasOwnProperty("error")) void 0 !== window.document ? (swal("", Y.error, "warning"), stopCalculation()) : window.postMessage({
        error: Y.error,
        rdmId: a
    });
    else {
        var Na = t.length,
            ea = t.length;
        f = ea + f;
        t = [];
        if (void 0 !== window.document) H(Na, ea, f, Y);
        else
            for (; ea < f && H(Na, ea, f, Y); ++ea);
    }
}
void 0 === window.document && self.addEventListener("message", function(f) {
    f = f.data;
    for (var t = "leagueConst site league groups posse stacks pstacks playerlistByTeam games randomness randomPct normalize showProblem pl".split(" "), q = 0, g = Object.keys(f), a = g.length; q < a; ++q) {
        var u = g[q];
        0 <= t.indexOf(u) && (window[u] = f[u])
    }
    f.hasOwnProperty("pool") && (calcTeams(f.teamCount, f.teams, f.objective, f.uniqueness, f.rdmId, f.pool, f.exposureType, f.minSal, f.maxSal, f.numOppPlayers), window.postMessage({
        solve_finished: 1,
        rdmId: f.rdmId
    }))
});