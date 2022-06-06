const {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
}           =  require('http-status-codes');

exports.getFeed = async ( req, res ) => {

    try {
        res.status(StatusCodes.OK).json({});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }

}

exports.createFeed = async ( req, res ) => {

    try {

        
        res.status(StatusCodes.OK).json({});
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send(err);
    }

}
