import {POST_BY_SCORE_BAD, POST_BY_SCORE_GOOD, POST_BY_DATE_OLD, POST_BY_DATE_NEW} from '../constants/postSortConst'

export default function sortPosts(a,b, sort) {
	switch(sort) {
		case POST_BY_DATE_NEW:
			return postByDateNew(a,b);
		case POST_BY_DATE_OLD:
			return postByDateOld(a,b);
		case POST_BY_SCORE_GOOD:
			return postByScoreGood(a,b);
		case POST_BY_SCORE_BAD:
			return postByScoreBad(a,b);
		default:
			console.log(`WARN: sort function not recognised: ${sort}`);
	}
}

function postByDateNew(a,b) {
	if(a.timestamp < b.timestamp)
		return 1;
	if(a.timestamp > b.timestamp)
		return -1;
	return 0;
}

function postByDateOld(a,b) {
	if(a.timestamp < b.timestamp)
		return -1;
	if(a.timestamp > b.timestamp)
		return 1;
	return 0;
}

function postByScoreGood(a,b) {
	if(a.voteScore < b.voteScore)
		return 1;
	if(a.voteScore > b.voteScore)
		return -1;
	return 0;
}

function postByScoreBad(a,b) {
	if(a.voteScore < b.voteScore)
		return -1;
	if(a.voteScore > b.voteScore)
		return 1;
	return 0;
}