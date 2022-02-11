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