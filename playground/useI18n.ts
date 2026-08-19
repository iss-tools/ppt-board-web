import { computed } from 'vue';

export function useI18n() {
  const currentLang = computed(() => {
    // A simple language fallback, you can hook this up to your global store if needed
    return 'zh';
  });

  const t = (key: string, defaultText: string) => {
    // For this simple PWA prompt, we can just return the default text.
    // To fully support i18n, you'd add a messages dictionary here like in plugin-menu.
    return defaultText;
  };

  return { t, currentLang };
}
