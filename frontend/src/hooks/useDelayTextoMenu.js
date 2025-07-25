import { useEffect, useState } from 'react';

export default function useDelayTextoMenu(trigger) {
    const [visible, setVisible] = useState(false);
    const delayMs = 300

    useEffect(() => {
        let timeout;

        if (trigger) {
        timeout = setTimeout(() => setVisible(true), delayMs);
        } else {
        setVisible(false);
        }

        return () => clearTimeout(timeout);
    }, [trigger, delayMs]);

    return visible;
}
