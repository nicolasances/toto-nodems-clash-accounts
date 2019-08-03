
exports.accountTO = (doc) => {

    return {
        id: doc._id,
        user: doc.user, 
        tag: doc.tag,
        name: doc.name,
        current: doc.current
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

    return {$set: {current: current}};
}