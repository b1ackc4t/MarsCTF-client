import requests from "@/axios";

export function getScoreByPage(pageSize, pageNum) {
    return requests({
        url: `/api/userScore/${pageSize}/${pageNum}`,
        method: 'get'
    })
}

export function getRankForChallenge(cid) {
    return requests({
        url: `/api/userScore/challengeRank/${cid}`,
        method: 'get'
    })
}

export function getScoreChart(uid) {
    return requests({
        url: `/api/user/userScore/scoreChart/${uid}`,
        method: 'get'
    })
}

export function getChallengeStatus(uid) {
    return requests({
        url: `/api/user/userScore/challengeStatus/${uid}`,
        method: 'get'
    })
}

export function searchUserScorePage(key, value, pageSize, pageNum) {
    return requests({
        url: `/api/userScore/search/${pageSize}/${pageNum}`,
        method: 'get',
        params: {
            key: key,
            value: value
        }
    })
}
