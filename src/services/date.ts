class DateService {
    getCurrentDayFormated(date: Date) {
        //return @string date formatted: DD/MM/YYYY
        const dateFormated = date.toLocaleDateString('en-GB');

        return dateFormated;
    }

    getTimeSpan(beginTime: string, endTime: string) {
        const [hoursBeginTime, minutesBeginTime] = beginTime.split(':');
        const [hoursEndTime, minutesEndTime] = endTime.split(':');

        const totalMinutesBeginTime = Number(hoursBeginTime) * 60 + Number(minutesBeginTime);
        const totalMinutesEndTime = Number(hoursEndTime) * 60 + Number(minutesEndTime);

        const timeSpanMinutes = totalMinutesEndTime - totalMinutesBeginTime;

        return timeSpanMinutes;
    }

    pad2Number(number: number) {
        return number.toString().padStart(2, '0');
    }

    formatMinutesAndHour(totalMinutes: number, showTimeMeasurements: boolean = false) {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);

        let timeMeasurements = 'minutes';

        if (hours) {
            timeMeasurements = 'hours';
        }

        return showTimeMeasurements
            ? `${this.pad2Number(hours)}:${this.pad2Number(minutes)} ${timeMeasurements}`
            : `${this.pad2Number(hours)}:${this.pad2Number(minutes)}`;
    }

    formatWithOurPeriods(date: string) {
        let period = 'AM';
        let hour = Number(date.split(':')[0]);

        if (hour > 12) period = 'PM';

        return `${date} ${period}`;
    }
}
export const dateService = new DateService();
