export const latestEntry = (data) => {
    const keys = Object.keys(data)
    const mostRecentMonth = keys.reduce((a, b) => {
        const aSplit = a.split('/')
        const bSplit = b.split('/')
        return Number(aSplit[0]) <= Number(bSplit[0]) && Number(aSplit[1]) <= Number(bSplit[1]) ? b : a
    })
    const days = Object.keys(data[mostRecentMonth]).filter(el => el !== 'average')
    const mostRecentDay = days.reduce((a, b) => Number(a) > Number(b) ? a : b)

    const date = mostRecentDay + '/' + mostRecentMonth

    return {
        date: date,
        weight: data[mostRecentMonth][mostRecentDay]
    }
}