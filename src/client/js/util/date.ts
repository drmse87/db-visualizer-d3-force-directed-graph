export default {
    getDateDataAttribute(dateString: string) {
        const created = new Date(dateString).getTime();
        const currentTime = new Date();
        const lastMonth = currentTime.setMonth(currentTime.getMonth() - 1);
        const lastYear = currentTime.setFullYear(currentTime.getFullYear() - 1);
        const threeYearsAgo = currentTime.setFullYear(currentTime.getFullYear() - 3);
        let dateData;

        if (created >= lastMonth) {
            dateData = 'thisMonth';
        }
        else if (created >= lastYear) {
            dateData = 'thisYear';
        }
        else if (created <= threeYearsAgo) {
            dateData = 'olderThanThreeYears';
        }
        else if (created <= lastYear) {
            dateData = 'olderThanYear';
        }

        return dateData;
    }
};