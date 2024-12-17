export default function two_crystal_balls(breaks: boolean[]): number {
    const length = breaks.length;
    const jump = Math.round(Math.sqrt(length));
    let breakpoint = 0;

    for (let i = 0; i < length; i += jump) {
        const v = breaks[i];

        if (v === true) {
            breakpoint = i;
            break;
        }
    }

    for (let j = Math.max(breakpoint - jump, 0); j < breakpoint; j++) {
        if (breaks[j] === true) return j;
    }

    return -1;
}
