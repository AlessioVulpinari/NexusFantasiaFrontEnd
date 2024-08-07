import { useEffect, useState } from "react"
import { Alert, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"

const SubClassSection = () => {
  const params = useParams()
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [aClass, setClass] = useState()

  const fetchClass = () => {
    fetch(`http://localhost:3001/api/subclasses/${params.subclassId}`, {
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

        setClass(data)
      })
      .catch((err) => {
        console.log(err)

        setErrorMsg(err.name + " : " + err.message)
        setIsError(true)
      })
  }

  useEffect(() => {
    fetchClass()
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
      {aClass && !isError && (
        <Container className='my-3'>
          <h1>{aClass.name}</h1>
          <p>{aClass.description} </p>

          {aClass.subClassLevels
            .sort((a, b) => a.levelNumber - b.levelNumber) // Ordina l'array per levelNumber
            .map((level) => (
              <div key={level.subclassLevelId}>
                <h4>Livello: {level.levelNumber}</h4>
                <div>
                  <h6> {level.classFeature.classFeatureName} </h6>
                  <p> {level.classFeature.classFeatureDescription} </p>
                </div>
              </div>
            ))}
        </Container>
      )}
    </>
  )
}

export default SubClassSection
