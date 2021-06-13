async function fetchAllLanguages(languageURL = ''): Promise<string[]> {
  let languages = []

  if (languageURL === '') return languages

  try {
    const response = await fetch(languageURL)

    if (response.ok) {
      const data = await response.json()

      languages = Object.keys(data ?? {})
    }
  } catch (e) {
    // Log to Sentry or similar
  }

  return languages
}

export default fetchAllLanguages
