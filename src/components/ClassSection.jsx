import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Alert, Badge, Container, Table } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const ClassSection = () => {
  const params = useParams()

  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [aClass, setClass] = useState()

  const fetchClass = () => {
    fetch(`http://localhost:3001/api/classes/${params.classId}`, {
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
        <Container key={aClass.classId} className='my-3'>
          <h1>{aClass.className} </h1>
          <p>{aClass.description} </p>
          <Table responsive='sm'>
            <thead>
              <tr>
                <th>Livello</th>
                <th>Bonus competenza</th>
                <th>Caratteristiche classe</th>
              </tr>
            </thead>
            <tbody>
              {aClass.classLevels
                .sort((a, b) => a.levelNumber - b.levelNumber)
                .map((level) => (
                  <tr key={level.levelId}>
                    <td>{level.levelNumber}</td>
                    <td>+{level.proficiencyBonus}</td>
                    <td>
                      {level.classFeatures.map((feature) => (
                        <span key={feature.classFeatureId}>{feature.classFeatureName}. </span>
                      ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <h3>Punti vita:</h3>
          <p>
            <span>Dadi vita:</span> 1d{aClass.hitDice} per livello da {aClass.className}.
          </p>
          <p>
            <span>Punti vita al primo livello:</span> {aClass.hitDice} + il tuo modificare di Costituzione.
          </p>
          <p>
            <span>Punti vita a livelli maggiori:</span> 1d{aClass.hitDice} + il tuo modificare di Costituzione per livello da{" "}
            {aClass.className}.
          </p>

          <h3>Competenze:</h3>

          <h6>Tiri salvezza:</h6>
          <p>
            {aClass.classProficiency ? (
              aClass.classProficiency
                .filter((proficiency) => proficiency.proficiencyType === "SAVING_TROWS")
                .sort((a, b) => a.name.localeCompare(b.name)).length > 0 ? (
                aClass.classProficiency
                  .filter((proficiency) => proficiency.proficiencyType === "SAVING_TROWS")
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((proficiency) => (
                    <Badge className='me-2' pill bg='danger' key={proficiency.proficiencyId}>
                      {proficiency.name}
                    </Badge>
                  ))
              ) : (
                <span>Nessuna competenza</span>
              )
            ) : (
              <span>Nessuna competenza</span>
            )}
          </p>

          <h6>Abilità:</h6>
          <p>
            {aClass.classProficiency ? (
              aClass.classProficiency
                .filter((proficiency) => proficiency.proficiencyType === "SKILLS")
                .sort((a, b) => a.name.localeCompare(b.name)).length > 0 ? (
                aClass.classProficiency
                  .filter((proficiency) => proficiency.proficiencyType === "SKILLS")
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((proficiency) => (
                    <Badge className='me-2' pill bg='danger' key={proficiency.proficiencyId}>
                      {proficiency.name}
                    </Badge>
                  ))
              ) : (
                <span>Nessuna competenza</span>
              )
            ) : (
              <span>Nessuna competenza</span>
            )}
          </p>

          <h6>Armature:</h6>
          <p>
            {aClass.classProficiency ? (
              aClass.classProficiency
                .filter((proficiency) => proficiency.proficiencyType === "ARMOR")
                .sort((a, b) => a.name.localeCompare(b.name)).length > 0 ? (
                aClass.classProficiency
                  .filter((proficiency) => proficiency.proficiencyType === "ARMOR")
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((proficiency) => (
                    <Badge className='me-2' pill bg='danger' key={proficiency.proficiencyId}>
                      {proficiency.name}
                    </Badge>
                  ))
              ) : (
                <span>Nessuna competenza</span>
              )
            ) : (
              <span>Nessuna competenza</span>
            )}
          </p>

          <h6>Armi:</h6>
          <p>
            {aClass.classProficiency ? (
              aClass.classProficiency
                .filter((proficiency) => proficiency.proficiencyType === "WEAPONS")
                .sort((a, b) => a.name.localeCompare(b.name)).length > 0 ? (
                aClass.classProficiency
                  .filter((proficiency) => proficiency.proficiencyType === "WEAPONS")
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((proficiency) => (
                    <Badge className='me-2' pill bg='danger' key={proficiency.proficiencyId}>
                      {proficiency.name}
                    </Badge>
                  ))
              ) : (
                <span>Nessuna competenza</span>
              )
            ) : (
              <span>Nessuna competenza</span>
            )}
          </p>

          <h3>Equipaggiamento iniziale:</h3>

          <h6>Armi:</h6>

          <p>
            {aClass.equipmentList.filter((equipment) => equipment.damageType !== null).length === 0
              ? "Nessun oggetto."
              : aClass.equipmentList
                  .filter((equipment) => equipment.damageType !== null && equipment.damageType !== undefined)
                  .map((equipment) => (
                    <Badge key={equipment.equipmentId} className='me-2' pill bg='danger'>
                      {equipment.name}
                    </Badge>
                  ))}
          </p>

          <h6>Armature e scudi:</h6>
          <p>
            {aClass.equipmentList.filter((equipment) => equipment.armorClass !== null && equipment.armorClass !== undefined)
              .length === 0
              ? "Nessun oggetto."
              : aClass.equipmentList
                  .filter(
                    (equipment) =>
                      equipment.armorClass !== null &&
                      equipment.armorClass !== undefined &&
                      equipment.damageType == undefined &&
                      equipment.armorClass !== null
                  )
                  .map((equipment) => (
                    <Badge key={equipment.equipmentId} className='me-2' pill bg='danger'>
                      {equipment.name}
                    </Badge>
                  ))}
          </p>

          <h6>Altro:</h6>
          <p>
            {aClass.equipmentList.filter((equipment) => equipment.armorClass == null && equipment.damageType == null).length === 0
              ? "Nessun oggetto."
              : aClass.equipmentList
                  .filter((equipment) => equipment.armorClass == null && equipment.damageType == null)
                  .map((equipment) => (
                    <Badge key={equipment.equipmentId} className='me-2' pill bg='danger'>
                      {equipment.name}
                    </Badge>
                  ))}
          </p>

          {aClass.classLevels
            .filter((level) => level.classFeatures.length > 0)
            .map((level) => (
              <div key={level.levelId}>
                <h4>Livello {level.levelNumber}</h4>
                {level.classFeatures.map((feature) => (
                  <div key={feature.classFeatureId}>
                    <h6> {feature.classFeatureName} </h6>
                    <p> {feature.classFeatureDescription} </p>
                  </div>
                ))}
              </div>
            ))}

          <h3>Sottoclassi:</h3>
          {aClass.subclassSet.map((subclass) => (
            <NavLink className={"d-block mt-2 mb-3"} to={`/subclass-detail/${subclass.subclassId}`} key={subclass.subclassId}>
              {subclass.name}
            </NavLink>
          ))}
        </Container>
      )}
    </>
  )
}

export default ClassSection
