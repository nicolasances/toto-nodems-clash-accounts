
exports.accountTO = (doc) => {

    return {
        id: doc._id,
        user: doc.user,
        tag: doc.tag,
        name: doc.name,
        current: doc.current,
        clan: doc.clan
    }

}

exports.accountPO = (email, doc) => {

    return {
        user: email,
        tag: doc.tag,
        name: doc.name,
        current: false
    }
}

exports.setAccountCurrent = (current) => {

    return { $set: { current: current } };
}

/**
 * Enriches the account info with data taken from CoC API
 */
exports.enrichAccount = (data) => {

    return {
        $set: {
            clan: {
                tag: data.clan.tag, 
                name: data.clan.name
            }
        }
    }

}