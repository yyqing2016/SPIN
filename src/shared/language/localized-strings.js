import en from './en'
import zh from './zh'
import { deepMerge } from '../../lib/obj'

let gaStrings = initLocalizedStrings()

function initLocalizedStrings() {
    let strings = en
    try {
        let locale = navigator.language || 'en'
        locale = locale.substr(0, 2)
        if (locale === 'zh') {
            strings = {}
            deepMerge(strings, zh)
        }
    } catch (error) {
        console.log(error)
    }
    return strings
}

class LocalizedStrings {
    t = gaStrings
}

export const LS = new LocalizedStrings()