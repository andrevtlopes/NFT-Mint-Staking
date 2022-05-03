import React, { useEffect, CSSProperties } from 'react';
import Countdown from 'react-countdown';

interface UnstakeCountdownProps {
    // unstakeDate: number | Date | undefined;
    // cooldownDate: number | Date | undefined;
    date: number | Date | undefined;
    now?: any;
    status?: string;
    onMount?: () => void;
    onStart?: () => void;
    onComplete?: () => void;
}

interface UnstakeCountdownRender {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}

export interface ValueCSS extends CSSProperties {
    '--value': number;
}

const CountdownAnimated = ({ value }) => {
    return <span style={{ '--value': value } as ValueCSS}></span>;
};

export const UnstakeCountdown: React.FC<UnstakeCountdownProps> = ({
    date,
    // cooldownDate,
    now = Date.now(),
    status,
    onMount,
    onComplete,
    onStart,
}) => {
    const renderCountdown = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }: UnstakeCountdownRender) => {
        if (completed) {
            return (
                <>{status === 'pendingCooldown' ? 'End cooldown' : 'Unstake'}</>
            );
        } else {
            return (
                <span className='font-mono countdown'>
                    <CountdownAnimated value={days} />
                    d&nbsp;
                    <CountdownAnimated value={hours} />:
                    <CountdownAnimated value={minutes} />:
                    <CountdownAnimated value={seconds} />
                </span>
            );
        }
    };

    // const date = useMemo(
    //     () => status === 'pendingCooldown' ? cooldownDate : unstakeDate,
    //     [cooldownDate, unstakeDate, status]
    // );

    if (date) {
        return (
            <Countdown
                date={date}
                now={now}
                onMount={() => date < now() && onMount()}
                onComplete={onComplete}
                onStart={onStart}
                renderer={renderCountdown}
            />
        );
    } else {
        return null;
    }
};
