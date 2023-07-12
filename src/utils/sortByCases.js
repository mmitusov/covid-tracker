export const sortByCases = (data) => {
    return data.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
}