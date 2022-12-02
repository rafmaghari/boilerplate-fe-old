export const getLocaleDate = (dateTimeString: string) => {
    const newData = new Date(dateTimeString)
    if (!newData) throw new Error('Wrong date format')
    return newData.toLocaleDateString() + ' ' + newData.toLocaleTimeString()
}

export const setFormikErrors = (errorObject: any, setErrorFunction: any) => {
    const errors = Object.keys(errorObject)
    errors.map((item) => {
        setErrorFunction(item, errorObject[item].join('\r\n'))
    })
}
