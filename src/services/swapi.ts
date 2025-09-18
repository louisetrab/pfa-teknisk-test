export interface Person {
  name: string
  height: string
  gender: string
  birth_year: string
  eye_color: string
  homeworld: string
  films: string[]
}

const CACHE_KEY = 'swapiPeopleCache'

export async function fetchPeople(): Promise<Person[]> {
  // Try to fetch from localStorage
  const raw = localStorage.getItem(CACHE_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Person[]
      return parsed
    } catch (err) {
      console.warn('Ugyldig cache. Rydder og henter frisk data.', err)
      localStorage.removeItem(CACHE_KEY)
    }
  }

  // Fetch from API
  const listRes = await fetch('https://swapi.tech/api/people')
  if (!listRes.ok) {
    console.error('Kunne ikke hente liste:', await listRes.text())
    return []
  }
  const listData = await listRes.json()

  // Fetch details from every person
  const people = await Promise.all(
    listData.results.map(async (item: { name: string; url: string }) => {
      const detailRes = await fetch(item.url)
      if (!detailRes.ok) return null

      const detailData = await detailRes.json()
      const props = detailData.result.properties

      const homeworldRes = await fetch(props.homeworld)
      if (!homeworldRes.ok) return null
      const homeworldData = await homeworldRes.json()

      return {
        name: props.name,
        height: props.height,
        gender: props.gender,
        birth_year: props.birth_year,
        eye_color: props.eye_color,
        homeworld: homeworldData.result.properties.name,
        films: props.films,
      } as Person
    })
  )

  // Filter nulls and save them in the cache
  const clean = people.filter((p): p is Person => p !== null)
  localStorage.setItem(CACHE_KEY, JSON.stringify(clean))
  return clean
}