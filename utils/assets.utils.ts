import { localStorageWrapper } from "@/components/data/storage";

export function getTokenInLocalStorage(): string | null {
    const tokenString = localStorageWrapper.get('token') as string;
    if (tokenString) {
        return tokenString
    }
    return null;
}

export function formatWeekDay(week_day?: string): string {
    if (week_day === "1") {
        return "Понедельник"
    }

    else if (week_day === "2") {
        return "Вторник"
    }

    else if (week_day === "3") {
        return "Среда"
    }

    else if (week_day === "4") {
        return "Четверг"
    }

    else if (week_day === "5") {
        return "Пятница"
    }

    else if (week_day === "6") {
        return "Суббота"
    }

    return "Понедельник"
}

export function getWeekDayNumber(day: string): string {

    const weekDayMap: Record<string, string> = {
        Понедельник: "1",
        Вторник: "2",
        Среда: "3",
        Четверг: "4",
        Пятница: "5",
        Суббота: "6",
        Дүйсенбі: "1",
        Серсенбі: "2",
        Сейсенбі: "3",
        Бейсенбі: "4",
        Жұма: "5",
        Сенбі: "6",
    };
    return weekDayMap[day] || "";
};

export function getWeekDayString(day: string): string {

    const weekDayMap: Record<string, string> = {
        "1": "Дүйсенбі",
        "2": "Серсенбі",
        "3": "Сейсенбі",
        "4": "Бейсенбі",
        "5": "Жұма",
        "6": "Сенбі"
    };
    return weekDayMap[day] || "";
};

export function getWeekRussianDayString(day: string): string {

    const weekDayMap: Record<string, string> = {
        "1": "Понедельник",
        "2": "Вторник",
        "3": "Среда",
        "4": "Четверг",
        "5": "Пятница",
        "6": "Суббота"
    };
    return weekDayMap[day] || "";
};