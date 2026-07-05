import type { Language } from '../types/language';

type LanguageSwitcherProps = {
    language: Language;
    setLanguage: (value: Language) => void;
}

function LanguageSwitcher({ language, setLanguage }: LanguageSwitcherProps) {
    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}>
            <option value="en">English</option>
            <option value="ja">日本語</option>
        </select>
    )
};

export default LanguageSwitcher;
