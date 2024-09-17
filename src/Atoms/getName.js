const getName = (name, numberWords) => {
    const getname = name.toString().split(" ")
    const [firstName] = getname

    const getThirdName = () => {
        return (getname.length >= 3 && numberWords >= 3) ? getname[2] : ""
    }
    const getSecondName = () => {
        return (getname.length >= 2 && numberWords >= 2) ? getname[1] : ""
    }

    return name != "" && (
        firstName + " " + getSecondName() + " " + getThirdName()
    )
};

export default getName