import { useEffect, useState } from "react"
import { Alert, Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const RaceListSection = () => {
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [races, setRaces] = useState()
  const navigate = useNavigate()

  const fetchRaces = () => {
    fetch("http://localhost:3001/api/races", {
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
        console.log(data.content)

        setRaces(data.content)
      })
      .catch((err) => {
        console.log(err)

        setErrorMsg(err.name + " : " + err.message)
        setIsError(true)
      })
  }

  useEffect(() => {
    fetchRaces()
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
      {races && !isError && (
        <Container>
          <h1>Lista Razze:</h1>
          {races
            .slice() // Crea una copia dell'array per non mutare l'array originale
            .sort((a, b) => a.name.localeCompare(b.name)) // Ordina le razze per nome
            .map((race) => (
              <Card key={race.raceId} className='my-2'>
                <Card.Body>
                  <Card.Title>{race.name}</Card.Title>
                  <Card.Text>Clicca qui sotto per scoprire tutte le informazioni su questa razza!</Card.Text>
                  <Button variant='primary' onClick={() => navigate(`/race-detail/${race.raceId}`)}>
                    Vai alla razza!
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </Container>
      )}
    </>
  )
}

export default RaceListSection
