export function deepMerge(target, src) {
    for (const k in src) {
        const item = (src)[k]
        if (typeof item == 'object') {
            const cur = (target)[k]
            if (typeof cur === 'object') {
                deepMerge(cur, item)
            } else {
                (target)[k] = deepMerge({}, item)
            }
        } else {
            (target)[k] = item
        }
    }
    return target
}