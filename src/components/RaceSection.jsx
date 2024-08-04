import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Alert, Container } from "react-bootstrap"

const RaceSection = () => {
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [race, setRace] = useState()
  const params = useParams()

  const fetchARace = () => {
    fetch(`http://localhost:3001/api/classes/${params.raceId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MjI2MDUxNTcsImV4cCI6MTcyMzIwOTk1Nywic3ViIjoiY2Q4MmNlZGUtMmJmMC00MWIzLThlZDEtZTdhOTdiODVhZjA4In0.ltL10zyALqFZ3rse-vVs34Zjl5dyggATz9MT6mSajqJBs8BhFg5-Y9l_NWKEvseL",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          if (response.status === 400) {
            throw new Error("400: Bad Request")
          }
          if (response.status === 401) {
            throw new Error("401: Unauthorized")
          }
          if (response.status === 402) {
            throw new Error("402: Payment Required")
          }
          if (response.status === 403) {
            throw new Error("403: Forbidden")
          }
          if (response.status === 404) {
            throw new Error("404: Not Found")
          }
          if (response.status === 405) {
            throw new Error("405: Method Not Allowed")
          }
          if (response.status === 406) {
            throw new Error("406: Not Acceptable")
          }
          if (response.status === 407) {
            throw new Error("407: Proxy Authentication Required")
          }
          if (response.status === 408) {
            throw new Error("408: Request Timeout")
          }
          if (response.status === 500) {
            throw new Error("500: Server Error")
          }

          throw new Error("Generic Fetch Error")
        }
      })
      .then((data) => {
        console.log(data)

        setRace(data)
      })
      .catch((err) => {
        console.log(err)

        setErrorMsg(err.name + " : " + err.message)
        setIsError(true)
      })
  }

  useEffect(() => {
    fetchARace()
  }, [])

  // Funzione per istanziare gli Alert di errore
  const createAlert = (errorMsg) => {
    return (
      <Alert variant='danger'>
        <Alert.Heading>WARNING!</Alert.Heading>
        <p>{errorMsg}</p>
      </Alert>
    )
  }

  return (
    <>
      {isError ? createAlert(errorMsg) : console.log("Nessun errore")}
      {race && !isError && (
        <Container className='mt-3'>
          <h1>{race.name} </h1>
          <p>{race.description} </p>

          <h3>Età ed invecchiamento:</h3>
          <p>{race.ageDescription}</p>

          <h3>Allineamento:</h3>
          <p>{race.alignmentDescription}</p>

          <h3>Dimesioni:</h3>
          <p>{race.sizeDescription}</p>

          <h3>Velocità:</h3>
          <p>La loro velocità base è di: {race.speed} metri.</p>

          <h3>Competenze</h3>
          <p>
            {race.proficiencies.map((proficiency) => (
              <span key={proficiency.proficiencyId}> - {proficiency.name}</span>
            ))}
          </p>

          {race.racialTraits.map((trait) => (
            <div key={trait.racialTraitId}>
              <h4>{trait.name}</h4>
              <p>{trait.description}</p>
            </div>
          ))}

          {race.subraceSet.map((subrace) => (
            <div key={subrace.subRaceId}>
              <h2>{subrace.name}</h2>
              <p>{subrace.description}</p>
              {subrace.racialTraits.map((trait) => (
                <div key={trait.racialTraitId}>
                  <h5>{trait.name}</h5>
                  <p>{trait.description}</p>
                </div>
              ))}
            </div>
          ))}
        </Container>
      )}
    </>
  )
}

export default RaceSection
